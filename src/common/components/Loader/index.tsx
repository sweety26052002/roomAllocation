import styles from "./index.module.scss";
import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { loader } from './Loader.ts';
const Loader = () => {
  const loaderContainer = useRef(null);

  useEffect(() => {
    if (loaderContainer.current) {
      const anim = lottie.loadAnimation({
        container: loaderContainer.current, // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: loader, // the path to the animation json
      });

      return () => anim.destroy(); // optional clean up for unmounting
    }
  }, []);

  return (
    <div className={styles.loaderOverlay}>
      <div ref={loaderContainer} className={styles.load}> </div>
    </div>
  )
};

export default Loader;
