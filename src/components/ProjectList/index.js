import "./ProjectList.css";

import ProjectCard from "../ProjectCard";

const ProjectList = ({ projects, onProjectSelect }) => {

  const list = projects.map((item, index) => {
    return (
      <li className="w-full flex" key={index}>
        <ProjectCard project={item} onProjectSelect={onProjectSelect} />
      </li>
    );
  });
  return (
    <ul className="c-project-list grid grid-cols-1 md:grid-cols-2 gap-2">
      {list}
    </ul>
  );
};

export default ProjectList;
