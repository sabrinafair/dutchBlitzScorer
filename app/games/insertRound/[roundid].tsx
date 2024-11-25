import { router, useLocalSearchParams } from "expo-router";
import { Button, Text, TextInput, View } from "react-native";

interface PlayerProp {
    name: string,
    score: number
}

const RoundInsert = () => {
    const {roundid} = useLocalSearchParams<{roundid: string}>();
    const players: PlayerProp[] = [{name: "Goose", score: 15}, {name: "Cat", score: 5}, {name: "Bear", score: -5}, {name: "Crab", score: 6}] 
    return (
        <View className="w-full">
            {players.map((player) => {
                return (
                    <View className="flex flex-row w-full p-4 items-center">
                    <Text className="text-2xl flex-grow">{player.name}</Text>
                    <TextInput className="w-24 border rounded-sm p-4 text-lg" value={player.score.toString()}/>
                </View>
                )
            })}
<View className="flex flex-row w-full justify-end px-4">
            <Text className="w-40 p-4 bg-green-300/80 text-black font-semibold text-lg rounded-2xl" onPress={() => router.push({
              pathname: "/games/[gameid]",
              params: { gameid: roundid },
            })}>Add</Text>
            </View>
        </View>
    );
};

export default RoundInsert;