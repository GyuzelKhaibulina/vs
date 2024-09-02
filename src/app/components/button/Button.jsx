const Button = ({ text, margin, padding, bgr, border, cursor, onClick, width, textAlign, fontsize, lettersp, fontf}) => {
    return (
      <button
        type="button"
        style={{
          margin: margin,
          padding: padding,
          background: bgr,
          border: border,
          cursor: cursor,
          width: width,
          textAlign: textAlign,
          fontSize: fontsize,
          letterSpacing: lettersp,
          fontFamily: fontf
        }}
        onClick={onClick}
      >
        {text}  

        
      </button>
    );
  };
  
  export default Button;