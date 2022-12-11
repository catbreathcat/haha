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

import React from 'react'
import { Link } from 'react-router-dom'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { useState, useEffect } from 'react';

const AssetList = (props) => {
    const [getChain, setChain] = useState(props.chain)
    useEffect(() => {
        setChain(props.chain)
    });

    const dexAssetList = props.assets.data.items
    console.log(dexAssetList)
    var swap = props.data[0]
    var fee = props.data[1]
    var quote = props.data[2]
    var liq = props.data[3]
    var supply = props.data[4]
    var vol = props.data[5]
    var chain = getChain

    if(props.loading){
        if(document.getElementById('asset-list')){
            document.getElementById('asset-list').classList.add('hide')
            document.getElementById('loader').classList.remove('hide')
        }
        return(
            <div id="init-loader" className="loading hide">
                Loading
                //Loader
            </div>    
        )
    }else{
        if(document.getElementById('asset-list')){
            document.getElementById('asset-list').classList.remove('hide')
            document.getElementById('loader').classList.add('hide')
        }
    }
    return (
      <>
        {dexAssetList.map((o, i)=>{
          return(
            <Link className={`asset-card ${chain === 56 ? 'bsc': chain === 137 ? 'matic':  chain === 43114 ? 'avax': 'eth'}`} key={i} to={`/${props.chain}/${props.dex}/${o.exchange}`}>
            <div className="asset-btn">
                <div className="symbol-header">
                     <strong>{o.token_0.contract_ticker_symbol}-{o.token_1.contract_ticker_symbol}</strong>
                </div>
                <div className="asset-data">
                    <div className="asset-info">
                        <div>QUOTE:</div>
                        <div className="ar">{o.quote_rate ? o.quote_rate.toLocaleString().split('.')[0] : 0}</div>
                    </div>
                    <div className="asset-info">
                        <div>SWAP COUNT:</div>
                        <div className="ar">{o.swap_count_24h ? o.swap_count_24h.toLocaleString().split('.')[0] : 0}</div>
                    </div>
                    <div className="asset-info">
                        <div>LIQUIDITY:</div>
                        <div className="ar">{o.total_liquidity_quote ? o.total_liquidity_quote.toLocaleString().split('.')[0] : 0}</div> 
                    </div>
                    <div className="asset-info">
                        <div>VOLUME:</div>
                        <div className="ar">{o.volume_24h_quote ? o.volume_24h_quote.toLocaleString().split('.')[0] : 0}</div>  
                    </div>
                </div>
            </div>
            </Link>
          )
        })}
      </>
    )
    // return dexAssetList.filter((asset) => (asset.swap_count_24h <= swap) 
    //     && (asset.quote_rate <= quote)
    //     && (asset.total_liquidity_quote <= liq)
    //     && (parseInt(asset.total_supply) <= supply)
    //     && (asset.volume_24h_quote <= vol)).map((asset) => (
    //     <Link className={`asset-card ${chain === 56 ? 'bsc': chain === 137 ? 'matic':  chain === 43114 ? 'avax': 'eth'}`} key={asset.exchange} to={`/${props.chain}/${props.dex}/${asset.exchange}`}>
    //         <div className="asset-btn">
    //             <div className="symbol-header">
    //                 <strong>{asset.token_0.contract_ticker_symbol}-{asset.token_1.contract_ticker_symbol}</strong>
    //             </div>
    //             <div className="asset-data">
    //                 <div className="asset-info">
    //                     <div>QUOTE:</div>
    //                     <div className="ar">{asset.quote_rate.toLocaleString().split('.')[0]}</div>
    //                 </div>
    //                 <div className="asset-info">
    //                     <div>SWAP COUNT:</div>
    //                     <div className="ar">{asset.swap_count_24h.toLocaleString().split('.')[0]}</div>
    //                 </div>
    //                 <div className="asset-info">
    //                     <div>FEE 24HR:</div>
    //                     <div className="ar">{asset.fee_24h_quote.toLocaleString().split('.')[0]}</div>
    //                 </div>
    //                 <div className="asset-info">
    //                     <div>LIQUIDITY:</div>
    //                     <div className="ar">{asset.total_liquidity_quote.toLocaleString().split('.')[0]}</div> 
    //                 </div>
    //                 <div className="asset-info">
    //                     <div>VOLUME:</div>
    //                     <div className="ar">{asset.volume_24h_quote.toLocaleString().split('.')[0]}</div>  
    //                 </div>
    //             </div>
    //         </div>
    //     </Link>
    // ))
}

export default AssetList


