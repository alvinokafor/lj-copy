import React, { useCallback, useMemo, forwardRef } from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { theme, unit } from "@/constants";
import { Text, Button, Flex } from "../partials";
import { UserProfile } from "@/adapters/types/MatchingAdapterTypes";
import ProfileCard from "./profile-card";
import { SmallHeartIcon, SmallNotInterestedIcon } from "./icons";
import { MediaItem } from "../profile";
import UserPhoto from "./user-photo";

interface IProps {
  user: UserProfile;
  profileSendInteractionModalRef: React.RefObject<BottomSheetModal>;
  chooseHideInteractionModalRef: React.RefObject<BottomSheetModal>;
}

const ProfileDetailsModal = forwardRef<BottomSheetModalMethods, IProps>(
  (props, ref) => {
    const snapPoints = useMemo(() => ["90%", "90%"], []);

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
      <BottomSheetModal
        snapPoints={snapPoints}
        ref={ref}
        backdropComponent={renderBackdrop}
        index={1}
        style={{
          paddingHorizontal: unit(29),
          zIndex: 30,
        }}
        handleIndicatorStyle={{
          backgroundColor: "#CECECA",
          marginTop: unit(25),
          marginBottom: unit(17),
        }}
        enablePanDownToClose
      >
        <BottomSheetView style={{ flex: 1 }}>
          <View style={{ paddingBottom: unit(28), flex: 1 }}>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: unit(250),
              }}
              scrollEnabled
            >
              <View>
                <ProfileCard user={props.user} />

                <View
                  style={{
                    paddingTop: unit(18.5),
                    paddingBottom: unit(18.5),
                    marginTop: unit(20),
                    borderTopWidth: 1,
                    borderColor: "#E6E6E5",
                  }}
                  className="border-t-1 border-[#E6E6E5]"
                >
                  <Text
                    className="pb-3 text-coffee-500"
                    size={2}
                    fontFamily="Merchant"
                  >
                    My Bio
                  </Text>

                  <Text>{props.user.aboutMe}</Text>
                </View>

                <View
                  style={{
                    paddingTop: unit(18.5),
                    paddingBottom: unit(18.5),

                    borderTopWidth: 1,
                    borderColor: "#E6E6E5",
                  }}
                  className="border-t-1 border-[#E6E6E5] text-coffee-500"
                >
                  <Text
                    className="pb-3 text-coffee-500"
                    size={2}
                    fontFamily="Merchant"
                  >
                    About Me
                  </Text>

                  <Flex
                    alignContent="flex-start"
                    wrap="wrap"
                    gap={7}
                    direction="row"
                  >
                    <AboutMeTag
                      tag={`${props.user.height}${props.user.heightMetric}`}
                    />
                    <AboutMeTag tag={`${props.user.degree}`} />
                    <AboutMeTag tag={`${props.user.religion}`} />
                    {props.user.job && <AboutMeTag tag={`${props.user.job}`} />}
                    {props.user.otherLanguages && (
                      <AboutMeTag
                        tag={`${props.user?.otherLanguages?.join(", ")}`}
                      />
                    )}
                  </Flex>
                </View>

                {props.user.media.length > 0 && (
                  <View
                    style={{
                      height: unit(376),
                      borderTopWidth: 1,
                      borderColor: "#E6E6E5",
                      paddingTop: unit(20),
                    }}
                  >
                    <ScrollView
                      horizontal={true}
                      contentContainerStyle={{ width: "100%" }}
                    >
                      {props.user.media.map((item, index) => (
                        <View
                          key={index}
                          style={{
                            width: unit(282),
                            height: unit(376),
                            borderRadius: unit(12),
                            overflow: "hidden",
                          }}
                        >
                          <Image
                            height={unit(376)}
                            width={unit(282)}
                            style={{ resizeMode: "cover" }}
                            source={{ uri: item.url }}
                          />
                        </View>
                      ))}
                    </ScrollView>
                  </View>
                )}

                <ScrollView
                  contentContainerStyle={{
                    paddingTop: unit(17),
                    gap: unit(12),
                    borderTopWidth: 1,
                    borderColor: "#E6E6E5",
                  }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                >
                  <UserPhoto />
                  <UserPhoto />
                  <UserPhoto />
                </ScrollView>

                {props.user.diasporaInvolvement.length > 0 && (
                  <View
                    style={{
                      paddingTop: unit(32),
                      paddingBottom: unit(18.5),
                      // borderTopWidth: 1,
                      borderColor: "#E6E6E5",
                    }}
                    className="border-t-1 border-[#E6E6E5] text-coffee-500"
                  >
                    <Text
                      className="pb-3 text-coffee-500"
                      size={2}
                      fontFamily="Merchant"
                    >
                      Interests
                    </Text>

                    <Flex
                      alignContent="flex-start"
                      wrap="wrap"
                      gap={7}
                      direction="row"
                    >
                      {props.user.diasporaInvolvement.map((item, index) => (
                        <AboutMeTag key={index} tag={item} />
                      ))}
                    </Flex>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>

          <View
            style={{
              paddingBottom: unit(28),
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "#fff",
              zIndex: 40,
            }}
            className="space-y-4"
          >
            <View
              style={{
                paddingTop: theme.space[32],
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "space-between",
              }}
            >
              <Button
                title="Like"
                titleStyle={{
                  fontFamily: "BRSonoma-Medium",
                  fontSize: unit(14),
                }}
                style={{ width: "48%" }}
                iconLeft={<SmallHeartIcon />}
              />
              <Button
                title="Not Interested"
                titleStyle={{
                  fontFamily: "BRSonoma-Medium",
                  fontSize: unit(14),
                  color: "#1E1E1C",
                }}
                style={{ width: "48%", borderWidth: 1 }}
                backgroundColor="#fff"
                iconLeft={<SmallNotInterestedIcon />}
              />
            </View>

            <Button
              backgroundColor="#FBF5E9"
              title="Send a Superlike or Rose"
              titleStyle={{ color: "#422618" }}
              onPress={() =>
                props.profileSendInteractionModalRef.current?.present()
              }
            />

            <Button
              title="Hide & Report"
              titleStyle={{
                fontFamily: "BRSonoma-Medium",
                fontSize: unit(14),
                color: "#1E1E1C",
              }}
              backgroundColor="#fff"
              onPress={() =>
                props.chooseHideInteractionModalRef.current?.present()
              }
            />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

function AboutMeTag({ tag }: { tag: string }) {
  return (
    <View
      style={{
        backgroundColor: "#F3F3F2",
        borderRadius: unit(20),
        paddingHorizontal: unit(16),
        paddingVertical: unit(10),
      }}
    >
      <Text weight="medium">{tag}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  heightTabsContainer: {
    borderWidth: 1,
    borderColor: "#E6E6E5",
    paddingHorizontal: unit(9),
    paddingTop: unit(7.5),
    paddingBottom: unit(7.5),
    borderRadius: unit(14),
    display: "flex",
    flexDirection: "row",
    marginTop: unit(28),
  },

  tabButton: {
    paddingTop: unit(9),
    paddingBottom: unit(9),
    borderRadius: unit(9),
    width: "50%",
  },
});

export default ProfileDetailsModal;
