import { useEffect } from "react";
import classes from "./style.module.css";

const AppLoader = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      document.getElementById("appLoader").classList.add("close-transition");
      setTimeout(() => {
        document.getElementById("appLoader").remove();
      }, 1000);
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={classes.container} id="appLoader">
      <div className={classes.center}>
        {/* <span className={classes.text}>Luthfi & Fika</span> */}
        <span className={classes.loader}>Luthfi & Fika</span>
      </div>
    </div>
  );
};

export default AppLoader;
