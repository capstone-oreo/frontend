import React, { useEffect, useState } from "react";
import axios from "axios";
import Graph from "./Graph"
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
        fileId: "129387askdhiuh3"
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
      <p>{data.id}</p>
      <p>volume: {data.volume[0]}</p>
      <div>
      {data.volume.map((speedValue, index) => (
        <p key={index}>{index} {speedValue}</p>
      ))}
    </div>
      <p className="speed">발표 속도</p>
      <div className="speed-graph">
        <Graph data={[
        {
          id: "speed",
          data: data.speed.map((value, index) => ({
            x: index,
            y: value,
          })),
        },
      ]} color={'#FFF855'} id="speed"/> 
      </div>
      <div className="speed-details"></div>
      <p className="volume">목소리 크기</p>
      <div className="volume-graph">
        <Graph data={[
          {
            id: "volume",
            data: data.volume.map((value, index) => ({
              x: index,
              y: value,
            })),
          },
        ]} color={'#1154FF'} id="volume"/> 
      </div>
      <div className="volume-details"></div>
      
    </>
  ); 
}