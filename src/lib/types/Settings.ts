export type Coordinates = {
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number | null;
  longitude: number | null;
  speed: number | null;
};

export type LocationData = {
  coords: Coordinates;
  timestamp: number;
};
