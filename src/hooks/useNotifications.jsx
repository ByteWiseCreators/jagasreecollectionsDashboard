/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import classNames from "classnames";
import PropTypes from "prop-types";
import { memo, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { FiCheckSquare, FiX } from "react-icons/fi";
import { BiError, BiInfoSquare } from "react-icons/bi";

const positions = {
  "top-right": "top-2 right-2 flex-col",
  "top-left": "top-2 left-2 flex-col",
  "bottom-right": "bottom-2 right-2 flex-col-reverse",
  "bottom-left": "bottom-2 left-2 flex-col-reverse",
};

const typeStyles = {
  success: { color: "bg-green-500", icon: <FiCheckSquare /> },
  error: { color: "bg-red-500", icon: <BiError /> },
  info: { color: "bg-blue-500", icon: <BiInfoSquare /> },
  warning: { color: "bg-yellow-400", icon: <BiError /> },
};

/**
 * Custom hook to manage and display notifications in a React application.
 * @param {Object} options - Configuration options for the hook.
 * @param {string} [options.position="top-right"] - The position of the notification container. Options: "top-right", "top-left", "bottom-right", "bottom-left".
 * @param {number} [options.ttl=5000] - Time-to-live for each notification in milliseconds.
 * @returns {Object} - The notification API.
 * @returns {Function} notify - Function to add a new notification. Accepts an object with `message` and `type`.
 * @returns {JSX.Element} NotificationContainer - React component that renders the notification container.
 */

const useNotification = ({ position = "top-right", ttl = 5000 }) => {
  const [notifications, setNotifications] = useState([]);

  /**
   * Adds a new notification to the container.
   * @param {Object} notification - The notification to be added.
   * @param {string} notification.message - The message to display.
   * @param {string} notification.type - The type of notification. Options: "success", "error", "info", "warning".
   */
  const notify = useCallback(
    ({ message, type }) =>
      setNotifications((pv) => [{ id: Date.now(), message, type }, ...pv]),
    []
  );

  const removeNotif = useCallback(
    (id) => setNotifications((pv) => pv.filter((n) => n.id !== id)),
    []
  );

  const container = () => (
    <div
      className={classNames(
        "flex gap-1 w-60 sm:w-72 fixed z-[100]",
        positions[position]
      )}
    >
      <AnimatePresence>
        {notifications.map((n) => (
          <Notification
            ttl={ttl}
            position={position}
            removeNotif={removeNotif}
            {...n}
            key={n.id}
          />
        ))}
      </AnimatePresence>
    </div>
  );

  return { notify, NotificationContainer: container };
};

/* ====================================================================================================== */

const Notification = memo(
  ({ message, id, type, removeNotif, ttl, position }) => {
    useEffect(() => {
      const timerRef = setTimeout(() => {
        removeNotif(id);
      }, ttl);

      return () => clearTimeout(timerRef);
    }, []);

    const directionToFadeOut = position.split("-")[1];

    return (
      <motion.div
        layout
        layoutId={id}
        initial={{ y: -15, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{
          x: directionToFadeOut === "right" ? "100%" : "-100%",
          opacity: 0,
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={classNames(
          "p-2 px-4 flex items-center rounded gap-2 text-sm font-medium shadow-lg text-white",
          typeStyles[type].color
        )}
      >
        {typeStyles[type].icon}
        <span>{message}</span>
        <button onClick={() => removeNotif(id)} className="ml-auto mt-0.5">
          <FiX className="size-5" />
        </button>
      </motion.div>
    );
  }
);

Notification.displayName = "Notification";

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["success", "error", "warning", "info"]).isRequired,
  removeNotif: PropTypes.func.isRequired,
  ttl: PropTypes.number.isRequired,
  position: PropTypes.oneOf([
    "top-left",
    "top-right",
    "bottom-right",
    "bottom-left",
  ]).isRequired,
};

export default useNotification;
