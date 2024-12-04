import { Stack } from "expo-router"
import { GameProvider } from '../app/GameContext';


const _layout = () => {
  return (
    <GameProvider>
    <Stack>
        <Stack.Screen name="index" options={{
            headerTitle: "Home Page"
        }}/>
        <Stack.Screen name="newGame" options={{
            headerTitle: "New Game"
        }}/>
        <Stack.Screen name="games/[gameid]" options={{
            headerTitle: "Game Scores"
        }}/>
        <Stack.Screen name="games/insertRound/[roundid]" options={{
            headerTitle: "Record Round"
        }}/>
        <Stack.Screen name="games/editRound/[roundid]" options={{
            headerTitle: "Edit Round"
        }}/>

    </Stack>
    </GameProvider>
  )
}

export default _layout