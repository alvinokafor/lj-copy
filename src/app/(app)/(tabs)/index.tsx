import { theme, PAGE_HEIGHT, unit } from "@/constants";
import { ScrollView, View, StyleSheet, Pressable, Alert } from "react-native";
import { Text } from "@/components/partials";
import {
  OptionsMenu,
  DiscoverCard,
  RangeFilterModal,
  AdvancedFiltersModal,
  FilterMultiselectModal,
  HeightFilterModal,
} from "@/components/discover";
import { Swiper, type SwiperCardRefType } from "rn-swiper-list";
import { useRef, useCallback, useState, useEffect } from "react";
import { AppWalkthrough } from "@/components/onboarding";
import {
  BottomSheetMethods,
  BottomSheetModalMethods,
} from "@gorhom/bottom-sheet/lib/typescript/types";
import {
  useMatchingQuery,
  MatchingAdapter,
  useMatchingMutation,
} from "@/adapters/MatchingAdapter";
import { UserProfile } from "@/adapters/types/MatchingAdapterTypes";
import {
  DislikeSwipeOverlayIcon,
  LikeSwipeOverlayIcon,
} from "@/components/discover/icons";
import {
  africanLanguages,
  childrenPreference,
  educationLevels,
  ethnicBackgrounds,
  religionPreference,
  starSigns,
} from "@/utils/static";
import { FilterKeys } from "@/lib/types/Stores";
import { useAdvancedFiltersStore } from "@/stores";
import * as Location from "expo-location";
import { UserAdapter, useUserMutation } from "@/adapters/UserAdapter";
import { type Coordinates } from "@/lib/types/Settings";

export default function HomeScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [distanceRange, setDistanceRange] = useState<number[]>([0, 300]);
  const [ageRange, setAgeRange] = useState<number[]>([18, 80]);
  const matchFilters = useAdvancedFiltersStore();

  const ref = useRef<SwiperCardRefType>();
  const paywallRef = useRef<BottomSheetMethods>(null);
  const distanceFilterRef = useRef<BottomSheetModalMethods>(null);
  const ageFilterRef = useRef<BottomSheetModalMethods>(null);
  const advancedFiltersRef = useRef<BottomSheetModalMethods>(null);

  const astrologicalSignRef = useRef<BottomSheetModalMethods>(null);
  const educationLevelRef = useRef<BottomSheetModalMethods>(null);
  const childrenPreferenceRef = useRef<BottomSheetModalMethods>(null);
  const religionPreferenceRef = useRef<BottomSheetModalMethods>(null);
  const languagePreferenceRef = useRef<BottomSheetModalMethods>(null);
  const ethnicityPreferenceRef = useRef<BottomSheetModalMethods>(null);
  const heightPreferenceRef = useRef<BottomSheetModalMethods>(null);

  const saveLocationMutation = useUserMutation({
    mutationCallback: UserAdapter.saveUserLocation,
  });

  const { mutateAsync } = useMatchingMutation({
    mutationCallback: MatchingAdapter.createNewInteraction,
  });

  const { data, isPending } = useMatchingQuery({
    queryCallback: MatchingAdapter.getDiscoverList,
    queryKey: [
      "DISCOVER",
      // matchFilters.astrologicalSign.value[0],
      // matchFilters.educationLevel.value[0],
      // matchFilters.children.value[0],
      // matchFilters.religion.value[0],
      // matchFilters.language.value[0],
      // matchFilters.ethnicity.value[0],
      // matchFilters.height.value[0],
      // matchFilters.age.value[0],
      // matchFilters.age.value[1],
      // matchFilters.distance.value[0],
      // matchFilters.distance.value[1],
    ],
    // slug: `&astrologicalSign=${matchFilters.astrologicalSign.value[0]}&educationLevel=${matchFilters.educationLevel.value[0]}&children=${matchFilters.children.value[0]}&religion=${matchFilters.religion.value[0]}&language=${matchFilters.language.value[0]}&ethnicity=${matchFilters.ethnicity.value[0]}&height=${matchFilters.height.value[0]}&age=${matchFilters.age.value[0]}-${matchFilters.age.value[1]}&distance=${matchFilters.distance.value[0]}-${matchFilters.distance.value[1]}`,
  });

  const handleSaveUserLocation = async () => {
    let coordinates: Coordinates;

    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      coordinates = location.coords;

      const res = saveLocationMutation.mutateAsync({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSaveUserLocation();
  }, []);

  const handleLike = async (user: UserProfile) => {
    try {
      const res = await mutateAsync({
        targetUserId: user._id,
        interactionType: "LIKE",
        message: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = async (user: UserProfile) => {
    try {
      const res = await mutateAsync({
        targetUserId: user._id,
        interactionType: "DISLIKE",
        message: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaywallOpen = () => {
    paywallRef.current?.expand();
  };

  useEffect(() => {
    handlePaywallOpen();
  }, []);

  const renderCard = useCallback(
    (item: UserProfile, index: number) => {
      // Calculate if this card is the top card (active) or the one behind it
      const isTopCard = index === activeIndex;
      const isNextCard = index === activeIndex + 1;
      return (
        <DiscoverCard
          isTopCard={isTopCard}
          isNextCard={isNextCard}
          user={item}
        />
      );
    },
    [activeIndex]
  );
  const OverlayLabelRight = useCallback(() => {
    return (
      <View style={[styles.overlayLabelContainer]}>
        <LikeSwipeOverlayIcon />
      </View>
    );
  }, []);
  const OverlayLabelLeft = useCallback(() => {
    return (
      <View style={[styles.overlayLabelContainer]}>
        <DislikeSwipeOverlayIcon />
      </View>
    );
  }, []);

  const filters = [
    {
      title: "Around You",
      onPress: () => {
        distanceFilterRef.current?.present();
      },
    },
    {
      title: "Age",
      onPress: () => {
        ageFilterRef.current?.present();
      },
    },
    {
      title: "More",
      onPress: () => {
        advancedFiltersRef.current?.present();
      },
    },
  ];

  return (
    <>
      <View>
        <ScrollView style={styles.scrollView}>
          <Pressable>
            <Text fontFamily="Merchant" size={5} weight="regular">
              Discover
            </Text>
          </Pressable>

          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            horizontal
            scrollEnabled
            showsHorizontalScrollIndicator={false}
          >
            {filters.map((item, index) => (
              <OptionsMenu
                key={index}
                title={item.title}
                onPress={item.onPress}
              />
            ))}
          </ScrollView>
          <View style={styles.swiperContainer}>
            {data && (
              <Swiper
                ref={ref}
                cardStyle={{
                  width: "100%",
                  borderRadius: 15,
                  position: "absolute",
                }}
                data={data?.data}
                renderCard={renderCard}
                onSwipeLeft={(cardIndex) => {
                  setActiveIndex(cardIndex + 1);
                  handleDislike(data?.data[cardIndex]);
                }}
                onSwipeRight={(cardIndex) => {
                  setActiveIndex(cardIndex + 1);
                  handleLike(data?.data[cardIndex]);
                }}
                OverlayLabelLeft={OverlayLabelLeft}
                OverlayLabelRight={OverlayLabelRight}
              />
            )}
          </View>
        </ScrollView>
        <AppWalkthrough onComplete={() => console.log("complete")} />
      </View>
      {/* <PaywallBottomSheet ref={paywallRef} /> */}
      {/* <InteractionsBottomSheet
        icon={<SendSuperLikeIcon />}
        title="Superlike"
        description="Superlike is a way to express how much you like someone"
        actionText="To use Superlike you need 3 LJ Coins"
        buttonText="Buy Coins"
      /> */}

      {/* Distance Filter Modal */}
      <RangeFilterModal
        title="Around You"
        min={0}
        max={300}
        step={5}
        metric="Miles"
        values={distanceRange}
        ref={distanceFilterRef}
        setFilterValues={setDistanceRange}
        type="distance"
      />
      {/* Age Filter Modal */}
      <RangeFilterModal
        title="Select Age Range"
        min={18}
        max={80}
        step={1}
        metric="Years"
        values={ageRange}
        ref={ageFilterRef}
        setFilterValues={setAgeRange}
        type="age"
      />
      {/* Age Filter Modal */}
      <AdvancedFiltersModal
        ref={advancedFiltersRef}
        refControllers={{
          astrologicalSign: astrologicalSignRef,
          educationLevel: educationLevelRef,
          children: childrenPreferenceRef,
          religion: religionPreferenceRef,
          language: languagePreferenceRef,
          ethnicity: ethnicityPreferenceRef,
          height: heightPreferenceRef,
          age: ageFilterRef,
          distance: distanceFilterRef,
        }}
      />

      <FilterMultiselectModal
        itemList={starSigns}
        filterKey={FilterKeys.astrologicalSign}
        title="Astrological Sign"
        subTitle="You can select multiple astrological signs"
        ref={astrologicalSignRef}
        hasSearch={false}
        isMultiSelect={true}
      />
      <FilterMultiselectModal
        itemList={educationLevels}
        filterKey={FilterKeys.educationLevel}
        title="Education Level"
        subTitle="You can select multiple qualifications"
        ref={educationLevelRef}
        hasSearch={false}
        isMultiSelect={true}
      />
      <FilterMultiselectModal
        itemList={childrenPreference}
        filterKey={FilterKeys.children}
        title="Children"
        subTitle="You can select one option"
        ref={childrenPreferenceRef}
        hasSearch={false}
        isMultiSelect={false}
      />
      <HeightFilterModal ref={heightPreferenceRef} />
      <FilterMultiselectModal
        itemList={ethnicBackgrounds}
        filterKey={FilterKeys.ethnicity}
        title="Ethnicity"
        subTitle="You can select multiple ethnicities"
        placeHolder="Search for Ethnicities"
        ref={ethnicityPreferenceRef}
        hasSearch={true}
        isMultiSelect={true}
      />
      <FilterMultiselectModal
        itemList={religionPreference}
        filterKey={FilterKeys.religion}
        title="Religion"
        subTitle="You can select multiple religions"
        placeHolder="Search for Religions"
        ref={religionPreferenceRef}
        hasSearch={true}
        isMultiSelect={true}
      />
      <FilterMultiselectModal
        itemList={africanLanguages}
        filterKey={FilterKeys.language}
        title="Language(s)"
        subTitle="You can select multiple languages"
        placeHolder="Search for Language"
        ref={languagePreferenceRef}
        hasSearch={true}
        isMultiSelect={true}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    //flex: 1,
    paddingHorizontal: theme.space[14],
    marginTop: theme.space[80],
  },

  scrollContainer: {
    flexDirection: "row",
    // flexWrap: "wrap",
    paddingBottom: theme.space[20],
    paddingTop: theme.space[20],
    gap: theme.space[11],
    overflow: "scroll",
  },

  swiperContainer: {
    height: PAGE_HEIGHT,
    width: "100%",
  },

  overlayLabelContainer: {
    width: "100%",
    height: unit(556),
    borderRadius: unit(16),
    zIndex: 999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
