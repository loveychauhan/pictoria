const Button = ({ text, color, uploadHandler, Icon }) => {
  return (
    <>
      {Icon ? (
        <button
          className="hover:text-opacity-90 flex items-center justify-center text-3xl transition-all duration-200 ease-in-out"
          onClick={uploadHandler}
          title="Upload Image"
        >
          {Icon}
        </button>
      ) : (
        <button
          onClick={uploadHandler}
          className="mx-auto w-full max-w-[100px] cursor-pointer rounded-lg border border-gray-400 px-3 py-2 font-semibold transition duration-200 hover:shadow-xl active:scale-95"
          style={{
            backgroundColor: color ? `var(--color-${color})` : "#f0f0f0",
            color: color ? "#ffffff" : "#333",
          }}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default Button;
