
import { Undo2, Redo2, Monitor, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <div className="w-full bg-white border-b border-gray-200 p-4 flex items-center justify-between">
      {/* Left Side: Undo, Redo, Save, Exit */}
      <div className="flex items-center space-x-4">
        <Undo2 className="w-5 h-5 text-black cursor-pointer" />
        <Redo2 className="w-5 h-5 text-black cursor-pointer" />
        <Button className="bg-black text-white px-4 py-2">Save</Button>
        <Button className="bg-black text-white px-4 py-2">Exit</Button>
      </div>

      {/* Right Side: View Mode, Preview, Deploy */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Monitor className="w-5 h-5 text-black cursor-pointer" />
          <Smartphone className="w-5 h-5 text-black cursor-pointer" />
        </div>
        <Button className="bg-black text-white px-4 py-2">Preview</Button>
        <Button className="bg-black text-white px-4 py-2">Deploy</Button>
      </div>
    </div>
  );
}
