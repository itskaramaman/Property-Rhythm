import "./globals.css";

import Navbar from "@/app/components/Navbar";
import AuthProvider from "./components/AuthProvider";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";

export const metadata = {
  title: "Property Rhythm | Find the perfect rentals",
  description: "Find your dream rental property",
  keywords: "rentals, properties",
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar />
          <div>{children}</div>
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
