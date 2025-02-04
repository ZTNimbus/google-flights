function FlightsHero() {
  return (
    <div className="flex flex-col gap-0 items-center w-full">
      <img
        src="https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_dark_theme_4.svg"
        alt="google flights image"
        className="object-fill"
      />

      <h1 className="text-3xl md:text-6xl antialiased lg:mt-[-5rem] tracking-tight">
        Flights
      </h1>
    </div>
  );
}

export default FlightsHero;
