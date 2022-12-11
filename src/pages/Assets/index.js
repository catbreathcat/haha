/*
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

import React, {useEffect, useState} from 'react'
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
import { getExchangeBal, useIsMounted } from '../../functions.js'


const Asset = (props) => {
    // BACK BTN
    let history = useHistory();
    function goPrev(){
        history.goBack()
    }
    // HOOKS
    const [getExBal, setExBal] = useState(false)
    const isMounted = useIsMounted()
    const url = props.match.url.replace('/','').split('/')
    const chain = url[0]
    const dex = url[1]
    const address = url[2]

      var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    });

    // ASSET DATA
    if(!getExBal){
        if(isMounted){
            getExchangeBal(CONFIG.TEMPLATE.key,chain,dex,address, setExBal)
        }
        return( 
          <div className="main">
            <div className="home-wrap">
              <Button
                text="Asset Pairs"
                onClick={()=>{history.push('/assets')}}
              />
            </div>
            <div className="home-wrap">
                <Back/>
            </div>
            <div>
            <div id="loader" className="loading">
                <div>
                  <img src={Loader}></img>
                </div>
            </div>    
            </div>
        </div>

        )
    }else{
        const pool_token = getExBal.data.pancakeswap.balances[0].pool_token
        const symbol = pool_token.contract_ticker_symbol
        const contract = pool_token.contract_address
        const quote = pool_token.quote_rate
      return (
          <div className="main">
            <div className="home-wrap">
              <Button
                text="Asset Pairs"
                onClick={()=>{history.push('/assets')}}
              />
            </div>
            <div className="home-wrap">
                <Back/>
            </div>
            <div>
              {getExBal.data.pancakeswap.balances[0] ?
                  <div className="main-pair-wrap">
                    <h2>{ symbol }</h2>
                    <div>{ contract }</div>
                    <div>{ formatter.format(quote) } USD</div>
                  </div>
              : 
              <div className="main-pair-wrap">
              No balances..
              </div>
              }
            </div>
        </div>
      )
    }

}

export default Asset
