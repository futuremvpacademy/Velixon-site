const normalizePath = (pathname: string) => {
  if (pathname === "/") return "/";
  return `/${pathname.split(/[?#]/, 1)[0].replace(/^\/+|\/+$/g, "")}/`;
};

/**
 * Public routes that should remain out of search. Keep this list narrow and
 * evidence-based so new SEO work does not remove previously indexable,
 * substantive pages. `noindex` is not access control.
 */
export const nonIndexablePaths = [
  "/404/",
  "/404.html/",
  "/review/",
  // Thin legacy hubs that overlap stronger principal pages.
  "/results/",
  "/services/automation/",
  "/work/"
] as const;

const nonIndexablePathSet = new Set<string>(nonIndexablePaths);

export const isPublicIndexablePath = (pathname: string) =>
  !nonIndexablePathSet.has(normalizePath(pathname));
