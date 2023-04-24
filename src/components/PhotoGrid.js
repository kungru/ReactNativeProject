import React from 'react'
import { useState, useRef, useEffect, } from 'react';
import { Dimensions, FlatList, Image,View,TouchableOpacity,StyleSheet,Text,TouchableHighlight} from 'react-native'
import SinglePhoto from '../screens/SinglePhoto';
import { formatPhotoUri } from '../api/picsum'
import axios, {isCancel, AxiosError} from 'axios';
import { useNavigation } from '@react-navigation/native'
import { useContext } from 'react';
import { ThemeContext } from '../../App';
import { log } from 'react-native-reanimated';
export default function PhotoGrid({ photos, numColumns, onEndReached ,tung1}) {
  const theme = useContext(ThemeContext)
  const { width } = Dimensions.get('window')
  const navigation = useNavigation();
  const size = width / numColumns
  const [tung,setTung]=useState('')
  const AppButton = ({ onPress, title, size, backgroundColor }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.appButtonContainer,
        size === "sm" && {
          paddingHorizontal: 8,
          paddingVertical: 10,
          elevation: 6
        },
        backgroundColor && { backgroundColor }
      ]}
    >
      <Text style={[styles.appButtonText, size === "sm" && { fontSize: 14 }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const places = [
    {
      place: "Hà Nội",
      color: "#560CCE",

    },
  {
    place:"Hồ Chí Minh",
    color:"#560CCE",

  },
  {
    place:"Hạ Long",
    color:"#560CCE",

  },
  {
    place:"Sapa",
    color:"#560CCE",

  }]
const [thu,setThu]=useState(false)
  return (
    <View>
    <View style={{display:"flex",flexDirection:'row',flexWrap:"wrap",justifyContent:'space-between'}}>

    {/* {places.map((item)=>{
      return(
      <AppButton title={item.place} size="sm" backgroundColor={item.color} 
    onPress={()=>{
      navigation.navigate('Hanoi')
      console.log('qweqwe',thu)
      console.log(theme.picID)
 
      }} />
      
      )})} */}
     
     <AppButton title={places[0].place} size="sm" backgroundColor={places[0].color} 
    onPress={()=>{
      navigation.navigate('Hanoi')
   
      console.log(theme.picID)
 
      }} />
       <AppButton title={places[1].place} size="sm" backgroundColor={places[1].color} 
    onPress={()=>{
      navigation.navigate('Hochiminh')
      console.log('qweqwe',thu)
      console.log(theme.picID)
 
      }} />
       <AppButton title={places[2].place} size="sm" backgroundColor={places[2].color} 
    onPress={()=>{
      navigation.navigate('Halong')
      console.log('qweqwe',thu)
      console.log(theme.picID)
 
      }} />
      <AppButton title={places[3].place} size="sm" backgroundColor={places[3].color} 
    onPress={()=>{
      navigation.navigate('Cantho')
      console.log('qweqwe',thu)
      console.log(theme.picID)
 
      }} />
    </View>
    <FlatList
      data={photos}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      onEndReached={onEndReached}
      renderItem={({ item }) => (
        <TouchableHighlight  onPress={()=>{
          // console.log(formatPhotoUri(item.id, size, size));
          theme.setpicID(formatPhotoUri(item.id,item.width,item.height)) 
          theme.setpicIDwidth(item.width)
          theme.setpicIDheight(item.height)
    
          navigation.navigate('SinglePhoto')}}>
        <Image
          source={{
            width: size,
            height: size,
            uri: formatPhotoUri(item.id,item.width/2,item.height/2 ),
          }}
         
        />
        </TouchableHighlight>
      )}
    />
    </View>
  )
  
}
const styles = StyleSheet.create({
  // ...
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical:6,
    marginHorizontal:8,
    width:'45%',
    display:"flex",
    
    
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});