const Toast = ({message}) => {
  return (
      <div
        className="
          fixed top-4 left-1/2 transform -translate-x-1/2
          px-6 py-3 bg-white text-gray-800 rounded-lg 
          shadow-lg shadow-gray-200/50
          transition-all duration-300 ease-in-out
        "
      >
        {message}
      </div>
  );
};

export default Toast;