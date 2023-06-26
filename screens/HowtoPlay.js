import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react'
import { WebView } from 'react-native-webview';

export default function HowtoPlay() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Sudoku Tips and Tricks</Text>

        <View style={styles.YTcontainer}>
            <WebView
                style={styles.video}
                javaScriptEnabled={true}
                source={{ uri: 'https://www.youtube.com/embed/8zRXDsGydeQ' }}
            />
        </View>


        <Text style={styles.subHeading}>Introduction</Text>
        <Text style={styles.paragraph}>
          Sudoku is a popular logic-based number puzzle. The goal is to fill a 9x9 grid with digits
          so that each column, each row, and each of the nine 3x3 subgrids contains all of the
          digits from 1 to 9. Here are some simple yet effective tips and tricks to help you solve
          Sudoku puzzles more efficiently.
        </Text>
        <Text style={styles.subHeading}>1. Start with the Easy Numbers</Text>
        <Text style={styles.paragraph}>
          Begin by identifying the easily solvable numbers. Look for cells with single-digit
          possibilities and fill them in. This will help you uncover more numbers as you progress.
        </Text>
        <Text style={styles.subHeading}>2. Use the "What's Missing?" Approach</Text>
        <Text style={styles.paragraph}>
          Focus on each number individually and scan rows, columns, and boxes to identify missing
          digits. By narrowing down the possibilities, you can make more informed choices for each
          cell.
        </Text>
        <Text style={styles.subHeading}>3. Apply the Elimination Technique</Text>
        <Text style={styles.paragraph}>
          Look for cells that have limited possibilities. Cross out numbers that are already present
          in the same row, column, or box. This process of elimination will help you determine the
          correct value for each cell.
        </Text>
        <Text style={styles.subHeading}>4. Utilize the "What's Left?" Strategy</Text>
        <Text style={styles.paragraph}>
          Once you have filled in all the easily solvable cells, focus on the remaining numbers and
          scan rows, columns, and boxes to identify possible locations. This approach helps you
          narrow down the options and make logical deductions.
        </Text>
        <Text style={styles.subHeading}>5. Practice and Patience</Text>
        <Text style={styles.paragraph}>
          Sudoku requires practice to sharpen your skills. With time and patience, you will develop
          a better understanding of the patterns and strategies involved in solving Sudoku puzzles.
        </Text>
        <Text style={styles.subHeading}>Conclusion</Text>
        <Text style={styles.paragraph}>
          Sudoku is an engaging puzzle that can be mastered with the right techniques. By applying
          the tips and tricks mentioned above and practicing regularly, you'll become a Sudoku
          pro! Happy solving!
        </Text>
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
    },
    heading: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 10,
      color:'#b30e14',
      paddingTop: 30,
    },
    YTcontainer:{
        flex:1
    },
    video: {
        flex: 1,
        height:200,
        width:'100%'
    },
    subHeading: {
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 12,
      color:'#e80505'
    },
    paragraph: {    
        fontSize: 16,
        marginBottom: 12,
      },
    });
    