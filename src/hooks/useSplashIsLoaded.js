import { useState, useEffect } from "react";

const useSplashIsLoaded = () => {
  const [isLoaded, setIsloaded] = useState(false);
  useEffect(async () => {
    setTimeout(() => {
      setIsloaded(true);
    }, 5000);
  }, []);
  return { isLoaded: isLoaded };
};
export default useSplashIsLoaded;
