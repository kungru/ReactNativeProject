import React,{useEffect,useState} from "react"
import axios from "axios"
export function emailValidator(email) {

  const re = /\S+@\S+\.\S+/
  if (!email) {return "Wrong email"
}
 else  if (!re.test(email)) {return 'Ooops! We need a valid email address.'}
 else {return 'Wrong email or password'}
  return ''
}
