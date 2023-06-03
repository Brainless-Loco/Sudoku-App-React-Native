import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,Modal } from 'react-native'
import { auth, db } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from '../redux/actions/Grid_actions';
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';



export default function LogIn({navigation}) {

    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, seterrorMessage] = useState('')
    const [loading, setloading] = useState(false)
    const [loggedInStatus, setloggedInStatus] = useState(false)
    const [welcomeUserName, setwelcomeUserName] = useState('')
    

    const update_user_info = (info)=>dispatch(updateUserInfo(info))


    const loginUser = async () => {
        try {
            setloading(true)
            setEmail(email.trim())
            const { user } =await signInWithEmailAndPassword(auth, email, password);
            if(user.emailVerified){
                const usersRef = collection(db, "users");
                const q = query(usersRef, where("email", "==", email));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    const userData = doc.data();
                    const {userName,user_id,email,dp_url}=userData
                    const loggedUserInfo = {
                        userRef:user_id,
                        userEmail:email,
                        userName:userName,
                        userProfilePic:dp_url
                    }
                    setwelcomeUserName(userName)
                    const loggedUserInfoString = JSON.stringify(loggedUserInfo);
                    AsyncStorage.setItem('userData', loggedUserInfoString)
                    .then(() => {
                        console.log('Data stored successfully!');
                    })
                    .catch((error) => {
                        console.log('Error storing data:', error);
                    });
                    update_user_info(loggedUserInfo)
                    setloading(false)
                    setloggedInStatus(true)
                    setEmail('')
                    setPassword('')
                });
            }
            else{
                alert("Please verify your email first.")
            }
            setloading(false)
        } 
        catch (e) {
            if(e.code==='auth/wrong-password') seterrorMessage("Wrong Password")
            if(e.code==='auth/user-not-found') seterrorMessage('No account matches this email')
            else console.log(e)
            setloading(false)
        }
      };

    const onLoginPress = () => {
        loginUser()
    }
    useEffect(() => {
        const checkLoggedIn = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
              const parsedUserData = JSON.parse(userData);
              update_user_info(parsedUserData)
              navigation.replace('HomeScreen')
            } else {
              // User data doesn't exist, show login screen
              // or redirect to the login page
            }
          };
          checkLoggedIn()
    }, [])
    

    

    return (
        <ScrollView style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../assets/logo.png')}
            />
            <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => {setEmail(text);  seterrorMessage('');}}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => {setPassword(text); seterrorMessage('')}}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {errorMessage.length>0 && <Text style={{color:'red',textAlign:'center'}}>*{errorMessage}*</Text>}
                <TouchableOpacity
                    disabled={password.length==0 || email.length==0}
                    style={styles.button}
                    onPress={onLoginPress}>
                    <Text style={styles.buttonTitle}>
                        {loading? <ActivityIndicator size={18} color={"#fff"}/>: "Log in"}
                    </Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={()=>{
                        setEmail('');
                        setPassword('');
                        navigation.navigate('SignUp')}} style={styles.footerLink}>Sign up</Text></Text>
                </View>

                <Modal
                    visible={loggedInStatus}
                    animationType="fade"
                    transparent={true}
                    >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Ionicons name="md-person" size={64} color="#e80505" />
                            <Text style={styles.welcomeText}>
                                Welcome, <Text style={styles.usernameText}>{welcomeUserName}</Text>!
                            </Text>
                            <TouchableOpacity style={styles.cancelButton} 
                                onPress={()=>{setloggedInStatus(false); 
                                navigation.replace('HomeScreen');
                            }}
                            >
                                <Text style={styles.cancelButtonText}>Enter the Arena</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                    
                </Modal>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        flex:1,
        paddingTop:30
    },
    title: {
        fontSize:22,
        fontWeight:'600',
        fontStyle:'italic',
        marginBottom:20
    },
    logo: {
        alignSelf:'center',
        color:"#0274ed",
        height:150,
        width:150,
        marginBottom:50
    },
    input: {
        height: 48,
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
    button: {
        backgroundColor: '#e80505',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#e80505",
        fontWeight: "bold",
        fontSize: 16
    },


    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
        width:'90%'
      },
      welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
      },
      usernameText: {
        color: '#e80505',
      },
      cancelButton: {
        marginTop: 20,
        backgroundColor: '#e80505',
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 4,
        width:'80%'
      },
      cancelButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
})