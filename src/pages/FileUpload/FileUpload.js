import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState();

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
      .post("/api/files-test", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleChange} />
      <button type="submit" onChange={handleSubmit}>업로드</button>
    </form>
  );
};

export default FileUpload;
