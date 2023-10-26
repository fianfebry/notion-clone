"use client";
import { cn } from "@/lib/utils";
import {
  ChevronsLeft,
  MenuIcon,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Trash,
} from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { usePathname } from "next/navigation";
import React, { ElementRef } from "react";
import { useMediaQuery } from "usehooks-ts";
import { resetWidth } from "../_helpers/navigation/resetWidth";
import { collapse } from "../_helpers/navigation/collapse";
import { UserItem } from "./UserList";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Item from "./Item";
import { handleCreateDocument } from "@/helpers/handleCreateDocument";
import DocumentList from "./DocumentList";
import { TrashBox } from "./TrashBox";
const Navigation = () => {
  const pathName = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const documents = useQuery(api.documents.get);
  const createDocument = useMutation(api.documents.create);
  const isResizingRef = React.useRef(false);
  const sidebarRef = React.useRef<ElementRef<"aside">>(null);
  const navbarRef = React.useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(isMobile);

  React.useEffect(() => {
    if (isMobile) {
      onCollapse();
    } else {
      onResetWidth();
    }
  }, [isMobile]);

  React.useEffect(() => {
    if (isMobile) {
      onCollapse();
    }
  }, [pathName, isMobile]);
  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const onResetWidth = () => {
    resetWidth(isMobile, sidebarRef, navbarRef, setIsCollapsed, setIsResetting);
  };

  const onCollapse = () => {
    collapse(sidebarRef, navbarRef, setIsCollapsed, setIsResetting);
  };
  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          onClick={onCollapse}
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="w-6 h-6" />
        </div>
        <div>
          <UserItem />
          <Item
            onClick={() => handleCreateDocument(createDocument, "testing")}
            label="Search"
            icon={Search}
            isSearch
          />
          <Item
            onClick={() => handleCreateDocument(createDocument, "testing")}
            label="Setings"
            icon={Settings}
          />
          <Item
            onClick={() => handleCreateDocument(createDocument, "testing")}
            label="New Page"
            icon={PlusCircle}
          />
        </div>
        <div className="mt-4">
          <DocumentList />
          <Item
            onClick={() => handleCreateDocument(createDocument, "testing")}
            label="Add a Page"
            icon={Plus}
          />
          <Popover>
            <PopoverTrigger className="w-full mt-4">
              <Item label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
              className="p-0 w-72"
              side={isMobile ? "bottom" : "right"}
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={onResetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full ">
          {isCollapsed ? (
            <MenuIcon
              onClick={onResetWidth}
              role="button"
              className="h-6 w-6 text-muted-foreground"
            />
          ) : null}
        </nav>
      </div>
    </>
  );
};

export default Navigation;
