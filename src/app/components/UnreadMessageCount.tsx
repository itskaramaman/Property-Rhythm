"use client";

import { useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "../context/GlobalContext";

const UnreadMessageCount = () => {
  const { unreadCount, setUnreadCount } = useGlobalContext();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;
    const fetchMessageCount = async () => {
      try {
        const response = await axios.get("/api/messages/unread-count");
        if (response.status === 200) {
          setUnreadCount(response.data.count);
        }
      } catch (error) {
        console.log("Could not fetch new messages");
      }
    };

    fetchMessageCount();
  }, [session, setUnreadCount]);

  if (!unreadCount) return;

  return (
    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
      {unreadCount}
    </span>
  );
};

export default UnreadMessageCount;
