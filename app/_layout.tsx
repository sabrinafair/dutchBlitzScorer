import { router, Stack, useNavigation } from "expo-router"
import { Provider } from "react-redux"
import { store } from '../app/store/store';
import { HeaderBackButton } from '@react-navigation/elements';


const _layout = () => {
    const navigation = useNavigation()

    function goHome(): void {
        console.log("BACK BUTTON PRESSED")
        router.push({
          pathname: "/",
          params: { },
        });
      }

  return (
    <Provider store={store}>

    <Stack>
        <Stack.Screen name="index" options={{
            headerTitle: "Home Page",
            headerLeft: () => (<></>)
        }}/>
        <Stack.Screen name="newGame" options={{
            headerTitle: "New Game"
        }}/>
        <Stack.Screen name="games/[gameid]" options={{
            headerTitle: "Game Scores",
            headerLeft: (props) => (<HeaderBackButton {...props} onPress={() => goHome()}></HeaderBackButton>) 
        }}/>
        <Stack.Screen name="games/insertRound/[roundid]" options={{
            headerTitle: "Record Round"
        }}/>

    </Stack>
    </Provider>
  )
}

export default _layout