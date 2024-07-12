import { ReactNode, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modalVariants = {
  hidden: { opacity: 0, y: "-50%", scale: 0.8 },
  visible: { opacity: 1, y: "0%", scale: 1 },
  exit: { opacity: 0, y: "-50%", scale: 0.8 }
};

export default function Modal({
  isOpen,
  onClose,
  children,
  modalContainerStyle,
  showCustomClose
}: {
  isOpen: boolean,
  onClose: () => void,
  children: ReactNode,
  modalContainerStyle?: string | undefined,
  showCustomClose?: boolean
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
        >
          <motion.div
            className={`bg-white rounded-lg p-6 w-full max-w-lg relative ${modalContainerStyle}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            ref={modalRef}
          >
            {!!showCustomClose ? null : <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-700"
            >
              &times;
            </button>}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
