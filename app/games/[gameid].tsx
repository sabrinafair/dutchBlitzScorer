import { router, useLocalSearchParams } from "expo-router";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import "../../global.css";

const GamePage = () => {
  const { gameid } = useLocalSearchParams<{ gameid: string }>();
  return (
    <View>
      <View>
        <Image
          className="w-full"
          source={require("../../assets/tableTemp.png")}
        />
      </View>
      <View className="flex flex-row gap-4 justify-center w-full">
        <View className="">
          <TouchableWithoutFeedback
            onPress={() => console.log("edit/delete round View pressed")}
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
    </View>
  );
};

export default GamePage;
