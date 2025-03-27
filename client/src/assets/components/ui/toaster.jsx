import { useState, useEffect } from "react";

function Toaster({ message, type = "info", onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000); // Auto-close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  const toastStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
  };

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-2 rounded-md shadow-md transition-opacity ${
        toastStyles[type]
      }`}
    >
      <span>{message}</span>
      <button onClick={() => setVisible(false)} className="ml-2 font-bold">
        ✖
      </button>
    </div>
  );
}

export default Toaster;
