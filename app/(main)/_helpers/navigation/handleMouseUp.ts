export const handleMouseUp = (
  isResizingRef: any,
  handleMouseMove: any,
  handleMouseUp: any
) => {
  isResizingRef.current = false;
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
};
