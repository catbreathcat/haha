import React, {useEffect, useState} from 'react'
import './style.css'

const SelectDropdown = ({options, onChange, id}) => {
  return (
    <select className="select" onChange={onChange} >
      {options.map((o, i)=>{
        return(
          <option key={i} selected={id == o.value ? "selected" : ""} value={o.value}>{o.name}</option>
        )
      })}
    </select>
  )
}


export default SelectDropdown