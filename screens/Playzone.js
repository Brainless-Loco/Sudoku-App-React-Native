import { StatusBar } from 'expo-status-bar';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import BigSquare from '../components/BigSquare'
import NumberBtnList from '../components/NumberBtnList';
import { useDispatch, useSelector } from 'react-redux'
import Icon  from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { change_button_lock_status,change_pause_status, undo_from_action_history } from '../redux/actions/Grid_actions';
import { useState } from 'react';
import { useEffect } from 'react';



export default function Playzone({ navigation}) {
    
  const dispatch = useDispatch()
  
  const update_button_lock_status = (status)=> dispatch(change_button_lock_status(status))
  const undo_action = ()=> dispatch(undo_from_action_history())
  const update_pause_status =()=>dispatch(change_pause_status())
  
  const lock_status = useSelector(state=>state.is_Num_Button_Locked)
  const actionHis = useSelector(state=>state.action_history.length)
  const mistake_count = useSelector(state=>state.mistakes)
  const is_pause = useSelector(state=>state.is_paused)
  const if_win = useSelector(state=>state.matched_all_squares)
  
  const [minute,setMinute] = useState(0)
  const [second,setSecond] = useState(0)

  !is_pause && setTimeout(()=>{
    if(second == 59){
      setSecond(0)
      setMinute(minute+1)
    }
    else setSecond(second+1)
  },1000)

  useEffect(()=>{
    if(if_win) update_pause_status()
  },[if_win])
  
  

  return (
    <View style={[styles.container,((if_win || mistake_count>=5) && styles.bg_opacity_0_3)]}>
      <View style={styles.informations_container}>

        <Text style={[styles.an_information,styles.text_red]}>Mistakes: {mistake_count} / 5</Text>
        <Text style={styles.an_information}>{if_win?'true':'false'}</Text>
        <Text style={[styles.an_information,styles.timer_text]}>
          {minute<10 && '0'}{minute} : {second<10 && '0'}{second}
        </Text>
      </View>
      <BigSquare/>
      <View style={styles.extra_menu}>
          <FontAwesome5 onPress={()=>{
              if(actionHis) undo_action()
            }} style={[styles.extra_menu_option]} name='undo-alt' size={20}/>
          <FontAwesome5 onPress={()=>{update_pause_status()}} style={[styles.extra_menu_option,styles.pause_button]} size={20} name={is_pause?'play':'pause'}/>
          <Icon style={[styles.extra_menu_option, !lock_status? styles.lock_buttons:styles.unlock_buttons]} onPress={()=>{
            update_button_lock_status(!lock_status)
          }} name="md-lock-closed" size={20} />
      </View>
      
      <NumberBtnList/>

      <StatusBar style="auto" />
      
      <Modal
        animationType="fade"
        transparent={true}
        visible={(if_win || mistake_count>=5)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style ={{width: '90%', height:"45%",}}>
                  <Image
                    style ={{width: '100%', height:"100%",resizeMode:'contain'}}
                    source={{ uri : 
                      // "https://media.geeksforgeeks.org/wp-content/uploads/20220221170632/ezgifcomgifmaker1.gif"
                      (if_win && mistake_count<5)?"https://media.giphy.com/media/dxIWYNNVCxFXdP76XE/giphy.gif":"https://media.giphy.com/media/h4OGa0npayrJX2NRPT/giphy.gif"

                    }}
                  />
              </View>
              <View style ={{width: '100%', height:"22%"}}>
                <Image
                    style ={{width: '100%', height:"100%",resizeMode:'cover'}} 
                    source={{uri:
                    (if_win && mistake_count<5)?
                    "https://media.giphy.com/media/kh6WSohdbYXQcMM9lu/giphy.gif":
                    "https://media.giphy.com/media/PBDlAUpB9sN6pzobjT/giphy.gif"
                    }}/>
              </View>

              {(if_win && mistake_count<5) ? 
              <Text style={{textAlign:'center',fontSize:15}}>
                You took just &nbsp;
                <Text style={{fontWeight:'bold',color:'#00d0ff'}}>{minute<10 && '0'}{minute}:{second<10 && '0'}{second}
                </Text>
                &nbsp; minutes to win.
                {"\n"}
                That is <Text style={{fontSize:20,color:'green',fontWeight:'bold'}}>{"extraordinary"}</Text> !
              </Text> :
              <Text style={{textAlign:'center',fontSize:15,marginTop:20}}>
                <Text style={{fontSize:18,fontWeight:'bold',color:"red"}}>Sorry!</Text> You couldn't make it this time.
                {"\n"}
                Play again to <Text style={{fontSize:20,color:'purple',fontWeight:'bold'}}>{"WIN"}</Text> !
              </Text>
              }
            
              <View style={styles.modal_button_view}>
                <Pressable
                  style={[styles.modal_button]}
                  onPress={()=>{
                    navigation.navigate('LandingPage')
                  }}
                  >
                  <FontAwesome5  style={[]} size={40} name={'home'} color="#00d0ff"/>
                </Pressable>
                {/* <Pressable
                  style={[styles.modal_button]}
                  onPress={()=>{
                    // navigation.navigate('Playzone')
                  }}
                  >
                  <MaterialCommunityIcons size={40} name={"restart"} color="#00d0ff"/>
                </Pressable> */}
              </View>
              
            </View>
          </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bg_opacity_0_3:{
    opacity:0.3
  },
  extra_menu:{
    display:'flex',
    justifyContent:'space-around',
    alignItems:'center',
    flexWrap:'wrap',
    flexDirection:'row',
    height:'8%',
    width:'100%',
    padding:5,
    marginBottom:30,
  },
  extra_menu_option:{
    textAlign:'center',
    textAlignVertical:'center',
    color:'#000099',
    width:'20%',
    borderWidth:2,
    borderColor:'#000099',
    borderRadius:10,
    paddingVertical: 7,
  },
  lock_buttons:{
    borderColor:'#000099',
    backgroundColor:'transparent',
    color:"#000099"
  },
  unlock_buttons:{
    borderColor:'transparent',
    backgroundColor:'#000099',
    color:"white"
  },
  pause_button:{
    color:'#000099'
  },
  informations_container:{
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    flexWrap:'wrap',
    flexDirection:'row',
    height:'auto',
    width:'100%',
  },
  an_information:{
    flex:1,
    width:'33%',
    fontWeight:'600',
    height:'auto',
    textAlign:'center',
    textAlignVertical:'center'
  },
  text_red:{
    color:'red',
  },
  timer_text:{
    color:'#000099',
    textAlignVertical:'center',
    margin:'auto',
    fontWeight:'bold',
    fontSize:15,
    textAlign:'right',
    marginRight:12
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    display:'flex',
    alignItems: 'center',
    justifyContent:'center',
    flexDirection:'column',
    flexWrap:'nowrap',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 35,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    height:'70%',
    width:'90%'
  },
  modal_button_view:{
    display:'flex',
    justifyContent:'space-around',
    alignItems:'center',
    flexDirection:'row',
    width:'100%',
    marginTop:30,
    padding:5,
  },
  modal_button:{
    paddingHorizontal:20,
    paddingVertical:10,
    borderWidth:2,
    borderColor:'#00d0ff',
    borderRadius:15,
  }
});
