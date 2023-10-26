export const handleOnMouseDown = (
  event: any,
  handleMouseMove: any,
  handleMouseUp: any,
  isResizingRef: any
) => {
  event.preventDefault();
  event.stopPropagation();
  isResizingRef.current = true;
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
};
