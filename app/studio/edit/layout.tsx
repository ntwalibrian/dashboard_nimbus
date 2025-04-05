import React from "react";
import Navbar from "@/app/ui/web-editor/navBar";
import LeftSidebar from "@/app/ui/web-editor/leftSidebar";
import RightSidebar from "@/app/ui/web-editor/rightSidebar";

export default function EditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <LeftSidebar />
        <main className="flex-1 bg-gray-100">{children}</main>
        <RightSidebar selectedElement={null} />
      </div>
    </div>
  );
}
