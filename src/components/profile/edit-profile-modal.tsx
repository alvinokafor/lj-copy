import React, { useCallback, useMemo, forwardRef } from "react";
import { Pressable, ScrollView, TextInput, View } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { theme, unit } from "@/constants";
import { Button, Flex, Text } from "../partials";
import { UserProfile } from "@/adapters/types/UserAdapterTypes";
import { useUserMutation, UserAdapter } from "@/adapters/UserAdapter";
import { useForm, Controller } from "react-hook-form";
import {
  EditProfileSchema,
  editProfileValidator,
} from "@/lib/validations/UserProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getFormattedDate } from "@/utils";
import { useRouter } from "expo-router";

interface IProps {
  user: UserProfile | undefined;
}

const EditProfileModal = forwardRef<BottomSheetModalMethods, IProps>(
  (props, ref) => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const snapPoints = useMemo(() => ["90%", "95%"], []);

    const { control, handleSubmit } = useForm<EditProfileSchema>({
      resolver: zodResolver(editProfileValidator),
    });

    const { mutateAsync, isPending } = useUserMutation({
      mutationCallback: UserAdapter.editUserProfile,
    });

    const handleEditProfile = async (data: EditProfileSchema) => {
      try {
        const res = await mutateAsync(data);
        console.log(res);
        queryClient.invalidateQueries({ queryKey: [queryKeys.USER] });
      } catch (error) {
        console.log(error);
      }
    };
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

    const editProfile = [
      {
        title: "Bio",
        value: props.user?.aboutMe,
        action: () => router.push("/(app)/(profile)/update-bio"),
      },
      {
        title: "Age",
        value: props.user?.dob ? getFormattedDate(props.user?.dob) : "",
        action: () => router.push("/(app)/(profile)/update-dob"),
      },
      {
        title: "Gender",
        value: props.user?.gender,
        action: () => {},
      },
      {
        title: "Relationship Status",
        value: props.user?.relationshipStatus,
        action: () => {},
      },
      {
        title: "Height",
        value: `${props.user?.height} ${props.user?.heightMetric}`,
        action: () => {},
      },
      {
        title: "Country",
        value: props.user?.country,
        action: () => router.push("/(app)/(profile)/update-country"),
      },
      {
        title: "Languages",
        value: props.user?.language,
        action: () => router.push("/(app)/(profile)/update-language"),
      },
      {
        title: "Religion",
        value: props.user?.religion,
        action: () => router.push("/(app)/(profile)/update-religion"),
      },
      {
        title: "Work",
        value: props.user?.job,
        action: () => router.push("/(app)/(profile)/update-job"),
      },
      {
        title: "Education Level",
        value: props.user?.degree,
        action: () => router.push("/(app)/(profile)/update-degree"),
      },
      {
        title: "Diaspora Involvement",
        value: props.user?.diasporaInvolvement.join(),
        action: () => {},
      },
    ];

    return (
      <BottomSheetModal
        snapPoints={snapPoints}
        ref={ref}
        backdropComponent={renderBackdrop}
        index={1}
        style={{
          paddingHorizontal: theme.space[24],
          zIndex: 30,
        }}
        handleIndicatorStyle={{
          backgroundColor: "#CECECA",
          marginTop: unit(25),
          marginBottom: unit(17),
        }}
        enablePanDownToClose
      >
        <BottomSheetView>
          <View
            style={{
              paddingBottom: theme.space[12],
              position: "relative",
              height: "100%",
            }}
          >
            <View>
              <Text size={4} fontFamily="Merchant">
                About Me
              </Text>
            </View>

            <View
              style={{ paddingTop: unit(30), display: "flex", gap: unit(20) }}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: unit(11) }}
              >
                {editProfile.map((item, index) => (
                  <Flex
                    key={index}
                    align="center"
                    gap={6}
                    className="w-full"
                    justify="space-between"
                    direction="row"
                    pb={11}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#F3F3F2",
                    }}
                  >
                    <Flex style={{ width: "80%" }} align="flex-start" gap={6}>
                      <Text className="text-[#696963]" size={10}>
                        {item.title}
                      </Text>

                      <Text
                        className="text-[#696963] capitalize"
                        weight="medium"
                      >
                        {item.value}
                      </Text>
                    </Flex>

                    <Pressable
                      style={{
                        paddingVertical: unit(3),
                        paddingHorizontal: unit(11),
                        backgroundColor: "#F3F3F2",
                        borderRadius: unit(22),
                      }}
                      onPress={item.action}
                    >
                      <Text weight="medium">Edit</Text>
                    </Pressable>
                  </Flex>
                ))}
              </ScrollView>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default EditProfileModal;
