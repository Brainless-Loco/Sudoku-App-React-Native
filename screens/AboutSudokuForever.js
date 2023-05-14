import { View, Text, ScrollView, Image, StyleSheet, Pressable, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { AirbnbRating, Rating } from 'react-native-ratings';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from '../redux/actions/Grid_actions';
import { db } from '../firebase/firebaseConfig';
import { addDoc, collection, query, where,getDocs, Timestamp } from 'firebase/firestore/lite';
import { useEffect } from 'react';



export default function AboutSudokuForever() {


    const dispatch =useDispatch()
    
    const [averageRating, setaverageRating] = useState(10)
    const [review, setreview] = useState('')
    const [rating, setrating] = useState(5)
    
    
    const reviewColRef = collection(db,'reviews')


    const {userRef} = useSelector(state=>state.currentPlayer_info)



    useEffect(() => {
        const getAverageRating = async()=>{
            const querySnapshot = await getDocs(reviewColRef);
            let totalRating = 0;
            let reviewCount = 0;
            querySnapshot.forEach((doc) => {
                const reviewData = doc.data();
            totalRating += reviewData.rating;
            reviewCount++;
            });
            const avg = totalRating / reviewCount;
            setaverageRating(avg)
        }
        getAverageRating()
    }, [])
    


    const submitButtonAction = async ()=>{
        try{
            const docRef = await addDoc(reviewColRef,{
                'date': Timestamp.fromDate(new Date()),
                'rating':rating,
                'userRef':'XXXXXXX',
                'review':review
            });
            console.log("DONE"+docRef)
        }
        catch(e){
            console.log(e)
        }
    }


  return (
    <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Image
                style={styles.logo}
                source={require('../assets/logo.png')}
            />
            <View aria-disabled={true} style={[styles.reviewingOptionContainer,{margin:10,overflow:'hidden',display:'flex',justifyContent:'center',alignItems:'center',}]}>
                <Rating showRating={false} fractions="{1}" ratingCount={10} ratingTextColor='$e80505' startingValue={averageRating}  imageSize={30}/>
            </View>
            <View style={styles.afterLogoView}>
                <Text style={styles.aboutText}>
                    Welcome to Sudoku Forever, the ultimate Sudoku game app! Dive into the addictive world of Sudoku and challenge yourself with puzzles of varying difficulties. Sharpen your logical thinking, improve your problem-solving skills, and have endless fun along the way!
                </Text>
                <Text style={styles.aboutText}>
                    With Sudoku Forever, you can compete against the clock and track your fastest solving times. Push yourself to beat your personal records and become a Sudoku master. Whether you're a beginner or an experienced player, our app offers puzzles suitable for all levels, ensuring a delightful experience for everyone.
                    </Text>
                <Text style={styles.aboutText}>
                    But that's not all! Sudoku Forever also provides valuable insights and strategies through our informative blogs. Learn the best techniques to solve puzzles efficiently, unravel the secrets of advanced solving methods, and enhance your overall gameplay. Stay up to date with the latest Sudoku trends and gain an edge over your opponents.
                </Text>
                { userRef==='' &&
                    <View style={styles.reviewingOptionContainer}>
                        <Text style={{color:'#e80505',fontWeight:'500',fontSize:19,textAlign:'center',marginBottom:5}}>Review Sudoku Forever</Text>
                        <AirbnbRating
                            count={10}
                            reviewColor='#e80505'
                            selectedColor='#e80505'
                            reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Hmm...", "Very Good", "Wow", "Amazing", "Unbelievable"]}
                            defaultRating={rating}
                            size={22}
                            reviewSize={35}
                            onFinishRating={(rating)=>{setrating(rating); console.log(rating)}}
                        />
                        <TextInput value={review} placeholder='Write a small review' style={styles.input} onChangeText={(text)=>{setreview(text)}}>
                            
                        </TextInput>
                        <TouchableOpacity onPress={()=>submitButtonAction()} style={styles.submitButton}>
                            <Text style={{fontSize:20,color:'#e80505',fontWeight:'bold'}}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </ScrollView>
    </View>
  )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        height:"100%"
    },
    logo: {
        alignSelf:'center',
        color:"#0274ed",
        height:150,
        width:150,
        marginBottom:20,
        marginTop:80
    },
    afterLogoView:{
        padding:10,
    },
    aboutText:{
        fontSize:15,
        color:'#102487',
        fontWeight:'500'
    },
    reviewingOptionContainer:{
        marginBottom:20,
        marginTop:10,
        padding:10,
        borderWidth:2,
        borderColor:'#e80505',
        borderRadius:10
    },
    input: {
        minHeight: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        color:'#5591ad',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 15,
        marginRight: 15,
        paddingLeft: 16
    },
    submitButton:{
        textAlign:'center',
        marginHorizontal:'auto',
        alignSelf:'center',
        paddingHorizontal:30,
        paddingVertical:5,
        borderWidth:2,
        borderColor:'#e80505',
        borderRadius:6,
        marginBottom:10
    }
})