import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import "./global.css"

export default function App() {
  return (
    <View className='flex-1 items-center justify-center'>
      <Text className='text-3xl text-center p-4'>Home Page!</Text>
      <StatusBar style="auto" />
    </View>
  );
}