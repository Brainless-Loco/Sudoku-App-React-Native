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
  const form_new_game = (props)=>dispatch(game_pattern_formation(props))

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

  const update_everything_for_playzone = async (gameLevel)=>{
    setloading(true)
    try{
      var new_pattern = generate_a_new_pattern()
      const pattern = new_pattern.map((arr)=> arr.slice())
      form_new_game({pattern,gameLevel})
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
      <Text style={styles.welcomeText}>Let's Play<Text style={{color:'red'}}> Sudoku</Text></Text>
      <Text style={styles.modeTitle}>Please select a mode</Text>
      <TouchableOpacity
        style={styles.enterPlayzoneBtn}
        onPress={ async () =>{update_everything_for_playzone(1)}}>
          <Text style={styles.btnText}>Newbie</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.enterPlayzoneBtn}
        onPress={ async () =>{update_everything_for_playzone(2)}}>
          <Text style={styles.btnText}>Expert</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.enterPlayzoneBtn}
        onPress={ async () =>{update_everything_for_playzone(3)}}>
          <Text style={styles.btnText}>Master</Text>
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
  },
  welcomeText:{
    fontWeight: 'bold',
    fontSize: 20,
    color:'#094480',
    marginBottom:20
  },
  modeTitle:{
    fontWeight: 'bold',
    fontSize: 15,
    color:'#094480',
    marginVertical:5
  },
  logo:{
    width: 150,
    height:150,
    marginBottom:40,
    marginTop:20
  },
  enterPlayzoneBtn:{
    width:'60%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    backgroundColor: 'white',
    margin:8,
    borderWidth:1.5,
    borderColor:'#e80505',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  btnText:{
    color:'#e80505',
    fontSize: 22,
    fontWeight:'500'
  }
});
