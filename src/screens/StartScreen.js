import React, {useEffect} from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import axios, {isCancel, AxiosError} from 'axios';
export default function StartScreen({ navigation }) {
  // useEffect (()=>{
  //   fetch('http://192.168.1.227:3000/users')
  //   .then((res)=>{
  //     return res.json()
  //   }).then((data)=> console.log(data))
  // },[])



  return (
    <Background>
      <Logo />
      <Header>Login </Header>
      <Paragraph>
        The easiest way to start with your amazing images.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
    </Background>
  )
}
