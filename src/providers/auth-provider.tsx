import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { User } from "@/lib/types/User";
import { useRouter, useSegments, usePathname } from "expo-router";
import { clearData, getData, storeData } from "@/utils/data-store";

interface IAuthProvider {
  children: React.ReactNode;
}

export interface IAuthContext {
  user: User | null;
  token: string | null;
  isUserAuthenticated: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
  setToken: Dispatch<SetStateAction<string | null>>;
}

const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider = ({ children }: IAuthProvider) => {
  const segments = useSegments();
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const [storedToken, onboardingStatus] = await Promise.all([
          getData("accessToken"),
          getData("hasCompletedOnboarding"),
        ]);

        if (storedToken) {
          console.log(storedToken);
          setToken(storedToken);
          setIsUserAuthenticated(true);
          setHasCompletedOnboarding(onboardingStatus === "true");
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [segments, token]);

  // Handle routing based on auth state
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inAppGroup = segments[0] === "(app)";
    const inOnboardingGroup = segments[0] === "(onboarding)";

    const redirectUser = async () => {
      if (!isUserAuthenticated) {
        // If user is not authenticated and not in auth group, redirect to sign in
        if (!inOnboardingGroup && !inAuthGroup) {
          await clearData("accessToken");
          await clearData("hasCompletedOnboarding");
          await storeData("hasSeenTutorial", "false");
          setToken(null);
          router.replace("/(auth)/sign-in");
        }
      } else {
        // User is authenticated

        console.log(isUserAuthenticated, token);

        if (pathname.includes("/sign-in")) {
          // Check onboarding status when coming from auth group
          const onboardingStatus = await getData("hasCompletedOnboarding");
          if (onboardingStatus === null) {
            await storeData("hasCompletedOnboarding", "true");
            router.replace("/");
            return;
          }
        }
        if (pathname.includes("/sign-up")) {
          // Don't redirect during signup process
          return;
        }

        if (!hasCompletedOnboarding && !inOnboardingGroup) {
          // If onboarding is not completed, redirect to onboarding
          router.replace("/(onboarding)/verify-mobile-number");
        } else if (hasCompletedOnboarding && !inAppGroup) {
          // If onboarding is completed and not in app, redirect to home
          router.replace("/");
        }
      }
    };

    redirectUser();
  }, [
    isLoading,
    isUserAuthenticated,
    hasCompletedOnboarding,
    segments,
    router,
    token,
  ]);

  if (isLoading) {
    return null;
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        isUserAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
