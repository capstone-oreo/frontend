import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AiFillPlayCircle } from "react-icons/ai";
import { RiStopCircleFill } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { FaTrashAlt } from "react-icons/fa";

import "../../css/HistoryPage.css"

const History = () => {
  const [contentInfo, setContentInfo] = useState({
    first: true,
    last: true,
    content: [
      {
        id: "",
        uri: "",
        title: "",
        createdA: "",
        filename: ""
      }
    ],
    currentSize: 0,
    totalPages: 0,
    totalElements: 0
});
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] =  useState(false);

  //console.log(page);
  useEffect(() => {
    axios.get("https://speechmaru.kro.kr/api/files", {
      params: {
        page: currentPage,
        size: 3
      }
    })
    .then(function (response) {
         // 응답 처리  
        console.log("요청 성공", currentPage)
        setContentInfo(response.data);
        console.log(contentInfo);
    }).catch(function (error) {
        // 예외 처리
        console.log("요청 실패");
        console.log(error);
      });
    }, []);


  const changePage=(newPage)=>{
    axios.get("https://speechmaru.kro.kr/api/files", {
        params: {
          page: newPage,
          size: 3
        }
      })
      .then(function (response) {
           // 응답 처리  
          console.log("요청 성공",currentPage)
          setContentInfo(response.data);
          console.log(contentInfo);
      }).catch(function (error) {
          // 예외 처리
          console.log("요청 실패");
          console.log(error);
        });
      }
  
  const first = () =>{
    setCurrentPage(0);
    changePage(0);
  }
  const last = () => {
    setCurrentPage(contentInfo.totalPages-1)
      changePage(contentInfo.totalPages-1);
  };
  const jump = (index) =>{
    setCurrentPage(index);
    changePage(index);
  };

  const [currentAudioIndex, setCurrentAudioIndex] = useState(null);
  const audioRef = useRef(null);
  // const audioPlay = (index) =>{
  //   const audio = new Audio(contentInfo.content[index].uri); 
  //   audio.loop = false;
  //   audio.volume = 1;
  //     if (!isPlaying) {
  //       audio.play();
  //     } 
  //     else{
  //       audio.pause();
  //     }
  //     setIsPlaying(!isPlaying);
  //   };

  const audioPlay = (index) => {
    const audio = new Audio(contentInfo.content[index].uri);
    audio.loop = false;
    audio.volume = 1;
  
    if (audioRef.current && audioRef.current.play && index === currentAudioIndex&&isPlaying) {
      // 이미 재생 중인 오디오를 클릭한 경우
      audioRef.current.pause();
    } else {
      // 새로운 오디오를 클릭한 경우 또는 다른 오디오를 클릭한 경우
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audio.play();
  
      audioRef.current = audio;
      setCurrentAudioIndex(index);
    }
  
    setIsPlaying(!isPlaying);
  };
  
  const handleAnalysis = (index) => {
    window.location.href = `/analysis?fileId=${contentInfo.content[index].id}` ;

  }
  const deleteAnalysis = (index) => {
    alert(contentInfo.content[index].title+" 삭제하시겠습니까?");
    axios.delete(`https://speechmaru.kro.kr/api/files/${contentInfo.content[index].id}` 
    )
      .then(function (response) {
        // handle success
        console.log(response);
        alert("삭제되었습니다.")
        window.location.replace("/history")
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

  }

  const clickHome = (e) =>{
    window.location.href ="/";
  }

return(
  <>
    <div className="speech" onClick={clickHome}>Speech</div>  
    <div className="maru"onClick={clickHome}>Maru</div>
      <div className="list-container">
      <p className="list-text">발표 목록</p>
    {contentInfo.content.map((product, index) =>(
        <div className="content">
        <p className="content-index">{3*(currentPage)+index+1}회차</p>
        <p className="content-title">{product.title}</p>
        {(isPlaying&&index===currentAudioIndex)?(
          <RiStopCircleFill className="play-audio" onClick={()=>audioPlay(index)} />
        ) : (
          <AiFillPlayCircle className="play-audio" onClick={()=>audioPlay(index)}/>
        )
        }
        <TbReportAnalytics className="go-analysis" onClick={()=>handleAnalysis(index)}/>
        <FaTrashAlt className="delete-audio" onClick={()=>deleteAnalysis(index)}/>
        </div>
          ))}
      <div className="buttons">
      <button onClick={first}>{"<<"}</button>
        {Array(contentInfo.totalPages)
          .fill(0)
          .map((p, i) => {
            const index = i + 1;
            return (
              <button onClick={() => jump(index-1)}>
                {`${index}`}
              </button>
            );
          })}
        <button onClick={last}>{">>"}</button>
      </div>
    </div>
    </>
  );
};

export default History;