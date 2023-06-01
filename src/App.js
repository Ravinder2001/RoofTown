import React from "react";
import Header from "./components/layout/Header";
import Mainpage from "./components/mainpage/Mainpage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Fragment } from 'react';
import { FooterMain } from "./components/layout/FooterMain";
import NotFound from "./components/layout/NotFound";
import PaymentList from "./components/notification/PaymentList";
import Webhooks from "./components/notification/Webhooks";
import SimpleSnakeGame from "./components/mainpage/Snake";
import Pong from "./components/mainpage/Pong";


const App = () => {

  return (
    <Fragment>
      <Router>
        <Header />
        <div className="mainContainer">
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/notification" element={<Webhooks />} />
            <Route path="/payments" element={<PaymentList />} />
            <Route path="/snake" element={<SimpleSnakeGame/>} />
            <Route path="/pong" element={<Pong/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <FooterMain/>
      </Router>
    </Fragment>
  );
};

export default App;
