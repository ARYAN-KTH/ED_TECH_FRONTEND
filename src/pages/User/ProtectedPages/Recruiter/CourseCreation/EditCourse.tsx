import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { IndividualCourseResponse } from "./types";
import { EditFormValues, editFormSchema } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Plus, Pencil, ImageIcon, ListChecks, Award, Tag, DollarSign, FileText, X } from 'lucide-react';
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import api from "../../../../../axiosService";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

enum Category {
  WebDevelopment = "Web Development",
  DataScience = "Data Science",
  AI_ML = "AI/ML",
  Blockchain = "Blockchain",
  Others = "Others",
}

const EditCourse = ({ course }: { course: IndividualCourseResponse }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<EditFormValues>({
    resolver: zodResolver(editFormSchema),
    mode: "onChange",
    defaultValues: {
      title: course?.data.title || "",
      description: course?.data.description || "",
      price: course?.data.price || 0,
      category: (course?.data.category as Category) || Category.WebDevelopment,
      tag: course?.data.tag || "",
      courseThumbnail: course?.data.courseThumbnail || "",
      requirements: course?.data.requirements || [],
      benifits: course?.data.benifits || [],
    },
  });

  const mutation = useMutation({
    mutationFn: (data: EditFormValues) => {
      return api.put(`/course/update-course/${course?.data?._id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: () => {
      toast.success("Course updated successfully");
      navigate(-1);
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Something went wrong!");
    },
  });

  const submitHandler = async (data: EditFormValues) => {
    try {
      console.log("Form submitted with data:", data);
      mutation.mutate(data);
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };

  const handlePreview = () => {
    window.open(course?.data.courseThumbnail, "_blank");
  };

  // State to hold the array of benefits
  const [benefits, setBenefits] = useState<string[]>([]);
  const [newBenefit, setNewBenefit] = useState("");
  const [requirements, setRequirements] = useState<string[]>([]);
  const [newRequirement, setNewRequirement] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(course?.data.courseThumbnail || null);

  useEffect(() => {
    setBenefits(course?.data.benifits || []);
    setRequirements(course?.data.requirements || []);
  }, [course]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setValue("courseThumbnail", file);
      
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);
    }
  };

  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      const updatedBenefits = [...benefits, newBenefit];
      setBenefits(updatedBenefits);
      setValue("benifits", updatedBenefits);
      setNewBenefit("");
    }
  };

  const handleRemoveBenefit = (index: number) => {
    const updatedBenefits = benefits.filter((_, i) => i !== index);
    setBenefits(updatedBenefits);
    setValue("benifits", updatedBenefits);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBenefit(e.target.value);
  };

  const handleAddRequirement = () => {
    if (newRequirement.trim()) {
      const updatedRequirements = [...requirements, newRequirement];
      setRequirements(updatedRequirements);
      setValue("requirements", updatedRequirements);
      setNewRequirement("");
    }
  };

  const handleRemoveRequirement = (index: number) => {
    const updatedRequirements = requirements.filter((_, i) => i !== index);
    setRequirements(updatedRequirements);
    setValue("requirements", updatedRequirements);
  };

  const handleRequirementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRequirement(e.target.value);
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    action: () => void
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      action();
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" className="flex items-center gap-2">
          <Pencil className="h-4 w-4" />
          Edit Course
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Course</DialogTitle>
          <DialogDescription>
            Make changes to your course information below
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="basic" className="mt-6">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="content">Description</TabsTrigger>
            <TabsTrigger value="requirements">Requirements & Benefits</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit(submitHandler)}>
            <TabsContent value="basic" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Course Title *
                  </label>
                  <Input
                    {...register("title")}
                    className="w-full"
                    placeholder="Enter course title"
                  />
                  {errors.title && (
                    <p className="text-destructive text-sm">{errors.title.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    Course Price *
                  </label>
                  <Input
                    {...register("price", { valueAsNumber: true })}
                    type="number"
                    className="w-full"
                    placeholder="Enter price in ₹"
                  />
                  {errors.price && (
                    <p className="text-destructive text-sm">{errors.price.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Tag className="h-4 w-4 text-primary" />
                    Course Category *
                  </label>
                  <Select
                    defaultValue={course?.data.category}
                    onValueChange={(value: Category) => setValue("category", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Technology</SelectLabel>
                        <SelectItem value="Web Development">Web Development</SelectItem>
                        <SelectItem value="Blockchain">Blockchain</SelectItem>
                        <SelectItem value="AI/ML">AI/ML</SelectItem>
                        <SelectItem value="Data Science">Data Science</SelectItem>
                        <SelectItem value="Others">Others</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-destructive text-sm">{errors.category.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Tag className="h-4 w-4 text-primary" />
                    Course Tag *
                  </label>
                  <Input
                    {...register("tag")}
                    className="w-full"
                    placeholder="Enter tag"
                  />
                  {errors.tag && (
                    <p className="text-destructive text-sm">{errors.tag.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-primary" />
                  Course Thumbnail *
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="border rounded-md p-4 bg-muted/30">
                      <Input
                        type="file"
                        id="thumbnail"
                        onChange={handleFileChange}
                        className="w-full"
                      />
                    </div>
                    {errors.courseThumbnail && (
                      <p className="text-destructive text-sm mt-2">{errors.courseThumbnail.message}</p>
                    )}
                  </div>
                  
                  <div className="flex flex-col items-center">
                    {thumbnailPreview ? (
                      <div className="relative w-full h-40 rounded-md overflow-hidden border">
                        <img 
                          src={thumbnailPreview || "/placeholder.svg"} 
                          alt="Course thumbnail preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-40 rounded-md bg-muted flex items-center justify-center border">
                        <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
                      </div>
                    )}
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handlePreview} 
                      className="mt-2"
                      disabled={!thumbnailPreview}
                    >
                      View Previous Thumbnail
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="content" className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Course Description *
                </label>
                <Textarea
                  {...register("description")}
                  className="w-full min-h-[200px] resize-y"
                  placeholder="Enter a detailed description of your course..."
                />
                {errors.description && (
                  <p className="text-destructive text-sm">{errors.description.message}</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="requirements" className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-medium">Course Benefits</h3>
                    </div>
                    
                    <div className="flex gap-2">
                      <Input
                        value={newBenefit}
                        onChange={handleInputChange}
                        onKeyPress={(e) => handleKeyPress(e, handleAddBenefit)}
                        className="flex-1"
                        placeholder="What will students gain from this course?"
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button onClick={handleAddBenefit} type="button" size="icon">
                              <Plus className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Add Benefit</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    {errors.benifits && (
                      <p className="text-destructive text-sm">{errors.benifits.message}</p>
                    )}

                    <div className="flex flex-wrap gap-2 mt-4">
                      {benefits.length > 0 ? (
                        benefits.map((benefit, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary"
                            className="py-2 px-3 text-sm flex items-center gap-2"
                          >
                            {benefit}
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 rounded-full"
                              onClick={() => handleRemoveBenefit(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))
                      ) : (
                        <p className="text-muted-foreground text-sm">No benefits added yet</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <ListChecks className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-medium">Course Requirements</h3>
                    </div>
                    
                    <div className="flex gap-2">
                      <Input
                        value={newRequirement}
                        onChange={handleRequirementChange}
                        onKeyPress={(e) => handleKeyPress(e, handleAddRequirement)}
                        className="flex-1"
                        placeholder="What should students know before starting?"
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button onClick={handleAddRequirement} type="button" size="icon">
                              <Plus className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Add Requirement</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    {errors.requirements && (
                      <p className="text-destructive text-sm">{errors.requirements.message}</p>
                    )}

                    <div className="flex flex-wrap gap-2 mt-4">
                      {requirements.length > 0 ? (
                        requirements.map((requirement, index) => (
                          <Badge 
                            key={index} 
                            variant="outline"
                            className="py-2 px-3 text-sm flex items-center gap-2"
                          >
                            {requirement}
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 rounded-full"
                              onClick={() => handleRemoveRequirement(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))
                      ) : (
                        <p className="text-muted-foreground text-sm">No requirements added yet</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <div className="mt-6 flex justify-end">
              <Button
                type="submit"
                className="w-full md:w-auto"
                disabled={mutation.isPending }
              >
                {mutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                    Saving Changes...
                  </span>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EditCourse;
