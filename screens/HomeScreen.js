import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig';


const HomeScreen = ({navigation}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const navigateToAnotherScreen = (screenRoute)=>{
        navigation.navigate(screenRoute);
  }

  const signOutBtn = ()=>{
    signOut(auth)
    navigation.navigate('LogIn')
  }

  return (
    <View style={styles.appContainer} showsVerticalScrollIndicator={false}>
        <Image
            style={styles.logo}
            source={require('../assets/logo.png')}
        />
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.title}>Sudoku Forever</Text>
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>{navigateToAnotherScreen('LandingPage')}} style={styles.navigationBtn}>
                <Text style={styles.btnText}>
                    <Ionicons name="game-controller" size={18} color="#e80505" />
                    &nbsp;Playzone
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{navigateToAnotherScreen('AllBlogLists')}} style={styles.navigationBtn}>
                <Text style={styles.btnText}>
                    <MaterialCommunityIcons name="post-outline" size={18} color="#e80505" />
                    &nbsp;Blogs
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleDropdown} style={styles.navigationBtn}>
                <Text style={styles.btnText}>
                    <Feather name="chevron-down" size={20} color="#e80505" />
                    &nbsp;Others
                </Text>
            </TouchableOpacity>
                {isOpen && (
                <View style={styles.dropdownList}>
                    <TouchableOpacity onPress={()=>{navigateToAnotherScreen('About')}} style={styles.dropdownListItem}>
                        <Text style={styles.dropdownListItemText}>
                            <FontAwesome name="question-circle" size={18} color="#e80505" />
                            &nbsp; About
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{navigateToAnotherScreen('HowToPlay')}} style={styles.dropdownListItem}>
                        <Text style={styles.dropdownListItemText}>
                        <Ionicons name="md-game-controller-outline" size={18} color="#e80505" />
                            &nbsp; How to Play
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{navigateToAnotherScreen('WriteABlog')}} style={styles.dropdownListItem}>
                        <Text style={styles.dropdownListItemText}>
                            <FontAwesome name="pencil-square-o" size={18} color="#e80505" />
                            &nbsp; Write Blog
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{navigateToAnotherScreen('Profile')}} style={styles.dropdownListItem}>
                        <Text style={styles.dropdownListItemText}>
                            <Ionicons name="person" size={18} color="#e80505" />
                            &nbsp; Profile
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{signOutBtn()}} style={styles.dropdownListItem}>
                        <Text style={styles.dropdownListItemText}>
                            <Entypo name="log-out" size={18} color="#e80505" />
                            &nbsp; Log Out
                        </Text>
                    </TouchableOpacity>
                </View>
                )}
            </View>
      
    </View>
  );
};

const App = () => {
  return (
    <View style={styles.appContainer}>
      <Dropdown />
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  container: {
    display:'flex',
    alignItems:'center',
  },
  logo: {
    alignSelf:'center',
    color:"#0274ed",
    height:150,
    width:150,
    marginBottom:20,
    marginTop:80
    },
    welcomeText:{
        fontSize:18,
        color:'#082275',
        fontWeight:'500',
        textAlign:'center'
    },
    title:{
        color:'#e80505',
        fontSize:25,
        fontWeight:'700',
        marginBottom:20,
        textAlign:'center'
    },
 navigationBtn: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    width:'70%',
    marginVertical:3,
    borderWidth:0.5,
    borderColor:'#e80505',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  btnText: {
    fontSize: 16,
    textAlign:'center',
    fontWeight:'bold',
    color:'#e80505'
  },
  dropdownList: {
    width:'100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginTop: 5,
    textAlign:'center',
    display:'flex',
    alignItems:'center'
  },
  dropdownListItem: {
    padding: 10,
    backgroundColor:'white',
    width:'55%',
    marginBottom:2,
    shadowColor: '#e80505',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,

  },
  dropdownListItemText: {
    fontSize: 16,
    textAlign:'center',
    color:'#e80505',
    fontWeight:'500'
  },
});

export default HomeScreen;
