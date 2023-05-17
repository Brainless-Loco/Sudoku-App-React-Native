import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import BlogListItem from '../components/BlogsListItem';
import { collection, query,getDocs, orderBy, limit, startAfter } from 'firebase/firestore/lite';
import { db } from '../firebase/firebaseConfig';
import { useIsFocused } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';


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
  const [lastBlogRef, setlastBlogRef] = useState(null)
  const [endOfAllBlogs, setendOfAllBlogs] = useState(false)
  const [loading, setloading] = useState(false)

  const fetchBlogs = async ()=>{
    const blogsRef = collection(db, 'blogs');
    const snapshot = await getDocs(blogsRef);
    
    const blogs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setblogsList(blogs)
  }

  const FetchFewBlogs = async () => {
    try {
      setloading(true)
      const blogsRef = collection(db, 'blogs');
      let blogQuery = query(blogsRef, orderBy('blogRef'), limit(2));

      if (lastBlogRef) {
        blogQuery = query(blogQuery, startAfter(lastBlogRef));
      }

      const querySnapshot = await getDocs(blogQuery);

      if(querySnapshot.size<1){
        setendOfAllBlogs(true);
      }
      else{
        const newBlogs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setblogsList([...blogsList, ...newBlogs])
        setlastBlogRef(newBlogs[newBlogs.length-1].blogRef)
      }
      setloading(false)
      
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const getPrevFetchedBlogsReloaded =  async ()=>{
    try {
      setloading(true)
      const blogsRef = collection(db, 'blogs');
      let blogQuery = query(blogsRef, orderBy('blogRef'), limit(blogsList.length));

      const querySnapshot = await getDocs(blogQuery);

      if(querySnapshot.size<1){
        setendOfAllBlogs(true);
      }
      else{
        const newBlogs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setblogsList([...newBlogs])
        setlastBlogRef(newBlogs[newBlogs.length-1].blogRef)
      }
      setloading(false)
      
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  }

  useEffect(() => {
    if(isFocused && blogsList.length>0){
      ///
      getPrevFetchedBlogsReloaded()
    }
    else if(blogsList.length==0) FetchFewBlogs()
  }, [isFocused])

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop:10,paddingHorizontal:10, flex: 1,paddingBottom:50}}>
      
      <Text style={styles.HeaderTitle}>Blogs</Text>
      {
        blogsList.length==0 && <ActivityIndicator size={40} color={"#e80505"}/>
      }
      {blogsList.length>0 &&  blogsList.map((item) => (
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
      {
        loading&&<ActivityIndicator color={'#e80505'} size={25}/>
      }
      {endOfAllBlogs==true?
        <Text style={{textAlign:'center',fontSize:15,color:'red',fontWeight:'bold'}}>End of all Blogs :'(</Text>:
        <TouchableOpacity style={styles.buttonContainer} onPress={FetchFewBlogs}>
          <Feather name="chevron-down" size={24} color="white" />
          <Text style={styles.buttonText}>Load More</Text>
        </TouchableOpacity>
      }
      <View style={{flex:1,justifyContent:'center',height:'auto',alignItems:'center',paddingBottom:50,paddingTop:20}}>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  HeaderTitle:{
    color:'#e80505',
    fontSize:30,
    fontWeight:'bold',
    marginBottom:15
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e80505',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
})

export default BlogList;
