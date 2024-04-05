import { useState } from "react";

function Button({ handleClick, text }) {
  return <button onClick={handleClick}>{text}</button>;
}

function StatisticLine({ value, text, suffix = "" }) {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>
          {value} {suffix}
        </td>
      </tr>
    </>
  );
}

function Statistic({ good, neutral, bad, average, positiveAverage }) {
  const total = good + neutral + bad;

  if (total === 0) {
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </>
    );
  }

  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine value={good} text="good" />
          <StatisticLine value={neutral} text="neutral" />
          <StatisticLine value={bad} text="bad" />
          <StatisticLine value={total} text="all" />
          <StatisticLine value={average} text="average" />
          <StatisticLine value={positiveAverage} text="positive" suffix="%" />
        </tbody>
      </table>
    </>
  );
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [average, setAverage] = useState(0);
  const [positiveAverage, setPositiveAverage] = useState(0);

  const handleClickGood = () => () => {
    const newValue = good + 1;
    setGood(newValue);
    setAverage((newValue - bad) / (newValue + neutral + bad));
    setPositiveAverage((newValue / (newValue + neutral + bad)) * 100);
  };

  const handleClickNeutral = () => () => {
    const newValue = neutral + 1;
    setNeutral(newValue);
    setAverage((good - bad) / (good + neutral + bad));
    setPositiveAverage((good / (good + neutral + bad)) * 100);
  };

  const handleClickBad = () => () => {
    const newValue = bad + 1;
    setBad(newValue);
    setAverage((good - newValue) / (good + neutral + newValue));
    setPositiveAverage((good / (good + neutral + newValue)) * 100);
  };

  return (
    <div>
      <h1>Give Me Feedback</h1>
      <Button handleClick={handleClickGood()} text="good" />
      <Button handleClick={handleClickNeutral()} text="neutral" />
      <Button handleClick={handleClickBad()} text="bad" />

      <Statistic good={good} neutral={neutral} bad={bad} average={average} positiveAverage={positiveAverage} />
    </div>
  );
}

export default App;
