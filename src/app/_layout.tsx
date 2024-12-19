import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect } from "react";
import "react-native-reanimated";
import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { AppStateStatus, Platform } from "react-native";
import { useAppState, useOnlineManager } from "@/hooks";
import { AuthContext, AuthProvider } from "@/providers/auth-provider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/utils";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  useAppState(onAppStateChange); //handles refetch on window focus
  useOnlineManager(); //handles refetch on network change

  const [loaded] = useFonts({
    "BRSonoma-Bold": require("../../assets/fonts/BRSonoma/BRSonoma-Bold.otf"),
    "BRSonoma-Regular": require("../../assets/fonts/BRSonoma/BRSonoma-Regular.otf"),
    "BRSonoma-Semibold": require("../../assets/fonts/BRSonoma/BRSonoma-Semibold.otf"),
    "BRSonoma-Light": require("../../assets/fonts/BRSonoma/BRSonoma-Light.otf"),
    "BRSonoma-Medium": require("../../assets/fonts/BRSonoma/BRSonoma-Medium.otf"),
    "BRSonoma-Thin": require("../../assets/fonts/BRSonoma/BRSonoma-Thin.otf"),
    "Merchant-Regular": require("../../assets/fonts/Merchant/Merchant-Regular.otf"),
    "Merchant-Bold": require("../../assets/fonts/Merchant/Merchant-Bold.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView>
            {/* <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}> */}
            <Slot />
          </GestureHandlerRootView>

          {/* </ThemeProvider> */}
        </QueryClientProvider>
      </AuthProvider>
      {/* @ts-ignore */}
      <Toast config={toastConfig} />
    </>
  );
}
