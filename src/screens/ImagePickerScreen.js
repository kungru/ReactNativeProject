// chup Anh 
import React, { useEffect, useReducer, useCallback,useState } from 'react'
import { View, Button, StyleSheet, Image, PermissionsAndroid,Text,FlatList,ScrollView } from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import { log } from 'react-native-reanimated';
import axios from 'axios';
import { getList } from '../api/picsum';
import PhotoTest from '../components/PhotoGrid.js'
import { actionCreators, initialState, reducer } from '../reducers/photos'
import { CameraRoll } from '@react-native-camera-roll/camera-roll'
import { Dimensions } from 'react-native';
export default function ImagePickerScreen({ navigation }) {
  const [listPic,uselistPic]=useState([])
  useEffect(()=>{
  
    const fectchTest= async()=>{
      
      var data=''
        var config = {
          method: 'get',
        maxBodyLength: Infinity,
          url: 'https://api.pexels.com/v1//curated?page=1&per_page=40',
          headers: { 
            'Content-Type': 'application/json',
            data:data
          },
          
        };
       await axios(config)
        .then(function (response) {
          uselistPic(JSON.parse(JSON.stringify(response.data.photos)))
         
        })
        .catch(function (error) {
          console.log(error);
        })
      }
  
    fectchTest()
  },[])


  imageGalleryLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (res) => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        const source = { uri: res.uri };
        console.log('response', JSON.stringify(res));
        this.setState({
          filePath: res,
          fileData: res.data,
          fileUri: res.uri
        });
      }
    });
  }


  

  // console.log(listPic[0].webformatURL);

    const requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Cool Photo App Camera Permission',
              message:
                'Cool Photo App needs access to your camera ' +
                'so you can take awesome pictures.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
          } else {
            console.log('Camera permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      };
      requestCameraPermission();
    const [encodedBase64,setEncodeBase64]=useState(null)
    const [picHeight,setPicHeight]=useState(null)
    const [picWidth,setPicWidth]=useState(null)
    const [image,setImage]=useState(null)
    const [image1,setImage1]=useState(null)
    const [testTrue,setTestTrue]=useState(false)
    async function hasAndroidPermission() {
      const permission = 
     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    
      const hasPermission = await PermissionsAndroid.check(permission);
      if (hasPermission) {
        return true;
      }
    
      const status = await PermissionsAndroid.request(permission);
      return status === 'granted';
    }
    const Gallery = async () =>{
      if (Platform.OS === "android" && !(await hasAndroidPermission())) {
          return;
        }
      CameraRoll.getAlbums({assetType: "Photos", albumType: "All"})
        .then((r) => {
          console.log("images-->",r)
        })
        .catch((err) => {
           //Error Loading Images
           console.log("err->",err)
        });
  }
  const win = Dimensions.get('window');
  const ratio = win.width/541;

  const _handleButtonPress = async() => {
   
    Gallery()
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      return;
    }
    CameraRoll.getPhotos({
        first: 20,
        assetType: 'Photos',
        groupTypes:'Pictures'
      })
      .then(r => {
        console.log('421412')
        setImage({ photos: r.edges});
        console.log(image.photos)
        setImage1(image.photos)
        console.log(image1[0].node);
        console.log(image1[17].node.image);
        setTestTrue(true)
      })
      .catch((err) => {
         console.log(err)
      });
    };

    return (
        <View style={{
            flex:1,
            flexDirection:"column"
        }}>
         
         <Button title="Ảnh đã tải " onPress={_handleButtonPress} />
    
       {
        testTrue ? <ScrollView>
          
          {image1.map((p, i) => {
       return (
         <Image
           key={i}
           style={{
            width: win.width,
            height: 362 * ratio,
            marginVertical:1
           }}
           source={{ uri: p.node.image.uri }}
         />
       );
     })}
        </ScrollView>: <View></View>
       }
       {/* <View style={{backgroundColor:''}}>
      <Image style={{width:100,height:100}}source={{uri:'file:///storage/emulated/0/Pictures/19bc1652-ff2a-40c9-8792-29a6126db933.jpg'}}/>
      </View>
      <Image style={{width:100,height:100}}source={{uri:'file:///storage/emulated/0/Pictures/image_1675880422745.png'}}/> */}
        

            {/* <Button title='Chọn ảnh' onPress={
              ()=>{
              ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
               
              }).then(image => {
              
                console.log(image);
                setPicHeight(image.height)
                setPicWidth(image.width)
                ImgToBase64.getBase64String(`${image.path}`)
  .then(base64String => setEncodeBase64(base64String))
  .catch(err => console.log(err));
              });
            }
          }
            />

            <View style={styles.container}>
              { 
                encodedBase64 && picHeight && (
                    <Image
                    style={{
                      height: 500,
                      width: '100%',
                    }}
                    source={{ uri: `data:image/png;base64,${encodedBase64}` }}
                    // source={require('../../b50524fa-4f60-488d-b9d4-bebec7531220.jpg')}
                />
                )
              }
            </View> */}
        </View>
    )}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    // image: {
    //   height: 500,
    //   width: '100%',
    // },
  });