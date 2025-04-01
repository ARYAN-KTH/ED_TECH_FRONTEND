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

const SignUpScreen = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("Student");


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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <div className="flex items-center justify-center min-h-[100vh] ">
          <div className="w-full md:w-1/2 max-w-md backdrop-blur-md bg-white/80 px-8 py-4 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Create Account</h1>
            <div>
              <Tabs
                defaultValue="Student"
                onValueChange={setActiveTab}
                className="w-full mb-6"
              >
                <TabsList className="w-full grid grid-cols-2 bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger 
                    value="Student" 
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all duration-200"
                  >
                    Student
                  </TabsTrigger>
                  <TabsTrigger 
                    value="Instructor"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all duration-200"
                  >
                    Instructor
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <form
                onSubmit={handleSubmit(submitHandler)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <Input 
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      {...register("firstName")} 
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <Input 
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      {...register("lastName")} 
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input 
                    type="email" 
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    {...register("email")} 
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <Input 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    {...register("phone")} 
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 pr-10"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-4 pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 transition-all duration-200 disabled:opacity-50"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                        <span>Creating account...</span>
                      </div>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                  <p className="text-center text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline font-medium">
                      Log in here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SignUpScreen;
