import React from "react";
import { Eye, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

interface DocumentListItemProps {
  document: {
    id: number;
    title: string;
    created_date: string;
    tags: number[];
    thumbnail_str?: string;
  };
  tags: {
    id: number;
    name: string;
    color: string;
  }[];
  onView: (id: number) => void;
}

export function DocumentListItem({ document, tags, onView }: DocumentListItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="text-gray-300">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-gray-800 font-medium">{document.title}</h3>
            <p className="text-gray-500 text-sm">
              {document.created_date && (
                <span>
                  {new Date(document.created_date).toISOString().split("T")[0]}
                </span>
              )}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Tags */}
          <div className="hidden md:flex flex-wrap gap-1">
            {document.tags && document.tags.length > 0 ? (
              document.tags.slice(0, 2).map((tagId, index) => {
                const tag = tags.find((t) => t.id === tagId);
                return (
                  <span
                    key={index}
                    className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full"
                  >
                    {tag ? tag.name : `Tag ${tagId}`}
                  </span>
                );
              })
            ) : (
              <span className="inline-block bg-gray-500 bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                No tags
              </span>
            )}
          </div>
          
          {/* View button */}
          <button
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full"
            title="View"
            onClick={() => onView(document.id)}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}