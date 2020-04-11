import React, { Component } from "react";

class Scoreboard extends Component {

  render() {
    return (
      <div>
        <div className="card mx-auto border border-dark rounded mb-3">
          <div className="card-title p-3 m-0">
            <h4>All-Time Top 10 High Scores</h4>
          </div>
        </div>
        <div className="card mx-auto border border-dark rounded p-0 content-body">
          <ul className="list-group">
            <li className="list-group-item">
              1
            </li>
            <li className="list-group-item">
              2
            </li>
            <li className="list-group-item">
              3
            </li>
            <li className="list-group-item">
              4
            </li>
            <li className="list-group-item">
              5
            </li>
            <li className="list-group-item">
              6
            </li>
            <li className="list-group-item">
              7
            </li>
            <li className="list-group-item">
              8
            </li>
            <li className="list-group-item">
              9
            </li>
            <li className="list-group-item">
              10
            </li>
          </ul>
        </div>
      </div>
    )
  }
};

export default Scoreboard;