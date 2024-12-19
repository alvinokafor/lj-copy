import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Text } from "../partials";

const ImageGrid = ({
  images,
  onImagePress,
}: {
  images: string[];
  onImagePress?: () => void;
}) => {
  const screenWidth = Dimensions.get("window").width;
  const imageWidth = (screenWidth - 4) / 3; // 4 is total spacing between items (2 * 2px)

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity
      onPress={() => onImagePress?.()}
      style={styles.imageContainer}
    >
      <Image
        source={{ uri: item }}
        style={[styles.image, { width: imageWidth, height: imageWidth }]}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={images}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={3}
      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.row}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  row: {
    justifyContent: "flex-start",
    gap: 2,
  },
  imageContainer: {
    marginBottom: 2,
  },
  image: {
    backgroundColor: "#c9c9c9", // placeholder color while loading
  },
});

export default ImageGrid;
