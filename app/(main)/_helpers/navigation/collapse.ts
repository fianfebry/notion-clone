export const collapse = (
  sidebarRef: any,
  navbarRef: any,
  setIsCollapsed: any,
  setIsResetting: any
) => {
  if (sidebarRef.current && navbarRef.current) {
    setIsCollapsed(true);
    setIsResetting(true);

    sidebarRef.current.style.width = "0";
    navbarRef.current.style.setProperty("width", "100%");
    navbarRef.current.style.setProperty("left", "0");
    setTimeout(() => setIsResetting(false), 300);
  }
};
