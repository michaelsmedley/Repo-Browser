import { createPortal } from "react-dom";

/* Create a portal based on div#portal */
const Portal = (props) => {
  const { children } = props;
  const newEl = document.getElementById("portal");

  return createPortal(children, newEl);
};

export default Portal;
