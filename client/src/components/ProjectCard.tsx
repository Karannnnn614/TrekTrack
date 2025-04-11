import React from "react";
import { Trash2 } from "lucide-react";
import type { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  onAddToCart: (id: string) => void;
  onRemoveFromCart?: (id: string) => void;
  isInCart: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onAddToCart,
  onRemoveFromCart,
  isInCart,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
      <div className="flex flex-col sm:flex-row">
        <img
          src={project.image_url}
          alt={project.title}
          className="w-full h-48 sm:w-32 sm:h-32 object-cover"
        />
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="text-lg font-medium text-gray-900">
                {project.title}
              </h3>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium text-gray-500 uppercase">
                  {project.category}
                </span>
              </div>
              <p className="text-sm text-gray-500">By {project.author}</p>
            </div>
            {isInCart && onRemoveFromCart ? (
              <button
                onClick={() => onRemoveFromCart(project.id.toString())}
                className="px-3 py-1 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 border border-red-200 flex items-center gap-2"
              >
                <Trash2 size={16} />
                Remove
              </button>
            ) : (
              <button
                onClick={() => onAddToCart(project.id.toString())}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  isInCart
                    ? "bg-gray-200 text-gray-600"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                disabled={isInCart}
              >
                {isInCart ? "In Cart" : "Add to Cart"}
              </button>
            )}
          </div>
          <p className="mt-2 text-sm text-gray-500 sm:mt-1">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
