import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/HomePage/HomePage";
import Record from "../pages/RecordPage/RecordPage";
import FileUpload from '../pages/FileUploadPage/FileUploadPage';
import Analysis from "../pages/AnaylsisPage/AnalysisPage";
import History from "../pages/HistoryPage/HistoryPage";
import "../css/Router.css";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/record' element={<Record />} />
        <Route path='/upload' element={<FileUpload />} />
        <Route path='/analysis' element={<Analysis/>} />
        <Route path='/history' element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}
