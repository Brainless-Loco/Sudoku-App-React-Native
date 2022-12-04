import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SmallSquareBox from './SmallSquareBox';




export default function MediumSquare(props) {
    const {x,y} = props;
    const SmallSquares = [];
    let i,j;
    for(i=x*3-2;i<=x*3;i++){
        for(j=y*3-2;j<=y*3;j++){
            SmallSquares.push(<SmallSquareBox key={i*10+j}/>)
        }
    }


    return (
        <View style={styles.mediumSquare}>
            {SmallSquares}
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
    width:'26%',
    minWidth:'26%',
    margin:1,
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderWidth:2,
    backgroundColor: 'white',
    borderColor:'black',
    borderRadius:8,
  },
});
