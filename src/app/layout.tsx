import "./globals.css";

import Navbar from "@/app/components/Navbar";

export const metadata = {
  title: "Property Rhythm | Find the perfect rentals",
  description: "Find your dream rental property",
  keywords: "rentals, properties",
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div>{children}</div>
      </body>
    </html>
  );
};

export default MainLayout;
