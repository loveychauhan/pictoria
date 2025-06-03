const Button = ({ text, color, onclickHandler }) => {
  return (
    <button
      className={`w-full max-w-[96px] cursor-pointer rounded-[10px] border-[1px] border-gray-400 px-2 py-1.5 ${color ? "bg-primary" : "bg-transparent"}`}
      onClick={onclickHandler}
    >
      {text}
    </button>
  );
};

export default Button;
