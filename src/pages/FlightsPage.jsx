import FlightsHero from "../components/FlightsHero";
import FlightsTable from "../components/FlightsTable";
import Navbar from "../components/Navbar";
import SearchBox from "../components/SearchBox";

function FlightsPage() {
  return (
    <div className="bg-[#202125] min-h-[100vh]">
      <Navbar />

      <main className="lg:px-40 xl:px-80 flex flex-col justify-between space-y-15">
        <FlightsHero />

        <SearchBox />

        <FlightsTable />
      </main>
    </div>
  );
}

export default FlightsPage;
