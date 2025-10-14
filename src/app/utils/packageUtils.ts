export const getChipColor = (mode: "hybrid" | "offline" | "online") => {
  switch (mode) {
    case "offline":
      return "pink";
    case "online":
      return "cyan";
    case "hybrid":
      return "blue-1000";
    default:
      return "black";
  }
};
