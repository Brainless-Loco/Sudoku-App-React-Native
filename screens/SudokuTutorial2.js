import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './SudokuTutorialScreen';

const TutorialScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Tutorial</Text>

      <View style={styles.section}>
        <Text style={styles.subTitle}>Introduction</Text>
        <Text style={styles.content}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum felis quis purus ultrices, in
          interdum mi consequat. Nullam pellentesque augue eu turpis cursus convallis.
        </Text>
      </View>

      {/* <Image style={styles.image} source={require('./images/tutorial-image.png')} /> */}

      <View style={styles.section}>
        <Text style={styles.subTitle}>Getting Started</Text>
        <Text style={styles.content}>
          Proin ut efficitur arcu, non posuere ex. Cras quis nisl justo. Aliquam at quam vitae eros euismod tristique.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => alert('Button Pressed')}>
        <Text style={{ color: '#ffffff' }}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TutorialScreen;
