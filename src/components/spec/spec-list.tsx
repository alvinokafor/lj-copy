import React, { useRef } from "react";
import { View, Dimensions, Animated, StyleSheet } from "react-native";
import { Text } from "../partials";
import SpecCard from "./spec-card";
import { unit } from "@/constants";

const specList = [
  {
    info: "Loves Dogs",
    name: "Mariam",
    age: "25",
    image:
      "https://images.unsplash.com/photo-1541216970279-affbfdd55aa8?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    info: "Loves Pizza",
    name: "Jane",
    age: "27",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    info: "Likes Poetry",
    name: "Phylis",
    age: "28",
    image:
      "https://images.unsplash.com/photo-1533435137002-455932c8538f?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    info: "Car Enthusiast",
    name: "Ann",
    age: "30",
    image:
      "https://images.unsplash.com/photo-1507152832244-10d45c7eda57?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    info: "Loves Music",
    name: "Ayo",
    age: "23",
    image:
      "https://images.unsplash.com/photo-1522512115668-c09775d6f424?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SPACING = unit(8);
const PEEK_WIDTH = unit(-10);
const ITEM_WIDTH = unit(345);

// Calculate side spacing to center the carousel
const SIDE_SPACING = (SCREEN_WIDTH - ITEM_WIDTH) / 2;

const SpecList = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={specList}
        keyExtractor={(item) => item.name}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20, // Ensure side spacing for peeks
        }}
        snapToInterval={ITEM_WIDTH + SPACING} // Snap effect
        decelerationRate={0.8}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * (ITEM_WIDTH + SPACING),
            index * (ITEM_WIDTH + SPACING),
            (index + 1) * (ITEM_WIDTH + SPACING),
          ];

          // Scale animation
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: "clamp",
          });

          // Opacity animation
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 1, 0.6],
            extrapolate: "clamp",
          });

          // Translation animation for peek effect
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [PEEK_WIDTH, 0, -PEEK_WIDTH],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={[
                styles.card,
                {
                  transform: [{ scale }, { translateX }],
                  opacity,
                },
              ]}
            >
              <SpecCard details={item} />
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: ITEM_WIDTH,
    marginHorizontal: SPACING / 2,
    borderRadius: 15,
    elevation: 3,
    height: unit(505),
  },
});

export default SpecList;
