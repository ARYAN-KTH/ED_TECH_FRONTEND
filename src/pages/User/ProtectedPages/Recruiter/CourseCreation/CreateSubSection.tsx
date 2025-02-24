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
import { Plus } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";

const CreateSubSection = ({ sectionId, courseId, refetch }: { sectionId: string, courseId: string, refetch: () => void }) => {
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
      toast.success("Section created successfully")
      reset()
      refetch()
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Something went wrong!")
    },
  })

  const onSubmit = (data: SubSectionFormValues) => {
    mutate(data)
    console.log(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("file is ", file);
      setValue("videoUrl", e.target.files[0]);
    }
  };

  return (
    <div>
      <Dialog >
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus className="mr-2 size-4" />Create SubSection
          </Button>
        </DialogTrigger>
        <DialogContent >
        <DialogTitle>Create SubSection</DialogTitle>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Title</label>
              <Input type="text" {...register("title")} />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div>
              <label>description</label>
              <Input type="text" {...register("description")} />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
            <div>
              <label>Video</label>
              <Input
                type="file"
                onChange={handleFileChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.videoUrl && (
                <p className="text-red-500">{errors.videoUrl.message}</p>
              )}
            </div>
            <Button type="submit" disabled={isPending}>{isPending ? "Submitting..." : "Submit"}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateSubSection;
