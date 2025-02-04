import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function HomePage() {
  return (
    <div className="flex items-center justify-center flex-col min-h-[100vh] space-y-14 bg-[#202125]">
      <h1 className="text-3xl lg:text-6xl antialiased font-semibold tracking-tight">
        Welcome to Google Flights
      </h1>

      <p className="text-white/75 lg:text-lg">
        Let's find the best deals for you.
      </p>

      <Link to="/flights">
        <Button variant="outlined" className="!py-2 !px-5">
          <span className="text-sm text-white">Search Flights</span>
        </Button>
      </Link>
    </div>
  );
}

export default HomePage;
