import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'

export default function Dashboard({ navigation }) {
  fetch('192.168.1.227/users')
  .then((res)=>{
    return(res.json())
  }).then((data)=>{
    console.log(data);
  })
  return (
    <Background>
      <Logo />
      <Header>Let’s start</Header>
      <Paragraph>
        Go on an adventure and find out your best photos.
      </Paragraph>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }
      >
        Let's Go
      </Button>
    </Background>
  )
}
