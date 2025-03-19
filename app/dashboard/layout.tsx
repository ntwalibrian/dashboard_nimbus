import React from "react";
import Sidebar from "../ui/sidebar";
import Navbar from "../ui/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-neutral-200"> 
      <div className="w-64 ">
        <Sidebar /> 
      </div>
      <div className="flex-grow flex-col">
        <div className="w-full"><Navbar /></div>
        <div className="flex-grow md:overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
