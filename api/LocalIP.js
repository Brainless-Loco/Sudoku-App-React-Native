import {NetworkInfo} from 'react-native-network-info';

const getIPV4 = async () => {
  try {
    // console.log(NetworkInfo.getIPAddress())
    return null
  } catch (error) {
    console.error('Error retrieving IP address:', error);
    return null;
  }
};

export default getIPV4;
