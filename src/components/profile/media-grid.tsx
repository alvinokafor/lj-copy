import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Skeleton } from "moti/skeleton";
import MediaItem from "./media-item";
import { unit } from "@/constants";
import { MediaItem as MediaItemType } from "@/adapters/types/UserAdapterTypes";

const MediaGrid = ({
  isPending,
  mediaItems,
}: {
  isPending: boolean;
  mediaItems: MediaItemType[];
}) => {
  return (
    <View style={styles.scrollContainer}>
      {isPending ? (
        <Skeleton colorMode="light" width="100%" height={437} />
      ) : (
        <View
          style={[
            styles.gridContainer,
            mediaItems.length === 1 && styles.singleItem,
          ]}
        >
          {mediaItems.map((item, index) => (
            <View
              key={item._id}
              style={[
                styles.gridItem,
                mediaItems.length === 1 && styles.singleItemFullWidth,
              ]}
            >
              <MediaItem media={item} />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: unit(17),
    paddingHorizontal: unit(12),
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: unit(12),
  },
  gridItem: {
    width: unit(172),
  },
  singleItem: {
    justifyContent: "center",
  },
  singleItemFullWidth: {
    width: "100%", // Full width for a single item
  },
});

export default MediaGrid;
