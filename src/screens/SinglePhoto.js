import React, { useEffect, useReducer, useCallback } from 'react'
import { Dimensions, ActivityIndicator, Image, FlatList, Text, View, TouchableHighlight,StyleSheet,TouchableOpacity,PermissionsAndroid,Platform, } from "react-native";
import { formatPhotoUri } from '../api/test'
import { actionCreators, initialState, reducer } from '../reducers/photos'
import { useContext } from 'react';
import { GlobalContext } from '../../App';
import { useSelector } from 'react-redux';
import { ThemeContext } from '../../App';
import BackButton from '../components/BackButton';
import RNFetchBlob from 'rn-fetch-blob';
import { createClient } from 'pexels';
export default function SinglePhoto({ navigation, numColumns, onEndReached }) {
    const theme=useContext(ThemeContext)
    const REMOTE_IMAGE_PATH =
    `${theme.picID}`
    console.log(REMOTE_IMAGE_PATH)
  const checkPermission = async () => {
    
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission
  
    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'App needs access to your storage to download Photos',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadImage();
        } else {
          // If permission denied then show alert
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };

  const downloadImage = () => {
    // Main function to download the image
    
    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let image_URL = REMOTE_IMAGE_PATH;   
     
    // Getting the extention of the file
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    console.log(PictureDir)
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' + 
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('Image Downloaded Successfully.');
      });
  };

  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ?
             /[^.]+$/.exec(filename) : undefined;
  };
    return (
        <View style={{flex:1,justifyContent:'center',alignContent:'center',position:'relative',backgroundColor:'Black',width:'100%'}}>

            <BackButton goBack={navigation.goBack} />
            <Image
            style={{width:`100%`,height:500,position:'absolute'}}
                source={{

                    uri: `${theme.picID}`
                }}
            />
          
          <View style={styles.container}>
   
      <TouchableOpacity
        style={styles.button}
        onPress={checkPermission}>
        <Text style={styles.text}>
          Tải Xuống
        </Text>
      </TouchableOpacity>
    </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
    //   flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position:'absolute',
      width:'100%',
      height:'20%',
      bottom:'2%'
    },
    button: {
      width: '80%',
      padding: 10,
      backgroundColor: 'orange',
      marginTop: 50,
    },
    text: {
      color: '#fff',
      fontSize: 20,
      textAlign: 'center',
      padding: 5,
    },
  });