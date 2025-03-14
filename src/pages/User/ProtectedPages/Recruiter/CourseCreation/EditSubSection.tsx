import api from "../../../../../axiosService";
import {
  Dialog,
  DialogContent,
  DialogTitle,
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
import { Loader2, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

interface SubSectionInterface {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  section: string;
  course: string;
}

const EditSubSection = ({subSection, refetch}: {subSection: SubSectionInterface, refetch: () => void}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SubSectionFormValues>({
    resolver: zodResolver(subSectionFormSchema),
    defaultValues: {
        title: subSection.title,
        description: subSection.description,
        videoUrl: subSection.videoUrl
    }
  });

  useEffect(() => {
    reset({
        title: subSection.title,
        description: subSection.description,
        videoUrl: subSection.videoUrl
    })
  }, [subSection, reset])


  const { mutate, isPending } = useMutation({
    mutationFn: (data: SubSectionFormValues) => {
      return api.put(`/course/update-subsection/${subSection._id}/${subSection.section}/${subSection.course}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: () => {
      toast.success("Subsection updated successfully");
      refetch();
      reset();
      setIsOpen(false);
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Something went wrong!");
    },
  });

  const onSubmit = (data: SubSectionFormValues) => {
    mutate(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setValue("videoUrl", e.target.files[0]);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Edit Subsection</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input id="title" type="text" {...register("title")} />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Input id="description" type="text" {...register("description")} />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="videoUrl" className="text-sm font-medium">Video</label>
              <p className="text-xs text-muted-foreground mb-2">
                {typeof subSection.videoUrl === 'string' 
                  ? "Current video: " + subSection.videoUrl.split('/').pop() 
                  : "Upload a new video to replace the current one"}
              </p>
              <Input
                id="videoUrl"
                type="file"
                onChange={handleFileChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.videoUrl && (
                <p className="text-sm text-destructive">{errors.videoUrl.message}</p>
              )}
            </div>
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Pencil className="w-4 h-4 mr-2" />}
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditSubSection;
