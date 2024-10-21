/* eslint-disable react/prop-types */
const AppButton = ({
    text,
    textColor,
    bgColor,
    useBorder,
    handleClick,
    type,
    disabled,
  }) => {
    return (
      <button
        type={type ? type : "button"}
        onClick={handleClick}
        style={{
          color: textColor ? textColor : "black",
          backgroundColor: disabled ? "grey" : bgColor ? bgColor : "white",
          border: useBorder ? "1px solid black" : "none",
          ...styles.button,
        }}
        disabled={disabled}
      >
        {text}
      </button>
    );
  };
  
  export default AppButton;
  
  const styles = {
    button: {
      padding: "10px",
      // border: "none",
      borderRadius: "6px",
      fontSize: "14px",
      fontWeight: 500,
      marginTop: "5px",
      width: "100%",
    },
  };
  