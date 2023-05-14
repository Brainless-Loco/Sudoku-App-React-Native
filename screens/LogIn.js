import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from '../redux/actions/Grid_actions';
import { collection, query, where } from "firebase/firestore";

export default function LogIn({navigation}) {

    const dispatch = useDispatch()


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, seterrorMessage] = useState('')
    

    const update_user_info = (info)=>dispatch(updateUserInfo(info))



    



    const loginUser = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("email", "==", email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });


            alert("Logged In")
            
            
        } 
        catch (e) {
            if(e.code==='auth/wrong-password') seterrorMessage("Wrong Password")
            if(e.code==='auth/user-not-found') seterrorMessage('No account matches this email')
            else console.log(e)
        }
      };

    const onLoginPress = () => {
        loginUser()
        navigation.navigate('LandingPage')
    }

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
                    // disabled={password.length==0 || email.length==0}
                    style={styles.button}
                    onPress={onLoginPress}>
                    <Text style={styles.buttonTitle}>{"Log in"}</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={()=>{
                        setEmail('');
                        setPassword('');
                        navigation.navigate('SignUp')}} style={styles.footerLink}>Sign up</Text></Text>
                </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        flex:1,
        paddingTop:100
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
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    }
})