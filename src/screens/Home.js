import React, { useEffect, useReducer, useCallback,useState,useRef } from 'react'
import { Dimensions,ActivityIndicator, StyleSheet, Text, View,Button,TouchableOpacity,TouchableHighlight,Image } from 'react-native'
import PhotoGrid from '../components/PhotoGrid.js'
import { actionCreators, initialState, reducer } from '../reducers/photos'
import { getList } from '../api/picsum'
import Icon from 'react-native-vector-icons/FontAwesome';
import { log } from 'react-native-reanimated'
import ImagePicker from 'react-native-image-crop-picker';
import { CameraRoll } from '@react-native-camera-roll/camera-roll'
export default function Home({navigation}){
    const [state, dispatch] = useReducer(reducer, initialState)
    const windowHeight = Dimensions.get('window').height;
    const [encodedBase64,setEncodeBase64]=useState(null)
    const [tung,setTung]=useState(false)
    const [takePic,setTakePic]=useState(false)
    const [takePic1,setTakePic1]=useState(false)
  //   useEffect(()=>{
    

  // //  CameraRoll.saveToCameraRoll(`${encodedBase64}`)
  //   },[encodedBase64])
    
    const useDidMountEffect = (func, deps) => {
      const didMount = useRef(false);
  
      useEffect(() => {
          if (didMount.current) func();
          else didMount.current = true;
      }, deps);
  }
  useEffect(() => {
    
}, []);

useDidMountEffect(() => {
  CameraRoll.saveToCameraRoll(`${encodedBase64}`)
    // react please run me if 'key' changes, but not on initial render
}, [encodedBase64]);    
    
  const { photos, nextPage, loading, error } = state
  const fetchPhotos = useCallback(async () => {
    dispatch(actionCreators.loading())

    try {

       const nextPhotos = await getList(nextPage, 'vietnam')
 
      dispatch(actionCreators.success(nextPhotos, nextPage))
    } catch (e) {
      dispatch(actionCreators.failure())
    }
  }, [nextPage])
  

  useEffect(() => {
    fetchPhotos()
  }, [tung])




  
  // console.log('this is the error',photos)

  // We'll show an error only if the first page fails to load
  if (photos.length === 0) {
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={true} />
        </View>
      )
    }

    if (error) {
      return (
        <View style={styles.container}>
          <Text style={{color:'black'}}>Failed to load photos!</Text>
        </View>
      )
    }
  }
  
    return (
      <View style={{position:'relative',}}>
      
        <Button title='Xem ảnh' onPress={()=>{
          navigation.navigate(
            'ImagePickerScreen'
            )
          }}/>
        
          <PhotoGrid numColumns={3} photos={photos} onEndReached={fetchPhotos} />
         
      
       <Icon
    name="plus-circle"
    style={{
      color:'#560CCE',
      position:'absolute',
      right:15,
      top:650,
      bottom:0,
      fontSize:50,
      zIndex:10,
    }}
    onPress={()=>{
      ImagePicker.openCamera({
        width: 900,
        height: 1200,
        cropping: true, 
        // includeBase64:true
    }).then(image => {
        setEncodeBase64(image.path)
        console.log(encodedBase64);
       
        // CameraRoll.saveToCameraRoll(`${encodedBase64}`)
    })
      // var promise = CameraRoll.saveToCameraRoll(`${encodedBase64}`)
      // promise.then(function(result) {
      //   console.log('save succeeded ' + result);
      // }).catch(function(error) {
      //   console.log('save failed ' + error);
      // });

    }}
  >
  </Icon>


  <Text style={{
            width:28,position:'absolute',backgroundColor:'#eeeeee',
            height:30,
            right:20,
            top:660,
            bottom:0,
            zIndex:9,
        }} ></Text>
    </View>
    )
  

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position:'relative'
  },
 
})