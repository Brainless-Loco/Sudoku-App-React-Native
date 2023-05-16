import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Dimensions,ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { collection, doc, getDoc, onSnapshot, query, where, arrayUnion, updateDoc, arrayRemove } from 'firebase/firestore/lite';
import { db } from '../firebase/firebaseConfig';
import HTML from 'react-native-render-html';    
import { AntDesign } from '@expo/vector-icons';
import HRline from '../components/HRline'
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

const BlogUI = ({ navigation, route }) => {
  
    const blogDoc = doc(db,'blogs',route.params.blogRef);

    const [blogData, setBlogData] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentInput, setcommentInput] = useState('')
    const [likes, setlikes] = useState([])
    const [dislikes, setdislikes] = useState([])

    const {userRef,userProfilePic,userEmail,userName} = useSelector(state=>state.currentPlayer_info)


    const contentWidth = Dimensions.get('window').width;
    
    const fetchBlogData = async () => {
        try {
            const blogDoc = await getDoc(doc(db, 'blogs', route.params.blogRef));
            const TempBlogData = blogDoc.data()
            setBlogData(TempBlogData);
            setComments(TempBlogData.comments);
            setlikes(TempBlogData.likes)
            setdislikes(TempBlogData.dislikes)
        } catch (error) {
            console.error('Error fetching blog data:', error);
        }
    };

    const getImageUrlToShow = (image)=>{
        const storageUrl = 'sudokuforever-b9936.appspot.com';
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${storageUrl}/o/${encodeURIComponent(image)}?alt=media`;
        return imageUrl
  
    }

    const AddANewComment = async ()=>{
      const date = moment();
      const formattedDate = date.format('hh:mm:ss DD MMMM, YYYY');

      const newCommentInfo = {
        "commentText":commentInput,
        "userProfilePic":userProfilePic,
        "userRef":userRef,
        "username":userName,
        "date": formattedDate
      }
      try {
        await updateDoc(blogDoc, {
          comments: [...comments,newCommentInfo]
        });
        setComments([...comments,newCommentInfo])
        setcommentInput('')
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }

    const removeLike = async ()=>{
      try {
        await updateDoc(blogDoc, {
          likes:arrayRemove(userRef)
        });
        const tempLikes = likes.filter(item=>item!=userRef)
        setlikes(tempLikes)
        
      } catch (error) {
        console.error('Error removing likes:', error);
      }
    }

    const addLike = async()=>{
      try {
        await updateDoc(blogDoc, {
          likes:arrayUnion(userRef)
        })
        setlikes([...likes,userRef])
      } 
      catch (error) {
        console.error('Error adding likes:', error);
      }
    }

    const removeDislike = async()=>{
      try {
        await updateDoc(blogDoc, {
          dislikes:arrayRemove(userRef)
        });
        const tempDislikes = dislikes.filter(item=>item!=userRef)
        setdislikes(tempDislikes)
        
      } catch (error) {
        console.error('Error removing dislikes:', error);
      }
    }

    const addDislike =  async()=>{
      try {
        await updateDoc(blogDoc, {
          dislikes:arrayUnion(userRef)
        })
        setdislikes([...dislikes,userRef])
      } 
      catch (error) {
        console.error('Error adding dislikes:', error);
      }
    }

    const newLikeOrRemoveLike = ()=>{
      if(likes.includes(userRef)==true){  ///Remove the Like
        removeLike()
      }
      else{ ///new Like + remove dislike
        addLike()
        removeDislike()
      }
    }

    const newDislikeOrRemoveDislike = ()=>{
      if(dislikes.includes(userRef)==true){
        removeDislike()
      }
      else{
        addDislike()
        removeLike()
      }
    }
    
    useEffect(() => {
        fetchBlogData();
        
    }, [route.params.blogRef]);
    


  const renderComment = (comment) => {
    return (
      <View key={comment.date} style={styles.commentContainer}>
        <Image source={{ uri: getImageUrlToShow(comment.userProfilePic)}} style={styles.commentAuthorImage} />
        <View style={styles.commentContent}>
          <Text style={styles.commentAuthor}>{comment.username}
          </Text>
          <Text style={{fontSize:10,color:'gray',fontWeight:'bold',marginTop:-3,padding:0}}>{comment.date.slice(0,5)+' '+comment.date.slice(8)}</Text>
          
          <Text style={styles.commentText}>{comment.commentText}</Text>
        </View>
      </View>
    );
  };

  if (!blogData) {
    return <Text style={{textAlign:'center',verticalAlign:'middle'}}>Loading blog...</Text>;
  }

  return (
    <ScrollView style={styles.container}  showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image source={{ uri: getImageUrlToShow(blogData.profilePicUrl) }} style={styles.authorImage} />
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{blogData.username}</Text>
          <Text style={styles.date}>{blogData.date}</Text>
        </View>
      </View>
      
      <View style={styles.blogContent}>
        <Text style={styles.title}>{blogData.title}</Text>
        <HTML source={{ html: blogData.description }} tagsStyles={{body:{minHeight:250},a:{textDecorationLine:'none',fontWeight:'600'}}} contentWidth={contentWidth}/>
      </View>
      
      <HRline/>
      <View style={styles.actions}>
        <TouchableOpacity onPress={newLikeOrRemoveLike} style={[styles.likeDislikeCommentBtn]}>
          {
            likes.includes(userRef)==true?
              <AntDesign name="like1" size={20} color="blue" />:
              <Feather name="thumbs-up" size={20} color="blue" />
          }
          <Text style={styles.likeDislikeCount}>({likes.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={newDislikeOrRemoveDislike} style={[styles.likeDislikeCommentBtn]}>
          {
            dislikes.includes(userRef)==true?
            <AntDesign name="dislike1" size={20} color="#db190b" />:
            <Feather name="thumbs-down" size={20} color="red" />
          }
          <Text style={styles.likeDislikeCount}>({dislikes.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.likeDislikeCommentBtn]}>
          <Feather name="message-circle" size={20} color="black" />
          <Text style={styles.likeDislikeCount}>({comments.length})</Text>
        </TouchableOpacity>
      </View>
      <HRline/>
      <View style={styles.commentsContainer}>
        <Text style={styles.commentsHeading}>Comments</Text>
        {comments.map((comment) => renderComment(comment))}
      </View>
      <View style={styles.commentBox}>
        <Image source={{ uri: getImageUrlToShow(userProfilePic) }} style={styles.commentBoxImage} />
        <TextInput style={styles.commentInput} multiline={true} value={commentInput} onChangeText={(text)=>setcommentInput(text)} placeholder="Add a comment..." />
        <TouchableOpacity style={styles.commentSubmitButton} disabled={commentInput.trim().length==0} onPress={AddANewComment}>
          <Ionicons name="send" size={24} color="#221b7d" />
        </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };
  
export default BlogUI;
  
  const styles = {
    container: {
      flex: 1,
      paddingHorizontal: 8,
      paddingTop:50,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    authorImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 8,
    },
    authorInfo: {
      flex: 1,
    },
    authorName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    date: {
      fontSize: 12,
      color: 'gray',
    },
    blogContent: {
      marginBottom: 16,
      width:'100%',
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 8,
      color:'#e80505',
      borderTopColor:'#adacac',
      borderWidth:1,
      paddingVertical:6,
      borderBottomColor:'#adacac',
      borderRightColor:'transparent',
      borderLeftColor:'transparent'
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical:8,
      justifyContent:'space-evenly',
    },
    likeDislikeCommentBtn:{
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth:1,
      width:'30%',
      justifyContent:'center',
      paddingVertical:5,
      borderRadius:20,
      backgroundColor:'white'
    },
    likeDislikeCount: {
      marginLeft: 4,
      fontWeight:'bold'
    },
    commentsContainer: {
      marginBottom: 10,
      minHeight:210
    },
    commentsHeading: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      color:'#1a1370'
    },
    commentContainer: {
      flexDirection: 'row',
      marginVertical: 4,
    },
    commentAuthorImage: {
      width: 35,
      height: 35,
      borderRadius: 17.5,
      marginRight: 8,
      marginTop:4
    },
    commentContent: {
      flex: 1,
    },
    commentAuthor: {
        color:'#250994',
        fontSize: 16,
        fontWeight: 'bold',
    },
    commentText: {
      fontSize: 14,
      color: '#16114f',
    },
    commentBox: {
      flexDirection: 'row',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: 'lightgray',
      paddingTop: 8,
      paddingBottom:60,
    },
    commentBoxImage: {
      width: 30,
      height: 30,
      borderRadius: 15,
    },
    commentInput: {
      flex: 1,
      minHeight: 40,
      maxHeight:100,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 20,
      padding: 8,
      marginLeft: 8,
      overflow:'hidden',
      paddingRight:40
    },
    commentSubmitButton: {
      padding: 8,
      textAlign:'center',
      borderRadius: 4,
      position:'absolute',
      right:0.5,
      top:10,
      overflow:'hidden',
      borderRadius:15,
      height:'95%',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
    },
    commentSubmitButtonText: {
      alignSelf:'center',
      color: 'white',
      fontWeight: 'bold',
    },
  };
  