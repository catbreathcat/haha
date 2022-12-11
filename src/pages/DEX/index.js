/*
SPDX-License-Identifier: GPL-3.0-only
DEX Analytics Dashboard Template.
Copyright (C) 2021 Daniel Troyer

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import React from 'react'
import {  useParams, useHistory } from "react-router-dom";

// Reusable Components
import SelectDropdown from '../../comps/selectDropdown'
import Banner from '../../comps/banner'
import Loader from '../../assets/covalent-logo-loop_dark_v2.gif'
import Alert from '../../assets/alert.svg'
import Table from '../../comps/table'
import Back from '../../comps/Back'
import Input from '../../comps/input'
import Button from '../../comps/button'
import { getCGData, getDEXHealth } from '../../functions.js';
import axios from 'axios'
import { CONFIG } from '../../config'
import { Icon, IconSize,} from "@blueprintjs/core";
import { DEXAssets, useIsMounted  } from  '../../functions.js'
import { useState, useEffect } from 'react'
import AssetList from '../../comps/AssetList'


const DEX = (props) => {
    // HOOKS
    const infinity = 1000000**100
    const [getAssets, setAssets] = useState(false)
    const [getSwaps, setSwaps] = useState(infinity)
    const [getFee, setFee] = useState(infinity)
    const [getQuote, setQuote] = useState(infinity)
    const [getLiq, setLiq] = useState(infinity)
    const [getSupply, setSupply] = useState(infinity)
    const [getVol, setVol] = useState(infinity)
    const [getResults, setResults] = useState(25)
    const history = useHistory()
    
    // VARIABLES
    var data = [getSwaps, getFee, getQuote, getLiq, getSupply, getVol]
    const assets = document.getElementById('asset-list')
    const loader = document.getElementById('loader')
    const isMounted = useIsMounted()
    const dex = props.dex
    var chain = props.chain
    var loading;

    // // GET ASSETS
    // if(localStorage.getItem(props.chain+'dexAssets')){
    //     newAssets = JSON.parse(localStorage.getItem(props.chain+'dexAssets'))
    // }else{
    //     DEXAssets(props.dexVal,CONFIG.TEMPLATE.key, chain,setAssets, 0, getResults, isMounted)    
    // }

    useEffect(()=>{

    DEXAssets(props.dexVal,CONFIG.TEMPLATE.key, chain,setAssets, 0, getResults, isMounted)    
    console.log(props.dexVal)
      
    },[props.dexVal])

    // // ARRAY CHECK
    for(const i in data){
        if(!data[i]){
            data[i] = infinity
        }
    }
    function toggleFilter(){
        var classObj = document.getElementById('screener');
        classObj.classList.toggle('hide')
    }
    
    function Results(e){
        if(isMounted){
            setResults(e.target.value)
            DEXAssets(props.dexVal,CONFIG.TEMPLATE.key, chain,setAssets,0, e.target.value)
        }
    }

 


    // PAGINATION
    function getNext(){
        document.getElementById('asset-list').classList.add('hide')
        document.getElementById('loader').classList.remove('hide')
        if(isMounted){
            var page_num = getAssets.data.pagination.page_number
            page_num = page_num + 1
            DEXAssets(props.dexVal,CONFIG.TEMPLATE.key, chain,setAssets, page_num, getResults)
        }
    }
    function getPrev(){
        document.getElementById('asset-list').classList.add('hide')
        document.getElementById('loader').classList.remove('hide')
        if(isMounted){
            var page_num = getAssets.data.pagination.page_number
            page_num = page_num - 1
            DEXAssets(props.dexVal,CONFIG.TEMPLATE.key, chain,setAssets, page_num, getResults)
        }
    }

    // DATA EXPIRY
    if(localStorage.getItem('dexAssets')){
        if(Date.now() > JSON.parse(localStorage.getItem('dexAssets')).ttl){
            localStorage.removeItem('dexAssets')
            setAssets(false)
        }
    } 
    if(loading){
        if(assets && loader){
            assets.classList.add('hide')
            loader.classList.remove('hide')
        }
    }else{
        if(assets && loader){
            assets.classList.remove('hide')
            loader.classList.add('hide')
        }
    }
    if(getAssets){
  
        var page_num = getAssets.data.pagination.page_number
        var has_more = getAssets.data.pagination.has_more
        if(page_num){
            const assets = document.getElementById('asset-list')
            const loader = document.getElementById('loader')
            if(assets && loader){
                document.getElementById('asset-list').classList.remove('hide')
                document.getElementById('loader').classList.add('hide')
            }
        }
        return (
            <div className="main">
              <div className="home-wrap">
            </div>
            <div className="dex-wrap" key={dex}>
                <div className="back-wrap">
                    <div className="interface-wrap">
                        <div className="dex-btn-wrap">
                            <Back/>
                          <div className="filter" style={{color:'#FF4C8B'}} onClick={toggleFilter}>
                          <Icon icon={'filter'} size={24} intent="primary" color={'#FF4C8B'} className='icon'/>
                          {`Filter Page ( ${page_num + 1} )`}
                        </div>
                        </div>
                        <div className="dex-page-wrap">
                            <div style={{display: "flex"}}>
                            <Button
                              style={{display: `${page_num > 0 ? '' : 'none'}`, marginRight: "auto"}}
                              onClick={getPrev}
                              text="Previous"
                            />
                            </div>
                            <select name="Results" id="results" defaultValue="25" onChange={(e) => Results(e)}>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            <div style={{display: "flex"}}>
                              <Button
                                style={{display: `${has_more ? 'active': 'hide'}` , marginLeft: "auto"}}
                                onClick={getNext}
                                text="Next"
                              />
                            </div>
                        </div>
                    </div>
                    <div id="screener" className="hide">
                        <div>
                            <Input id="swap-count" className="filter" type="number" ph="Max Swap Count 24h" onChange={(e) => (setSwaps(e.target.value))}/>
                        </div>
                        <div>
                            <Input id="fee" className="filter" type="number" ph="Max Fee 24h" onChange={(e) => (setFee(e.target.value))}/>
                        </div>
                        <div>
                            <Input id="quote" className="filter" type="number" ph="Max Quote Amount" onChange={(e) => (setQuote(e.target.value))}/>
                        </div>
                        <div>
                            <Input id="liquidity" className="filter" type="number" ph="Max Liquidity Amount" onChange={(e) => (setLiq(e.target.value))}/>
                        </div>
                        <div>
                            <Input id="supply" className="filter" type="number" ph="Total Supply" onChange={(e) => (setSupply(e.target.value))}/>
                        </div>
                        <div>
                            <Input id="volume" className="filter" type="number" ph="Volume 24h" onChange={(e) => (setVol(e.target.value))}/>
                        </div>
                    </div>
                </div>
                <div id="loader" className="loading hide">
                <div>
                  <img src={Loader}></img>
                </div>
                </div>    
                <section id="asset-list">
                    <AssetList loading={loading} assets={getAssets} chain={chain} dex={dex} data={data}/>
                </section>
            </div>
            </div>
        )
    }else{
        return (
            <div id="loader" className="loading">  
               <div>
                  <img src={Loader}></img>
                </div>
            </div>    
        )
    }
}

export default DEX
