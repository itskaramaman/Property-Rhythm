"use client";

import { useEffect, useState } from "react";
import { MessageInterface } from "../utils/interfaces";
import axios from "axios";
import moment from "moment";

const MessagesPage = () => {
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get("/api/messages");
      setMessages(response.data?.messages);
    };

    fetchMessages();
  }, []);
  return (
    <section className="bg-blue-50 min-h-screen py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="bg-white px-6 py-8 mb-6 shadow-lg rounded-lg border border-gray-200">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">
            Your Messages
          </h1>
          {messages.map((message) => (
            <div key={message._id} className="space-y-6 mb-8">
              <div className="relative bg-white p-6 rounded-lg shadow-md border border-gray-200">
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
                    {moment(message.createdAt).format(
                      "MMMM D, YYYY, hh:mm:ss A z"
                    )}
                  </li>
                </ul>
                <div className="mt-6 flex space-x-4">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-200">
                    Mark As Read
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-200">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;
