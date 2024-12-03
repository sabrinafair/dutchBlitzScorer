import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../state/gameSlice";

interface PlayerProp {
  id: number;
  name: string;
  score: number;
  newScore: string;
  validInput: boolean
}

const RoundInsert = () => {
  const dispatch = useDispatch();
const [validInput, setValidInput] = useState(true)
  const { roundid } = useLocalSearchParams<{ roundid: string }>();
//   const players: PlayerProp[] = [
//     { id: 1, name: "Goose", score: 15, newScore: 15 },
//     { id: 2, name: "Cat", score: 5, newScore: 5 },
//     { id: 3, name: "Bear", score: -5, newScore: -50 },
//     { id: 4, name: "Crab", score: 6, newScore: 6 },
//   ];
  const [players, setPlayers] = useState<PlayerProp[]>([
    { id: 1, name: "Goose", score: 0, newScore: (0).toString(), validInput: true },
    { id: 2, name: "Cat", score: 0, newScore: (0).toString(), validInput: true },
    { id: 3, name: "Bear", score: 0, newScore: (0).toString(), validInput: true },
    { id: 4, name: "Crab", score: 0, newScore: (0).toString(), validInput: true },
  ]);

  function addRound(snkbar: string): void {
    console.log("add round function");
    dispatch(setSnackbar('Success'))
    //TODO: maybe add check here for validating scores are in correct range
    router.push({
      pathname: "/games/[gameid]",
      params: { gameid: roundid, snackbar: snkbar },
    });
  }

  function updateValidity(): void {
    setValidInput(true)
    players.map((player) => {
        if(!player.validInput) setValidInput(false)
    })
  }

  const updateScore = (id: number, newScore: string) => {
    let VI = (parseInt(newScore) > 40 || parseInt(newScore) < -20) ? false: true
    setPlayers(prevPlayers => prevPlayers.map(player => 
      player.id === id ? { ...player, newScore: newScore, validInput: VI } : player
    ));
    updateValidity()
  };

  return (
    <View className="w-full my-10">
      {players.map((player) => {
        return (
            
            <View className="px-4" key={player.id}>
          <View
            className="flex flex-row w-full items-center"
          >
            <Text className="text-2xl flex-grow">{player.name}</Text>
            <TextInput
              keyboardType="numeric"
              className="w-24 border rounded-sm text-lg"
              value={player.newScore}
                onChangeText={(newScore) => updateScore(player.id, newScore)}
                onFocus= {() => (player.newScore == '0' && updateScore(player.id, ''))}
                onBlur={() => (player.newScore == '' && updateScore(player.id, '0'))}
              
            /></View>
            <Text className={`text-md text-red-600 w-full text-right mt-1 mb-6 ${!player.validInput ? 'visible': 'invisible'}`}>Scores must be between -20 and 40</Text>
          </View>
        );
      })}
      <View className="flex flex-row w-full justify-end px-4">
        <Text
          className={`w-40 p-4 font-semibold text-lg rounded-2xl ${!validInput ? 'bg-slate-300/80 text-slate-500/80': 'bg-green-300/80 text-black'}`}
          onPress={() => {validInput && addRound('Success')}}
        >
          Add
        </Text>
      </View>
    </View>
  );
};

export default RoundInsert;
