import { ImageGrid } from "@/components/chat";
import { Text } from "@/components/partials";
import { theme, unit } from "@/constants";
import { BackIcon } from "@/icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";

const unsplashImages = [
  "https://source.unsplash.com/random/800x800?nature,1",
  "https://source.unsplash.com/random/800x800?landscape,1",
  "https://source.unsplash.com/random/800x800?city,1",
  "https://source.unsplash.com/random/800x800?architecture,1",
  "https://source.unsplash.com/random/800x800?food,1",
  "https://source.unsplash.com/random/800x800?travel,1",
  "https://source.unsplash.com/random/800x800?animal,1",
  "https://source.unsplash.com/random/800x800?people,1",
  "https://source.unsplash.com/random/800x800?technology,1",
  "https://source.unsplash.com/random/800x800?business,1",
  "https://source.unsplash.com/random/800x800?interior,1",
  "https://source.unsplash.com/random/800x800?fashion,1",
  "https://source.unsplash.com/random/800x800?sports,1",
  "https://source.unsplash.com/random/800x800?health,1",
  "https://source.unsplash.com/random/800x800?education,1",
  "https://source.unsplash.com/random/800x800?music,1",
  "https://source.unsplash.com/random/800x800?art,1",
  "https://source.unsplash.com/random/800x800?space,1",
];

export default function ChatMedia() {
  const router = useRouter();
  return (
    <>
      <View
        style={{
          paddingHorizontal: theme.space[14],
          marginTop: theme.space[80],
        }}
      >
        <View
          style={{
            paddingBottom: theme.space[8],
            display: "flex",
            alignContent: "center",
            flexDirection: "row",
            gap: theme.space[8],
          }}
        >
          <Pressable onPress={() => router.back()}>
            <BackIcon />
          </Pressable>

          <Text size={5} weight="regular" fontFamily="Merchant">
            Media
          </Text>
        </View>
      </View>

      <View style={{ paddingTop: unit(33) }}>
        <Text
          style={{ paddingHorizontal: unit(24), paddingBottom: unit(15) }}
          className="text-[#353531]"
        >
          November 2024
        </Text>

        <ImageGrid images={unsplashImages} />
      </View>
    </>
  );
}
