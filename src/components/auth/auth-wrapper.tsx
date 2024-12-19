import { Image, View } from "react-native";
import { LogoWhite } from "@/icons";
import Carousel from "react-native-reanimated-carousel";
import { useState, useCallback } from "react";
import { PAGE_HEIGHT, PAGE_WIDTH, theme } from "@/constants";
import { interpolate } from "react-native-reanimated";
import StepIndicator from "./step-indicator";
import { Flex } from "../partials";

export default function AuthWrapper({
  children,
  translateY = -10,
}: {
  children: React.ReactNode;
  translateY?: number;
}) {
  const [index, setIndex] = useState(0);

  const animationStyle = useCallback((value: number) => {
    "worklet";

    const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
    const scale = interpolate(value, [-1, 0, 1], [1.5, 1, 1.25]);
    const opacity = interpolate(value, [-0.75, 0, 1], [0, 1, 0]);

    return {
      transform: [{ scale }],
      zIndex,
      opacity,
    };
  }, []);

  const imgArray = [
    require("../../../assets/images/get-started.png"),
    require("../../../assets/images/sign-in-1.png"),
    require("../../../assets/images/sign-in-2.png"),
  ];
  return (
    <View className="relative flex-1">
      <View className="relative h-full w-full flex-1">
        <View style={{ flex: 1 }}>
          <Carousel
            loop
            width={PAGE_WIDTH}
            height={PAGE_HEIGHT}
            autoPlay={true}
            data={imgArray}
            scrollAnimationDuration={3000}
            onSnapToItem={(index) => setIndex(index)}
            customAnimation={animationStyle}
            renderItem={({ item, index }) => (
              <Flex flex={1} justify="center">
                <Image source={item} className="w-full z-10 flex-1 " />
              </Flex>
            )}
          />
        </View>
        <View
          className="absolute top-1/2 left-1/2 z-30"
          style={{
            transform: [{ translateX: -80 }, { translateY: translateY }],
          }}
        >
          <LogoWhite />
        </View>
      </View>

      <Flex className="absolute w-full bottom-0 z-30 " gap={24} align="center">
        <StepIndicator step={index} imgArray={imgArray} />
        {children}
      </Flex>
    </View>
  );
}
