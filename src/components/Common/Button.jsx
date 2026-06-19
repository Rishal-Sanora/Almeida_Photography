function Button({
  children,
  className = "",
  ...props
}) {
  return (
    <button
      className={`
      bg-yellow-500
      text-black
      px-6
      py-3
      rounded-xl
      font-bold
      hover:bg-yellow-400
      duration-300
      ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;