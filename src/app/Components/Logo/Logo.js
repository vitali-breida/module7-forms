import PropTypes from "prop-types";
export default function Logo(props) {
  return (
    <div align={props.align}>
      <b>netflix</b>roulette
    </div>
  );
}

Logo.defaultProps = {
  align: "left"
};

Logo.propTypes = {
  align: PropTypes.oneOf(["left", "center"])
};
