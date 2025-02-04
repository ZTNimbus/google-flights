import { Autocomplete, TextField } from "@mui/material";
import { Search } from "lucide-react";
import {
  MAX_ADULTS,
  MAX_CHILDREN,
  MIN_ADULTS,
  MIN_CHILDREN,
  POPULAR_LOCATIONS,
} from "../constants";
import { useSearchParams } from "react-router-dom";
import useFlightsStore from "../store/useFlightsStore";
import { useEffect } from "react";

function SearchBox() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getFlights, isLoading } = useFlightsStore();

  const tripType = searchParams.get("trip");

  function handleAddSearchParams(key, value) {
    if (!searchParams.get("trip"))
      setSearchParams((s) => {
        s.set("trip", "round-trip");
        return s;
      });
    if (!searchParams.get("adult"))
      setSearchParams((s) => {
        s.set("adult", MIN_ADULTS);
        return s;
      });
    if (!searchParams.get("children"))
      setSearchParams((s) => {
        s.set("children", MIN_CHILDREN);
        return s;
      });

    if (!value) {
      return setSearchParams((s) => {
        s.delete(key);
        return s;
      });
    }

    setSearchParams((s) => {
      s.set(key, value || "");
      return s;
    });
  }

  function handleSearchFlights() {
    const paramsObject = Object.fromEntries(searchParams.entries());
    const {
      from,
      to,
      departure: departureDate,
      return: returnDate,
      adult,
      children,
      trip,
    } = paramsObject;

    const departureDateToDate = new Date(departureDate);
    const returnDateToDate = new Date(returnDate);
    const now = new Date();

    if (!from || !to || !departureDate)
      return alert("All fields are required.");

    if (trip === "round-trip" && !returnDate)
      return alert("A return date is required for round trips.");

    if (returnDateToDate <= departureDateToDate)
      return alert("Return date cannot be before departure date.");

    if (+adult > +MAX_ADULTS || +adult < +MIN_ADULTS)
      return alert("Invalid adults count.");

    if (+children > +MAX_CHILDREN || +children < +MIN_CHILDREN)
      return alert("Invalid childrens count.");

    if (departureDateToDate < now)
      return alert("Departure dates must be at least 1 day after.");

    getFlights(paramsObject);
  }

  useEffect(() => {}, []);

  return (
    <div className="flex flex-col py-4 px-5 gap-5 rounded-lg shadow-lg space-x-20 lg:bg-[#36373b] mx-auto w-full relative">
      <div className="flex gap-10 w-full">
        <select
          name="trip"
          id="trip"
          className="bg-[#202125] lg:bg-[#36373b] text-white/50"
          value={searchParams.get("trip") || "round-trip"}
          onChange={(e) => handleAddSearchParams("trip", e.target.value)}
        >
          <option value={"round-trip"}>Round Trip</option>
          <option value={"one-way"}>One Way</option>
        </select>

        <div className="flex flex-col justify-between">
          <label htmlFor="adultCount" className="text-sm mb-1 text-white/50">
            Adult Count
          </label>
          <input
            type="number"
            name="adultCount"
            value={searchParams.get("adult") || MIN_ADULTS}
            onChange={(e) => handleAddSearchParams("adult", e.target.value)}
            min={MIN_ADULTS}
            max={MAX_ADULTS}
            className="min-w-[50px] max-w-[250px] grow w-full p-1 border border-white/50 rounded-sm px-2"
          />
        </div>

        <div className="flex flex-col justify-between">
          <label htmlFor="childrenCount" className="text-sm mb-1 text-white/50">
            Children Count
          </label>
          <input
            type="number"
            name="childrenCount"
            value={searchParams.get("children") || MIN_CHILDREN}
            onChange={(e) => handleAddSearchParams("children", e.target.value)}
            min={MIN_CHILDREN}
            max={MAX_CHILDREN}
            className="min-w-[50px] grow w-full p-1 border border-white/50 rounded-sm px-2"
          />
        </div>
      </div>

      <div className="flex flex-col xl:flex-row mb-10 gap-3 justify-between">
        <div className="flex gap-3 w-full">
          <Autocomplete
            disablePortal
            options={POPULAR_LOCATIONS}
            id="from"
            value={searchParams.get("from")}
            onChange={(_, newValue) => {
              handleAddSearchParams("from", newValue);
            }}
            renderInput={(params) => {
              return <TextField {...params} label="From?" />;
            }}
            className="!border !border-white/50 !lg:max-w-[300px] !rounded-sm !w-full !p-0"
          />

          <Autocomplete
            disablePortal
            options={POPULAR_LOCATIONS}
            id="to"
            value={searchParams.get("to")}
            onChange={(_, newValue) => {
              handleAddSearchParams("to", newValue);
            }}
            renderInput={(params) => {
              return <TextField {...params} label="To?" />;
            }}
            className="!border !border-white/50 !lg:max-w-[300px] !rounded-sm !w-full !p-0"
          />
        </div>

        <div className="px-5 py-2 rounded-lg w-full border gap-5 flex justify-between">
          <input
            type="date"
            name="departure"
            className="w-full"
            value={searchParams.get("departure") || ""}
            onChange={(e) => handleAddSearchParams("departure", e.target.value)}
          />
          {tripType === "round-trip" && (
            <input
              type="date"
              name="return"
              className="w-full"
              value={searchParams.get("return") || ""}
              onChange={(e) => handleAddSearchParams("return", e.target.value)}
            />
          )}
        </div>

        <button
          disabled={isLoading}
          className="flex items-center gap-1 absolute bottom-[-10%] left-1/2 -translate-x-1/2 rounded-full bg-blue-400 py-3 px-6 text-zinc-900 cursor-pointer"
          onClick={handleSearchFlights}
        >
          <Search size={20} />
          <span>Explore</span>
        </button>
      </div>
    </div>
  );
}

export default SearchBox;
