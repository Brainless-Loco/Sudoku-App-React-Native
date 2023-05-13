import * as React from 'react';
import { StyleSheet } from 'react-native';
import Playzone from './screens/Playzone';
import LandingPage from './screens/LandingPage';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store  from './redux/store';
import LogIn from './screens/LogIn';
import SignUp from './screens/SignUp';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (

    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
            name="LogIn"
            component={LogIn}
            options={{headerShown:false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{headerShown:false}}
          />
          <Stack.Screen
            name="LandingPage"
            component={LandingPage}
            options={{ title: 'Sudoku Forever' }}
          />
          <Stack.Screen name="Playzone" component={Playzone} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText:{
    fontWeight: 'bold',
    fontSize: 20,
  },
  logo:{
    width: 150,
    height:150,
    margin: 30
  },
});
