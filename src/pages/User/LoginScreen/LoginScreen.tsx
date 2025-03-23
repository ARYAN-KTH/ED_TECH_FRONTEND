/* eslint-disable @typescript-eslint/no-unused-vars */
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
import {signInWithGoogle} from "../../../googleSignup/auth";

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


  const googleLoginHandler = async () => {
    try {
      const result = await signInWithGoogle();
      mutation.mutate({email:result.email, password:result.uid, });
      console.log("User Info:", result);
    } catch (error) {
      console.error("Error during login", error);
    }
  };

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
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-between items-center min-h-screen p-4 md:p-8 gap-8 max-w-7xl mx-auto">
        <div className="w-full md:w-1/2 max-w-md">
          <p className="text-2xl font-semibold mb-6">
            Welcome Back, Discover your passion
          </p>
          <div>
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="space-y-4 mt-6"
            >
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email *
                </label>
                <Input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {String(errors?.email?.message)}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Password *
                </label>
                <Input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">
                    {String(errors?.password?.message)}
                  </p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? "Loading..." : "Login"}
                </Button>
                <span>
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-blue-800 hover:underline">
                    Signup here
                  </Link>
                  !
                </span>
              </div>
{/*               <Button onClick={googleLoginHandler}>
                login with Google
              </Button> */}
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
