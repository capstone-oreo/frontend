import React from 'react'; 
import "../../css/LoadingPage.css"
import {Oval} from "react-loader-spinner"; 

const clickHome = (e) =>{
  window.location.href ="/";
}
const handleClickHistory = (e) =>{
  window.location.href ="/history";
}
export default function Loding () { 
  return ( 
    <div>
      <div className="speech" onClick={clickHome}>Speech</div>  
      <div className="maru"onClick={clickHome}>Maru</div>
      <div className="history" onClick={handleClickHistory}>history</div>
    <div className='loading'>
    <div className='loading-text'>발표를 분석 중입니다. <br/> 잠시만 기다려 주세요.<br/><br/></div>
    
  <Oval color='#ffffff' height={150} width={150} />
  </div>
  </div>
  ) ;
};


