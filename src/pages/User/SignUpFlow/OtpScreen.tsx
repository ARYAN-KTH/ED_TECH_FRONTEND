import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Navbar from "@/components/uiComponents/Navbar";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ApiResponse } from "./type";
import { toast } from "sonner";
import { AxiosError } from "axios";
import api from "../../../axiosService";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


const OtpScreen = () => {

  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const location = useLocation();
  const email = location.state?.email;

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await api.post<ApiResponse>("/user/verify-otp", { otp,email });
      console.log(response);
      return response.data; // Ensure response.data ka type ApiResponse ho
    },
    onSuccess: (data: ApiResponse) => {
      console.log("Navigation triggered to /otp");
      toast.success(data.message || "Account created successfully!");
      navigate("/login");
    },
    onError: (error: AxiosError<ApiResponse>) => {
      console.log(error);
      const errorMessage = error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    },
  }); 

  const clickHandler = () => {
    if(otp.length === 6){
      mutation.mutate();
    }
    else{
      toast.error("Please enter a valid OTP");
    }
  }

  
  

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
          <div className="text-center">
            <div className="flex justify-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Verify Your Email</h2>
            <p className="mt-2 text-sm text-gray-600">
              We've sent a verification code to your email address. Please enter it below.
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="flex justify-center">
              <InputOTP maxLength={6} className="gap-2" onChange={(otp)=>setOtp(otp)}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="space-y-4">
              <Button className="w-full py-3 bg-blue-600 hover:bg-blue-700" onClick={clickHandler}>
                Verify Email
              </Button>

              <div className="text-center">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium focus:outline-none">
                  Resend Code
                </button>
              </div>
            </div>

            <div className="text-center text-sm">
              <span className="text-gray-500">Didn't receive the code? </span>
              <span className="text-gray-700">Check your spam folder</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpScreen;
