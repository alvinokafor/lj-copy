import { View } from "react-native";
import { useRouter } from "expo-router";
import { AuthWrapper } from "@/components/auth";
import { Text, Button } from "@/components/partials";
import { theme, unit } from "@/constants";
import * as WebBrowser from "expo-web-browser";

export default function GetStarted() {
  const router = useRouter();

  const handleOpenWebView = async () => {
    await WebBrowser.openBrowserAsync("https://lovejollof.com/terms");
  };

  return (
    <AuthWrapper>
      <View
        style={{
          borderTopEndRadius: theme.space[20],
          borderTopStartRadius: theme.space[20],
          paddingTop: theme.space[23],
          paddingBottom: theme.space[58],
          paddingLeft: theme.space[24],
          paddingRight: theme.space[24],
        }}
        className={`w-full bg-white`}
      >
        <Text
          size={2}
          style={{ paddingBottom: unit(23) }}
          className="text-center"
        >
          Welcome to Love Jollof
        </Text>

        <View
          style={{
            // borderWidth: 1,
            width: "100%",
            borderColor: "#F0D7A8",
            gap: theme.space[12],
          }}
          className="flex flex-row justify-center mx-auto"
        >
          <Button
            title="Sign In"
            // flexBasis={"50%"}
            flex={1}
            onPress={() => router.push("/(auth)/sign-in")}
            backgroundColor="#F8F0EC"
            color="#422618"
            // px={4}
            style={{
              paddingLeft: theme.space[58],
              paddingRight: theme.space[58],
              minWidth: unit(166),
            }}
            // style={{ width: "50%" }}
          />

          <Button
            title="Get Started"
            // flexBasis={"50%"}
            flex={1}
            onPress={() => router.push("/(auth)/sign-up")}
            color="#fff"
            backgroundColor="#422618"
            px={16}
            weight="medium"
            style={{ minWidth: unit(166) }}
          />
        </View>

        <View style={{ paddingTop: unit(23) }} className="w-[86%] mx-auto">
          <Text weight="medium" className="text-center text-[#4F4F4A]" size={0}>
            By creating an account or using Love Jollof, you confirm that you
            have read, understood, and agree to these{" "}
            <Text
              weight="medium"
              size={0}
              className="text-coffee-500 underline"
              onPress={handleOpenWebView}
            >
              Terms and conditions
            </Text>
          </Text>
        </View>
      </View>
    </AuthWrapper>
  );
}
