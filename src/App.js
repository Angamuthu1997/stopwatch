import logo from './logo.svg';
import { useState, useEffect, useRef } from 'react';
import './App.css';
import ParentComponent from './components/3.React,use memos/sample';


function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);  

  const startTimer = () => {
    console.log(isPaused,isRunning,intervalRef);
    if (isRunning) return; 

    setIsRunning(true);
    setIsPaused(false);

    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  };


  const stopTimer = () => {
    console.log(isPaused,isRunning,intervalRef);
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsPaused(false);
    setSeconds(0);
  };

  const pauseTimer = () => {
    console.log(isPaused,isRunning,intervalRef);
    if (!isRunning || isPaused) return;

    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsPaused(true);
  };

  

  useEffect(() => {
    return () => clearInterval(intervalRef.current); 
  }, []);

  
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div>
      <div>Time: {formatTime(seconds)}</div>
      <button onClick={startTimer} disabled={isRunning}>Start</button>
      <button onClick={pauseTimer} disabled={!isRunning || isPaused}>Pause</button>
      
      <button onClick={stopTimer} disabled={!isRunning && !isPaused}>Stop</button>
    </div>
  );
};



export default App;
