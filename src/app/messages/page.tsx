"use client";

import { useEffect, useState } from "react";
import { MessageInterface } from "../utils/interfaces";
import axios from "axios";
import Message from "../components/Message";
import Spinner from "../components/Spinner";
import { useSession } from "next-auth/react";

const MessagesPage = () => {
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;
    const fetchMessages = async () => {
      const response = await axios.get("/api/messages");
      setMessages(response.data?.messages);
      setLoading(false);
    };

    fetchMessages();
  }, [session]);

  if (loading) return <Spinner loading={loading} />;
  return (
    <section className="bg-blue-50 min-h-screen py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="bg-white px-6 py-8 mb-6 shadow-lg rounded-lg border border-gray-200">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">
            Your Messages
          </h1>
          {messages.length === 0 ? (
            <p>You have no messages</p>
          ) : (
            messages.map((message) => (
              <Message message={message} key={message._id} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;
