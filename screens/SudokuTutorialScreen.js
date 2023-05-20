// styles.js
import { StyleSheet } from 'react-native';

// Variables
const primaryColor = 'red';
const secondaryColor = '#6c757d';
const fontSizeLarge = 24;
const fontSizeMedium = 16;
const fontSizeSmall = 14;

// Mixins
const flexCenterMixin = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: fontSizeLarge*2, //operators
    fontWeight: 'bold',
    color: primaryColor,
    marginBottom: 16,
  },
  subTitle: {
    fontSize: fontSizeMedium,
    color: secondaryColor,
    marginBottom: 8,
  },
  content: {
    fontSize: fontSizeSmall,
    color: secondaryColor,
    marginBottom: 12,
  },
  section: {
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  button: {
    ...flexCenterMixin, ///mixins
    backgroundColor: primaryColor,
    color: '#ffffff',
    padding: 12,
    borderRadius: 8,
  },
});

export default styles;
