const Button = ({ text, color, onclickHandler }) => {
  return (
    <button
      className={`active:bg-light-gray w-full max-w-[96px] hover:opacity-85 hover:shadow-2xl cursor-pointer rounded-[10px] border-[1px] border-gray-400 px-2 py-1.5`}
      onClick={onclickHandler}
      style={{
        backgroundColor: color ? `var(--color-${color})` : "transparent",
        color: color ? "white" : "black",
      }}
    >
      {text}
    </button>
  );
};

export default Button;
