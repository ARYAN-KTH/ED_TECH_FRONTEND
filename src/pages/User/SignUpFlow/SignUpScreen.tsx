import { useForm } from "react-hook-form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/uiComponents/Navbar";
import { zodResolver } from "@hookform/resolvers/zod";
import formSchema from "./formSchema";
import { SignUpFormData, ApiResponse } from "./type";
import { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../../../axiosService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {signInWithGoogle} from "../../../googleSignup/auth";

const SignUpScreen = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(formSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("Student");

  const googleSignupHandler = async () => {
    try {
      const result = await signInWithGoogle();
      mutation.mutate({email:result.email,googleAuth:true,firstName:result.displayName,lastName:result.displayName,phone:"3287447473", password:result.uid, role:activeTab});
      console.log("User Info:", result);
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  // Define the mutation
  const mutation = useMutation({
    mutationFn: async (
      data: SignUpFormData & { role: string }
    ): Promise<ApiResponse> => {
      const response = await api.post<ApiResponse>("/user/register", data);
      console.log(response);
      return response.data; // Ensure response.data ka type ApiResponse ho
    },
    onSuccess: (data: ApiResponse, SignUpFormData) => {
      console.log("Navigation triggered to /otp");
      toast.success(data.message || "Account created successfully!");
      navigate("/otp", { state: { email: SignUpFormData.email } });
    },
    onError: (error: AxiosError<ApiResponse>) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    },
  });

  // Trigger the mutation
  const submitHandler = (data: SignUpFormData) => {
    mutation.mutate({ ...data, role: activeTab }); // Pass the payload to the mutation function
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-between items-center min-h-screen p-4 md:p-8 gap-8 max-w-7xl mx-auto">
        <div className="w-full md:w-1/2 max-w-md">
          <p className="text-2xl font-semibold mb-6">
            Welcome Back, Discover your passion
          </p>
          <div>
            <Tabs
              defaultValue="Student"
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full">
                <TabsTrigger value="Student" className="w-1/2">
                  Student
                </TabsTrigger>
                <TabsTrigger value="Instructor" className="w-1/2">
                  Instructor
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="space-y-4 mt-6"
            >
              <div>
                <label className="block text-sm font-medium mb-1">
                  {" "}
                  First Name *
                </label>
                <Input type="text" {...register("firstName")} />
                {errors.firstName && (
                  <p className="text-red-500 text-xs">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  {" "}
                  Last Name *
                </label>
                <Input type="text" {...register("lastName")} />
                {errors.lastName && (
                  <p className="text-red-500 text-xs">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  {" "}
                  Email *
                </label>
                <Input type="email" {...register("email")} />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone *
                </label>
                <Input type="text" {...register("phone")} />
                {errors.phone && (
                  <p className="text-red-500 text-xs">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                  />
                  {showPassword ? (
                    <EyeOff
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <Eye
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Button
                  type="submit"
                  className={` ${
                    mutation.isPending ? "bg-gray-400 cursor-not-allowed" : ""
                  }`}
                >
                  {mutation.isPending ? "Loading..." : "Signup"}
                </Button>
                <span>
                  Already have account{" "}
                  <Link to="/login" className="text-blue-800 hover:underline">
                    login here
                  </Link>
                  !
                </span>
                <Button onClick={googleSignupHandler}>
                 Signup with Google
                </Button>
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

export default SignUpScreen;
