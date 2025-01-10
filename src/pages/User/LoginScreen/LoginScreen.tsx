

import { useForm } from "react-hook-form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/uiComponents/Navbar";

const LoginScreen = () => {
  const { register, handleSubmit } = useForm();

  return (
    <>  
        <Navbar />
    <div className="flex flex-col md:flex-row justify-between items-center min-h-screen p-4 md:p-8 gap-8 max-w-7xl mx-auto">
      <div className="w-full md:w-1/2 max-w-md">
        <p className="text-2xl font-semibold mb-6">Welcome Back, Discover your passion</p>
        <div>
          <Tabs defaultValue="Student" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="Student" className="w-1/2">Student</TabsTrigger>
              <TabsTrigger value="Instructor" className="w-1/2">Instructor</TabsTrigger>
            </TabsList>
          </Tabs>
          <form onSubmit={handleSubmit((data) => console.log(data))} className="space-y-4 mt-6">
            <div>
              <label className="block text-sm font-medium mb-1"> Email *</label>
              <Input type="email" {...register("email")} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password *</label>
              <Input type="password" {...register("password")} />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Button type="submit">Login</Button>
              <span>Don't have an account? <Link to="/signup" className="text-blue-800 hover:underline">Signup here</Link>!</span>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <img
          src="https://thumbs.dreamstime.com/b/edtech-education-technology-e-learning-online-learning-internet-technology-concept-edtech-education-technology-e-learning-online-341756501.jpg"
          alt="Education Technology Illustration"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
    </>
  );
};

export default LoginScreen;

