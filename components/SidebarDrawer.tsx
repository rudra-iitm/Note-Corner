"use client";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Sidebar from "./Sidebar";

export const SidebarDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (drawerOpen && !e.target.closest("#docs-sidebar")) {
        setDrawerOpen(false);
      }
    };
  
    const handleEscapeKey = (e: any) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
      }
    };
  
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleEscapeKey);
  
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [drawerOpen]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <div id='sidebar' className={`fixed top-10 left-4 z-50 ${drawerOpen ? "hidden" : ""}`}>
        <button
          className="text-black border focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
          type="button"
          onClick={toggleDrawer}
        >
          <RxHamburgerMenu className="w-4 h-4" />
        </button>
      </div>

    <div
        id="drawer-example"
        className={`fixed top-0 left-0 z-40 h-screen  overflow-y-auto transition-transform ${
            drawerOpen ? "" : "-translate-x-full"
        } bg-white w-60 dark:bg-gray-800`}
        tabIndex={-1}
        aria-labelledby="drawer-label"
    >
        <Sidebar toggleDrawer={toggleDrawer}/>
      </div>
    </>
  );
};

export function ToggleButton({toggleDrawer}: {toggleDrawer: () => void}) {
    return (
        <button
          type="button"
          onClick={toggleDrawer}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
    )
}