import { vi } from "vitest";

/**
 * Jotai partial mock
 */
export function mockJotai() {
  vi.mock("jotai", async () => {
    const actual = await vi.importActual("jotai");
    return {
      ...actual,
      useAtomValue: vi.fn(),
    };
  });
}

/**
 * utils partial mock
 */
export function mockUtils() {
  vi.mock("../../src/shared/utils/utils", async () => {
    const actual = await vi.importActual("../../src/shared/utils/utils");
    return {
      ...actual,
      formatNumber: vi.fn(),
    };
  });
}

export function setupAllMocks() {
  mockJotai();
  mockUtils();
}
