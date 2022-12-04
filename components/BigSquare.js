import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MediumSquare from './MediumSquare';




export default function BigSquare() {


  const MediumComp = [];
  let i,j;
  for(i=1;i<=3;i++){
    for(j=1;j<=3;j++){
        MediumComp.push(<MediumSquare x={i} y={j} key={i*100+j*10}/>)
    }
  }


  return (
    <View style={styles.bigSquare}>
    {MediumComp}
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
    height:'auto',
    maxHeight:'70%',
    width:'auto',
    maxWidth:'100%',
    backgroundColor: 'transparent',
    borderColor:'white',
    borderWidth:1,
  },
  
});
