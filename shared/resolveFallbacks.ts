import type { FallbackLocales } from "@intlify/core-base";

export function resolveFallbacks(
  fallbacks: FallbackLocales<string>,
  locale: string,
) {
  return [locale, ..._resolveFallbacks(fallbacks, locale)]
    .map((value) => value.replace(/!$/, ""))
    .filter((val, i, arr) => arr.indexOf(val) === i);
}

function _resolveFallbacks(
  fallbacks: FallbackLocales<string>,
  locale: string,
): string[] {
  if (!fallbacks) return [];
  if (typeof fallbacks === "string") return [fallbacks];
  if (Array.isArray(fallbacks)) return fallbacks;

  // Explicit fallback
  if (locale in fallbacks) {
    const found = fallbacks[locale];
    const last = found?.[found.length - 1];
    if (last) return [...found, ..._resolveFallbacks(fallbacks, last)];
  }

  // Implicit fallback
  const isOverride = locale.slice(-1) === "!";
  const lastSep = locale.lastIndexOf("-");
  if (!isOverride && lastSep > -1) {
    const base = locale.slice(0, lastSep);
    return [base, ..._resolveFallbacks(fallbacks, base)];
  }

  if (fallbacks.default) return fallbacks.default;

  return [];
}
