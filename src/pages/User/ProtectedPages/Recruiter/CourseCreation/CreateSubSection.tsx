import api from "../../../../../axiosService";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { SubSectionFormValues, subSectionFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Upload, Loader2 } from "lucide-react";

const CreateSubSection = ({ sectionId, courseId, refetch }: { sectionId: string, courseId: string, refetch: () => void }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SubSectionFormValues>({
    resolver: zodResolver(subSectionFormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SubSectionFormValues) => {
      return api.post(`/course/create-subsection/${sectionId}/${courseId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    onSuccess: () => {
      toast.success("Subsection created successfully")
      navigate(-1)
      reset()
      refetch()
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Something went wrong!")
    },
  })

  const onSubmit = (data: SubSectionFormValues) => {
    mutate(data)
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setValue("videoUrl", file);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md transition-all">
          <PlusCircle size={18} />
          <span>Add Subsection</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create New Subsection</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Title
            </Label>
            <Input 
              id="title"
              placeholder="Enter subsection title" 
              className="w-full" 
              {...register("title")} 
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea 
              id="description"
              placeholder="Enter description" 
              className="w-full min-h-24" 
              {...register("description")} 
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="video" className="text-sm font-medium">
              Video
            </Label>
            <div className="border border-dashed border-gray-300 rounded-lg p-4 transition-all hover:border-blue-400">
              <label htmlFor="video-upload" className="flex flex-col items-center justify-center cursor-pointer">
                <Upload size={24} className="text-gray-500 mb-2" />
                <span className="text-sm font-medium text-gray-600">Upload a video file</span>
                <span className="text-xs text-gray-400 mt-1">MP4, MOV, or WebM</span>
                <Input
                  id="video-upload"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept="video/*"
                />
              </label>
            </div>
            {errors.videoUrl && (
              <p className="text-red-500 text-sm">{errors.videoUrl.message}</p>
            )}
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              className="mr-2"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isPending}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isPending ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Create Subsection"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSubSection;