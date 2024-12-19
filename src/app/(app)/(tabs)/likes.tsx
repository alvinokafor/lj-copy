import { theme } from "@/constants";
import {
  Animated,
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  UIManager,
  View,
} from "react-native";
import { Flex, Text } from "@/components/partials";
import {
  LikesActionIcon,
  RosesActionIcon,
  SuperLikesActionIcon,
} from "@/icons";
import React from "react";
import { LikesCard, InteractionCard } from "@/components/likes";
import {
  RoseCardIcon,
  SuperlikeCardIcon,
  LikesEmptyIcon,
  SuperlikesEmptyIcon,
  RosesEmptyIcon,
  SelectedLikesTabIcon,
  SelectedSuperlikesTabIcon,
  SelectedRosesTabIcon,
} from "@/components/likes/icons";
import { EmptyState } from "@/components/partials/modules";

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

// Enable LayoutAnimation for Android
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function LikesScreen() {
  const [currentTab, setCurrentTab] = React.useState("Likes");

  const tabs = [
    {
      icon: <LikesActionIcon />,
      selectedIcon: <SelectedLikesTabIcon />,
      title: "Likes",
      count: 2,
    },
    {
      icon: <SuperLikesActionIcon />,
      selectedIcon: <SelectedSuperlikesTabIcon />,
      title: "Superlikes",
      count: 2,
    },
    {
      icon: <RosesActionIcon />,
      selectedIcon: <SelectedRosesTabIcon />,
      title: "Roses",
      count: 2,
    },
  ];

  return (
    <View
      style={{
        paddingHorizontal: theme.space[14],
        marginTop: theme.space[80],
      }}
    >
      <View style={{ paddingBottom: theme.space[8] }}>
        <Text size={5} weight="regular" fontFamily="Merchant">
          Likes
        </Text>

        <Flex gap={11} direction="row" align="center" pt={20}>
          {tabs.map((tab) => (
            <AnimatedTab
              key={tab.title}
              icon={tab.icon}
              title={tab.title}
              count={tab.count}
              isSelected={currentTab === tab.title}
              selectedIcon={tab.selectedIcon}
              onPress={() => setCurrentTab(tab.title)}
              borderColor={currentTab === tab.title ? "#1E1E1C" : "#e6e6e5"}
            />
          ))}
        </Flex>
      </View>

      <ScrollView>
        {currentTab === "Likes" &&
          (specList.length !== 0 ? (
            <EmptyState
              title="Likes"
              description="See all those who liked, superliked and sent a rose to you"
              icon={<LikesEmptyIcon />}
            />
          ) : (
            <ScrollView
              contentContainerStyle={{
                display: "flex",
                flexDirection: "row",
                gap: theme.space[17],
                marginTop: theme.space[22],
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {specList.map((item, index) => (
                <LikesCard key={index} details={item} />
              ))}
            </ScrollView>
          ))}

        {currentTab === "Superlikes" &&
          (specList.length !== 0 ? (
            <EmptyState
              title="Superlikes"
              description="See all those who liked, superliked and sent a rose to you"
              icon={<SuperlikesEmptyIcon />}
            />
          ) : (
            <ScrollView
              contentContainerStyle={{
                display: "flex",
                gap: theme.space[17],
                marginTop: theme.space[22],
              }}
              showsVerticalScrollIndicator={false}
            >
              {specList.map((item, index) => (
                <InteractionCard
                  key={index}
                  details={item}
                  title="Superliked you"
                  headerIcon={<SuperlikeCardIcon />}
                  backgroundColor="#E7EEDD"
                  expandTriggerColor="#506534"
                  matchedIconColor="#CFDDBD"
                />
              ))}
            </ScrollView>
          ))}

        {currentTab === "Roses" &&
          (specList.length === 0 ? (
            <EmptyState
              title="Roses"
              description="See all those who liked, superliked and sent a rose to you"
              icon={<RosesEmptyIcon />}
            />
          ) : (
            <ScrollView
              contentContainerStyle={{
                display: "flex",
                gap: theme.space[17],
                marginTop: theme.space[22],
              }}
              showsVerticalScrollIndicator={false}
            >
              {specList.map((item, index) => (
                <InteractionCard
                  key={index}
                  details={item}
                  title="Sent you a rose"
                  headerIcon={<RoseCardIcon />}
                  backgroundColor="#FFE7E5"
                  expandTriggerColor="#1A1A19"
                  matchedIconColor="#FFCFCC"
                />
              ))}
            </ScrollView>
          ))}
      </ScrollView>
    </View>
  );
}

const AnimatedTab = ({
  icon,
  title,
  count,
  isSelected,
  onPress,
  borderColor,
  selectedIcon,
}: {
  icon: React.ReactNode;
  selectedIcon: React.ReactNode;
  title: string;
  count: number;
  isSelected: boolean;
  onPress: () => void;
  borderColor: string;
}) => {
  // Animation value for text opacity
  const titleOpacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Configure spring animation
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        200,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.scaleXY
      )
    );

    // Animate text opacity
    Animated.timing(titleOpacity, {
      toValue: isSelected ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isSelected]);

  return (
    <Pressable style={[styles.actionButton, { borderColor }]} onPress={onPress}>
      <Flex align="center" gap={4} direction="row">
        {isSelected ? selectedIcon : icon}
        {isSelected && (
          <Animated.View style={{ opacity: titleOpacity }}>
            <Text weight="medium" size={1}>
              {title}
            </Text>
          </Animated.View>
        )}
      </Flex>
      <Text weight="medium" size={1}>
        {count}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    borderRadius: 50,
    borderWidth: 1,
    padding: theme.space[8],
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: theme.space[10],
  },
});
