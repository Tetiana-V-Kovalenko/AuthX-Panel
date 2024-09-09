import { NavLink } from "react-router-dom";

export const NavBar = () => {
  return (
    <div className="flex items-center justify-start gap-8 mb-[32px]">
      <NavLink
        to="/registration"
        className={({ isActive }) =>
          `font-bebas text-xl ${
            isActive
              ? "text-blue-200 cursor-default"
              : "text-blue-800 hover:text-blue-600 underline "
          }  `
        }
      >
        Registration
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          `font-bebas text-xl ${
            isActive
              ? "text-blue-200 cursor-default"
              : "text-blue-800 hover:text-blue-600 underline"
          }   `
        }
      >
        Login
      </NavLink>
    </div>
  );
};
