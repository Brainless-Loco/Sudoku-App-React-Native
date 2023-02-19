import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View,Image, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { game_pattern_formation, gridUpdate } from '../redux/actions/Grid_actions';
import { generate_a_new_pattern } from '../sudoku_maker/sudoku_pattern_generator';

export default function LandingPage({navigation}) {
  const dispatch = useDispatch()

  const update_current_game = (pattern)=>dispatch(gridUpdate(pattern))
  const form_new_game = (grid)=>dispatch(game_pattern_formation(grid))


  const update_everything_for_playzone = ()=>{
    var new_pattern = generate_a_new_pattern()
    const temp = new_pattern.map((arr)=>arr.slice())

    form_new_game(temp)
    update_current_game(new_pattern)

  }

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
          update_everything_for_playzone()
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
