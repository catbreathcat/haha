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
import './style.css'
import { CONFIG } from '../../config'
import { Icon, IconSize,} from "@blueprintjs/core";


export default function CollectionView(props) {
  const history = useHistory()

  // Select dropdown value (starts with first option)
  const [selectDropdown, setDropdown] = useState([])

  useEffect(()=>{
    setDropdown(props.supported)
  }, [props.supported])

  // Loader state
  const [load, setLoad] = useState(true)

  const [getGecko, setGecko] = useState(false)
  const [health, setHealth] = useState()
  const [getHealth, setGetHealth] = useState()
  const dex = props.dex.replace('swap', '')

  var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  });

  const getDexHealthResults = async ()=> {
    return await getDEXHealth(props.covkey,props.chain,props.dexVal)
  }

  useEffect(()=>{
    getDexHealthResults().then((res)=>setGetHealth(res))
    getCGData(props.dexVal, setGecko)
  },[props.dexVal])

    if(props.enabled){
      
        if(!getGecko | !localStorage.getItem('health')){
            getCGData(dex, setGecko)
            return(
                <div id="loader" className="loading">
                 <div>
                  <img src={Loader}></img>
                </div>
                </div>
            )
        }else{
            var i = 0;
            async function refreshIndicators(bar) {
                if(document.getElementById("sent-bar")){
                    if (i == 0) {
                        i = 1;
                        var elem = document.getElementById("myBar");
                        var upvotes = document.getElementById("upbar");
                        var downvotes = document.getElementById("downbar");
                        var width = 2;
                        var left = 98;
                        var id = setInterval(frame, 10);
                        function frame() {
                            if (width < getGecko.sentiment_votes_up_percentage) {
                                width++;
                                left--;
                                elem.style.width = width + "%";
                                upvotes.innerHTML = width + "%";
                                downvotes.innerHTML = left + "%";
                            }
                        }
                    }
                }else{
                    clearInterval(id);
                    i = 0;
                    setTimeout(() => {refreshIndicators(document.getElementById("sent-bar"))},200)
                }
            }
            refreshIndicators(document.getElementById("sent-bar"))
            const market = getGecko.market_data
            const links = getGecko.links
            return (
                <div className="main">
                <div className="home-wrap">
                <Button
                  text="Asset Pairs"
                  onClick={()=>{history.push('/assets')}}
                />
              </div>
                    <div className="health-wrap">
                        <table className="health-info">
                            <div className="sm-title">Latest Block Height</div>
                            <tr className="data-row">
                                <div>{getHealth?.data?.items[0]?.latest_block_height.toLocaleString()}</div>
                                <div>{getHealth?.data?.items[0]?.latest_block_signed_at.replace("T"," ").replace("Z","")}</div>
                            </tr>
                        </table>
                        <table className="health-info">
                            <div className="sm-title">Synced Blocked Height</div>
                            <tr className="data-row">
                                <div>{getHealth?.data?.items[0]?.synced_block_height?.toLocaleString()}</div>
                                <div>{getHealth?.data?.items[0]?.synced_block_signed_at?.replace("T"," ").replace("Z","")}</div>
                            </tr>
                        </table>
                    </div>
                    <div className="showcase-wrap">
                        <div className="dex-info-sec showcase-info">
                            <div className="title">{props.dexVal} INFO</div>
                            <table className="dex-data-table">
                                <tr className="data-row">
                                    <div><strong>Current Price</strong></div>
                                    <div>{ market.current_price.usd ? formatter.format(market.current_price.usd) : 0} USD</div>
                                </tr>
                                <tr className="data-row">
                                    <div><strong>Total Value Locked</strong></div>
                                    <div>{market.total_value_locked ? formatter.format(market.total_value_locked.usd).split('.')[0] : 0} USD</div>
                                </tr>
                                <tr className="data-row">
                                    <div><strong>Market Cap Rank</strong></div>
                                    <div>{getGecko.market_cap_rank ? getGecko.market_cap_rank.toLocaleString() : 0}</div>
                                </tr>    
                                <tr className="data-row">
                                    <div><strong>Liquidity Score</strong></div>
                                    <div>{getGecko.liquidity_score ? getGecko.liquidity_score.toLocaleString().split('.')[0] : 0}</div>
                                </tr>                            
                                <tr className="data-row">
                                    <div><strong>Circulating Supply</strong></div>
                                    <div>{market.circulating_supply ? Math.round(market.circulating_supply).toLocaleString() : 0}</div>
                                </tr>
                                <tr className="data-row">
                                    <div><strong>Total Supply</strong></div>
                                    <div>{market.total_supply ? Math.round(market.total_supply).toLocaleString() : 0}</div>
                                </tr>
                                <tr className="data-row">
                                    <div><strong>Total Volume</strong></div>
                                    <div>{market.total_volume.usd ? formatter.format(market.total_volume.usd).split('.')[0] : 0} USD</div>
                                </tr>
                            </table>
                        </div>
                        <div className="dex-social showcase-info">
                            <div className="title">SOCIAL</div>
                            <div id="sent-bar" className="sentiment-bar">
                                <div className="perc">
                                    <div id="upbar">%1</div>
                                    <div>BULLISH</div>
                                </div>
                                <div id="myProgress">
                                    <div id="myBar"></div>
                                </div>
                                <div className="perc">
                                    <div id="downbar">99%</div>
                                    <div>BEARISH</div>
                                </div>
                            </div>
                            <table className="social-data-table">
                                <tr className="data-row">
                                    <div><strong>Coingecko Rank</strong></div>
                                    <div>{getGecko.coingecko_rank.toLocaleString()}</div>
                                </tr>
                                <tr className="data-row">
                                    <div><strong>Coingecko Score</strong></div>
                                    <div>{getGecko.coingecko_score}</div>
                                </tr>
                                <tr className="data-row">
                                    <div><strong>Community Score</strong></div>
                                    <div>{getGecko.community_score}</div>
                                </tr>                            
                                <tr className="data-row">
                                    <div><strong>Twitter Followers</strong></div>
                                    <div>{getGecko.community_data.twitter_followers.toLocaleString()}</div>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }
    }else{
        return (
            <div className="showcase-wrap">
                <div className="dex-info-sec showcase-info">
                    <div className="title">DEX INFO</div>
                    <div>
                        Custom Data Here
                    </div>
                </div>
                <div className="dex-social showcase-info">
                    <div className="title">SOCIAL</div>
                    <div>
                        Custom Data Here
                    </div>
                </div>
            </div>
        )
    }
}
