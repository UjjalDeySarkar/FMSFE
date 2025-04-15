import React from "react";
import { Grid, List } from "lucide-react";

interface ViewToggleProps {
  view: "grid" | "list";
  onChange: (view: "grid" | "list") => void;
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1">
      <button
        className={`p-1.5 rounded ${
          view === "grid"
            ? "bg-gray-100 text-gray-800"
            : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
        }`}
        onClick={() => onChange("grid")}
        title="Grid view"
      >
        <Grid className="w-4 h-4" />
      </button>
      <button
        className={`p-1.5 rounded ${
          view === "list"
            ? "bg-gray-100 text-gray-800"
            : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
        }`}
        onClick={() => onChange("list")}
        title="List view"
      >
        <List className="w-4 h-4" />
      </button>
    </div>
  );
}