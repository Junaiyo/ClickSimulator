import React from 'react';
import {createRoot} from 'react-dom/client';
import "./styles/style.css";
import {HashRouter, Route, Routes, Navigate} from "react-router-dom";
import {Login} from "./pages/login";
import {Home} from "./pages/home";
import {ChangeLogs} from "./pages/changelogs";
import {Roleta} from "./pages/games/roleta";
import {Adivinha} from "./pages/games/advinha";
import {Aventura} from "./pages/games/aventura";
import {Reset} from "./pages/reset";

const Index = () => {
    return (
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/change-logs" element={<ChangeLogs/>}/>
          <Route path="/roleta" element={<Roleta/>}/>
          <Route path="/adivinha" element={<Adivinha/>}/>
          <Route path="/aventura" element={<Aventura/>}/>
          <Route path="/reset" element={<Reset/>}/>
        </Routes>
      </HashRouter>
    )
}

const root = createRoot(document.getElementById("root"));
root.render(<Index />);