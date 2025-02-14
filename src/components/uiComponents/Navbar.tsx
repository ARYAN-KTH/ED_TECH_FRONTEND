
import { Link } from "react-router-dom";

 


const Navbar = () => {

   

  return (
   
    <div className="fixed top-0 left-0 w-full flex justify-evenly p-3 bg-blue-400 z-50 shadow-md">
    <div className="flex justify-evenly gap-10">
      <Link to="/" className="hover:cursor-pointer">Home</Link>
      <div>Catalog</div>
      <div>About us</div>
      <div>Contact</div>
    </div>
    <div className="flex justify-evenly gap-10">
      <Link to="/login" className="hover:cursor-pointer">Login</Link>
      <Link to="/signup" className="hover:cursor-pointer">Signup</Link>
    </div>

    
  </div>
  
  );
};

export default Navbar;
