import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import Loading from "../LoadingPage/LoadingPage";
import "../../css/FileUploadPage.css";
import { BsArrowRightCircle } from "react-icons/bs";

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}

const FileUpload = () => {
  const [loading, setLoading] = useState(false);
  const [condition, setCondition] = useState(false);

  const isSmallWidth = useMediaQuery({query: '(max-width:1350px)'});
  const isSmallHeight = useMediaQuery({query: '(max-height:485px)'});

  const [file, setFile] = useState();
  const [title, setTitle] = useState("");
  const [fileName, setFileName] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    console.log(fileName); // 파일 이름 출력
  }, [fileName]);
  
  // 주제 입력
  const handleTitle = (e) => {
    setTitle(e.target.value);
  }

  const handleChange = (e) => {
    if (title.trim() === "") {
      alert("주제를 입력해주세요.");
      setLoading(false);
      setCondition(false);
      return;
    }
    // 선택된 파일을 상태에 저장
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "audio/mpeg") { // 오디오 파일 필터링.. 다른 형식도
      setFile(selectedFile);
      console.log(selectedFile); // 파일 정보 콘솔 출력
      setCondition(true);
      setFileName(fileName => selectedFile.name); // 선택한 파일 이름 설정
    
      console.log("파일이름",fileName, selectedFile.name);
      alert(selectedFile.name)
    } else {
      alert("음성 파일만 업로드헤주세요.");
    }
  };
  

  const handleSubmit = (e) => {
    if (title.trim() === "") {
      alert("주제를 입력해주세요.");
      setLoading(false);
      setCondition(false);
      return;
    }
    
    if(condition){
      if(window.confirm("주제: "+title+"\n파일명: "+fileName+"\n분석하시겠습니까?")){
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    // 서버로 데이터 전송
    axios
      .post("https://speechmaru.kro.kr/api/files", formData, {
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
        setLoading(false);
        navigate(`/analysis?fileId=${response.data}`);

      })
      .catch((error) => {
        // 예외 처리
        console.log("요청 실패");
        console.log(error);
        alert(error.response.data.message);
        setLoading(false);
      }
      );
    }
    }else{
      alert("파일을 선택해주세요.");
      return;
    }
    }
    const clickHome = (e) =>{
      window.location.href ="/";
    }
    const handleClickHistory = (e) =>{
      window.location.href ="/history";
    }
  return(
    <>
    {!loading ? (
      <div>
      <Mobile>
        <>
        <div className="speech-mobile" onClick={clickHome}>Speech</div>  
      <div className="maru-mobile"onClick={clickHome}>Maru</div>
        <div className="history-mobile" onClick={handleClickHistory}>history</div>  
        <div>
          <p className="today-title-mobile">오늘의 발표 주제</p>
          <input type="text" className="title-mobile" name="title" placeholder="주제를 입력해주세요." value={title} onChange={handleTitle} /> 
          </div>
          <form onSubmit={handleSubmit}>
                  <div className="filebox-mobile">
                    <label htmlFor="file_upload">파일 선택</label>
                    <input type="file" id="file_upload" onChange={handleChange} />
                  </div>
                  <BsArrowRightCircle className="submit-mobile" onClick={handleSubmit}></BsArrowRightCircle>
          </form>

          </>
      </Mobile>
      <Desktop>
      <>
      
      <div className="speech" onClick={clickHome}>Speech</div>  
      <div className="maru"onClick={clickHome}>Maru</div>
      <div className="history" onClick={handleClickHistory}>history</div>
    
      {isSmallHeight !== true ? 
          <div>
        <p className="message"> 음성 파일을 업로드 해주세요!</p>
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
                <form onSubmit={handleSubmit}>
                  <div className="filebox">
                    <label htmlFor="file_upload">파일 선택</label>
                    <input type="file" id="file_upload" onChange={handleChange} />
                  </div>
                  <BsArrowRightCircle className="submit" onClick={handleSubmit}></BsArrowRightCircle>
                </form>
                {fileName && <p className="selected-file-name">{fileName}</p>}

              </div>
      :
      <div className="down">
        {isSmallHeight !== true ?
          <div>
          <form onSubmit={handleSubmit}>
            <div className="filebox-down">
              <label htmlFor="file_upload">파일 선택</label>
              <input type="file" id="file_upload" onChange={handleChange} />
            
            </div>
            <BsArrowRightCircle className="submit-down" onClick={handleSubmit}></BsArrowRightCircle>
          </form>
          {fileName && <p className="selected-file-name-down">{fileName}</p>}

          </div>
          :
          <></>
        }
      </div>   
      };
    </>
    </Desktop>
    </div>
    ):(
      <Loading/>
    ) }
    </>
    );
    
};
export default FileUpload;
