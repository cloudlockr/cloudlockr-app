import Geolocation from "react-native-geolocation-service";

export default async () => {
  // Get the location object
  const location = await new Promise((resolve, reject) =>
    Geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
  ).catch((err) => {
    throw err;
  });

  // Format the location as a single string and the precision (~40-100m accuracy)
  const formattedLoc =
    location.coords.latitude.toFixed(3) +
    "|" +
    location.coords.longitude.toFixed(3) +
    "|" +
    location.coords.altitude.toFixed(3);

  return formattedLoc;
};
