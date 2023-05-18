import React from "react";
import "../../css/HomePage.css";

export default function Home() {
  const handleClickRecord = (e) => {
    window.location.href ="/record";
  }
  const handleClickFile = (e) => {
    window.location.href ="/upload";
  }
  return (
    <>
    <div className="left-container">
      <div id="speech">Speech</div>  
      <div className="method">
        <button className="record" onClick={handleClickRecord}>녹음</button>
        <button className="file" onClick={handleClickFile}>파일업로드</button>
      </div>
    </div>
      <div id="maru">Maru</div>
    </>
  );
}