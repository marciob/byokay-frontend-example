"use client";

import { FaGithub } from "react-icons/fa";

export default function GitHubLink() {
  return (
    <a
      href="https://github.com/byokay/byokay-kit"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 text-gray-600 hover:text-gray-900 transition-colors"
      title="View on GitHub"
    >
      <FaGithub className="w-6 h-6" />
    </a>
  );
}
