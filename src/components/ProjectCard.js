

/* Display a project card */
const ProjectCard = ({ project, onProjectSelect }) => {
  return (
    <div className="transition-all duration-200 p-2 rounded-md border-2 border-grey-500 w-full hover:shadow-md">
      <h2 className="font-bold break-all">
        <button
        className="as-link"
          onClick={() => {
            onProjectSelect(project);
          }}
        >
          {project.name}
        </button>
      </h2>
      <p className="text-sm text-gray-500">{project.description}</p>
    </div>
  );
};

export default ProjectCard;
