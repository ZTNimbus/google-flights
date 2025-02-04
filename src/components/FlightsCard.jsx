import { formatDate, formatMinutes } from "../lib/helpers";
import useFlightsStore from "../store/useFlightsStore";

function FlightsCard({ flight, bestDeal = false }) {
  const { tripType } = useFlightsStore();

  const price = flight.price;

  const departureFlight = flight.leg;

  const stopCountsOnDepature = departureFlight.stopCount;

  const departureDuration = departureFlight.durationInMinutes;

  const departureLiftoffDate = departureFlight.departure;
  const departureArrivalDate = departureFlight.arrival;

  const departureCarrier = departureFlight.carriers.marketing[0];

  return (
    <div className="w-full flex py-3 px-5 items-center gap-5 border justify-between border-white/50 rounded-lg">
      {/*Left Side*/}
      <div className="flex items-center gap-4 min-w-[100px] lg:min-w-[200px]">
        <img
          src={departureCarrier.logoUrl}
          alt={departureCarrier.name}
          className="size-7"
        />
        <div className="flex gap-1 flex-col">
          <span className="font-semibold">
            {formatDate(departureLiftoffDate)} -{" "}
            {formatDate(departureArrivalDate)}
          </span>

          <span>{departureCarrier.name}</span>
        </div>
      </div>

      {/*Center*/}
      <div className="flex flex-col w-full max-w-[200px]">
        <span>{formatMinutes(departureDuration)}</span>

        <span className="text-xs text-white/50 truncate">
          {departureFlight.origin.displayCode} -{" "}
          {departureFlight.destination.displayCode}
        </span>
      </div>

      <div>
        <span className="text-sm font-semibold">
          {!stopCountsOnDepature
            ? "Nonstop"
            : `${stopCountsOnDepature} Stop(s)`}
        </span>
      </div>

      {/*Right Side*/}

      <div className="flex flex-col gap-1 items-center">
        <span
          className={`${
            bestDeal && "text-green-300/85 "
          } antialiased font-semibold`}
        >
          $
          {tripType === "round-trip"
            ? (price / 2).toFixed(0)
            : price.toFixed(0)}
        </span>
        <span className="text-white/50">{tripType}</span>
      </div>
    </div>
  );
}

export default FlightsCard;
