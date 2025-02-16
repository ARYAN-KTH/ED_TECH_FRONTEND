import ProtectedLayout from "@/components/layouts/ProtectedLayout";
import { ChevronLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {courseFormSchema} from "./schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import api from "../../../../../axiosService";
import { toast } from "sonner";
import { AxiosError } from "axios";


const CreateCourseStep1 = () => {
  const navigate = useNavigate();
 

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof courseFormSchema>>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      price: 0,
      category: "Web Development",
    },
  });

  const category = watch("category");

  // State to hold the array of benefits
  const [benefits, setBenefits] = useState<string[]>([]);
  const [newBenefit, setNewBenefit] = useState("");
  const [requirements, setRequirements] = useState<string[]>([]);
  const [newRequirement, setNewRequirement] = useState("");

  // const [courseThumbnail, setCourseThumbnail] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("file is ", file);
      // setCourseThumbnail(file);
      setValue("courseThumbnail", e.target.files[0]);
    }
  };

  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      // Add new benefit to the array
      const updatedBenefits = [...benefits, newBenefit];
      setBenefits(updatedBenefits); // Update the state with the new benefit

      // Update the form value for benefits
      setValue("benifits", updatedBenefits); // This will make sure the form has the latest value

      setNewBenefit(""); // Clear the input field after adding
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBenefit(e.target.value); // Update input field state as user types
  };

  const handleAddRequirement = () => {
    if (newRequirement.trim()) {
      // Add new requirement to the array
      const updatedRequirements = [...requirements, newRequirement];
      setRequirements(updatedRequirements); // Update the state with the new requirement

      // Update the form value for requirements
      setValue("requirements", updatedRequirements); // This will make sure the form has the latest value

      setNewRequirement(""); // Clear the input field after adding
    }
  };

  const handleRequirementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRequirement(e.target.value);
  };

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof courseFormSchema>) => {
      const res = await api.post("/course/create-course", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      return res?.data?.data;
    },
    onSuccess: (data: { _id: string }) => {
      console.log("data aa gaya ;====>",data)
      toast.success("Course created successfully!");
      navigate(`/create-course-step2?courseId=${data?._id}`);
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Something went wrong!");
      console.error(error);
    },
  });

  const submitHandler = (data: z.infer<typeof courseFormSchema>) => {
    mutation.mutate(data);
    console.log(data);
  };

  return (
    <ProtectedLayout>
      <div className="max-w-4xl mx-auto px-4">
        <div
          className="flex items-center mb-8"
          onClick={() => navigate("/create-course")}
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
          <span className="text-gray-600 hover:text-gray-900 cursor-pointer ml-1">
            Back to Dashboard
          </span>
        </div>

        <div className="flex items-center justify-center  mb-3">
          {/* Step 1 - Active */} 
          <div className="flex flex-col items-center">
            <span className="flex items-center justify-center rounded-full border-2 border-yellow-500 text-yellow-500 bg-transparent w-10 h-10 text-lg font-bold">
              1
            </span>
            <span className=" text-sm font-semibold text-black-500">
              Course Information
            </span>
          </div>

          {/* Dashed Line */}
          <div className="flex-1 h-0.5 border-t-2 border-dashed border-gray-500"></div>

          {/* Step 2 - Inactive */}
          <div className="flex flex-col items-center">
            <span className="flex items-center justify-center rounded-full border-2 border-gray-500 text-gray-500 bg-transparent w-10 h-10 text-lg font-bold">
              2
            </span>
            <span className=" text-sm font-semibold text-gray-400">
              Course Builder
            </span>
          </div>

          {/* Dashed Line */}
          <div className="flex-1 h-0.5 border-t-2 border-dashed border-gray-500"></div>

          {/* Step 3 - Inactive */}
          <div className="flex flex-col items-center">
            <span className="flex items-center justify-center rounded-full border-2 border-gray-500 text-gray-500 bg-transparent w-10 h-10 text-lg font-bold">
              3
            </span>
            <span className=" text-sm font-semibold text-gray-400">
              Publish
            </span>
          </div>
        </div>

        <Card className="p-8 bg-white shadow-md rounded-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Create New Course
          </h1>

          <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Course Title *
                </label>
                <Input
                  {...register("title")}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter course title"
                />
                {errors.title && (
                  <p className="text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Course Price *
                </label>
                <Input
                  {...register("price", { valueAsNumber: true })}
                  type="number"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter price in ₹"
                />
                {errors.price && (
                  <p className="text-red-500">{errors.price.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Course Category *
                </label>
                <Select
                  value={category}
                  onValueChange={(
                    value:
                      | "Web Development"
                      | "Data Science"
                      | "AI/ML"
                      | "Blockchain"
                      | "Others"
                  ) => setValue("category", value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Technology</SelectLabel>
                      <SelectItem value="Web Development">
                        Web Development
                      </SelectItem>
                      <SelectItem value="Blockchain">Blockchain</SelectItem>
                      <SelectItem value="AI/ML">AI/ML</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {errors.category && (
                  <p className="text-red-500">{errors.category.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Course Tag *
                </label>
                <Input
                  {...register("tag")}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter tag"
                />
                {errors.tag && (
                  <p className="text-red-500">{errors.tag.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Course Description *
              </label>
              <textarea
                {...register("description")}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                placeholder="Enter course description"
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Course Thumbnail *
              </label>
              <Input
                type="file"
                onChange={handleFileChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.courseThumbnail && (
                <p className="text-red-500">{errors.courseThumbnail.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Course Benefits *
              </label>
              <Input
                value={newBenefit}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter benefit"
              />
              {errors.benifits && (
                <p className="text-red-500">{errors.benifits.message}</p>
              )}
              <Button className="mt-2" onClick={handleAddBenefit} type="button">
                <Plus className="h-4 w-4" />
                Add Benefit
              </Button>

              <div className="mt-4">
                {/* Display the list of benefits */}
                {benefits.length > 0 && (
                  <ul>
                    {benefits.map((benefit, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {benefit}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Course Requirements *
              </label>
              <Input
                value={newRequirement}
                onChange={handleRequirementChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Requirements"
              />
              {errors.requirements && (
                <p className="text-red-500">{errors.requirements.message}</p>
              )}
              <Button
                className="mt-2"
                onClick={handleAddRequirement}
                type="button"
              >
                <Plus className="h-4 w-4" />
                Add Requirement
              </Button>
              <div>
                <ul>
                  {requirements.map((requirement, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="px-6"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              >
                Next Step
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </ProtectedLayout>
  );
};

export default CreateCourseStep1;
