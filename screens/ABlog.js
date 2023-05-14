import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HTML from 'react-native-render-html';
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore/lite';

const Blog = ({ route,navigation }) =>{
    const storageUrl = 'sudokuforever-b9936.appspot.com';

    const getImageUrlToShow = (image)=>{
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${storageUrl}/o/${encodeURIComponent(image)}?alt=media`;
        return imageUrl

    }
    
    const [blogContents,setblogContents ] = useState({})

    const fetchBlog = async (docRef) => {
        try {
          const blogDoc = await getDoc(doc(db, 'blogs', docRef));
      
          if (blogDoc.exists()) {
            const blogData = blogDoc.data();
            setblogContents(blogData)
            const {username, profilePicUrl, title, description, likes, dislikes,  comments}= blogContents
          } else {
            console.log('Blog not found');
          }
        } catch (error) {
          console.error('Error fetching blog:', error);
        }
      }

      useEffect(() => {
        fetchBlog(route.params.blogRef)
      }, [])
      

    return(
    <ScrollView showsVerticalScrollIndicato={false} style={styles.container}>
        <View style={styles.header}>
            <Image source={{ uri: getImageUrlToShow(blogContents.profilePicUrl) }} style={styles.profilePic} />
            <Text style={styles.username}>{blogContents.username}</Text>
        </View>
        {/* <Text style={styles.title}>{title}</Text>
        <HTML source={{ html: description }} style={styles.htmlText} />
        <View style={styles.statsContainer}>
        <View style={styles.likesDislikesContainer}>
            <TouchableOpacity style={styles.iconContainer}>
            <Ionicons name="thumbs-up-outline" size={20} color="green" />
            <Text style={styles.countText}>{likesCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer}>
            <Ionicons name="thumbs-down-outline" size={20} color="red" />
            <Text style={styles.countText}>{dislikesCount}</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.commentsContainer}>
            <Ionicons name="chatbubble-outline" size={20} color="#999" />
            <Text style={styles.countText}>{comments.length}</Text>
        </View>
        </View>
        <View style={styles.commentsSection}>
        <Text style={styles.commentsHeading}>Comments</Text>
        {comments.map((comment, index) => (
            <View key={index} style={styles.commentContainer}>
            <Image source={{ uri: comment.userImage }} style={styles.commentUserImage} />
            <View style={styles.commentContent}>
                <Text style={styles.commentUsername}>{comment.username}</Text>
                <Text style={styles.commentText}>{comment.text}</Text>
            </View>
            </View>
        ))}
        </View> */}
    </ScrollView>
)};

const styles = {
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop:50,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
  htmlText: {
    fontSize: 14,
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  likesDislikesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
 
  countText: {
    marginLeft: 5,
    fontSize: 14,
  },
  commentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentsSection: {
    marginTop: 10,
  },
  commentsHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  commentUserImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentUsername: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
  },
};

export default Blog;
