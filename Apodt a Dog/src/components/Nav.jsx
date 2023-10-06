import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <NavLink to="/">HOME</NavLink>
      <NavLink to="/add">ADD</NavLink>
    </nav>
  );
}
