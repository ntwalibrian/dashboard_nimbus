"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Plus, ChevronDown, ChevronUp } from "lucide-react";

export default function LeftSidebar() {
  const [sections, setSections] = useState([
    "Header",
    "Hero Section",
    "About",
    "Footer",
  ]);
  const [pages, setPages] = useState(["Home", "About Us", "Contact"]);
  const [isSectionsVisible, setSectionsVisible] = useState(false);
  const [isAssetsVisible, setAssetsVisible] = useState(false);
  const [isPagesVisible, setPagesVisible] = useState(false);

  // Function to add a new section
  const addSection = () => {
    const newSection = `Section ${sections.length + 1}`;
    setSections([...sections, newSection]);
  };

  // Function to add a new page
  const addPage = () => {
    const newPage = `Page ${pages.length + 1}`;
    setPages([...pages, newPage]);
  };

  return (
    <div className="w-48 bg-white text-black h-full flex flex-col p-4 border-r border-gray-200">
      {/* Project Name */}
      <h2 className="text-lg font-semibold text-black">Project Name</h2>
      <Separator className="my-4 bg-white" />

      {/* Pages */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium uppercase text-black">Pages</h3>
          <button
            onClick={() => setPagesVisible(!isPagesVisible)}
            className="text-gray-500 hover:text-black"
          >
            {isPagesVisible ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
        </div>

        {isPagesVisible && (
          <div className="space-y-2 pl-4 p-2 rounded">
            {pages.map((page, index) => (
              <div
                key={index}
                className="p-1 text-gray-600 text-sm hover:text-black"
              >
                {page}
              </div>
            ))}
            <button
              onClick={addPage}
              className="p-1 flex items-center space-x-1 text-gray-500 hover:text-black"
            >
              <Plus size={16} />
              <span className="text-sm">Add a new page</span>
            </button>
          </div>
        )}
      </div>

      <Separator className="my-4 bg-white" />

      {/* Sections */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium uppercase text-black">Sections</h3>
          <button
            onClick={() => setSectionsVisible(!isSectionsVisible)}
            className="text-gray-500 hover:text-black"
          >
            {isSectionsVisible ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
        </div>

        {isSectionsVisible && (
          <div className="space-y-2 pl-4 p-2 rounded">
            {sections.map((section, index) => (
              <div
                key={index}
                className="p-1 text-gray-600 text-sm hover:text-black"
              >
                {section}
              </div>
            ))}
            <button
              onClick={addSection}
              className="p-1 flex items-center space-x-1 text-gray-500 hover:text-black"
            >
              <Plus size={16} />
              <span className="text-sm">Add a new section</span>
            </button>
          </div>
        )}
      </div>

      <Separator className="my-4 bg-white" />

      {/* Assets */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium uppercase text-black">Assets</h3>
          <button
            onClick={() => setAssetsVisible(!isAssetsVisible)}
            className="text-gray-500 hover:text-black"
          >
            {isAssetsVisible ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
        </div>

        {isAssetsVisible && (
          <div className="space-y-2 pl-4 p-2 rounded">
            <div className="p-1 text-gray-600 text-sm hover:text-black">
              Button
            </div>
            <div className="p-1 text-gray-600 text-sm hover:text-black">
              Image
            </div>
            <div className="p-1 text-gray-600 text-sm hover:text-black">
              Text Box
            </div>
          </div>
        )}
        {/* ibi ni filler nibindi byose biri hejuru */}
      </div>
    </div>
  );
}
