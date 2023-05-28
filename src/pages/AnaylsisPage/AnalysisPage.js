import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Graph from "./Graph"
import "../../css/AnalysisPage.css"

export default function Analysis() {
  const location = useLocation();
  const fileId = new URLSearchParams(location.search).get("fileId");

  const [data, setData] = useState({
    id: "",
    text: [""],
    speed: [],
    volume:[],
    keyword:[""],
    habitualWorld:[""],
    createdAt:""
  });

  const [test, setTest] = useState({
    id: "",
    text: [""],
    speed: [],
    volume:[],
    keyword:[""],
    habitualWorld:[""],
    createdAt:""
  });

  useEffect(() => {
    axios.get("https://speechmaru.kro.kr/api/records/test", {
      params: {
        fileId: "129387askdhiuh3",
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
  useEffect(() => {
    axios.get("https://speechmaru.kro.kr/api/records", {
      params: {
        fileId: fileId
      }
    })
    .then(function (response) {
         // 응답 처리  
        setTest(response.data);
    }).catch(function (error) {
        // 예외 처리
        console.log("요청 실패");
        console.log(error);
      });
    }, []);

    const AverageSpeed = ({ data }) => {
      // 배열의 평균값 계산
      const calculateAverage = () => {
        if (data.length === 0) {
          return 0;
        }
    
        const sum = data.reduce((acc, curr) => acc + curr, 0);
        return (sum / data.length).toFixed(2);
      };
    
      const average = calculateAverage();
    
      // 평균 값에 따라 색상 지정
      let textColor = "";
      if (average > 4) {
        textColor = "red";
      } else if (average > 2) {
        textColor = "orange";
      } else {
        textColor = "gray";
      }

      const divStyle = {
        color: textColor,
        backgroundColor: "transparent",
      };
    
      return <div style={divStyle}>{average}</div>;
    };

    // 나중에 삭제
    const Average = ({data}) =>{
        if (data.length === 0) {
        return 0;
        }
    
        const sum = data.reduce((acc, curr) => acc + curr, 0);
        return (sum / data.length).toFixed(2);
      }


    const TextColor = ({text, keywords, habitualWords, color1, color2}) => {
      // 침묵구간 표시
      let script = "";
      text.forEach(element => {
        element +=" (침묵) ";
        script += element;
      })

      let parts = [script];
       //const applyColor = (script, keywords, color) => {
        // keywords.forEach((keyword) => {
        //   if  (script.indexOf(keyword)!== -1){
        //     console.log("keyword", keywords)
        //     console.log("여기",script.split(keyword))
        //   }
        // })
        

        const applyColor = (parts, keywords, habitualWords) => {
          keywords.forEach((keyword, index) => {
            const pattern = new RegExp(`(${keyword})`, "gi");
            parts = parts.flatMap((part) =>(
            part.split(pattern).map((subPart, index) => (subPart))
            )
          );
          });
        

        parts = parts.flatMap((part) =>
          part.split("(침묵)").flatMap((subPart, index, arr) =>
            index < arr.length - 1 ? [subPart, "(침묵)"] : [subPart]
        )
      );
      
      habitualWords.forEach((word, index) => {
        const pattern = new RegExp(`(${word})`, "gi");
        parts = parts.flatMap((part) =>(
        part.split(pattern).map((subPart, index) => (subPart))
        )
      );
      });

          return (parts.map((part, index) => {
            console.log(parts, part);
            //console.log(keywords.includes(part));
            
            return (keywords.includes(part) ? (
              <span id={index}  style={{color: "yellow"}}>
                {part}
                
              </span>
            ) : (
              (part === "(침묵)")?(
                <span id={index} style={{color: "skyblue"}}>{part}</span>
              )
                :
                (
                  habitualWords.includes(part)?(
                    <span id={index} style={{color: "skyblue"}}>{part}</span>
                  )
                    :
                    (
                    <span id={index} style={{color: "white"}}>{part}</span>
                  )
                  )
              )
            )
          }));
        };
        
      const coloredText1 = applyColor(parts, keywords, habitualWords);
      //const coloredText2 = applyColor(script, habitualWords, color2);
    
      return (
        <span>
          {coloredText1}
        </span>
      )



    
      
    }

  return(
    <>
      <div className="speech">Speech</div>  
      <div className="maru">Maru</div>
      <p className="voice-analysis">목소리 분석</p>
      <p>{data.id}</p>
      <p>volume: {data.volume[0]}, {data.speed.length}</p>
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
      <div className="speed-details"> 
        발표의 평균 속도는 약 
        <AverageSpeed data={data.speed} />
        입니다.
      </div>
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
      <div className="volume-details">
        발표의 평균 크기는 약  
        <AverageSpeed data={data.volume} />
        입니다.
      </div>
      
      <p className="text-analysis">내용 분석</p>
      <div className="text">
        {test.text.map((textValue, index) => (
          <p className="stt">{textValue}</p>
        
        ))}

        <TextColor text= {data.text} keywords={data.keyword} habitualWords={data.habitualWorld}/>
    
      </div>
    </>
  ); 
}