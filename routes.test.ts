import { describe, it, expect } from "vitest";
import { buildUrl, api } from "./routes";

describe("buildUrl", () => {
  it("returns path unchanged when no params provided", () => {
    expect(buildUrl("/api/polishes")).toBe("/api/polishes");
  });

  it("returns path unchanged when params is undefined", () => {
    expect(buildUrl("/api/polishes", undefined)).toBe("/api/polishes");
  });

  it("replaces a single param placeholder", () => {
    expect(buildUrl("/api/polishes/:id", { id: 42 })).toBe("/api/polishes/42");
  });

  it("replaces multiple param placeholders", () => {
    expect(buildUrl("/api/:resource/:id", { resource: "polishes", id: 7 })).toBe(
      "/api/polishes/7"
    );
  });

  it("converts numeric values to strings", () => {
    expect(buildUrl("/api/polishes/:id", { id: 123 })).toBe("/api/polishes/123");
  });

  it("ignores params not present in the path", () => {
    expect(buildUrl("/api/polishes", { unused: "value" })).toBe("/api/polishes");
  });

  it("handles empty params object", () => {
    expect(buildUrl("/api/polishes/:id", {})).toBe("/api/polishes/:id");
  });
});

describe("api route definitions", () => {
  it("defines polishes list route", () => {
    expect(api.polishes.list.method).toBe("GET");
    expect(api.polishes.list.path).toBe("/api/polishes");
  });

  it("defines polishes create route", () => {
    expect(api.polishes.create.method).toBe("POST");
    expect(api.polishes.create.path).toBe("/api/polishes");
  });

  it("defines polishes update route", () => {
    expect(api.polishes.update.method).toBe("PATCH");
    expect(api.polishes.update.path).toBe("/api/polishes/:id");
  });

  it("defines polishes delete route", () => {
    expect(api.polishes.delete.method).toBe("DELETE");
    expect(api.polishes.delete.path).toBe("/api/polishes/:id");
  });

  it("defines match route", () => {
    expect(api.polishes.match.method).toBe("POST");
    expect(api.polishes.match.path).toBe("/api/match");
  });
});
