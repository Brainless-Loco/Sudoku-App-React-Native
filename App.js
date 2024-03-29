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
import HowtoPlay from './screens/HowtoPlay';
import Profile from './screens/Profile';
import AllBlogs from './screens/AllBlogs';
import ABlog from './screens/ABlog';
import WriteBlogScreen from './screens/WriteBlogScreen';
import HomeScreen from './screens/HomeScreen';
import AboutTheAPP from './screens/AboutTheAPP';
import SolveWithAI from './screens/SolveWithAI';


export default function App() {

  const Stack = createNativeStackNavigator();

  return (

    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen
              name="LearningSudoku"
              component={SudokuTutorialScreen}
              options={{headerShown:false}}
            /> */}
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
              name="HomeScreen"
              component={HomeScreen}
              options={{headerShown:false}}
            />
            <Stack.Screen
              name="AISolver"
              component={SolveWithAI}
              options={{headerShown:true,headerTitle:''}}
            />
          <Stack.Screen
              name="AllBlogLists"
              component={AllBlogs}
              options={{headerShown:true,headerTitle:''}}
            />
          <Stack.Screen
              name="WriteABlog"
              component={WriteBlogScreen}
              options={{headerShown:true,headerTitle:''}}
            />
          <Stack.Screen
            name="ABlog"
            component={ABlog}
            options={{headerShown:true,headerTitle:''}}
        />
          <Stack.Screen
              name="Profile"
              component={Profile}
              options={{headerShown:true,headerTitle:''}}
            />
          <Stack.Screen
              name="About"
              component={AboutTheAPP}
              options={{headerShown:true,headerTitle:''}}
            />
          <Stack.Screen
              name="HowToPlay"
              component={HowtoPlay}
              options={{headerShown:false}}
            /> 
            <Stack.Screen
              name="LandingPage"
              component={LandingPage}
              options={{headerShown:true,headerTitle:''}}
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
