import { Plane } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const baseNavLinkStyle =
  "border border-white/30 rounded-full flex items-center gap-1.5 py-1.5 px-5 hover:text-blue-300 hover:border-white/50 transition-all [transition-duration:0.2s] text-sm ";

function Navbar() {
  return (
    <header className="flex items-center py-2 px-5 md:px-16 justify-between border-b border-b-white">
      <div className="flex gap-2 md:gap-10 items-center justify-between">
        <span className="text-2xl font-semibold antialiased">
          <Link to="/">Google</Link>
        </span>

        <NavLink
          to="/flights"
          className={({ isActive }) =>
            isActive
              ? twMerge(baseNavLinkStyle, "bg-blue-300/30 text-blue-300")
              : baseNavLinkStyle
          }
        >
          <Plane className="size-4" />
          Flights
        </NavLink>
      </div>

      <div className="bg-amber-600 py-2 px-3.5 rounded-full flex items-center font-semibold cursor-pointer">
        <span>K</span>
      </div>
    </header>
  );
}

export default Navbar;
