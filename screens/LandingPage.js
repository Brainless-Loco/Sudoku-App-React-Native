import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Button,StyleSheet, Text, View,Image, Pressable } from 'react-native';

export default function LandingPage({navigation}) {

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/logo.png')}
      />
      <Text style={styles.welcomeText}>Welcome to <Text style={{color:'red'}}> Sudoku Forever</Text></Text>
      <Text style={styles.welcomeText}>&nbsp;</Text>
      <Pressable
        style={styles.enterPlayzoneBtn}
        onPress={() =>{
          navigation.navigate('Playzone')
        }
        }
        ><Text style={styles.btnText}>Enter the Playzone</Text></Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  enterPlayzoneBtn:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    backgroundColor: 'red',
  },
  btnText:{
    color:'white',
    fontSize: 22
  }
});
