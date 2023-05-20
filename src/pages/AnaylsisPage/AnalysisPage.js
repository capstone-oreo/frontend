import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/AnalysisPage.css"

export default function Analysis() {
  const [data, setData] = useState({
    id: "",
    text: [""],
    speed: [],
    volume:[],
    keyword:[""],
    habitualWorld:[""],
    createdAt:""
  });

  useEffect(() => {
    axios.get("/api/records/test", {
      params: {
        fileId: "fileId"
      }
    })
    .then(function (response) {
         // 응답 처리  
        setData(response.data);
    }).catch(function (error) {
        // 예외 처리
        console.log("요청 실패");
        console.log(error);
      });
    }, []);

  return(
    <>
      <div className="speech">Speech</div>  
      <div className="maru">Maru</div>
      <p className="voice-analysis">목소리 분석</p>
      <p>Speed: {data.speed[0]}</p>
          <p>Volume: {data.volume[0]}</p>
          <p>Keyword: {data.keyword[0]}</p>
          <p>Habitual World: {data.habitualWorld[0]}</p>
          <p>Created At: {data.createdAt}</p>
      <p className="speed">발표 속도</p>

      <p className="volume">목소리 크기</p>
    </>
  );
}