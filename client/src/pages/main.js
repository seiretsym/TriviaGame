import React, { Component } from "react";
import Container from "../components/container";
import Header from "../components/header";
import Content from "../components/content";

class Main extends Component {
  render() {
    return (
      <Container>
        <div className="row">
          <div className="col-11 p-5 mx-auto">
            <div className="row">
              <Header />
            </div>
            <div className="row mt-2">
              <div className="col-12 bg p-3 text-center rounded border border-dark mt-3">
                <Content />
              </div>
            </div>
          </div>
        </div>
      </Container>
    )
  };
}

export default Main;