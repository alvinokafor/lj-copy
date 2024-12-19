import React, { useCallback, useMemo, forwardRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { unit } from "@/constants";
import { Text, Flex } from "../partials";
import { SmallCoinIcon } from "@/icons";
import {
  ExtraSmallCoinIcon,
  TransactionRosesIcon,
  TransactionSuperLikesIcon,
} from "./icons";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useWalletQuery, WalletAdapter } from "@/adapters/WalletAdapter";
import { queryKeys } from "@/constants/query-keys";
import { FlatList } from "react-native-gesture-handler";
import { useQueryClient } from "@tanstack/react-query";
import {
  WalletBalance,
  WalletTransactionHistory,
} from "@/adapters/types/WalletAdapterTypes";
import { FlashList } from "@shopify/flash-list";
import { getFormattedDateTime } from "@/utils";

interface IProps {
  coinStoreModalRef: React.RefObject<BottomSheetModalMethods>;
}

const CoinWalletModal = forwardRef<BottomSheetModal, IProps>((props, ref) => {
  const snapPoints = useMemo(() => ["50%", "70%"], []);
  const [tab, setTab] = useState("inflow");

  const queryClient = useQueryClient();

  const walletBalance = queryClient.getQueryData<WalletBalance>([
    queryKeys.WALLET_BALANCE,
  ]);

  const walletTransactionHistoryQuery = useWalletQuery({
    queryCallback: WalletAdapter.getWalletTransactionHistory,
    queryKey: [queryKeys.WALLET_TRANSACTION_HISTORY],
  });

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
      index={0}
      style={{
        paddingHorizontal: unit(16),
        zIndex: 30,
      }}
      handleIndicatorStyle={{
        backgroundColor: "#CECECA",
        marginTop: unit(20),
        marginBottom: unit(12),
      }}
      enablePanDownToClose
    >
      <BottomSheetView>
        <View style={{ paddingBottom: unit(28) }}>
          <View
            style={{
              paddingTop: unit(16.5),
              paddingBottom: unit(16.5),
              paddingHorizontal: unit(16),
              borderRadius: unit(14),
              backgroundColor: "#FBF5E9",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Flex align="flex-start">
              <Text>Coin Wallet:</Text>
              <Flex pt={8} direction="row" align="center" gap={4}>
                <SmallCoinIcon />
                <Text size={4} className="text-center" fontFamily="Merchant">
                  {walletBalance?.data.balance}
                </Text>
              </Flex>
            </Flex>

            <Pressable
              style={{
                borderRadius: 8,
                paddingHorizontal: unit(11.5),
                paddingTop: unit(8),
                paddingBottom: unit(8),
                borderWidth: 1,
                alignSelf: "center",
              }}
              onPress={() => props?.coinStoreModalRef.current?.present()}
            >
              <Text>Purchase Coin</Text>
            </Pressable>
          </View>

          <View style={{ paddingTop: unit(28) }}>
            <Text className="text-[#353531]" weight="medium">
              Coin Transaction History
            </Text>
            <View style={styles.heightTabsContainer}>
              <Pressable
                className={tab === "inflow" ? "bg-[#1E1E1C]" : ""}
                style={styles.tabButton}
                onPress={() => setTab("inflow")}
              >
                <Text
                  className={`${
                    tab === "inflow" ? "text-white" : "text-[#353531]"
                  }  text-center`}
                  weight="semibold"
                >
                  Inflow
                </Text>
              </Pressable>

              <Pressable
                className={tab === "outflow" ? "bg-[#1E1E1C]" : ""}
                style={styles.tabButton}
                onPress={() => setTab("outflow")}
              >
                <Text
                  className={`${
                    tab === "outflow" ? "text-white" : "text-[#353531]"
                  }  text-center`}
                  weight="semibold"
                >
                  Outflow
                </Text>
              </Pressable>
            </View>
          </View>

          <ScrollView
            contentContainerStyle={{
              paddingTop: unit(18),
              flexGrow: 1,
              paddingBottom: unit(40),
            }}
            showsVerticalScrollIndicator={false}
          >
            {tab === "inflow" && (
              <View style={{ width: "100%" }}>
                <FlashList
                  data={walletTransactionHistoryQuery.data?.data}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <InflowTransaction transaction={item} />
                  )}
                  estimatedItemSize={50}
                />
              </View>
            )}

            {tab === "outflow" && (
              <View style={{ width: "100%" }}>
                <FlashList
                  data={walletTransactionHistoryQuery.data?.data}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <OutflowTransaction transaction={item} />
                  )}
                  estimatedItemSize={50}
                />
              </View>
            )}
          </ScrollView>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

function InflowTransaction({
  transaction,
}: {
  transaction: WalletTransactionHistory;
}) {
  return (
    <Flex
      style={{
        borderBottomWidth: 1,
        borderColor: "#F3F3F2",
        paddingBottom: unit(10),
        width: "100%",
      }}
      direction="row"
      align="flex-end"
      gap={8}
      justify="space-between"
      mt={10}
    >
      <Flex gap={6} align="flex-start">
        <Flex pt={5} direction="row" align="center" gap={4}>
          <ExtraSmallCoinIcon />
          <Text size={3} className="text-center" fontFamily="Merchant">
            20
          </Text>
        </Flex>

        <Text className="text-[#9C9C96]">Tuesday 12 Aug, 2024, 8:30 PM</Text>
      </Flex>

      <Text weight="medium" size={3}>
        $3
      </Text>
    </Flex>
  );
}

function OutflowTransaction({
  transaction,
}: {
  transaction: WalletTransactionHistory;
}) {
  return (
    <Flex
      style={{
        borderBottomWidth: 1,
        borderColor: "#F3F3F2",
        paddingBottom: unit(10),
        width: "100%",
      }}
      direction="row"
      align="center"
      gap={8}
      justify="space-between"
      mt={10}
    >
      <Flex gap={6} align="flex-start">
        <Flex pt={5} direction="row" align="center" gap={5}>
          {transaction.interaction_type === "SUPERLIKE" ? (
            <TransactionSuperLikesIcon />
          ) : (
            <TransactionRosesIcon />
          )}
          <Text size={3} className="text-center">
            {transaction.interaction_type === "SUPERLIKE"
              ? "Superlike"
              : "Rose"}
          </Text>
        </Flex>

        <Text className="text-[#9C9C96]">
          {getFormattedDateTime(transaction.created_at)}
        </Text>
      </Flex>

      <Flex pt={5} direction="row" align="center" gap={5}>
        <ExtraSmallCoinIcon />
        <Text size={3} className="text-center" fontFamily="Merchant">
          {transaction.amount}
        </Text>
      </Flex>
    </Flex>
  );
}

export default CoinWalletModal;

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
    marginTop: unit(16),
  },

  tabButton: {
    paddingTop: unit(9),
    paddingBottom: unit(9),
    borderRadius: unit(9),
    width: "50%",
  },
});
