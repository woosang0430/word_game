import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const url = "http://172.16.28.35:8080/test";

function App() {
  const [isStart, setIsStart] = useState(false);
  const [word, setWord] = useState("");
  const [time, setTime] = useState(3);
  const [intervalInstance, setIntervalInstance] = useState<any>(undefined);

  useEffect(() => {
    if (time < 0) {
      axios(url).then((res) => {
        const { data } = res;
        setWord(data);
      });
      setTime(3);
    }
  }, [time]);

  const onGameStart = () => {
    if (isStart === false) {
      axios(url).then((res) => {
        const { data } = res;
        setWord(data);
      });

      const intervalInstance = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
      setIntervalInstance(intervalInstance);
      setIsStart(true);
    }
  };

  const onGameEnd = () => {
    clearInterval(intervalInstance);
    setWord("");
    setTime(3);
    setIsStart(false);
  };

  const onGameNext = () => {
    if (isStart === true) {
      clearInterval(intervalInstance);
      setWord("");
      setTime(0);
      setTimeout(() => {
        setTime(3);
        axios(url).then((res) => {
          const { data } = res;
          setWord(data);
        });

        const intervalInstance = setInterval(() => {
          setTime((prev) => prev - 1);
        }, 1000);
        setIntervalInstance(intervalInstance);
      }, 1000);
    }
  };

  return (
    <div className="App">
      <h1>Word Game</h1>
      <div className="Timer">
        <strong>Timer</strong> : {time}
      </div>
      <div className="word-wrapper">
        {isStart === false && (
          <div className="info-text">start 버튼을 누르면 시작합니다.</div>
        )}
        {isStart === true && time > 0 && (
          <div>
            <span>{word[0]}</span>
            <span>{word[1]}</span>
            <span>X</span>
            <span>X</span>
          </div>
        )}
        {(isStart === true && time) === 0 && (
          <div>
            <span>{word[0]}</span>
            <span>{word[1]}</span>
            <span>{word[2]}</span>
            <span>{word[3]}</span>
          </div>
        )}
      </div>
      <div className="button-wrapper">
        <button onClick={onGameStart} type="button" className="start">
          Start
        </button>
        <button onClick={onGameEnd} type="button" className="end">
          End
        </button>
        <button onClick={onGameNext} type="button" className="next">
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
