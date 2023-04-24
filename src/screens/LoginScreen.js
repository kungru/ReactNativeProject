import React, { useState,useEffect,useContext } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { ThemeContext } from '../../App'
import axios from 'axios'
import { log } from 'react-native-reanimated'
export default function LoginScreen({ navigation }) {
  const theme = useContext(ThemeContext)
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
      const a=JSON.parse(JSON.stringify(response.data))
      a.unshift(      {
        'email':'admin@gmail.com',
        'password':'admin'
      })
      useTest(a)

      // console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {

      console.log(error);
    })
  }
  
  fectchTest()
  // fetchPic()


},[])

  
  const [test,useTest]=useState([ {
    'email':'admin@gmail.com',
    'password':'admin'
  }])


  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = () => {
    console.log(test);
    const allemail=test.map((item)=>{return item.email})
    const truemail=allemail.includes(email.value)
    // const filtermail=test.filter((item)=>{ return item.email==email.value})
    // const idmail=filtermail[0].id;
    const allpass=test.map((item)=>{return item.password})
    const truepass=allpass.includes(password.value)
    if (truemail && truepass) {
    const nameTest=  test.filter((item=>{return item.email==email.value}));
      theme.setUserName(nameTest[0].name)
    }
    // const filterpass=test.filter((item)=>{ return item.password==password.value})
    // console.log(filterpass);
   
    function passwordValidator(password) {
      if (!password) return "Password can't be empty."
      if (password.length < 5) return 'Password must be at least 5 characters long.'
      if (!truepass){return 'Wrong password'}
      return ''
    }
    function emailValidator(email) {

      const re = /\S+@\S+\.\S+/
      if (!email) {return "Email can't be empty."
    }
    if (!re.test(email)) {return 'Ooops! We need a valid email address.'}
    if (!truemail){return 'Wrong email'}
      return ''
    }
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    } 
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
      <Header>Welcome back.</Header>
   
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
        // keyboardType="email-address"
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
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
