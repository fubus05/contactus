import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './src/screens/main.screen';
import { NativeBaseProvider } from 'native-base';
import Success from './src/screens/success.screen';

const Stack = createNativeStackNavigator()

const App = (): JSX.Element => (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false}}>
          <Stack.Screen name='MainScreen' component={Main}/>  
          <Stack.Screen name='SuccessScreen' component={Success}/> 
        </Stack.Navigator>
     </NavigationContainer>
    </NativeBaseProvider>
);

export default App;
