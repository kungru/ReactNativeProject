import React, { useState,useEffect } from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import axios from 'axios'

export default function ResetPasswordScreen({ navigation }) {
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
         // console.log(JSON.stringify(response.data));
       })
       .catch(function (error) {
         console.log(error);
       })
     }
     fectchTest()
   },[])
  const [test,useTest]=useState([])
  const [email, setEmail] = useState({ value: '', error: '' })

  const sendResetPasswordEmail = () => {
    const allemail=test.map((item)=>{return item.email})
    const truemail=allemail.includes(email.value)
    console.log(allemail)
    console.log(truemail);
    function emailValidator(email) {

      const re = /\S+@\S+\.\S+/
      if (!email) {return "Email can't be empty."
    }
    if (!re.test(email)) {return 'Ooops! We need a valid email address.'}
    if (!truemail){return 'Wrong email'}
      return ''
    }
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }
    navigation.navigate('LoginScreen')
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Restore Password</Header>
      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive email with password reset link."
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Send Instructions
      </Button>
    </Background>
  )
}
