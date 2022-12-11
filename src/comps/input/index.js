import React, {useEffect, useState} from 'react'
import './style.css'
import { Icon, IconSize,} from "@blueprintjs/core";

const Input = ({onChange, ph, text, type}) => {
  return (
    <div className="input-cont">
      <label>{text}</label>
      <input onChange={onChange} type={type} placeholder={ph}/>
    </div>
  )
}


export default Input;