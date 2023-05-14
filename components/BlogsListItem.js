import React from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BlogListItem = ({navigation, blogRef, profilePic, userName, title, likeCount, dislikeCount, commentsCount }) => {

  
  const storageUrl = 'sudokuforever-b9936.appspot.com';

  const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${storageUrl}/o/${encodeURIComponent(profilePic)}?alt=media`;


  const navigateToABlog = ()=>{
    navigation.navigate('ABlog',{blogRef:blogRef})
  }
  
  return(
    <Pressable style={styles.blogContainer} onPress={()=>{navigateToABlog()}}>
      <Image source={{uri:imageUrl}} style={styles.profilePic} />
      <View style={styles.blogContent}>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.likeDislikeContainer}>
            <TouchableOpacity style={styles.iconContainer}>
              <Ionicons name="thumbs-up-outline" size={20} color="green" />
              <Text style={styles.countText}>{likeCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer}>
              <Ionicons name="thumbs-down-outline" size={20} color="red" />
              <Text style={styles.countText}>{dislikeCount}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.commentsContainer}>
            <Ionicons name="chatbubble-outline" size={20} color="#999" />
            <Text style={styles.countText}>{commentsCount}</Text>
          </View>
        </View>
      </View>
    </Pressable>
)};

const styles = {
  blogContainer: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  blogContent: {
    marginLeft: 10,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    marginBottom: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  likeDislikeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  commentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    marginLeft: 5,
    fontSize: 14,
  },
};

export default BlogListItem;
