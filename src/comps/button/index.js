import React, {useEffect, useState} from 'react'
import './style.css'
import { Icon, IconSize,} from "@blueprintjs/core";

const Button = ({onClick, text, className, style, type}) => {
  return (
    <button style={style} type={type} className={className} onClick={onClick}>{text}</button>
  )
}


export default Button;