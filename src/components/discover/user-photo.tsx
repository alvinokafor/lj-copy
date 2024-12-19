import React, { useRef } from "react";
import { View, Pressable, Image } from "react-native";
import { theme } from "@/constants";
import { Text } from "../partials";
import { unit } from "@/constants";

export default function UserPhoto() {
  return (
    <>
      <View
        style={{ width: unit(282), height: unit(376) }}
        className="relative"
      >
        <View className="absolute w-full h-full">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1541216970279-affbfdd55aa8?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={{ borderRadius: theme.sizes[9] }}
            className="w-full h-full"
          />

          <View
            style={{ borderRadius: theme.sizes[9] }}
            className="absolute w-full h-full bg-soft-black/40 active:bg-soft-black/60"
          ></View>
        </View>

        <View
          style={{
            paddingTop: theme.space[15],
            paddingBottom: theme.space[20],
            paddingRight: theme.space[13],
            paddingLeft: theme.space[10],
          }}
          className="flex absolute bottom-0 top-0 justify-end items-end w-full"
        >
          <View
            style={{
              gap: theme.space[11],
            }}
            className="flex-row items-center bottom-0 justify-between w-full"
          >
            <Text fontFamily="Merchant" className=" text-white" size={2}>
              I express myself calmly
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}
