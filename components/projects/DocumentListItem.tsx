import React from "react";
import { Calendar, Eye, FileText, Tag } from "lucide-react";

interface DocumentListItemProps {
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

export function DocumentListItem({ document, tags, onView }: DocumentListItemProps) {
  // Function to get tag color based on tag ID
  const getTagColor = (tagId: number) => {
    const tag = tags.find(t => t.id === tagId);
    return tag?.color || "bg-blue-600";
  };

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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
      <div className="flex items-center p-4">
        {/* Document icon/thumbnail */}
        <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mr-4 border border-gray-100">
          {document.thumbnail_str ? (
            <img 
              src={`data:image/jpeg;base64,${document.thumbnail_str}`}
              alt={document.title}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.parentElement!.innerHTML = '<div class="flex items-center justify-center w-full h-full"><svg class="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div>';
              }}
            />
          ) : (
            <FileText className="w-6 h-6 text-gray-400" />
          )}
        </div>
        
        {/* Document info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-gray-800 font-medium truncate pr-2">{document.title}</h3>
            <div className="flex items-center mt-1 sm:mt-0">
              {document.page_count && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded mr-2">
                  {document.page_count} {document.page_count === 1 ? 'page' : 'pages'}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 mt-1">
            <div className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1" />
              <span>{formatDate(document.created_date)}</span>
            </div>
            
            {/* Tags */}
            <div className="flex items-center mt-1 sm:mt-0 sm:ml-4">
              <Tag className="w-3.5 h-3.5 mr-1" />
              <div className="flex flex-wrap gap-1">
                {document.tags && document.tags.length > 0 ? (
                  document.tags.slice(0, 3).map((tagId, index) => {
                    const tag = tags.find((t) => t.id === tagId);
                    return (
                      <span
                        key={index}
                        className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full ${getTagColor(tagId)} text-white`}
                      >
                        {tag ? tag.name : `Tag ${tagId}`}
                      </span>
                    );
                  })
                ) : (
                  <span className="text-xs text-gray-400">No tags</span>
                )}
                {document.tags && document.tags.length > 3 && (
                  <span className="text-xs text-gray-500">+{document.tags.length - 3} more</span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="ml-4 flex-shrink-0">
          <button
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            title="View Document"
            onClick={() => onView(document.id)}
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}