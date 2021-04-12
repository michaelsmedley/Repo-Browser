import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ProjectList from "./components/ProjectList/";
import Portal from "./components/Portal/index";

const orgName = "godaddy";
const listEndpoint = `https://api.github.com/orgs/${orgName}/repos`;

/* The main body of the page */
const PageBody = () => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  /* close modal by pressing escape key */
  const escFunction = (event) => {
    if (event.keyCode === 27 && isModalOpen) {
      setIsModalOpen(false);
    }
  }

  document.addEventListener("keydown", escFunction, false);

  /* API call to return list of repositories */
  /* Put in localstorage to prevent hitting limits */
  const getRepoList = () => {
    if (localStorage.getItem("projects")) {
      setProjects(JSON.parse(localStorage.getItem("projects")));
      setIsLoading(false);
      return;
    }
    fetch(listEndpoint)
      .then((res) => res.json())
      .then((items) => {
        localStorage.setItem("projects", JSON.stringify(items));
        setProjects(items);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getRepoList();
  }, []);

  /** Trigger whether to show the modal */
  const showModal = (proj) => {
    setProject(proj);
    setIsModalOpen(true);
  };

  /* Loading state */
  if (isLoading) {
    return (
      <div className="container px-2 py-5">
        <p>Loading...</p>
      </div>
    );
  }

  /* Error state */
  if (error) {
    return (
      <div className="container px-2 py-5">
        <p>There was an error - {error}</p>
      </div>
    );
  }

  return (
    <div className="container px-2 py-5 mx-auto">
      <ProjectList projects={projects} onProjectSelect={showModal} />
      {isModalOpen && (
        <Portal>
          <div className="w-full h-full flex items-center justify-center fixed top-0 left-0">
            <div
              className="bg-white w-full h-full fixed top-0 left-0 bg-opacity-50"
              onClick={() => setIsModalOpen(false)}
            ></div>
            <div class="p-3 rounded-md shadow-md w-9/12 h-4/5 bg-white overflow-scroll relative">
              <button
                className="absolute right-3 top-3"
                onClick={() => setIsModalOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h1 className="text-4xl leading-none font-extrabold tracking-tight text-gray-900">
                {project.name}
              </h1>
              <div className="flex gap-5 mt-3 flex-col sm:flex-row">
                <span className="inline-flex flex-row">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  {project.watchers_count}
                </span>
                <span className="inline-flex flex-row">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                  {project.stargazers_count}
                </span>
              </div>
              <hr className="my-3" />
              {project.archived && (
                <span class="p-1 bg-red-500 text-white text-sm rounded-md text-bold mb-2 inline-block">
                  This project has been archived.
                </span>
              )}
              {!project.archived && (
                <span class="p-1 bg-gray-100 text-black text-sm rounded-md inline-block font-mono">
                  git clone {project.clone_url}
                </span>
              )}
              <p>{project.description}</p>
              <p>
                <a
                  href={project.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  View Project
                </a>
              </p>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};

function App() {
  return (
    <React.Fragment>
      <Header />
      <PageBody />
    </React.Fragment>
  );
}

export default App;
