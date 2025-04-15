import React from "react";
import { Calendar, Eye, FileText, Tag } from "lucide-react";
import { useRouter } from "next/navigation";

interface DocumentGridItemProps {
  document: {
    id: number;
    title: string;
    created_date: string;
    tags: number[];
    thumbnail_str?: string;
    page_count?: number | null;
  };
  tags: {
    id: number;
    name: string;
    color: string;
  }[];
  onView: (id: number) => void;
}

export function DocumentGridItem({ document, tags, onView }: DocumentGridItemProps) {
  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  // Function to get image URL from base64
  const getImageUrlFromBase64 = (base64String: string | undefined): string | null => {
    if (!base64String) return null;
    try {
      return `data:image/*;base64,${base64String}`;
    } catch (e) {
      console.error("Error processing base64 image:", e);
      return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all group">
      {/* Thumbnail */}
      <div className="relative aspect-square bg-gray-50">
        {document.thumbnail_str ? (
          <img
            src={getImageUrlFromBase64(document.thumbnail_str) || ""}
            alt={document.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center"><svg class="w-16 h-16 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div>';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FileText className="w-16 h-16 text-gray-300" />
          </div>
        )}

        {/* Hover overlay with action button */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onView(document.id);
            }}
            className="bg-white text-gray-800 p-2 rounded-full transform scale-90 group-hover:scale-100 transition-all"
            title="View Document"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>

        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1 max-w-[calc(100%-24px)]">
          {document.tags && document.tags.length > 0 ? (
            document.tags.slice(0, 2).map((tagId, index) => {
              const tag = tags.find((t) => t.id === tagId);
              return (
                <span
                  key={index}
                  className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full truncate max-w-[120px]"
                >
                  {tag ? tag.name : `Tag ${tagId}`}
                </span>
              );
            })
          ) : null}
          {document.tags && document.tags.length > 2 && (
            <span className="inline-block bg-gray-700 text-white text-xs px-2 py-1 rounded-full">
              +{document.tags.length - 2}
            </span>
          )}
        </div>

        {/* Page count badge */}
        {document.page_count && (
          <div className="absolute bottom-3 right-3 bg-white bg-opacity-90 text-gray-700 text-xs px-2 py-1 rounded-md">
            {document.page_count} {document.page_count === 1 ? 'page' : 'pages'}
          </div>
        )}
      </div>

      {/* Document Info */}
      <div className="p-4">
        <h3 className="text-gray-800 font-medium line-clamp-1">{document.title}</h3>
        <div className="flex items-center text-gray-500 text-sm mt-1">
          <Calendar className="w-3.5 h-3.5 mr-1" />
          <span>{formatDate(document.created_date)}</span>
        </div>
      </div>
    </div>
  );
}