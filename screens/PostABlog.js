import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Editor } from 'react-native-pell-rich-editor';

const WriteBlogScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePost = () => {
    // Handle the blog post submission
    const blog = {
      title,
      content,
    };
    console.log('Blog:', blog);
    // Perform API call or other actions to save the blog
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        placeholder="Enter blog title"
        value={title}
        onChangeText={setTitle}
      />

      <View style={styles.editorContainer}>
        <Editor
          style={styles.editor}
          placeholder="Write your blog content here"
          initialContentHTML={content}
          onChange={(html) => setContent(html)}
        />
      </View>

      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  editorContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
  },
  editor: {
    flex: 1,
    backgroundColor: 'white',
  },
  postButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WriteBlogScreen;
