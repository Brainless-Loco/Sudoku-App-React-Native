import moment from 'moment';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import { useSelector } from 'react-redux';
import { db } from '../firebase/firebaseConfig';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore/lite';

const WriteABlog = ({navigation}) => {

  const editorRef = useRef(null);


  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');


  const handleHead = ({tintColor}) => <Text style={{color: tintColor}}>H1</Text>

  const {userRef,userProfilePic,userEmail,userName} = useSelector(state=>state.currentPlayer_info)



  const postABlog = async ()=>{
    
    if(title.trim().length>0 && content.trim().length>0){
        setTitle(title.trim())
        setContent(content.trim())
        const date = moment();
        const formattedDate = date.format('hh:mm:ss DD MMMM, YYYY');

        const blogData = {
            comments:[],
            likes:[],
            dislikes:[],
            username:userName,
            profilePicUrl:userProfilePic,
            title:title,
            date:formattedDate,
            description:content
        }
        try {
            const blogsRef = collection(db, 'blogs');
            const {id} = await addDoc(blogsRef, blogData);
            updateDoc(doc(db,'blogs',id),{
                blogRef:id
            })
            alert("Your Blog has been published!")
            setTitle('')
            setContent('')
            navigation.navigate('AllBlogLists')
          } 
          catch (error) {
            alert("Something Went Wrong! :(")
            console.error('Error adding blog:', error);
          }
    }
    else if(title.trim().length<1){
        alert('Please write a title first')
    }
    else{
        alert('Please write something minimum for your blog content')
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Write a Blog</Text>
      <TextInput value={title} onChangeText={(text)=>setTitle(text)} style={styles.input} placeholder='Title of the Blog..'/>
      <View style={styles.editorContainer}>
        <RichToolbar
            editor={editorRef}
            actions={[ actions.setBold, actions.setItalic, actions.setUnderline,actions.heading1,actions.insertLink, actions.insertBulletsList,actions.insertOrderedList,actions.code,actions.checkboxList,actions.undo,actions.redo, ]}
            iconMap={{ [actions.heading1]: handleHead }}
            selectedIconTint="#000"
            disabledIconTint="#bfbfbf"
            style={{marginBottom:10}}
        />
        <RichEditor
            useContainer={false}
            value={content}
            ref={editorRef}
            style={[styles.editor]}
            placeholder='Write your blog here...'
            onChange={ descriptionText => {
                setContent(descriptionText);
            }}
        />
        </View>

      
      <TouchableOpacity onPress={postABlog} style={styles.postButton}>
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    paddingVertical:50
  },
  title: {
    color:'#e80505',
    fontSize:30,
    fontWeight:'bold',
    marginBottom:15
  },
  input: {
    height: 40,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor:'white',
    borderRadius:8
  },
  editorContainer:{
    borderRadius:10,
    overflow:'hidden',
  },
  editor: {
    minHeight:350,
  },
  postButton: {
    backgroundColor: 'blue',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginVertical:30,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WriteABlog;
