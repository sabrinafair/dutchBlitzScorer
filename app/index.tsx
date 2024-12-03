import { Link, router } from "expo-router";
import { Button, Pressable, Text, View } from "react-native";
import "../global.css";

interface gameProps {
  title: string;
  description: string;
  id: number
}

const HomePage = () => {
  const games: gameProps[] = [
    { title: "Game 1", description: "Players: 4, Rounds: 5", id: 1 },
    { title: "Game 2", description: "Players: 3, Rounds: 7", id: 2 },
    { title: "Game 3", description: "Players: 4, Rounds: 3", id: 3 },
  ];
  return (
    <View className="flex flex-col h-full">
      {games.map((game) => {
        return (
          <Pressable key={game.id}
          className="border-b border-slate-400 py-3 px-4 my-3"
          onPress={() =>
            router.push({
              pathname: "/games/[gameid]",
              params: { gameid: game.id },
            })
          }
          >
            <Text className="font-lg font-semibold">{game.title}</Text>
            <Text className="text-sm font-semibold">{game.description}</Text>
          </Pressable>
        );
      })}

      <View className="absolute right-10 bottom-28 w-40">
        <Button
          title="New Game"
          onPress={() =>
            router.push({
              pathname: "/newGame",
            })
          }
        />
      </View>
    </View>
  );
};

export default HomePage;
