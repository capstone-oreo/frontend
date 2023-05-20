import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "../pages/HomePage/HomePage";
import Login from "../pages/LoginPage/LoginPage";
import Register from "../pages/RegisterPage/RegisterPage";
import Record from "../pages/RecordPage/RecordPage";
import FileUpload from '../pages/FileUploadPage/FileUploadPage';
import Analysis from "../pages/AnaylsisPage/AnalysisPage";
import History from "../pages/HistoryPage/HistoryPage";
import "../css/Router.css";

export default function Router() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink className={({ isActive }) => "nav-link" + (isActive ? " click" : "")} to='/'>
          Home{" "}
        </NavLink>
        <NavLink className={({ isActive }) => "nav-link" + (isActive ? " click" : "")} to='/login'>
          로그인{" "}
        </NavLink>
        <NavLink className={({ isActive }) => "nav-link" + (isActive ? " click" : "")} to='/register'>
          회원가입{" "}
        </NavLink>
        <NavLink className={({ isActive }) => "nav-link" + (isActive ? " click" : "")} to='/history'>
          분석기록{" "}
        </NavLink>
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/record' element={<Record />} />
        <Route path='/upload' element={<FileUpload />} />
        <Route path='/analysis' element={<Analysis/>} />
        <Route path='/Home' element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}
