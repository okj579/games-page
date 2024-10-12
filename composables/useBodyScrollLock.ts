import type { WatchSource } from "@vue/reactivity";

function getScrollRoot() {
  return (
    (document.scrollingElement as HTMLElement) ??
    (document.documentElement.scrollHeight > document.body.scrollHeight &&
    document.compatMode.indexOf("CSS1") == 0
      ? document.documentElement
      : document.body)
  );
}

export function useBodyScrollLock(enable?: WatchSource<boolean>) {
  if (!import.meta.client) return computed({ get: () => false, set() {} });

  const scrollRoot = getScrollRoot();
  const isLocked = computed({
    get: () => scrollRoot.style.overflow === "hidden",
    set(isEnabled: boolean) {
      scrollRoot.style.overflow = isEnabled ? "hidden" : "";
    },
  });

  if (enable) syncRefs(enable, isLocked);

  return isLocked;
}
