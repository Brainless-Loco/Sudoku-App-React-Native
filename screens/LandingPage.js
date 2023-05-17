import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { game_pattern_formation, gridUpdate } from '../redux/actions/Grid_actions';
import { generate_a_new_pattern } from '../sudoku_maker/sudoku_pattern_generator';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import {gsap, Back} from 'gsap-rn';

export default function LandingPage({navigation}) {
  const dispatch = useDispatch()

  const viewRef = useRef(null)
  
  const [loading, setloading] = useState(false)


  const update_current_game = (pattern)=>dispatch(gridUpdate(pattern))
  const form_new_game = (grid)=>dispatch(game_pattern_formation(grid))

  const [has_paused_game,set_paused_game_check] = useState(false)

  const is_there_any_paused_game = async ()=>{
    // var ret = await AsyncStorage.getItem('has_saved_game')
    var ret = '1'
    set_paused_game_check((ret === '1'))
  }

  useEffect(()=>{
    is_there_any_paused_game()
  },[])
  

  const current_grid = useSelector(state=>state.current_playing_grid)
  const right_value = useSelector(state=>state.grid)

  const update_everything_for_playzone = async ()=>{
    try{
      setloading(true)
      var new_pattern = generate_a_new_pattern()
      const temp = new_pattern.map((arr)=> arr.slice())
      form_new_game(temp)
      update_current_game(new_pattern)
      setloading(false)
      navigation.navigate('Playzone')
    }
    catch(e){
      alert('Something went wrong!')
    }
  }


  useEffect(() => {
    const view = viewRef.current;
    gsap.to(view, {duration:1, transform:{rotate:360, scale:1}, 	ease:Back.easeInOut});
    }, [])




  return (
    <View style={styles.container}>
      <Image
        ref={viewRef}
        style={styles.logo}
        source={require('../assets/logo.png')}
      />
      <Text style={styles.welcomeText}>Welcome to <Text style={{color:'red'}}> Sudoku Playzone</Text></Text>
      <Text style={styles.welcomeText}>&nbsp;</Text>
      <TouchableOpacity
        style={styles.enterPlayzoneBtn}
        onPress={ async () =>{
          update_everything_for_playzone()
        }
        }
        ><Text style={styles.btnText}>
          {
            loading? <ActivityIndicator size={20} color={"white"} />:"Enter the Playzone"
          }
          </Text>
          </TouchableOpacity>
        
        
        {/* {
        has_paused_game&&<TouchableOpacity
          style={styles.enterPlayzoneBtn}
          onPress={() =>{
            update_everything_for_playzone()
            navigation.navigate('Playzone')
          }
          }
          ><Text style={styles.btnText}> Continue Previous </Text>
        </TouchableOpacity>
        } */}
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
    color:'#094480'
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
    margin:8,
  },
  btnText:{
    color:'white',
    fontSize: 22
  }
});
