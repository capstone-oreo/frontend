import React, { useState } from 'react';
import axios from 'axios';
import "../../css/FileUploadPage.css";

const FileUpload = () => {
  const [file, setFile] = useState();
  const [title, setTitle] = useState("");

  // 주제 입력
  const handleTitle = (e) => {
    setTitle(e.target.value);
  }

  const handleChange = (e) => {
    // 선택된 파일을 상태에 저장
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "audio/mpeg") { // 오디오 파일 필터링.. 다른 형식도
      setFile(selectedFile);
      console.log(selectedFile); // 파일 정보 콘솔 출력

    } else {
      alert("음성 파일만 업로드헤주세요.");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    // 서버로 데이터 전송
    axios
      .post("/api/files", formData, {
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
      })
      .catch((error) => {
        // 예외 처리
        console.log("요청 실패");
        console.log(error);
      }
      );
    }

  return (
    <>
      <p className="message"> 녹음 파일을 업로드 해주세요.</p>
      <form onSubmit={handleSubmit}>
              <input type="text" name="title" className="title" placeholder="주제를 입력해주세요." value={title} onChange={handleTitle} /> <br></br>

        <div className="filebox">
          <label htmlFor="file_upload">파일 선택</label>
          <input type="file" id="file_upload" onChange={handleChange} />
          <button type="submit" onChange={handleSubmit}>업로드</button>
        </div>
      </form>
    </>
  );
};

export default FileUpload;
