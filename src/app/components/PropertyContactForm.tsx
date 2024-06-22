"use client";

import { FaPaperPlane } from "react-icons/fa";
import { PropertyInterface } from "../utils/interfaces";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { useGlobalContext } from "../context/GlobalContext";

const PropertyContactForm = ({ property }: { property: PropertyInterface }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { setUnreadCount } = useGlobalContext();

  const { data: session } = useSession();

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const response = await axios.post("/api/messages", {
        name,
        email,
        phone,
        body,
        property: property._id,
        recipient: property.owner,
        sender: session?.user?.id,
      });
      if (response.status === 201) {
        toast.success("Message Sent");
        if (property.owner === session?.user?.id) {
          setUnreadCount((prev) => prev + 1);
        }
      }
    } catch (error) {
      toast.error("Could not send message");
    } finally {
      setSubmitting(false);
      setName("");
      setEmail("");
      setPhone("");
      setBody("");
    }
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
      {!session ? (
        <p className="text-sm">
          You need to be logged in to contact property manager
        </p>
      ) : (
        <form onSubmit={(e) => onFormSubmit(e)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
              id="message"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Enter your message"
            ></textarea>
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
              type="submit"
            >
              {submitting ? (
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
                  <FaPaperPlane className="mr-2" /> Send Message
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PropertyContactForm;
