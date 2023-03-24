import Footer from "./ui/Footer";
import Navbar from "./ui/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <div >
      <div>
        <Navbar />
      </div>
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;