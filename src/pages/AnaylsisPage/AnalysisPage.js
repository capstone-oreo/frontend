import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Graph from "./Graph";
import Loading from "../LoadingPage/LoadingPage";
import "../../css/AnalysisPage.css"

export default function Analysis() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const fileId = new URLSearchParams(location.search).get("fileId");
  const [isConsistent, setIsConsistent] = useState(true);
  const [count, setCount] = useState();
  const [data, setData] = useState({
    id: "",
    text: [""],
    speed: [],
    volume:[],
    keyword:[""],
    textInfo:[],
    habitualWord:[""],
    createdAt:""
  });

  useEffect(() => {
    axios.get("https://speechmaru.kro.kr/api/records", {
      params: {
        fileId: fileId
      }
    })
    .then(function (response) {
         // 응답 처리  
        setData(response.data);
        setLoading(false);
    }).catch(function (error) {
        // 예외 처리
        console.log("요청 실패");
        console.log(error);
      });
    }, []);

    const AverageSpeed = ({ data }) => {
        if(!loading){
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
        display: "inline"
      };

      return <span style={divStyle}>{average}</span>;
    }
}
      

    const Variance = ({data}) =>{
      if(!loading){
        const calculateVariance = () => {
          const mean = data.reduce((acc, curr) => acc + curr, 0) / data.length;
          const squaredDifferences = data.map(value => Math.pow(value - mean, 2));
          const v = squaredDifferences.reduce((sum, value) => sum + value, 0) / data.length;
          return v.toFixed(2);
        }
        const variance = calculateVariance();
        let textColor ="black";
        setIsConsistent(true);
        if (variance >= 0.5){
          textColor = "red";
          setIsConsistent(false);
        }
        
        const divStyle = {
          color: textColor,
          backgroundColor: "transparent",
          display: "inline"
        };
        return <span style={divStyle}>{variance}</span>  
      }
      }
    
    const TextColor = ({text, keywords, habitualWords, color1, color2}) => {
      // 침묵구간 표시
      let script = "";
      setCount(text.length+1);
      text.forEach((element, index) => {
        element +=" (침묵) ";
        script += element;
      });

      let parts = [script];
       //const applyColor = (script, keywords, color) => {
        // keywords.forEach((keyword) => {
        //   if  (script.indexOf(keyword)!== -1){
        //     console.log("keyword", keywords)
        //     console.log("여기",script.split(keyword))
        //   }
        // })
        

        const applyColor = (parts, keywords, habitualWords) => {
          keywords.forEach((element, index) => {
            const pattern = new RegExp(`(${element})`, "gi");
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

      habitualWords.forEach((word, index) => {        const pattern = new RegExp(`(${word})`, "gi");
        parts = parts.flatMap((part) =>(
        part.split(pattern).map((subPart, index) => (subPart))
        )
      );
      });

          return (parts.map((part, index) => {
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
                    <span id={index} style={{color: "68FF03"}}>{part}</span>
                  )
                  )
              )
            )
          }));
        };
        
      const coloredText = applyColor(parts, keywords, habitualWords);
      //const coloredText2 = applyColor(script, habitualWords, color2);
      return (
        <span>
          {coloredText}
        </span>
      )

      
    }

    const clickHome = (e) =>{
      window.location.href ="/";
    }
    const handleClickHistory = (e) =>{
      window.location.href ="/history";
    }
  return(
    <>
    {loading ? <Loading /> :(
      <>
    <div className="logo">
      <div className="speech" onClick={clickHome}>Speech</div>  
      <div className="maru"onClick={clickHome}>Maru</div>
      </div>
      <div className="history" onClick={handleClickHistory}>history</div>

      <p className="voice-analysis">목소리 분석</p>
  
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
      <div className="details-text">
        <br />
      <li>발화 평균 속도: <AverageSpeed data={data.speed} /></li>
        <li> 발화 속도 분산:  <Variance data = {data.speed}/></li>
        
        {!isConsistent? (
          <span className="variance">발화 속도가 일정합니다.</span>
        ): (
          <span className="variance">발화 속도가 일정하지 않습니다.</span>
        )}
        </div>
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
        <div className = "details-text">
          <br/>
          <li>목소리 평균 크기: <AverageSpeed data={data.volume} /></li>
        <li> 목소리 크기 분산:  <Variance data = {data.volume}/></li>
        {isConsistent? (
          <div className="variance">목소리 크기가 일정합니다.</div>
        ): (
          <div className="variance">목소리 크기가 일정하지 않습니다.</div>
        )
      }
      </div>
      </div>
      
      <p className="text-analysis">내용 분석</p>
      <div className="text-box">
        <div className="text">
          <TextColor text= {data.text} keywords={data.keyword} habitualWords={data.habitualWord}/><br/>
        </div>
        <br/> <br/>
        <div className="text-details">
          <div className="text-list">
            <br/>
          <li>총 문장 개수: {data.textInfo[0]}</li>
          <li>길이가 긴 문장 개수: {data.textInfo[1]}</li>
          <li>핵심 키워드: {data.keyword.map((value, index)=>(
        <span className="details-text" key={index} >{value} 
        {(index < data.keyword.length-1)?
        (<span>,</span>):null} </span>
      ))}</li>
      <li>자주 사용된 단어: {data.habitualWord.map((value, index)=>(
        <span className="details-text" key={index} >{value} 
        {(index < data.habitualWord.length-1)?
        (<span>,</span>):null} </span>
      ))}</li>
        </div>
        </div>
      </div>
      </>
    )}
    </>
  ); 
}