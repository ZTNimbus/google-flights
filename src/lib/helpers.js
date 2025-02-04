export function formatMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0 && mins > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ${mins} min${
      mins > 1 ? "s" : ""
    }`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  } else {
    return `${mins} min${mins > 1 ? "s" : ""}`;
  }
}

export function formatDate(date) {
  const dateArray = date.split("T");

  return dateArray[1].slice(0, 5);
}
