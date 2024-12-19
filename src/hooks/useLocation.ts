// import { useState, useEffect } from "react";
// import * as Location from "expo-location";
// import { Alert, Platform } from "react-native";

// export const useLocationPermissions = () => {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [permissionStatus, setPermissionStatus] = useState(null);

//   const requestLocationPermissions = async () => {
//     try {
//       // First, request foreground permissions

//       let { status } = await Location.requestForegroundPermissionsAsync();
//       setPermissionStatus(status);

//       if (status !== "granted") {
//         setErrorMsg("Permission to access location was denied");

//         // Show alert to explain why location is needed
//         Alert.alert(
//           "Location Access Required",
//           "This app needs access to location to provide you with accurate services. Please enable location access in your device settings.",
//           [
//             {
//               text: "Open Settings",
//               onPress: () => Platform.OS === "ios" && Location.openSettings(),
//             },
//             {
//               text: "Cancel",
//               style: "cancel",
//             },
//           ]
//         );
//         return;
//       }

//       // Get current location once permission is granted
//       const currentLocation = await Location.getCurrentPositionAsync({
//         accuracy: Location.Accuracy.Balanced,
//       });

//       setLocation(currentLocation);
//       setErrorMsg(null);
//     } catch (err) {
//       setErrorMsg("Error getting location: " + err.message);
//       console.error("Error:", err);
//     }
//   };

//   // Check initial permissions on component mount
//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.getForegroundPermissionsAsync();
//       setPermissionStatus(status);
//     })();
//   }, []);

//   return {
//     location,
//     errorMsg,
//     permissionStatus,
//     requestLocationPermissions,
//   };
// };
