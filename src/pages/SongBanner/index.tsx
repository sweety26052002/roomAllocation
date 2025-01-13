import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import ratriaPillars from '../../assets/images/ratria-pillars.webp';
import videoMic from '../../assets/images/video-mic.webp';
import infiniprayer from '../../assets/images/infinprayer.webp';
import audio from '../../assets/images/audio-test.mp3';
import useSound from 'use-sound';
import Timer from './Timer.tsx'; 

const SongBanner = () => {
    const handleAudioEnd = () => {
      setIsTimerActive(true); // Start the timer when audio ends
      setTimeLeft(60); // Reset timer to 60 seconds
    };
  
    const [playSound] = useSound(audio, { onend: handleAudioEnd });
    const [isMicClicked, setIsMicClicked] = useState(false);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [isTimerDone, setIsTimerDone] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
  
    const handleMicClick = () => {
      setIsMicClicked(true);
      playSound(); 
    };
  
    useEffect(() => {
      let timer: string | number | NodeJS.Timeout | undefined;
      if (isTimerActive) {
        timer = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              setIsTimerActive(false); 
              setIsTimerDone(true); 
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000); 
      }
      return () => clearInterval(timer); 
    }, [isTimerActive]);
  
    useEffect(() => {
      if (isTimerDone) {
        const resetTimer = setTimeout(() => {
          setIsMicClicked(false); 
          setIsTimerDone(false); 
        }, 0); 
        return () => clearTimeout(resetTimer); 
      }
    }, [isTimerDone]);
  
    return (
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <img src={ratriaPillars} alt="pillars" />
          {isMicClicked && !isTimerActive && (
            <>
              <img src={infiniprayer} alt="infiniprayer" />
              <p className={styles.prayer}>prayer</p>
            </>
          )}
          {isMicClicked && isTimerActive && (
              <>
              <img src={infiniprayer} alt="infiniprayer" />
              <Timer timeLeft={timeLeft} />
            </>
          )}
          {!isMicClicked && (
            <>
              <p className={styles.message}>
                May <span>Mahatria&apos;s</span> wisdom illuminate my path as I join the HDB program.
              </p>
              <button onClick={handleMicClick} className={styles.mic}>
                <img
                  src={videoMic}
                  alt="mic"
                  className={styles.mic}
                />
              </button>
            </>
          )}
          {isTimerDone && !isMicClicked && (
            <button onClick={handleMicClick} className={styles.mic}>
              <img
                src={videoMic}
                alt="mic"
                className={styles.mic}
              />
            </button>
          )}
        </div>
      </div>
    );
  };
  
  export default SongBanner;