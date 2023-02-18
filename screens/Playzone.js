import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BigSquare from '../components/BigSquare'
import NumberBtnList from '../components/NumberBtnList';
import { useDispatch, useSelector } from 'react-redux'
import Icon  from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { change_button_lock_status, undo_from_action_history } from '../redux/actions/Grid_actions';


export default function Playzone({ navigation}) {
    
  const dispatch = useDispatch()
  
  const update_button_lock_status = (status)=> dispatch(change_button_lock_status(status))
  const undo_action = ()=> dispatch(undo_from_action_history())
  
  const lock_status = useSelector(state=>state.is_Num_Button_Locked)
  const locked_index = useSelector(state=>state.selected_small_square_index)
  const selected_Button = useSelector(state => state.selected_Button)
  const actionHis = useSelector(state=>state.action_history.length)
  
  return (
    <View style={styles.container}>
      <Text>{selected_Button}</Text>
      <Text>{locked_index}</Text>
      <BigSquare/>
      <View style={styles.extra_menu}>
          <FontAwesome5 onPress={()=>{
              if(actionHis) undo_action()
            }} style={[styles.extra_menu_option]} name='undo-alt' size={20}/>
          <FontAwesome5 style={[styles.extra_menu_option,styles.pause_button]} size={20} name='pause'/>
          <Icon style={[styles.extra_menu_option, !lock_status? styles.lock_buttons:styles.unlock_buttons]} onPress={()=>{
            update_button_lock_status(!lock_status)
          }} name="md-lock-closed" size={20} />
      </View>
      
      <NumberBtnList/>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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
  }
});
