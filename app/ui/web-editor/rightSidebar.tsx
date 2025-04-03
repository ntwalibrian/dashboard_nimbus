interface RightSidebarProps {
  selectedElement: string | null;
}

export default function RightSidebar({ selectedElement }: RightSidebarProps) {
  return (
    <div className="w-48 bg-white border-l border-gray-200 p-4">
      <h3 className="font-medium mb-2">Properties</h3>
      {selectedElement ? (
        <p className="text-sm text-gray-500">
          Edit properties of {selectedElement}
        </p>
      ) : (
        <p className="text-sm text-gray-500">Select an element to edit</p>
      )}
    </div>
  );
}
