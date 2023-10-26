export const resetWidth = (
  isMobile: any,
  sidebarRef: any,
  navbarRef: any,
  setIsCollapsed: any,
  setIsResetting: any
) => {
  if (sidebarRef.current && navbarRef.current) {
    setIsCollapsed(false);
    setIsResetting(true);

    sidebarRef.current.style.width = isMobile ? "100%" : "240px";
    navbarRef.current.style.setProperty(
      "width",
      isMobile ? "0" : "calc(100% - 240px)"
    );
    navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
    setTimeout(() => setIsResetting(false), 300);
  }
};
