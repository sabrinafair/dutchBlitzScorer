import { router, useLocalSearchParams } from "expo-router";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import "../../global.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { setSnackbar } from "./state/gameSlice";

const GamePage = () => {
  const { gameid } = useLocalSearchParams<{ gameid: string }>();
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
            this is the temp
          </Text>
        </View>
      </View>
    </>
  );
};

export default GamePage;
