import { create } from "zustand";
import axiosInstance from "../lib/axios";

const useFlightsStore = create((set) => {
  return {
    departingFlights: [],
    returningFlights: [],
    isLoading: false,
    error: "",
    tripType: "",

    getFlights: async (params) => {
      set({ isLoading: true });

      const {
        from,
        to,
        departure: departureDate,
        return: returnDate,
        adult,
        children,
        trip,
      } = params;

      set({ tripType: trip });

      try {
        const currentLocationIds = await axiosInstance.get(
          `/v1/flights/searchAirport?query=${from}`
        );

        const targetLocationIds = await axiosInstance.get(
          `v1/flights/searchAirport?query=${to}`
        );

        const currentAirportData = currentLocationIds.data.data[0]; //entityId, skyId, presentation.title
        const targetAirportData = targetLocationIds.data.data[0];

        let apiString = `/v2/flights/searchFlights?originSkyId=${currentAirportData.skyId}&destinationSkyId=${targetAirportData.skyId}&originEntityId=${currentAirportData.entityId}&destinationEntityId=${targetAirportData.entityId}&cabinClass=economy&date=${departureDate}&adults=${adult}&sortBy=best&limit=10&currency=USD&market=en-US&countryCode=US`;

        if (children > 0) apiString += `&childrens=${children}`;

        if (trip === "round-trip" && returnDate)
          apiString += `&returnDate=${returnDate}`;

        const flightsToTarget = await axiosInstance.get(apiString);

        const flightItineraries = flightsToTarget.data.data.itineraries;

        const departingFlights = flightItineraries.map((flight) => {
          return {
            id: flight.id,
            price: flight.price.raw,
            leg: flight.legs[0],
            carriers: flight.legs[0].carriers,
          };
        });

        const returningFlights = flightItineraries.map((flight) => {
          return {
            id: flight.id,
            price: flight.price.raw,
            leg: flight.legs[flight.legs.length - 1],
            carriers: flight.legs[flight.legs.length - 1].carriers,
          };
        });

        set({ departingFlights, returningFlights });

        console.log(departingFlights, returningFlights);
      } catch (error) {
        console.log("fetch flights error", error);
        set({ error: error.message });
      } finally {
        set({ isLoading: false });
      }
    },

    resetFlights: () => set({ flights: [] }),
  };
});

export default useFlightsStore;
