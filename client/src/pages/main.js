import React, { Component } from "react";
import Container from "../components/container";
import Header from "../components/header";
import { Row, Col } from "../components/grid";

class Main extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col classes="-11 p-5 mx-auto">
            <Row>
              <Header />
            </Row>
            <Row classes="mt-3">
              <Col classes="-12 bg p-3 text-center rounded border border-dark mt-3">
                test
            </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  };
}

export default Main;