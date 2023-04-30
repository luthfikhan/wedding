import classes from "./style.module.css";
import PropTypes from "prop-types";

const Loader = ({ open }) => {
  if (!open) return;

  return (
    <div className="h-screen bg-primary w-full flex items-center justify-center z-50 fixed opacity-80">
      <span className={classes.loader} />
    </div>
  );
};

Loader.propTypes = {
  open: PropTypes.bool,
};

export default Loader;
