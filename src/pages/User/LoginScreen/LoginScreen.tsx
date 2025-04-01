import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/uiComponents/Navbar";
import { useMutation } from "@tanstack/react-query";
import { ApiResponse } from "../SignUpFlow/type";
import { toast } from "sonner";
import { AxiosError } from "axios";
import api from "../../../axiosService";

interface loginData {
  email: string;
  password: string;
}

const LoginScreen = () => {
  const Navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginData>();


  const mutation = useMutation({
    mutationFn: async (data: loginData): Promise<ApiResponse> => {
      const response = await api.post<ApiResponse>("/user/login", data, { withCredentials: true });
      console.log(response);
      return response.data; // Ensure response.data ka type ApiResponse ho
    },
    onSuccess: (data: ApiResponse) => {
      console.log("Navigation triggered to /otp");
      toast.success(data.message || "Account logged in successfully!");
      if (data?.accessToken) {
        localStorage.setItem("token", data.accessToken);
      }
      localStorage.setItem("user", JSON.stringify(data.user));
      if(data.user.role === "Instructor"){
        Navigate("/create-course-step1");
      }else{
        Navigate("/courses");
      }
    },
    onError: (error: AxiosError<{message: string}>) => {
      console.log("error is", error);
      const errorMessage = error?.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    },
  });


  const submitHandler = (data: loginData) => {
    mutation.mutate({...data});
    console.log("Login Success", data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <div className="flex items-center justify-center min-h-[100vh]">
          <div className="w-full md:w-1/2 max-w-md backdrop-blur-md bg-white/80 p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Welcome Back</h1>
            <p className="text-gray-600 mb-6">Discover your passion for learning</p>
            <div>
              <form
                onSubmit={handleSubmit(submitHandler)}
                className="space-y-5"
              >
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {String(errors?.email?.message)}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {String(errors?.password?.message)}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <Button 
                    type="submit" 
                    disabled={mutation.isPending}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 transition-all duration-200 disabled:opacity-50"
                  >
                    {mutation.isPending ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                        <span>Logging in...</span>
                      </div>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </div>
                <p className="text-center text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                    Sign up here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
