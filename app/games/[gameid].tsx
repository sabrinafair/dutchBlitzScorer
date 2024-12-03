import { router, useLocalSearchParams } from "expo-router";
import { View, Text, Image, TouchableWithoutFeedback, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from 'react';
import "../../global.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setSnackbar } from "./state/gameSlice";

const GamePage = () => {
  const { gameid } = useLocalSearchParams<{ gameid: string }>();
  const [rounds, setRounds] = useState([
    { round: 1, player1: 5, player2: 10, player3: 15, player4: 20 },
    { round: 2, player1: 10, player2: 20, player3: 25, player4: 30 },
    { round: 3, player1: 15, player2: 25, player3: 10, player4: 40 },
    { round: 4, player1: 5, player2: 12, player3: -4, player4: 8 },
  ]);

  const OGsnackbar = useSelector((state: RootState) => state.games.snackbar);
  const dispatch = useDispatch();

  const snackbar = OGsnackbar;

  useEffect(() => {
    const timer = setTimeout(() => {
      // Your code to run once after the component loads
      dispatch(setSnackbar(""));
    }, 4000); // 4 second delay

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, []);

  if (snackbar == "Success") console.log("snackbar passed!");
  else console.log("snackbar NOT passed! GIVEN: " + snackbar);
  return (
    <>
    <ScrollView className="bg-[#f0f0f0]" contentContainerStyle={styles.container}>
      <View style={styles.scoreCard}>
        <Text style={styles.title}></Text>
        <Text style={styles.subtitle}></Text>

        <View style={styles.tableContainer}>
          <View style={[styles.tableRowHeader, styles.tableRowWithBorders]}>
            <Text style={[styles.tableCellHeaderVertical]}>Round</Text>
            <Text style={[styles.tableCellHeaderVertical]}>Player 1</Text>
            <Text style={[styles.tableCellHeaderVertical]}>Player 2</Text>
            <Text style={[styles.tableCellHeaderVertical]}>Player 3</Text>
            <Text style={[styles.tableCellHeaderVertical]}>Player 4</Text>
            <Text style={[styles.tableCellHeaderVertical]}>Edit/Delete</Text>
          </View>

          {rounds.map((round, index) => (
            <View style={[styles.tableRow, styles.tableRowWithBorders]} key={index}>
              <Text style={styles.tableCell}>{round.round}</Text>
              <Text style={styles.tableCell}>{round.player1}</Text>
              <Text style={styles.tableCell}>{round.player2}</Text>
              <Text style={styles.tableCell}>{round.player3}</Text>
              <Text style={styles.tableCell}>{round.player4}</Text>
              <TouchableWithoutFeedback
                onPress={() =>
                  router.push({
                    pathname: 'games/editRound/[roundid]',
                    params: {
                      roundid: round.round,
                      player1: round.player1,
                      player2: round.player2,
                      player3: round.player3,
                      player4: round.player4,
                    },
                  })
                }
              >
                <View style={styles.tableCell}>
                  <Text style={styles.editButton}>✏️</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          ))}

          <View style={[styles.tableRowTotal, styles.tableRowWithBorders]}>
            <Text style={[styles.tableCellTotal, styles.tableCellBorderTop]}>Total</Text>
            <Text style={[styles.tableCellTotal, styles.tableCellBorderTop]}>{rounds.reduce((sum, round) => sum + round.player1, 0)}</Text>
            <Text style={[styles.tableCellTotal, styles.tableCellBorderTop]}>{rounds.reduce((sum, round) => sum + round.player2, 0)}</Text>
            <Text style={[styles.tableCellTotal, styles.tableCellBorderTop]}>{rounds.reduce((sum, round) => sum + round.player3, 0)}</Text>
            <Text style={[styles.tableCellTotal, styles.tableCellBorderTop]}>{rounds.reduce((sum, round) => sum + round.player4, 0)}</Text>
            <Text style={[styles.tableCellTotal, styles.tableCellBorderTop]}></Text>
          </View>
        </View>

        <TouchableWithoutFeedback
          onPress={() =>
            router.push({
              pathname: "games/insertRound/[roundid]",
              params: { roundid: gameid },
            })
          }
        >
          <View style={styles.addButtonContainer}>
            <Text style={styles.addButtonText}>Add new round</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View
  className={`absolute bottom-10 w-full flex flex-row justify-center animate-fade ${
    snackbar == "Success" ? " static" : "hidden"
  }`}
>
  <Text className="w-96 bg-green-200 text-green-800 px-6 py-3 text-center text-2xl font-bold">
    Score added successfully!
  </Text>
</View>
<View
  className={`absolute bottom-10 w-full flex flex-row justify-center ${
    snackbar == "Success" ? "hidden" : "static"
  }`}
>
  <Text className="w-96  text-[#fcfdf7] px-6 py-3 text-center text-2xl font-bold">
    
  </Text>
</View>
    </ScrollView>
{/* 
<View className="h-full bg-[#fcfdf7]">
<View>
  <Image
    className="w-full"
    source={require("../../assets/tableTemp.png")}
  />
</View>
<View className="flex flex-row gap-4 justify-center w-full">
  <View className="">
    <TouchableWithoutFeedback
      onPress={() => console.log("set edit/delete functionality here")}
    >
      <Text className="border border-slate-500 rounded-xl px-4 py-2">
        Edid/Delete Round
      </Text>
    </TouchableWithoutFeedback>
  </View>
  <View className="">
    <TouchableWithoutFeedback
      onPress={() =>
        router.push({
          pathname: "games/insertRound/[roundid]",
          params: { roundid: gameid },
        })
      }
    >
      <Text className=" border border-slate-500 rounded-xl px-4 py-2">
        Add Round
      </Text>
    </TouchableWithoutFeedback>
  </View>
</View> */}
{/* <View
  className={`absolute bottom-10 w-full flex flex-row justify-center animate-fade ${
    snackbar == "Success" ? " static" : "hidden"
  }`}
>
  <Text className="w-96 bg-green-200 text-green-800 px-6 py-3 text-center text-2xl font-bold">
    Score added successfully!
  </Text>
</View>
<View
  className={`absolute bottom-10 w-full flex flex-row justify-center ${
    snackbar == "Success" ? "hidden" : "static"
  }`}
>
  <Text className="w-96  text-[#fcfdf7] px-6 py-3 text-center text-2xl font-bold">
    this is the temp
  </Text>
</View>  */}
{/* </View> */}
</>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 16,
  },
  scoreCard: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 10,
    width: "95%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  tableContainer: {
    width: "105%",
    marginBottom: 16,
  },
  tableRowHeader: {
    flexDirection: "row",
    backgroundColor: "#cfe3d1",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 140,
    alignItems: "center",
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#dcdcdc",
  },
  tableRowTotal: {
    flexDirection: "row",
    backgroundColor: "#f4f4f4",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  tableCellHeaderVertical: {
    flex: 1,
    textAlign: "center",
    padding: 1,
    fontWeight: "bold",
    transform: [{ rotate: "-90deg" }],
    width: 60,
    alignSelf: "center",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    padding: 8,
  },
  tableCellTotal: {
    flex: 1,
    textAlign: "center",
    padding: 8,
    fontWeight: "bold",
  },
  editButton: {
    textAlign: "center",
    color: "#007AFF",
  },
  addButtonContainer: {
    backgroundColor: "#8fbc8f",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  tableRowWithBorders: {
    borderWidth: 1,
    borderColor: "#000000",
  },
  tableCellBorderTop: {
    borderTopWidth: 1,
    borderColor: "#000000",
  },
});

export default GamePage;
