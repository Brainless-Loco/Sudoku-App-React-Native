import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SmallSquareBox from './SmallSquareBox';

export default function MediumSquare({selectedBtn,id}) {
    const x=Math.floor((id-1)/3)*3;
    const y=Math.floor(((id%3+(id%3==0)*3)-1)*3)

    const rows=[x+1,x+2,x+3]
    const cols=[y+1,y+2,y+3]


    return (
        <View style={styles.mediumSquare}>
            {
              rows.map((row)=>{
                return cols.map((col)=>{
                  return <SmallSquareBox id={row*10+col} key={row*10+col}/>
                })
              })
            }
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
    margin:0.8,
    padding:2,
    borderWidth:2,
    backgroundColor: 'white',
    borderColor:'#000099',
    borderRadius:3,
  },
});
