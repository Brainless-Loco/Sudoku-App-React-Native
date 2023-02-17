import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View,Image, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { gridUpdate } from '../redux/actions/Grid_actions';
import { SUDOKU,generate_a_new_pattern } from '../sudoku_maker/sudoku_pattern_generator';

export default function LandingPage({navigation}) {
  const dispatch = useDispatch()
  const sqre_value_update = ({index,val}) => dispatch(valueUpdate({index,val}))
  const update_current_game = (pattern)=>dispatch(gridUpdate(pattern))
  const update_everything_for_playzone = ()=>{
    const new_pattern = generate_a_new_pattern()
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
