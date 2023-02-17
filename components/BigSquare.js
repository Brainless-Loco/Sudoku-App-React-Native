import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MediumSquare from './MediumSquare';




export default function BigSquare({selectedBtn}) {


  const MediumComp = [1,2,3,4,5,6,7,8,9];

  let i,j;

  return (
    <View style={styles.bigSquare}>
      {MediumComp.map((item)=>{
        return <MediumSquare selectedBtn={selectedBtn} id={item} key={item}/>
      })}
    <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  bigSquare: {
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection:'row',
    height:'auto',
    maxHeight:'60%',
    width:'auto',
    maxWidth:'100%',
    paddingVertical:'2%',
  },
  row: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    color:"white",
    width: '100%',
  }
});
