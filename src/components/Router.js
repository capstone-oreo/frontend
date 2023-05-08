import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Record from "../pages/Record/Record";
import FileUpload from '../pages/FileUpload/FileUpload';


export default function Router() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink className={({ isActive }) => "nav-link" + (isActive ? " click" : "")} to='/'>
          Home{" "}
        </NavLink>
        <NavLink className={({ isActive }) => "nav-link" + (isActive ? " click" : "")} to='/record'>
          녹음{" "}
        </NavLink>
        <NavLink className={({ isActive }) => "nav-link" + (isActive ? " click" : "")} to='/upload'>
          파일 업로드
        </NavLink>
      </nav>

      <Routes>
        <Route path='/record' element={<Record />} />
        <Route path='/upload' element={<FileUpload />} />
      </Routes>
    </BrowserRouter>
  );
}
