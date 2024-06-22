"use client";

import axios from "axios";
import { MessageInterface } from "../utils/interfaces";
import moment from "moment";
import { toast } from "react-toastify";
import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";

const Message = ({ message }: { message: MessageInterface }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const { setUnreadCount } = useGlobalContext();

  const onMarkAsReadClick = async () => {
    try {
      const response = await axios.patch(`/api/messages/${message._id}`);
      if (response.status === 200) {
        setIsRead(response.data?.message.read);
        response.data?.message.read
          ? setUnreadCount((prev) => prev - 1)
          : setUnreadCount((prev) => prev + 1);
      }
    } catch (error) {
      toast.error("Could not mark as read!");
    }
  };

  const onMessageDelete = async () => {
    try {
      const response = await axios.delete(`/api/messages/${message._id}`);
      if (response.status === 200) {
        setIsDeleted(true);
        toast.success("Message deleted successfully");
      }
    } catch (error) {
      toast.error("Could not delete message");
    }
  };

  if (isDeleted) return null;

  return (
    <div key={message._id} className="space-y-6 mb-8">
      <div
        className={`${
          !isRead ? "bg-blue-100" : "bg-white"
        } relative p-6 rounded-lg shadow-md border border-gray-200`}
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          <span className="font-bold">Property Inquiry:</span>{" "}
          {message.property.name}
        </h2>
        <p className="text-gray-700 leading-relaxed">{message.body}</p>

        <ul className="mt-6 space-y-2">
          <li className="text-gray-800">
            <strong>Name:</strong> {message.name}
          </li>
          <li className="text-gray-800">
            <strong>Reply Email:</strong>
            <a
              href={`mailto:${message.email}`}
              className="text-blue-500 hover:underline ml-1"
            >
              {message.email}
            </a>
          </li>
          <li className="text-gray-800">
            <strong>Reply Phone:</strong>
            <a
              href={`tel:${message.phone}`}
              className="text-blue-500 hover:underline ml-1"
            >
              {message.phone}
            </a>
          </li>
          <li className="text-gray-800">
            <strong>Received:</strong>{" "}
            {moment(message.createdAt).format("MMMM D, YYYY, hh:mm:ss A z")}
          </li>
        </ul>
        <div className="mt-6 flex space-x-4">
          <button
            onClick={onMarkAsReadClick}
            className="min-w-[150px] bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-200"
          >
            {isRead ? "Mark as Unread" : "Mark As Read"}
          </button>
          <button
            onClick={onMessageDelete}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
