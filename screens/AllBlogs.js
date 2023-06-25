import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import BlogListItem from '../components/BlogsListItem';
import { collection, query,getDocs, orderBy, limit, startAfter, endBefore, limitToLast } from 'firebase/firestore/lite';
import { db } from '../firebase/firebaseConfig';
import { useIsFocused } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


const BlogList = ({navigation}) => {

  
  const isFocused = useIsFocused();

  
  const blogsRef = collection(db, 'blogs');

  const [blogsList, setblogsList] = useState([])
  const [lastBlogRef, setlastBlogRef] = useState(null)
  const [lastPrevBlogRef, setlastPrevBlogRef] = useState(null)
  const [endOfAllBlogs, setendOfAllBlogs] = useState(false)
  const [loading, setloading] = useState(false)
  const [firstBlogReached, setfirstBlogReached] = useState(true)

  const FetchFewBlogs = async () => {
    try {
      setloading(true)
      setfirstBlogReached(false)
      let blogQuery = query(blogsRef, orderBy('blogRef'), limit(3));
      if (lastBlogRef) {
        blogQuery = query(blogQuery, startAfter(lastBlogRef));
      }

      const querySnapshot = await getDocs(blogQuery);

      if(querySnapshot.size<1){
        setendOfAllBlogs(true);
      }
      else{
        const newBlogs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setblogsList(newBlogs)
        setlastPrevBlogRef(newBlogs[0].blogRef)
        setlastBlogRef(newBlogs[newBlogs.length-1].blogRef)
      }
      setloading(false)
      
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const FetchPrevTwoBlogs = async () => {
    try {
      setloading(true);
      setendOfAllBlogs(false)
      
      let blogQuery = query(blogsRef, orderBy('blogRef'), limitToLast(3));

      if (lastBlogRef) {
        blogQuery = query(blogQuery, endBefore(lastPrevBlogRef));
      }
  
      const querySnapshot = await getDocs(blogQuery);
  
      if (querySnapshot.size < 1) {
        setfirstBlogReached(true)
      } 
      else {
        const newBlogs = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }));
        setblogsList(newBlogs);
        setlastBlogRef(newBlogs[newBlogs.length-1].blogRef)
        setlastPrevBlogRef(newBlogs[0].blogRef);
      }
      setloading(false);
    } catch (error) {
      console.error('Error fetching previous blogs:', error);
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
        setlastPrevBlogRef(newBlogs[0])
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
        loading && <ActivityIndicator size={40} style={{height:350}} color={"#e80505"}/>
      }
      {!loading && blogsList.length>0 &&  blogsList.map((item) => (
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
      {/* {endOfAllBlogs==true?
        <Text style={{textAlign:'center',fontSize:15,color:'red',fontWeight:'bold'}}>End of all Blogs :'(</Text>:
        <TouchableOpacity style={styles.buttonContainer} onPress={FetchFewBlogs}>
          <Feather name="chevron-down" size={24} color="white" />
          <Text style={styles.buttonText}>Load More</Text>
        </TouchableOpacity>
      } */}
      <View style={{flex:1,justifyContent:'space-between',height:'auto',alignItems:'center',paddingBottom:50,paddingTop:20,flexDirection:'row'}}>
        <TouchableOpacity disabled={firstBlogReached==true?true:false} style={[styles.buttonContainer,{borderTopRightRadius:0,borderBottomRightRadius:0}]} onPress={FetchPrevTwoBlogs}>
            <AntDesign name="doubleleft" size={18} color="white" />
            <Text style={styles.buttonText}>&nbsp;Prev</Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={endOfAllBlogs} style={[styles.buttonContainer,{borderTopLeftRadius:0,borderBottomLeftRadius:0}]} onPress={FetchFewBlogs}>
            <Text style={styles.buttonText}>Next&nbsp;</Text>
            <AntDesign name="doubleright" size={18} color="white" />
          </TouchableOpacity>
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
  },
})

export default BlogList;
