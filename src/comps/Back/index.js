import React, {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";
import './style.css'
import { Icon, IconSize,} from "@blueprintjs/core";

const Back = ({light}) => {
  const history = useHistory()
  return (
    <div className="back" style={{color:light ? light : '#FF4C8B'}} onClick={()=>{history.goBack()}}>
      <Icon icon={'chevron-left'} size={24} intent="primary" color={light ? light : '#FF4C8B'} className='icon'/>
      Back
    </div>
  )
}


export default Back;