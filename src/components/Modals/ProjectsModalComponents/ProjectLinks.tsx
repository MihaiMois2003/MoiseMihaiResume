import React from "react";
import { Github, ExternalLink } from "lucide-react";

interface ProjectLinksProps {
  githubUrl?: string;
  liveUrl?: string;
}

export const ProjectLinks: React.FC<ProjectLinksProps> = ({
  githubUrl,
  liveUrl,
}) => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl p-5 space-y-3">
      <h4 className="text-lg font-semibold text-white mb-3">Links</h4>

      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center gap-3 p-3 rounded-lg
            bg-gray-700/30 hover:bg-gray-700/50
            border border-gray-600/30 hover:border-gray-500/50
            text-gray-300 hover:text-white
            transition-all duration-200 group
          "
        >
          <Github size={20} />
          <span className="flex-1 text-sm font-medium">View on GitHub</span>
          <ExternalLink
            size={16}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </a>
      )}

      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center gap-3 p-3 rounded-lg
            bg-blue-500/10 hover:bg-blue-500/20
            border border-blue-500/30 hover:border-blue-500/50
            text-blue-400 hover:text-blue-300
            transition-all duration-200 group
          "
        >
          <ExternalLink size={20} />
          <span className="flex-1 text-sm font-medium">Live Demo</span>
          <ExternalLink
            size={16}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </a>
      )}
    </div>
  );
};
