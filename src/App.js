import React from 'react';
import './App.css';
import Row from './pages/grid/Row'
import Col from './pages/grid/Col'
function App() {

  return (
    <div className="App">
      {/* <Report></Report> */}
      基础：
      <Row>
        <Col col="6" >6</Col>
        <Col col="8" >8</Col>
        <Col col="4" >4</Col>
        <Col col="6" >8</Col>
      </Row>

      盒模型顺序：
      <Row>
        <Col col="6" order="1">1</Col>
        <Col col="6" order="4">2</Col>
        <Col col="6" order="3">3</Col>
        <Col col="6" order="2">4</Col>
      </Row>

      支持flex：
      <Row type="flex" justify="center" align="middle">
        <Col col="6" >1</Col>
        <Col col="6" >2</Col>
        <Col col="6" >3</Col>
        <Col col="6" >4</Col>
      </Row>
    </div>
  );

}

export default App;
