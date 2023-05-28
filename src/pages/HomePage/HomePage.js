import React from "react";
import { useMediaQuery } from 'react-responsive';
import "../../css/HomePage.css";

export default function Home() {
  const isSmallWidth = useMediaQuery({query: '(max-width:1000px)'});
  const isSmallHeight = useMediaQuery({query: '(max-height:485px)'});

  const handleClickRecord = (e) => {
    window.location.href ="/record";
  }
  const handleClickFile = (e) => {
    window.location.href ="/upload";
  }
  const handleClickHistory = (e) =>{
    window.location.href ="/history";
  }
  return (
    <>
      <div className="history" onClick={handleClickHistory}>history</div>
      <div className="left-container">
        <div id="speech">Speech</div>
        

        {isSmallWidth !== true && isSmallHeight !== true ?  
        <div className="method">
          <button className="record" onClick={handleClickRecord}>녹음</button>
          <button className="file" onClick={handleClickFile}>파일업로드</button>
        </div>
        :
        
          <>
            <div id="speech">Speech</div>
          </>
        }
        </div>
        <div id="maru">Maru</div>
        
  
    
    </>
  );
}