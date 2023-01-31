import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MediumSquare from './MediumSquare';
import SudokuRow from './SudokuRow';




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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection:'row',
    height:'50%',
    maxHeight:'60%',
    width:'auto',
    maxWidth:'100%',
    backgroundColor: 'transparent'
  },
  row: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    color:"white",
    width: '100%',
  }
});
