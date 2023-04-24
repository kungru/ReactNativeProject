import React from 'react'
import {Button,View} from 'react-native'
import axios, {isCancel, AxiosError} from 'axios';
export default function Test({ navigation }) {
    return(
        <View>
 <Button title='Add user' onPress={
    async () => {
    
            var data= JSON.stringify({
                "name": "tun135ng",
                "email": "tung12414123@gmail.com",
                "password": "tu3151235ng123",
            })
            var config = {
                method: 'post',
                url: 'http://192.168.10.29:3000/users',
                headers: {
                    'Content-Type': 'application/json'
                },
                data:data
            };

            await axios(config)
            .then(function (res) {
                console.log(JSON.stringify(res.data));
            })
            .catch(function (err) {
                console.log(err);
            })
        }}/>
        <Button title='tung' onPress={()=>{
            console.log('12sadasd3')
        }} />
        </View>
    )
}