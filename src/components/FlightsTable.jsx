import { Loader } from "lucide-react";
import useFlightsStore from "../store/useFlightsStore";
import FlightsCard from "./FlightsCard";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

function FlightsTable() {
  const {
    departingFlights,
    returningFlights,
    tripType,
    isLoading,
    error,
    apiCallsMade,
  } = useFlightsStore();

  const [showFlightDirection, setShowFlightDirection] = useState("Departing");

  const flights =
    showFlightDirection === "Departing" ? departingFlights : returningFlights;

  if (isLoading) return <Loader className="animate-spin mx-auto mt-10" />;

  if (error) return <p className="mx-auto mt-10">{error}</p>;

  if (!flights.length)
    return (
      <div className="mx-auto mt-10">
        <p className="text-white/75">
          {apiCallsMade > 0
            ? "No flights found for given search."
            : "Your flights will appear here."}
        </p>
      </div>
    );

  return (
    <div className="mt-10 flex flex-col items-start space-y-3">
      {tripType === "round-trip" && (
        <Button
          className="!flex !mb-10"
          onClick={() => {
            setShowFlightDirection((direction) =>
              direction === "Departing" ? "Returning" : "Departing"
            );
          }}
        >
          <span className="text-sm">
            Show{" "}
            {showFlightDirection === "Departing" ? "Returning" : "Departing"}
          </span>
        </Button>
      )}

      <div className="w-full flex  flex-col space-y-3 mb-10">
        <p className="font-bold">Top {showFlightDirection} Flights</p>
        {flights.slice(0, 3).map((flight, idx) => {
          return (
            <FlightsCard key={flight.id} flight={flight} bestDeal={idx === 0} />
          );
        })}
      </div>

      {flights.length > 3 && (
        <div className="flex flex-col space-y-3 w-full">
          <p className="font-bold">Other {showFlightDirection} Flights</p>
          {flights.slice(3).map((flight) => {
            return <FlightsCard key={flight.id} flight={flight} />;
          })}
        </div>
      )}
    </div>
  );
}

export default FlightsTable;
