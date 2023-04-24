import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React,{useState,useEffect,useContext} from 'react';
import axios from 'axios';
import { ThemeContext } from '../../App';
const Account = ({navigation}) => {
  const [test,useTest]=useState([
   {
      'email':'admin@gmail.com',
      'password':'admin'
    }
  ])

  const theme = useContext(ThemeContext)
  console.log(theme.userName)
  useEffect(()=>{
    const fectchTest= async()=>{
     var data=''
       var config = {
         method: 'get',
       maxBodyLength: Infinity,
         url: 'http://192.168.1.227:3000/users',
         headers: { 
           'Content-Type': 'application/json',
           data:data
         },
         
       };
      await axios(config)
       .then(function (response) {
         useTest(JSON.parse(JSON.stringify(response.data)))
         console.log(test);
       })
       .catch(function (error) {
         console.log(error);
       })
     }
     
     fectchTest()
    
   
   
   },[])
   console.log(theme.userName)
   console.log(theme.userNameState);
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
  return (
    <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
      <Text style={{color:'#560CCE',textTransform:'capitalize',fontWeight:'bold',fontSize:50}}>Xin chào, 
      <Text style={{color:'black', fontWeight:'bold',fontSize:50}}>{theme.userName}</Text>
      
      </Text>
      <AppButton title='Đăng xuất' size="sm" backgroundColor='#560CCE' 
    onPress={()=>{
      navigation.navigate('StartScreen')
      theme.setUserNameState(false)
 
      }} />
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  // ...
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical:10,
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
