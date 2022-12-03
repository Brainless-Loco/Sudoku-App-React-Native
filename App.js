import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import Home from './screens/Home';
import LandingPage from './screens/LandingPage';

export default function App() {
  const [landingPageLoad,setLandingPageLoad] = useState(true)

  setInterval(() => {
    setLandingPageLoad(false)
  }, 3500);

  return (
    <View style={styles.container}>
      {landingPageLoad ? <LandingPage/> : <Home/>}
    </View>
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
  }
});
