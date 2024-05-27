import "./globals.css";

export const metadata = {
  title: "Property Rhythm | Find the perfect rentals",
  description: "Find your dream rental property",
  keywords: "rentals, properties",
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default MainLayout;
