import React, { useState, useEffect } from "react";
import api from "../../utils/api";

const Scoreboard = () => {
  type player = {
    name: string,
    score: number,
  }

  const sb: Array<player> = []
  const [score, setScore] = useState(sb);

  useEffect(() => {
    if (score.length < 1) {
      api
        .getScores()
        .then(({ data }) => {
          let newData = []
          for (let i = 0; i < 10; i++) {
            newData.push(data[i]);
          }
          setScore(newData);
        })
    }
  })

  return (
    <div>
      <div className="card mx-auto border border-dark rounded mb-3">
        <div className="card-title p-3 m-0">
          <h4>All-Time Top 10 High Scores</h4>
        </div>
      </div>
      <div className="card mx-auto border border-dark rounded p-0 scoreboard-body">
        <ul className="list-group">
          {score.map((li, i) => {
            if (li) {
              let rank;
              if (i < 9) {
                rank = "0" + (i + 1);
              } else {
                rank = i + 1;
              }
              return (
                <li className="list-group-item text-left d-flex bg-transparent" key={rank}>
                  <span className="btn btn-secondary text-light">{rank}</span>
                  <span className="btn btn-secondary text-light w-50 ml-2">{li.name}</span>
                  <span className="btn btn-secondary text-light w-100 ml-2"> {li.score}</span>
                </li>
              )
            } else {
              return <div key={i} />
            }
          })}
        </ul>
      </div>
      <form action="/">
        <button className="btn btn-secondary text-light w-100 mt-3" type="submit">Back</button>
      </form>
    </div>
  )
};

export default Scoreboard;