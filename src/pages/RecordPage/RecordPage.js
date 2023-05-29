import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import "../../css/RecordPage.css"
import { AiFillAudio } from "react-icons/ai";
import { RiStopCircleFill } from "react-icons/ri";
import { AiFillPlayCircle } from "react-icons/ai";
import { BsArrowRightCircle } from "react-icons/bs";

const AudioRecord = () => {
  const isSmallWidth = useMediaQuery({query: '(max-width:1350px)'});
  const isSmallHeight = useMediaQuery({query: '(max-height:485px)'});

  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [disabled, setDisabled] =  useState(true);
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  // 주제 입력
  const handleTitle = (e) => {
    setTitle(e.target.value);
  }

  // 녹음 실행
  const onRecAudio = () => {
    // 음원정보를 담은 노드를 생성, 음원 실행, 디코딩
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }
    // 마이크 사용 권한
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
        // 제한시간 설정. 10분 지나면 녹음 중지
        if (e.playbackTime > 6000) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();
          // 메서드를 호출하는 노드 연결 해제
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (e) {
            setAudioUrl(e.data);
            setOnRec(true);
          };
        } else {
          setOnRec(false);
        }
      };
    });
  };

  // 녹음 중지
  const offRecAudio = () => {
    // Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
    };

    stream.getAudioTracks().forEach(function (track) { // 모든 트랙에서 반복
      track.stop(); // stop()을 통해 오디오 스트림 정지
    });

    media.stop(); // 미디어 캡처 중지
    analyser.disconnect(); // 메서드가 호출 된 노드 연결 해제
    source.disconnect();
    
    if (audioUrl) {
      URL.createObjectURL(audioUrl); // 오디오를 확인할 수 있는 링크
    }

    // 콘솔 출력용 코드. 나중에 삭제
    const sound = new File([audioUrl], "record.mp3", {
      lastModified: new Date().getTime(),
      type: "audio/mpeg",
    });

    setDisabled(false);
    console.log(sound); // File 정보 출력
  };

  // 녹음된 파일 재생
  const play = ()=>{
      const audio = new Audio(URL.createObjectURL(audioUrl)); 
      audio.loop = false;
      audio.volume = 1;
      audio.play();
  };


  // 녹음 파일을 서버로 전송
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // File 생성자를 사용해 파일로 변환
    const file = new File([audioUrl], "record.mp3", { lastModified: new Date().getTime(), type: "audio/mpeg" });
    console.log(file);
    formData.append("file", file);

    // 서버에 post 요청
    axios
      .post("https://speechmaru.kro.kr/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params:{
          title: title,
        },
      })
      .then((response) => {
        // 응답 처리
        console.log("요청 성공");
        console.log(response);
        console.log(formData.id);
        console.log(file.id);
        console.log(response.data);
        navigate(`/analysis?fileId=${response.data}`);
      })
      .catch((error) => {
        // 예외 처리
        console.log("요청 실패");
        console.log(error);
      }
      );
    }

    const clickHome = (e) =>{
      window.location.href ="/";
    }
    const handleClickHistory = (e) =>{
      window.location.href ="/history";
    }
  return(
    <>
      <div className="speech" onClick={clickHome}>Speech</div>  
      <div className="maru"onClick={clickHome}>Maru</div>
      <div className="history" onClick={handleClickHistory}>history</div>
        {isSmallHeight !== true ? 
          <div>
          <p className="message"> 발표 연습을 시작해보세요!</p>
          <p className="today-title">오늘의 발표 주제</p>
          <input type="text" className="title" name="title" placeholder="주제를 입력해주세요." value={title} onChange={handleTitle} /> 
          </div>
          :
          <div>
            <p className="message-up"> 발표 연습을 시작해보세요!</p>
            <p className="today-title-up">오늘의 발표 주제</p>
            <input type="text" className="title-up" name="title" placeholder="주제를 입력해주세요." value={title} onChange={handleTitle} /> 
          </div>
        }
          {isSmallWidth !== true ?
            <div className="up">
            {isSmallHeight !== true ?
              <div>
                {onRec ? (
                <AiFillAudio className="mike" onClick={onRec ? onRecAudio : offRecAudio}></AiFillAudio>
                ) : (
                  <RiStopCircleFill className="stop" onClick={onRec ? onRecAudio : offRecAudio}></RiStopCircleFill>
                )}
                <AiFillPlayCircle className="play" onClick={play} disabled={disabled}></AiFillPlayCircle>
                <form onSubmit={handleSubmit}>
                  <BsArrowRightCircle className="submit" onClick={handleSubmit}></BsArrowRightCircle>
                </form>
              </div>
            
            :
            <></>
            }
            </div>
        :
        <div className="down">
          {isSmallHeight !== true ?
          <div>
          {onRec ? (
            <AiFillAudio className="mike-down" onClick={onRec ? onRecAudio : offRecAudio}></AiFillAudio>
            ) : (
              <RiStopCircleFill className="stop-down" onClick={onRec ? onRecAudio : offRecAudio}></RiStopCircleFill>
            )}
            <AiFillPlayCircle className="play-down" onClick={play} disabled={disabled}></AiFillPlayCircle>
            <form onSubmit={handleSubmit}>
              <BsArrowRightCircle className="submit-down" onClick={handleSubmit}></BsArrowRightCircle>
            </form>
          </div>
          :
          <></>
          }             
          </div>
      
      };
    </>
  );
};

export default AudioRecord;