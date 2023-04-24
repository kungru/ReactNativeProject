import React, { useState,useEffect,useContext } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'



import axios, {isCancel, AxiosError} from 'axios';
import { log } from 'react-native-reanimated'
import { ThemeContext } from '../../App'
export default function RegisterScreen({ navigation }) {
  const theme = useContext(ThemeContext)
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [test,useTest]=useState([])
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
 
  const onSignUpPressed = () => {
  
    const a=test.map((item)=>{return item.email})
    console.log(a);
    
    const s=a.includes(email.value)
    function passwordValidator(password) {
      if (!password) return "Password can't be empty."
      if (password.length < 5) return 'Password must be at least 5 characters long.'
      return ''
    }
    function nameValidator(name) {
    
      if (!name) return "Name can't be empty."
      return ''
    }
    function emailValidator(email) {
  
      const re = /\S+@\S+\.\S+/
      if (!email) {return "Email can't be empty."
    }
    if (!re.test(email)) {return 'Ooops! We need a valid email address.'}
    if (s){return 'Email has been used'}
      return ''
    }
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    
 
      console.log(name.value);
      theme.setUserName(name.value)
      console.log(email.value);
      var data = JSON.stringify({
        "name": `${name.value}`,
        "email": `${email.value}`,
        "password": `${password.value}`
      });
      
      var config = {
        method: 'post',
      maxBodyLength: Infinity,
        url: 'http://192.168.1.227:3000/users',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
      theme.setUserNameState(true)
      navigation.reset({
      
        index: 0,
        routes: [{ name: 'Home' }],
      })

    
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        autoCapitalize="none"
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
