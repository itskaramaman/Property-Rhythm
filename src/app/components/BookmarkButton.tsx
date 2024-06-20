"use client";

import { FaBookmark } from "react-icons/fa";
import { PropertyInterface } from "../utils/interfaces";
import axios from "axios";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const BookmarkButton = ({ property }: { property: PropertyInterface }) => {
  const { data: session } = useSession();
  const [savingBookmark, setSavingBookmark] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const onBookmarkClick = async () => {
    try {
      if (!session) {
        toast.info("You need to be logged in to bookmark!");
        return;
      }
      setSavingBookmark(true);
      const response = await axios.post(
        `/api/properties/bookmarks/${property._id}`
      );

      if (response.status === 201) {
        setBookmarked(!bookmarked);
        toast.success(response.data?.message);
      }
      setSavingBookmark(false);
    } catch (error: any) {
      console.log(error.message);
      toast.error("Error while saving bookmark");
    }
  };

  useEffect(() => {
    const fetchBookmarked = async () => {
      const response = await axios.get(
        `/api/properties/bookmarks/${property._id}`
      );
      response.data?.bookmarked ? setBookmarked(true) : setBookmarked(false);
    };
    if (session) {
      fetchBookmarked();
    }
  }, [property._id, session]);

  return (
    <button
      onClick={onBookmarkClick}
      className={` ${
        bookmarked
          ? "bg-green-600 hover:bg-green-700"
          : "bg-blue-500 hover:bg-blue-600"
      } text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}
    >
      {savingBookmark ? (
        <ThreeDots
          visible={true}
          height="20"
          width="20"
          color="white"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        <>
          <FaBookmark className="mr-2" />{" "}
          {bookmarked ? "Bookmarked" : "Bookmark Property"}
        </>
      )}
    </button>
  );
};

export default BookmarkButton;
