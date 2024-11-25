import { Stack } from "expo-router"


const _layout = () => {
  return (
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

    </Stack>
  )
}

export default _layout