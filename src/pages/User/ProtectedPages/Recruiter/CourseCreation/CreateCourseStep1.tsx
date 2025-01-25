import ProtectedLayout from "@/components/layouts/ProtectedLayout";
import { ChevronLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import courseFormSchema from "./schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

const CreateCourseStep1 = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, } = useForm<z.infer<typeof courseFormSchema>>({
    resolver: zodResolver(courseFormSchema),
  });

  const onSubmit = (data: z.infer<typeof courseFormSchema>) => {
    console.log(data);
    navigate("/create-course");
  };

  // State to hold the array of benefits
  const [benefits, setBenefits] = useState<string[]>([]);
  const [newBenefit, setNewBenefit] = useState("");

  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      setBenefits([...benefits, newBenefit]); // Add new benefit to the array
      setNewBenefit(""); // Clear the input field after adding
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBenefit(e.target.value); // Update input field state as user types
  };

  return (
    <ProtectedLayout>
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center mb-8" onClick={() => navigate("/create-course")}>
          <ChevronLeft className="h-5 w-5 text-gray-600" />
          <span className="text-gray-600 hover:text-gray-900 cursor-pointer ml-1">Back to Dashboard</span>
        </div>

        <Card className="p-8 bg-white shadow-md rounded-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Course</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Course Title *</label>
                <Input 
                  {...register("title")} 
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter course title"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Course Price *</label>
                <Input 
                  {...register("price")} 
                  type="number"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter price in ₹"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Course Category *</label>
                <Input 
                  {...register("category")} 
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Select category"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Course Tag *</label>
                <Input 
                  {...register("tag")} 
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter tag"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Course Description *</label>
              <textarea 
                {...register("description")}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                placeholder="Enter course description"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Course Thumbnail *</label>
              <Input 
                {...register("courseThumbnail")} 
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter thumbnail URL"
              />
            </div>

            <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Course Benefits *</label>
      <Input
        value={newBenefit}
        onChange={handleInputChange}
        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        placeholder="Enter benefit"
      />
      <Button className="mt-2" onClick={handleAddBenefit}>
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
              <label className="text-sm font-medium text-gray-700">Course Benefits *</label>
              <Input 
                {...register("benifits")} 
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter benefit"
              />
              <Button className="mt-2"><Plus className="h-4 w-4" /></Button>
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
