import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React from 'react'
import { AirbnbRating, Rating } from 'react-native-ratings';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../firebase/firebaseConfig';
import { addDoc, collection, query, where,getDocs, Timestamp, getDoc, doc } from 'firebase/firestore/lite';
import { useEffect } from 'react';
import MapView, { Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import { useIsFocused } from '@react-navigation/native';


export default function AboutTheAPP() {

    const isFocused = useIsFocused()

    const [averageRating, setaverageRating] = useState(0)
    const [review, setreview] = useState('')
    const [rating, setrating] = useState(5)
    const [hasGivenReview,sethasGivenReview] = useState(false)
    const [loading, setloading] = useState(false)
    const [countries, setcountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [cities, setCities] = useState([])
    const [cityNameLoading, setcityNameLoading] = useState(false)
    

    const allUserInfo = useSelector(state=>state.currentPlayer_info)
    const {userRef} = allUserInfo

    
    const checkIfUserHasReviewed = ()=>{
        const reviewColRef = collection(db,'reviews')
        const reviewCheckQuery = query(reviewColRef, where('userRef', '==', userRef));
        getDocs(reviewCheckQuery)
        .then((querySnapshot) => {
            if (!querySnapshot.empty) {
                sethasGivenReview(true)
            } else {
                sethasGivenReview(false)
            }
        })
        .catch((error) => {
            
            alert('Something went wrong while getting your review status')
            console.error('Error getting review documents:', error);
        });
    }

    const getAverageRating = async()=>{
        try {
            const reviewColRef = collection(db,'reviews')
            const querySnapshot = await getDocs(reviewColRef);
            let totalRating = 0;
            let reviewCount = 0;
            querySnapshot.forEach((doc) => {
                const reviewData = doc.data();
                totalRating += reviewData.rating;
                reviewCount++;
            });
            if(reviewCount==0){
                setaverageRating(0)
            }
            else{
                const avg = totalRating / reviewCount;
                setaverageRating(avg)
            }
        } 
        catch (error) {
            alert('Something went wrong while getting the average ratings!')
        }   
    }

    const fetchCountries = async () => {
      try {
        const countriesRef = collection(db,'countries');
        const querySnapshot = await getDocs(countriesRef);
        let tempCountries = []
        querySnapshot.forEach((doc) => {
            const countryData = doc.data();
            tempCountries.push(countryData)
        });
        setcountries(tempCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };


    const fetchCities = async ()=>{
        if(selectedCountry==null) return;
        const countriesRef = collection(db,'countries');
        const citiesQuery = query(countriesRef, where('name', '==', selectedCountry));
        getDocs(citiesQuery)
        .then((querySnapshot) => {
            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    const countryData = doc.data();
                    setCities(countryData.cities)
                });
                
                setcityNameLoading(false)
            } 
            else {
                //nothing found
            }
        })
        .catch((error) => {
            ///something error has been encountered
        });
    }

    useEffect(() => {
        if(isFocused){
            getAverageRating()
            checkIfUserHasReviewed()
            fetchCountries()
        }
    }, [])

    useEffect(() => {
        if(selectedCountry) {
            setcityNameLoading(true)
            fetchCities()
            setcityNameLoading(false)
        }
    }, [selectedCountry])
    

    const submitButtonAction = async ()=>{
        try{
            setloading(true)
            const reviewColRef = collection(db,'reviews')
            const docRef = await addDoc(reviewColRef,{
                'date': Timestamp.fromDate(new Date()),
                'rating':rating,
                'userRef':userRef,
                'review':review
            });
            sethasGivenReview(true)
            getAverageRating()
            setloading(false)
        }
        catch(e){
            alert('Something Went Wrong!')
            setloading(false)
            console.log(e)
        }
    }


    const handleCountryPress = (country) => {
        setSelectedCountry(country == selectedCountry ? null : country);
    };



  return (
    <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.aboutTitle}>About Sudoku Forever</Text>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            <View style={[styles.reviewingOptionContainer,{margin:10,overflow:'hidden',display:'flex',justifyContent:'center',alignItems:'center',}]}>
                <Rating showRating={false} fractions="{1}" ratingCount={10}  startingValue={averageRating} readonly  imageSize={30}/>
            </View>
            <View style={styles.mapViewContainer}>
                    <Text style={styles.aboutText}>HeadOffice</Text>
                    <MapView style={{flex:1}}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={{
                            latitude: 22.4716,
                            longitude: 91.7877,
                            latitudeDelta: 0.0222,
                            longitudeDelta: 0.0921,
                        }}
                    >
                        <Marker
                            coordinate={{ latitude: 22.4716, longitude: 91.7877 }}
                            title="Sudoku Forever"
                            description="Headoffice of Sudoku Forever"
                            />
                    </MapView>
            </View>
            <View style={styles.afterLogoView}>
                <Text style={styles.aboutText}>Sudoku Forever is being played in</Text>
                {countries.length>0 && countries.map((country) => (
                    <View key={country.id}>
                    <TouchableOpacity
                        onPress={() => handleCountryPress(country.name)}
                        style={[
                        styles.countryButton,
                        selectedCountry === country.name && styles.selectedCountryButton,
                        ]}
                    >
                        <Text style={[styles.countryButtonText,{color:country.name == selectedCountry ?'white': '#e80505'}]}>{country.name}</Text>
                    </TouchableOpacity>
                    {selectedCountry == country.name && (
                        <View style={styles.cityContainer}>
                        {cityNameLoading==true && <ActivityIndicator size={35} style={{padding:5}} color={'red'}/>}
                        {cityNameLoading==false && cities.map((city) => (
                            <Text key={city} style={styles.cityText}>&#9737; {city}</Text>
                        ))}
                        </View>
                    )}
                    </View>
                ))}
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
                
                <Text style={{margin:15,paddingBottom:10, textAlign:'right',fontSize:20,color:'#e80505', fontWeight:'bold',fontSize:25}}>
                        - Brainless Loco
                </Text>
                
                {
                    loading && <ActivityIndicator size={25} color={"#e80505"}/>
                }
                { !hasGivenReview && !loading &&
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
                            onFinishRating={(rating)=>{setrating(rating);}}
                        />
                        <TextInput value={review} multiline={true} placeholder='Write a small review' style={styles.input} onChangeText={(text)=>{setreview(text)}}>
                            
                        </TextInput>
                        <TouchableOpacity onPress={()=>submitButtonAction()} style={styles.submitButton}>
                            <Text style={{fontSize:20,color:'#e80505',fontWeight:'bold'}}>
                                {
                                loading ? <ActivityIndicator size={25} color={"#e80505"}/>:"Submit"
                                }
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
            {/* <View style={styles.afterLogoView}>
                <Text style={{color:'#2c60db',fontWeight:'500'}}>Dedicating this app to my one and only friend who is always excited about my work. {'\n'}
                </Text>
                <Image
                    style={styles.ramimma}
                    source={require('../assets/images/shoaibba.jpg')}/>
                <Text style={{color:'#e80505',fontWeight:'700'}}>{'\n'}Shoaib Ramim [19701002] 
                    <Text style={{color:'#2c60db',fontWeight:'500'}}> , this one is for you...</Text>
                </Text>
                
            </View> */}
        </ScrollView>
    </View>
  )
}



const styles = StyleSheet.create({
    container: {
        height:"100%",
        backgroundColor:'#fcfafa'
    },
    aboutTitle:{
        marginTop:15,
        textAlign:'center',
        marginTop:50,
        paddingBottom:20,
        fontSize:28,
        color:'#e80505',
        fontWeight:'600'
    },
    logo: {
        alignSelf:'center',
        color:"#0274ed",
        height:150,
        width:150,
        marginBottom:20,
    },
    afterLogoView:{
        padding:10,
        marginBottom:15,
        backgroundColor:'#fff',
        marginHorizontal:10,
        borderRadius:8,
        borderWidth:1,
        borderColor:'#e80505',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    aboutText:{
        fontSize:15,
        color:'#102487',
        fontWeight:'500',
        marginBottom:5
    },
    reviewingOptionContainer:{
        marginTop:20,
        padding:10,
        borderWidth:2,
        borderColor:'#e80505',
        borderRadius:10,
        backgroundColor:'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    input: {
        minHeight:50,
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
    },
    mapViewContainer:{
        backgroundColor:'white',
        marginVertical:10,
        marginHorizontal:8,
        padding:10,
        borderWidth:2,
        borderColor:'#e80505',
        borderRadius:10,
        height:350,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    ramimma:{
        alignSelf:'center',
        height:150,
        width:150,
        borderRadius:75,
        borderWidth:5,
        borderColor:'#e80505'
    },
    countryButton: {
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 5,
        borderRadius: 5,
        borderWidth:1,
        borderColor:'#e80505'
    },
    selectedCountryButton: {
        backgroundColor: '#e80505',
    },
    countryButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color:'white'
    },
    cityContainer: {
        marginLeft: 20,
    },
    cityText: {
        fontSize: 14,
        marginBottom: 5,
        color:'#090157',
        fontWeight:'500'
    },
})