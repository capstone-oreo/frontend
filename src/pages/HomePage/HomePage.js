import React from "react";
import { useMediaQuery } from 'react-responsive';
import "../../css/HomePage.css";

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}

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
    <div>
    <Mobile>
      <>
      <div className="history-mobile" onClick={handleClickHistory}>history</div>
      <div id="speech-mobile">Speech</div>
      <button className="record-mobile" onClick={handleClickRecord}>녹음</button>
      <button className="file-mobile" onClick={handleClickFile}>파일업로드</button>
      <div id="maru-mobile">Maru</div>  

      </>
    </Mobile>
    <Desktop>
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
    </Desktop>
    </div>
  );
}