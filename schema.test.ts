import { describe, it, expect } from "vitest";
import { insertPolishSchema, insertManicureSchema } from "./schema";

describe("insertPolishSchema", () => {
  it("validates a complete valid polish entry", () => {
    const data = {
      brand: "OPI",
      name: "Bubble Bath",
      color: "#F2D8D8",
      finish: "Glossy",
      sessionId: "session-123",
    };
    const result = insertPolishSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("validates with optional fields omitted", () => {
    const data = {
      brand: "Essie",
      name: "Bordeaux",
      color: "#4C061D",
      finish: "Matte",
      sessionId: "session-abc",
    };
    const result = insertPolishSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("accepts null for optional photoUrl", () => {
    const data = {
      brand: "OPI",
      name: "Alpine Snow",
      color: "#FFFFFF",
      finish: "Glossy",
      photoUrl: null,
      sessionId: "session-123",
    };
    const result = insertPolishSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("accepts null for optional notes", () => {
    const data = {
      brand: "OPI",
      name: "Alpine Snow",
      color: "#FFFFFF",
      finish: "Glossy",
      notes: null,
      sessionId: "session-123",
    };
    const result = insertPolishSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("rejects when brand is missing", () => {
    const data = {
      name: "Bubble Bath",
      color: "#F2D8D8",
      finish: "Glossy",
      sessionId: "session-123",
    };
    const result = insertPolishSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("rejects when name is missing", () => {
    const data = {
      brand: "OPI",
      color: "#F2D8D8",
      finish: "Glossy",
      sessionId: "session-123",
    };
    const result = insertPolishSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("rejects when color is missing", () => {
    const data = {
      brand: "OPI",
      name: "Bubble Bath",
      finish: "Glossy",
      sessionId: "session-123",
    };
    const result = insertPolishSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("rejects when sessionId is missing", () => {
    const data = {
      brand: "OPI",
      name: "Bubble Bath",
      color: "#F2D8D8",
      finish: "Glossy",
    };
    const result = insertPolishSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("omits the id field from the schema", () => {
    const data = {
      id: 1,
      brand: "OPI",
      name: "Bubble Bath",
      color: "#F2D8D8",
      finish: "Glossy",
      sessionId: "session-123",
    };
    const result = insertPolishSchema.safeParse(data);
    // id should be stripped (schema omits it)
    if (result.success) {
      expect((result.data as Record<string, unknown>).id).toBeUndefined();
    }
  });
});

describe("insertManicureSchema", () => {
  it("validates a complete valid manicure entry", () => {
    const data = {
      date: "2024-01-15",
      photoUrl: "https://example.com/photo.jpg",
      notes: "New Year mani",
      polishIds: [1, 2, 3],
      sessionId: "session-123",
    };
    const result = insertManicureSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("validates with optional fields as null", () => {
    const data = {
      date: "2024-06-01",
      photoUrl: null,
      notes: null,
      polishIds: [5],
      sessionId: "session-xyz",
    };
    const result = insertManicureSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("rejects when date is missing", () => {
    const data = {
      polishIds: [1],
      sessionId: "session-123",
    };
    const result = insertManicureSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("rejects when polishIds is missing", () => {
    const data = {
      date: "2024-01-15",
      sessionId: "session-123",
    };
    const result = insertManicureSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("rejects when sessionId is missing", () => {
    const data = {
      date: "2024-01-15",
      polishIds: [1, 2],
    };
    const result = insertManicureSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("accepts empty polishIds array", () => {
    const data = {
      date: "2024-01-15",
      polishIds: [],
      sessionId: "session-123",
    };
    const result = insertManicureSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("omits the id field from the schema", () => {
    const data = {
      id: 99,
      date: "2024-01-15",
      polishIds: [1],
      sessionId: "session-123",
    };
    const result = insertManicureSchema.safeParse(data);
    if (result.success) {
      expect((result.data as Record<string, unknown>).id).toBeUndefined();
    }
  });
});
