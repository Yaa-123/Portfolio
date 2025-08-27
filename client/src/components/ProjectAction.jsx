import React from "react";

const ProjectAction = ({ liveDemoUrl, repoUrl }) => {
  return (
    <div className="project-action">
      {liveDemoUrl && (
        <a
          href={liveDemoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-action__button"
        >
          Live Demo
        </a>
      )}
      {repoUrl && (
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-action__button"
        >
          View Code
        </a>
      )}
    </div>
  );
};

export default ProjectAction;
