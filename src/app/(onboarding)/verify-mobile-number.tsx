import { theme } from "@/constants";
import React, { useState } from "react";
import { View } from "react-native";
import { ScreenContainer, Button } from "@/components/partials";
import { DropdownIcon } from "@/icons";
import { useRouter } from "expo-router";
import PhoneInput, { ICountry } from "react-native-international-phone-number";
import { useOnboardingStore } from "@/stores";

export default function VerifyMobileNumber() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<null | ICountry>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const updateOnboardingData = useOnboardingStore(
    (state) => state.updateOnboardingData
  );

  const handleSetPhoneNumber = async () => {
    try {
      updateOnboardingData<string>(
        "phoneNumber",
        `${selectedCountry?.callingCode}${inputValue.split(" ").join("")}`
      );
      updateOnboardingData<string | undefined>(
        "countryCode",
        selectedCountry?.cca2
      );
      router.navigate("/(onboarding)/verify-otp");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <ScreenContainer>
        <View
          style={{ display: "flex", justifyContent: "space-between", flex: 1 }}
        >
          <View>
            <PhoneInput
              value={inputValue}
              onChangePhoneNumber={(phoneNumber) => setInputValue(phoneNumber)}
              selectedCountry={selectedCountry}
              onChangeSelectedCountry={(country) => setSelectedCountry(country)}
              customCaret={<DropdownIcon />}
              showOnly={["CA", "GB", "NG"]}
              defaultCountry="CA"
              phoneInputStyles={{
                container: {
                  backgroundColor: "#fff",
                  borderStyle: "solid",
                  borderWidth: 0,
                  borderRadius: 0,
                  display: "flex",
                  flexDirection: "row",
                  gap: theme.space[17],
                  position: "relative",
                },
                flagContainer: {
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  backgroundColor: "#fff",
                  borderBottomWidth: theme.space[1],
                  borderBottomColor: "#CECECA",
                  paddingBottom: 0,
                },
                flag: {
                  paddingHorizontal: 0,
                  marginLeft: -theme.space[16],
                },
                caret: {
                  color: "#F3F3F3",
                  fontSize: theme.fontSize[2],
                },
                divider: {
                  backgroundColor: "#fff",
                },
                callingCode: {
                  fontSize: theme.fontSize[2],
                  fontWeight: "bold",
                  color: "#000",
                  fontFamily: "BRSonoma-Bold",
                  marginLeft: -theme.space[20],
                },
                input: {
                  color: "#000",
                  fontFamily: "BRSonoma-Medium",
                  borderBottomWidth: 1,
                  borderBottomColor: "#CECECA",
                  fontSize: theme.fontSize[2],
                  paddingBottom: 12,
                  alignSelf: "flex-end",
                },
              }}
              modalStyles={{
                modal: {
                  backgroundColor: "#fff",
                  borderWidth: 1,
                },
                backdrop: {},
                divider: {
                  backgroundColor: "transparent",
                },
                countriesList: {},
                searchInput: {
                  borderRadius: theme.sizes[8],
                  borderBottomWidth: theme.sizes[1],
                  borderColor: "#F3F3F3",
                  color: "#000",
                  backgroundColor: "#fff",
                  paddingHorizontal: theme.space[12],
                  height: 46,
                  fontFamily: "BRSonoma-Regular",
                },
                countryButton: {
                  borderWidth: theme.sizes[1],
                  borderColor: "#F3F3F3",
                  backgroundColor: "#fff",
                  marginVertical: theme.space[4],
                  paddingVertical: 0,
                  borderBottomWidth: theme.sizes[1],
                },
                noCountryText: {},
                noCountryContainer: {},
                flag: {
                  color: "#FFFFFF",
                  fontSize: theme.sizes[20],
                },
                callingCode: {
                  color: "#000",
                  fontFamily: "BRSonoma-Regular",
                },
                countryName: {
                  color: "#000",
                  fontFamily: "BRSonoma-Regular",
                },
              }}
            />
          </View>
        </View>
      </ScreenContainer>

      <View style={{ margin: theme.space[16] }}>
        <Button
          title="Continue"
          onPress={() => {
            handleSetPhoneNumber();
          }}
          style={
            inputValue.length < 10
              ? theme.actionStateStyles.buttonDisabled
              : theme.actionStateStyles.buttonEnabledCoffee500
          }
          titleStyle={
            inputValue.length < 10
              ? theme.actionStateStyles.buttonTextDisabled
              : theme.actionStateStyles.buttonTextEnabled
          }
          className="absolute bottom-3 w-full"
        />
      </View>
    </>
  );
}
