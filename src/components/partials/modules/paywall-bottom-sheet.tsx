import React, { useCallback, useMemo, forwardRef } from "react";
import { View, Pressable } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { theme, unit } from "@/constants";
import { ModalCloseIcon } from "@/icons";
import { Flex, Text, Button } from "..";
import {
  SpecIllustration,
  LikesIllustration,
  FiltersIllustration,
} from "@/icons/illustrations";
import { StepIndicator } from "@/components/auth";
import Carousel from "react-native-reanimated-carousel";

const features = [
  {
    icon: <SpecIllustration />,
    title: "Spec",
    description:
      "Spec curates list of high potential matches for you based on your people based preferences.",
  },
  {
    icon: <LikesIllustration />,
    title: "Likes",
    description: "See all those who liked, superliked and sent a rose to you",
  },
  {
    icon: <FiltersIllustration />,
    title: "Advanced Filters",
    description: "Narrowing your choices with our advance filters",
  },
];

const PaywallBottomSheet = forwardRef<BottomSheetMethods>((_props, ref) => {
  const snapPoints = useMemo(() => ["90%", "90%"], []);
  const [priceSelection, setPriceSelection] = React.useState(50);
  const [duration, setDuration] = React.useState("Per Month");
  const [index, setIndex] = React.useState(0);

  // renders backdrop for bottom sheet
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        style={{ zIndex: 1000 }}
        {...props}
      />
    ),
    []
  );

  return (
    <BottomSheet
      snapPoints={snapPoints}
      ref={ref}
      backdropComponent={renderBackdrop}
      index={-1}
      style={{
        paddingHorizontal: theme.space[24],
        zIndex: 30,
      }}
      handleIndicatorStyle={{ backgroundColor: "#fff" }}
      enablePanDownToClose
    >
      <BottomSheetView>
        <View style={{ paddingBottom: theme.space[13] }}>
          {/* @ts-ignore */}
          <Pressable onPress={() => ref?.current?.close()}>
            <ModalCloseIcon />
          </Pressable>
          <View>
            <View style={{ height: 185 }}>
              <Carousel
                loop
                width={390}
                height={185}
                autoPlay={true}
                data={features}
                scrollAnimationDuration={3000}
                onSnapToItem={(index) => setIndex(index)}
                renderItem={({ item, index }) => (
                  <Flex key={index} flex={1}>
                    {item.icon}
                    <Text
                      style={{
                        paddingTop: theme.space[15],
                        paddingBottom: theme.space[12],
                      }}
                      size={4}
                      fontFamily="Merchant"
                    >
                      {item.title}
                    </Text>
                    <Text
                      size={1}
                      className="text-[#4F4F4A] text-center w-[90%]"
                    >
                      {item.description}
                    </Text>
                  </Flex>
                )}
              />
            </View>

            <View
              className="mx-auto"
              style={{ paddingBottom: theme.space[21] }}
            >
              <StepIndicator step={index} imgArray={[]} />
            </View>
          </View>

          <View
            className="bg-coffee-100"
            style={{
              paddingRight: theme.space[22],
              paddingLeft: theme.space[22],
              paddingTop: theme.space[25],
              paddingBottom: theme.space[25],
              borderRadius: theme.sizes[21],
            }}
          >
            <Text
              size={3}
              weight="semibold"
              className="text-center text-[#4F4F4A]"
            >
              Upgrade to Enjoy Love Jollof Plus
            </Text>

            <View className="mx-auto mt-8">
              <Flex className="w-full mx-auto" direction="row" gap={9}>
                <PriceCard
                  isPopular
                  amount={50}
                  duration="Per Month"
                  setPriceSelection={setPriceSelection}
                  priceSelection={priceSelection}
                  setDuration={setDuration}
                />
                <PriceCard
                  isPopular={false}
                  amount={550}
                  duration="For One Year"
                  savingsPercentage={20}
                  setPriceSelection={setPriceSelection}
                  priceSelection={priceSelection}
                  setDuration={setDuration}
                />
              </Flex>
              <Flex className="w-full mx-auto" direction="row" gap={9} pt={9}>
                <PriceCard
                  isPopular={false}
                  amount={150}
                  duration="For 3 Months"
                  savingsPercentage={20}
                  setPriceSelection={setPriceSelection}
                  priceSelection={priceSelection}
                  setDuration={setDuration}
                />
                <PriceCard
                  isPopular={false}
                  amount={250}
                  duration="For 6 Months"
                  savingsPercentage={5}
                  setPriceSelection={setPriceSelection}
                  priceSelection={priceSelection}
                  setDuration={setDuration}
                />
              </Flex>
            </View>
          </View>
          <Button
            title={`Upgrade for $${priceSelection} ${duration}`}
            weight="semibold"
            style={{ marginTop: unit(27) }}
          />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
});

function PriceCard({
  amount,
  isPopular = false,
  duration,
  savingsPercentage,
  setPriceSelection,
  setDuration,
  priceSelection,
}: {
  amount: number;
  isPopular?: boolean;
  duration: string;
  savingsPercentage?: number;
  setPriceSelection: React.Dispatch<React.SetStateAction<number>>;
  priceSelection: number;
  setDuration: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Pressable
      style={{ width: "50%" }}
      className="relative"
      onPress={() => {
        setPriceSelection(amount);
        setDuration(duration);
      }}
    >
      <View
        style={{
          backgroundColor: priceSelection === amount ? "#F0D7A8" : "#fff",
          borderRadius: theme.sizes[14],
          paddingBottom: unit(39),
          paddingTop: unit(39),
          paddingHorizontal: unit(24),
          maxHeight: unit(141),
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Text
          fontFamily="Merchant"
          className={`${
            priceSelection === amount ? "text-coffee-500" : "text-soft-black"
          } text-center`}
          size={6}
          style={{ paddingBottom: theme.space[9] }}
        >
          ${amount}
        </Text>
        <Text
          className={`${
            priceSelection === amount ? "text-coffee-500" : "text-soft-black"
          } text-center`}
          weight="medium"
          style={{ paddingBottom: theme.space[9] }}
        >
          {duration}
        </Text>

        {savingsPercentage && (
          <View
            className="bg-[#E6E6E5]"
            style={{
              paddingHorizontal: theme.space[10],
              paddingVertical: theme.space[4],
              borderRadius: theme.space[22],
            }}
          >
            <Text
              size={0}
              weight="medium"
              className="text-center text-soft-block"
            >
              Save {savingsPercentage}%
            </Text>
          </View>
        )}
      </View>
      {isPopular && (
        <View
          className="bg-soft-black absolute"
          style={{
            paddingHorizontal: theme.space[12],
            paddingVertical: theme.space[3],
            borderRadius: theme.space[22],
            top: -10, // Adjust this value to move the badge up/down
            left: "50%", // Center horizontally
            transform: [{ translateX: -54 }],
          }}
        >
          <Text size={0} weight="semibold" className="text-center text-white">
            Most Popular
          </Text>
        </View>
      )}
    </Pressable>
  );
}

export default PaywallBottomSheet;
