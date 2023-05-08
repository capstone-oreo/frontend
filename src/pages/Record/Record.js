import React, { useState, useCallback } from "react";
import axios from 'axios';

const AudioRecord = () => {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [disabled, setDisabled] =  useState(true);

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
    // 마이크 사용 권한 획득
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
        // 10분(6000초) 지나면 녹음 중지
        if (e.playbackTime > 6000) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();
          // 메서드 호출 노드 연결 해제
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

  // 음성 녹음 중지
  const offRecAudio = () => {
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
    };

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    // 미디어 캡처 중지
    media.stop();

    // 메서드가 호출 된 노드 연결 해제
    analyser.disconnect();
    source.disconnect();
    
    if (audioUrl) {
      URL.createObjectURL(audioUrl); // 출력된 링크에서 녹음된 오디오 확인 가능
    }
    
    // File 생성자를 사용해 파일로 변환
    const sound = new File([audioUrl], "soundBlob", {
      lastModified: new Date().getTime(),
      type: "audio",
    });

    setDisabled(false);
    console.log(sound); // File 정보 출력
  };
  const play = ()=>{
      const audio = new Audio(URL.createObjectURL(audioUrl)); 
      audio.loop = false;
      audio.volume = 1;
      audio.play();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const record = new Audio(URL.createObjectURL(audioUrl)); 
    const formData = new FormData();
    formData.append('record', record);

    // 서버로 데이터 전송
    axios( {
      method: 'POST',
      url: "http://132.145.87.252/api/files-test ",
      data: formData,
    })
      .then((result) => {
        // 응답 처리
        console.log('요청 성공')
        console.log(result)
      })
      .catch((error) => {
        // 에러 처리
        console.log('요청 실패')
        console.log(error)
      });
  };
  return (
    <>
      <button onClick={onRec ? onRecAudio : offRecAudio}>녹음</button>
      <button onClick={play} disabled={disabled}>재생</button>
      <button type="submit" onChange={handleSubmit}>업로드</button>
    </>
  );
};

export default AudioRecord;