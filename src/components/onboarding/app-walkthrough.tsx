import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, Flex } from "../partials";
import { DismissIcon } from "@/icons";
import { unit, PAGE_WIDTH } from "@/constants";

const TUTORIAL_STEPS = [
  {
    id: "discover",
    title: "Discover",
    message: "See possible potentials for you ",
    position: { x: unit(25), y: unit(620) },
  },
  {
    id: "spec",
    title: "Spec",
    message: "See possible potentials for you.",
    position: { x: unit(110), y: unit(620) },
  },
  {
    id: "likes",
    title: "Likes",
    message: "Find all your favorites here.",
    position: { x: unit(100), y: unit(620) },
  },
  {
    id: "chat",
    title: "Chat",
    message: "Chat with others here.",
    position: { x: unit(100), y: unit(620) },
  },

  {
    id: "profile",
    title: "Profile",
    message: "Manage your profile in this section.",
    position: { x: unit(120), y: unit(620) },
  },
  {
    id: "swipe-right",
    title: "Swipe Right",
    message: "",
    position: { x: PAGE_WIDTH / 2 - 125, y: 250 },
    type: "swipe",
    direction: "right",
  },
  {
    id: "swipe-left",
    title: "Swipe left",
    message: "",
    position: { x: PAGE_WIDTH / 2 - 125, y: 250 },
    type: "swipe",
    direction: "left",
  },
];

const AppWalkthrough = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const fadeAnim = new Animated.Value(0);
  const translateY = new Animated.Value(20);

  useEffect(() => {
    checkFirstTime();
  }, []);

  useEffect(() => {
    if (isVisible) {
      animateIn();
    }
  }, [currentStep, isVisible]);

  const checkFirstTime = async () => {
    try {
      const hasSeenTutorial = await AsyncStorage.getItem("hasSeenTutorial");
      console.log("seen", hasSeenTutorial);
      if (hasSeenTutorial === "false" || hasSeenTutorial === null) {
        setIsVisible(true);
      }
    } catch (error) {
      console.error("Error checking tutorial status:", error);
    }
  };

  const animateIn = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      fadeAnim.setValue(0);
      translateY.setValue(20);
      setCurrentStep(currentStep + 1);
    } else {
      completeTutorial();
    }
  };

  const completeTutorial = async () => {
    try {
      await AsyncStorage.setItem("hasSeenTutorial", "true");
      setIsVisible(false);
      if (onComplete) onComplete();
    } catch (error) {
      console.error("Error saving tutorial status:", error);
    }
  };

  if (!isVisible) return null;

  const currentTutorialStep = TUTORIAL_STEPS[currentStep];

  return (
    <View style={styles.container}>
      <View style={styles.overlay} />

      <Animated.View
        style={[
          styles.bubbleContainer,
          {
            left: currentTutorialStep.position.x,
            top: currentTutorialStep.position.y,
            opacity: fadeAnim,
            transform: [{ translateY }],
          },
        ]}
      >
        {currentTutorialStep.type === "swipe" ? (
          <View style={styles.swipeTutorialContainer}>
            <ProfileCard
              handleNext={handleNext}
              direction={currentTutorialStep.direction as "left" | "right"}
            />
          </View>
        ) : (
          <View style={styles.bubble}>
            <Flex
              alignContent="center"
              mb={8}
              direction="row"
              justify="space-between"
            >
              <Text size={1} weight="bold">
                {currentTutorialStep.title}
              </Text>

              <Pressable onPress={completeTutorial}>
                <DismissIcon />
              </Pressable>
            </Flex>
            <Text style={styles.message}>{currentTutorialStep.message}</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.primaryButton]}
                onPress={handleNext}
              >
                <Text
                  weight="bold"
                  style={[styles.buttonText, styles.primaryButtonText]}
                >
                  {currentStep === TUTORIAL_STEPS.length - 1
                    ? "Finish"
                    : "Next"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View
          style={{
            width: 0,
            height: 0,
            backgroundColor: "transparent",
            borderStyle: "solid",
            borderLeftWidth: 6,
            borderRightWidth: 6,
            borderTopWidth: 10,
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
            borderTopColor: "#FBF5E9",
            transform:
              currentTutorialStep.id === "likes"
                ? [{ translateY: -1 }, { translateX: -20 }]
                : currentTutorialStep.id === "chat"
                ? [{ translateY: -1 }, { translateX: 60 }]
                : currentTutorialStep.id === "profile"
                ? [{ translateY: -1 }, { translateX: 110 }]
                : [{ translateY: -1 }, { translateX: -110 }],
          }}
        />
      </Animated.View>
    </View>
  );
};

const ProfileCard = ({
  direction,
  handleNext,
}: {
  direction: "left" | "right";
  handleNext: () => void;
}) => {
  return (
    <View
      style={{
        height: unit(522),
        borderRadius: 20,
        marginBottom: 20,
        overflow: "hidden",
        shadowColor: "#000",
        elevation: 8,
        left: direction === "left" ? -240 : 0,
      }}
    >
      {direction === "right" ? (
        <Pressable onPress={handleNext}>
          <Image
            source={require("../../../assets/images/swipe-right-tutorial.png")}
          />
        </Pressable>
      ) : (
        <Pressable onPress={handleNext}>
          <Image
            source={require("../../../assets/images/swipe-left-tutorial.png")}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  bubbleContainer: {
    position: "absolute",
    alignItems: "center",
  },
  bubble: {
    backgroundColor: "#FBF5E9",
    borderRadius: 8,
    padding: 16,
    width: unit(250),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  arrow: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#FBF5E9",
    transform: [{ translateY: -1 }, { translateX: -110 }],
  },

  message: {
    fontSize: 13,
    color: "#666",
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 12,
  },

  primaryButton: {
    backgroundColor: "",
    alignItems: "flex-end",
  },
  buttonText: {
    color: "#422618",
  },
  primaryButtonText: {
    color: "#422618",
  },
  swipeTutorialContainer: {
    alignItems: "center",
  },
  cardContainer: {
    height: unit(522),
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    elevation: 8,
    left: -240,
  },
});

export default AppWalkthrough;
