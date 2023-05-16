import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import BlogListItem from '../components/BlogsListItem';
import { Timestamp, addDoc, collection, doc, updateDoc,query, where,getDocs } from 'firebase/firestore/lite';
import { db } from '../firebase/firebaseConfig';
import { useIsFocused } from '@react-navigation/native';


const BlogList = ({navigation}) => {

  
  const isFocused = useIsFocused();

  const blogData = [
    {
      id: 1,
      profilePic: require('../assets/images/avatar.png'),
      userName: 'John Doe',
      title: 'Amazing Blog Post',
      likeCount: 10,
      dislikeCount: 2,
      commentsCount:10,
    },
    {
      id: 2,
      profilePic: require('../assets/images/avatar.png'),
      userName: 'Jane Smith',
      title: 'Awesome Blog Article',
      likeCount: 15,
      dislikeCount: 5,
      commentsCount:10,
    }
  ];

  const [blogsList, setblogsList] = useState([])

  const fetchBlogs = async ()=>{
    const blogsRef = collection(db, 'blogs');
    const snapshot = await getDocs(blogsRef);
    
    const blogs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setblogsList(blogs)
  }

  useEffect(() => {
    isFocused && fetchBlogs()
  }, [isFocused])
  

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop:50,paddingHorizontal:10, flex: 1}}>
      <Text style={styles.HeaderTitle}>Blogs</Text>
      {blogsList.map((item) => (
        <BlogListItem
          navigation={navigation}
          key={item.id}
          blogRef={item.blogRef}
          profilePic={item.profilePicUrl}
          userName={item.username}
          title={item.title}
          likeCount={item.likes.length}
          dislikeCount={item.dislikes.length}
          commentsCount={item.comments.length}
          date={item.date}
        />
      ))}
      {/* <View style={{flex:1,justifyContent:'center',height:'auto',alignItems:'center'}}>

        <ActivityIndicator size={100}/>
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  HeaderTitle:{
    color:'#e80505',
    fontSize:30,
    fontWeight:'bold',
    marginBottom:15
  }
})

export default BlogList;
