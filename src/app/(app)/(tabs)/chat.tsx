import { theme, unit } from "@/constants";
import { Image, Pressable, ScrollView, View } from "react-native";
import { Flex, Text } from "@/components/partials";
import { EmptyChatIcon, GreenVerificationIcon, SearchIcon } from "@/icons";
import { ChatListItem, Search } from "@/components/chat";
import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { EmptyState } from "@/components/partials/modules";

const chatList = [
  {
    name: "Mariam",
    messages: 3,
    image:
      "https://images.unsplash.com/photo-1541216970279-affbfdd55aa8?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Jane",
    messages: 2,
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Phylis",
    messages: 7,
    image:
      "https://images.unsplash.com/photo-1533435137002-455932c8538f?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Ann",
    messages: 0,
    image:
      "https://images.unsplash.com/photo-1507152832244-10d45c7eda57?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Ayo",
    messages: 0,
    image:
      "https://images.unsplash.com/photo-1522512115668-c09775d6f424?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function ChatScreen() {
  const [search, setSearch] = useState("");
  const [openSearchBar, setOpenSearchBar] = useState(false);
  return (
    <View
      style={{
        paddingHorizontal: theme.space[14],
        marginTop: theme.space[80],
      }}
    >
      {!openSearchBar ? (
        <View
          style={{
            paddingBottom: theme.space[8],
            display: "flex",
            alignContent: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text size={5} weight="regular" fontFamily="Merchant">
            Chat
          </Text>
          {chatList.length > 0 && (
            <Pressable onPress={() => setOpenSearchBar(true)}>
              <SearchIcon />
            </Pressable>
          )}
        </View>
      ) : (
        <Search
          search={search}
          setSearch={setSearch}
          setOpenSearchBar={setOpenSearchBar}
        />
      )}

      <>
        {chatList.length === 0 ? (
          <EmptyState
            icon={<EmptyChatIcon />}
            title="Chat"
            description="See all those who liked, superliked and sent a rose to you"
          />
        ) : (
          <ScrollView style={{ paddingTop: unit(24) }}>
            <View>
              <Text weight="medium" className="text-[#B5B5B0]">
                Your Matches
              </Text>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator
                contentContainerStyle={{ gap: theme.space[8] }}
                style={{ paddingTop: theme.space[8] }}
              >
                {chatList.map((item, index) => (
                  <View
                    style={{
                      width: unit(64),
                      height: unit(64),
                      borderRadius: unit(71),
                      backgroundColor: "#F2F2F2",
                      overflow: "hidden",
                    }}
                    key={index}
                  >
                    <Image
                      source={{ uri: item.image }}
                      className="w-full h-full"
                    />
                  </View>
                ))}
              </ScrollView>

              <View style={{ paddingTop: theme.space[21] }}>
                <FlashList
                  data={chatList}
                  renderItem={({ item }) => <ChatListItem {...item} />}
                  estimatedItemSize={5}
                  keyExtractor={(item) => item.name}
                />
              </View>
            </View>
          </ScrollView>
        )}
      </>
    </View>
  );
}
