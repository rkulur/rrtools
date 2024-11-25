import { ReactNode } from "react";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 relative">
        <button
          className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
