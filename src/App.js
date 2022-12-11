import './App.css';
import { BrowserRouter as Router, Switch, Route, HashRouter } from 'react-router-dom'
import {  useParams, useHistory } from "react-router-dom";
import axios from 'axios'
import Landing from './pages/Landing'
import Assets from './pages/Assets'
import DEX from './pages/DEX'
import Banner from './comps/banner'
import Logo from './assets/logo.svg'
import SelectDropdown from './comps/selectDropdown'
import Button from './comps/button'
import * as Vibrant from 'node-vibrant'
import img from './assets/banner.png'
import React, {useEffect, useState} from 'react'
import { CONFIG } from './config'
const defaultDex = 'uniswap_v2'
const defaultChainId = 1
const key = CONFIG.TEMPLATE.key
const geckoEnabled = true


function App() {

  useEffect(()=>{
    if(CONFIG.TEMPLATE.banner_picture !== ""){
      getColor()
    }
  },[])
  const [supported, setSupported] = useState([])
  const [bg, setBg] = useState("")
  const [vibrant, setVibrant] = useState("")
  const [light, setLight] = useState("")
  const [dark, setDark] = useState("")
  const [chain, setChain] = useState(defaultChainId)
  const [dexVal, setDex] = useState(defaultDex)
  const [dexOptions, setDexOptions] = useState([])
  const [chainOptions, setChainOptions] = useState([])

  useEffect(()=>{
    console.log(chain, dexVal)
  },[dexVal])
 
  useEffect(()=>{
    handleDex()
  },[])

  useEffect(()=>{
      let options = []

      for(var i of supported){
        if(i.chain_id == chain){
          options.push({
            name:i.dex_name,
            value:i.dex_name
          })
        }
      }

      setDexOptions(options)

      if(options.length > 0){
          setDex(options[0].value)
      }else{
         setDex(defaultDex)
      }
 
  },[chain])


  const handleDex = async() => {
    let options = []
    const resp = await axios.get(`https://api.covalenthq.com/v1/xy=k/supported_dexes/?quote-currency=USD&format=JSON`, {auth: {username: key}})
    setSupported([...resp.data.data.items])

    const uniqueChains = [...new Map(resp.data.data.items.map(item =>
    [item['chain_name'], item])).values()];
    const unqiueDex = [...new Map(resp.data.data.items.map(item =>
    [item['dex_name'], item])).values()];

    setChainOptions(uniqueChains.map(o => ({name: o.chain_name, value: o.chain_id})))

    for(var i of resp.data.data.items){
        if(i.chain_id == chain){
          options.push({
            name:i.dex_name,
            value:i.dex_name
          })
        }
      }
    
    setDexOptions(options)
    // setDexOptions(unqiueDex.map(o => ({name: o.dex_name, value: o.dex_name})))


  }

  const getColor = async() => {
    const palette = await Vibrant.from(CONFIG.TEMPLATE.banner_picture).getPalette()
    setBg(palette.DarkMuted.getHex())
    setLight(palette.LightVibrant.getHex())
    setVibrant(palette.Vibrant.getHex())
    setDark(palette.DarkVibrant.getHex())
    return palette
  }

  const history = useHistory()

  return (
    <div className="App" style={{backgroundColor:`${bg}`}}>
      <Banner
          img={CONFIG.TEMPLATE.banner_picture !== "" ? CONFIG.TEMPLATE.banner_picture : null}
          head={CONFIG.TEMPLATE.title}
          subhead={'Code Template'}
          color={vibrant}
      />
      <div className="dropdownCont">
        <div style={{display: "flex", placeItems: "center"}}>
          <div style={{marginRight: "1rem"}}>Select Chain:</div>
          <SelectDropdown
              options={chainOptions}
              id={chain}
              onChange={(e)=>{setChain(e.target.value)}}
          />
        </div>
        <div style={{display: "flex", placeItems: "center"}}>
          <div style={{marginRight: "1rem"}}>Select Dex:</div>
          <SelectDropdown
              options={dexOptions}
              id={dexVal}
              onChange={(e)=>{setDex(e.target.value)}}
          />
        </div>
      </div>
    <Router>
      <HashRouter basename="/">
        <Switch>
            <Route exact path="/assets" render={(props) => (
            <div id="dex-sec">
              <DEX chain={chain} dex={dexVal} dexVal={dexVal}/>
            </div>
          )}/>
          <Route exact path="/:chain/:dex/:address" component={Assets}/>
          <Route path="/" render={(props) => (
            <Landing supported={supported} dex={defaultDex} dexVal={dexVal} enabled={geckoEnabled} covkey={key} chain={chain} {...props} light={light} vibrant={vibrant} dark={dark}/>
          )} /> 
        </Switch>
      </HashRouter>
    </Router>
    <div className="logo">
      <img src={Logo}></img>
    </div>
    </div>
  );
}

export default App;
