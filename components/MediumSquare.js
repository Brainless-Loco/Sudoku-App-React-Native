import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SmallSquareBox from './SmallSquareBox';




export default function MediumSquare({selectedBtn}) {
    const SmallSquares = [1,2,3,4,5,6,7,8,9];


    return (
        <View style={styles.mediumSquare}>
            {SmallSquares.map((item)=>{
                return <SmallSquareBox selectedBtn={selectedBtn} key={item*10}/>
            })}
        <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
  mediumSquare: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    flexWrap:'wrap',
    height:'auto',
    width:'30%',
    minWidth:'26%',
    margin:1,
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderWidth:2,
    backgroundColor: 'white',
    borderColor:'black',
    borderRadius:5,
  },
});
