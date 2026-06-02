import { describe, it, expect, vi } from "vitest";
import { isRateLimitError, batchProcess, batchProcessWithSSE } from "./utils";

describe("isRateLimitError", () => {
  it("returns true for 429 status code in message", () => {
    expect(isRateLimitError(new Error("Request failed with status 429"))).toBe(true);
  });

  it("returns true for RATELIMIT_EXCEEDED", () => {
    expect(isRateLimitError(new Error("RATELIMIT_EXCEEDED"))).toBe(true);
  });

  it("returns true for quota message (case-insensitive)", () => {
    expect(isRateLimitError(new Error("Quota exceeded for today"))).toBe(true);
  });

  it("returns true for rate limit message (case-insensitive)", () => {
    expect(isRateLimitError(new Error("Rate Limit reached"))).toBe(true);
  });

  it("returns false for unrelated errors", () => {
    expect(isRateLimitError(new Error("Network timeout"))).toBe(false);
    expect(isRateLimitError(new Error("Internal server error 500"))).toBe(false);
  });

  it("handles non-Error values", () => {
    expect(isRateLimitError("429 Too Many Requests")).toBe(true);
    expect(isRateLimitError(42)).toBe(false);
    expect(isRateLimitError(null)).toBe(false);
    expect(isRateLimitError(undefined)).toBe(false);
  });
});

describe("batchProcess", () => {
  it("processes all items and returns results in order", async () => {
    const items = [1, 2, 3, 4, 5];
    const processor = async (item: number) => item * 2;

    const results = await batchProcess(items, processor);
    expect(results).toEqual([2, 4, 6, 8, 10]);
  });

  it("respects concurrency limit", async () => {
    let concurrent = 0;
    let maxConcurrent = 0;
    const items = [1, 2, 3, 4, 5, 6];

    const processor = async (item: number) => {
      concurrent++;
      maxConcurrent = Math.max(maxConcurrent, concurrent);
      await new Promise((resolve) => setTimeout(resolve, 50));
      concurrent--;
      return item;
    };

    await batchProcess(items, processor, { concurrency: 2 });
    expect(maxConcurrent).toBeLessThanOrEqual(2);
  });

  it("retries on rate limit errors", async () => {
    let attempts = 0;
    const processor = async () => {
      attempts++;
      if (attempts < 3) {
        throw new Error("429 Too Many Requests");
      }
      return "success";
    };

    const results = await batchProcess(["item"], processor, {
      retries: 5,
      minTimeout: 10,
      maxTimeout: 50,
    });

    expect(results).toEqual(["success"]);
    expect(attempts).toBe(3);
  });

  it("aborts immediately on non-rate-limit errors", async () => {
    const processor = async () => {
      throw new Error("Database connection failed");
    };

    await expect(
      batchProcess(["item"], processor, { retries: 5, minTimeout: 10 })
    ).rejects.toThrow();
  });

  it("calls onProgress callback", async () => {
    const items = ["a", "b", "c"];
    const progress: Array<{ completed: number; total: number }> = [];

    await batchProcess(
      items,
      async (item) => item.toUpperCase(),
      {
        onProgress: (completed, total) => {
          progress.push({ completed, total });
        },
      }
    );

    expect(progress).toHaveLength(3);
    expect(progress[progress.length - 1]).toEqual({ completed: 3, total: 3 });
  });

  it("handles empty input", async () => {
    const results = await batchProcess([], async (item) => item);
    expect(results).toEqual([]);
  });

  it("passes index to processor", async () => {
    const items = ["a", "b", "c"];
    const results = await batchProcess(items, async (_item, index) => index);
    expect(results).toEqual([0, 1, 2]);
  });
});

describe("batchProcessWithSSE", () => {
  it("processes items sequentially and sends events", async () => {
    const items = ["a", "b", "c"];
    const events: Array<{ type: string; [key: string]: unknown }> = [];
    const sendEvent = (event: { type: string; [key: string]: unknown }) => {
      events.push(event);
    };

    const results = await batchProcessWithSSE(
      items,
      async (item) => item.toUpperCase(),
      sendEvent
    );

    expect(results).toEqual(["A", "B", "C"]);

    // Check started event
    expect(events[0]).toEqual({ type: "started", total: 3 });

    // Check processing events
    const processingEvents = events.filter((e) => e.type === "processing");
    expect(processingEvents).toHaveLength(3);

    // Check progress events
    const progressEvents = events.filter((e) => e.type === "progress");
    expect(progressEvents).toHaveLength(3);

    // Check complete event
    const completeEvent = events[events.length - 1];
    expect(completeEvent).toEqual({ type: "complete", processed: 3, errors: 0 });
  });

  it("handles errors gracefully and continues processing", async () => {
    const items = [1, 2, 3];
    const events: Array<{ type: string; [key: string]: unknown }> = [];
    const sendEvent = (event: { type: string; [key: string]: unknown }) => {
      events.push(event);
    };

    const results = await batchProcessWithSSE(
      items,
      async (item) => {
        if (item === 2) throw new Error("Processing failed");
        return item * 10;
      },
      sendEvent,
      { retries: 0, minTimeout: 10 }
    );

    // Item 2 fails, gets undefined placeholder
    expect(results[0]).toBe(10);
    expect(results[1]).toBeUndefined();
    expect(results[2]).toBe(30);

    const completeEvent = events[events.length - 1];
    expect(completeEvent).toMatchObject({ type: "complete", processed: 3, errors: 1 });
  });

  it("handles empty input", async () => {
    const events: Array<{ type: string; [key: string]: unknown }> = [];
    const sendEvent = (event: { type: string; [key: string]: unknown }) => {
      events.push(event);
    };

    const results = await batchProcessWithSSE([], async (item) => item, sendEvent);

    expect(results).toEqual([]);
    expect(events[0]).toEqual({ type: "started", total: 0 });
    expect(events[1]).toEqual({ type: "complete", processed: 0, errors: 0 });
  });

  it("sends error message in progress event on failure", async () => {
    const events: Array<{ type: string; [key: string]: unknown }> = [];
    const sendEvent = (event: { type: string; [key: string]: unknown }) => {
      events.push(event);
    };

    await batchProcessWithSSE(
      ["x"],
      async () => {
        throw new Error("Custom failure");
      },
      sendEvent,
      { retries: 0, minTimeout: 10 }
    );

    const progressEvent = events.find(
      (e) => e.type === "progress" && e.error !== undefined
    );
    expect(progressEvent).toBeDefined();
    expect(typeof progressEvent!.error).toBe("string");
  });
});
