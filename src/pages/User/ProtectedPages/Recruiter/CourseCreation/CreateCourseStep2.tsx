import ProtectedLayout from "@/components/layouts/ProtectedLayout";
import { sectionFormSchema } from "./schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import api from "../../../../../axiosService";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SectionFormValues } from "./schema";
import { useSearchParams } from "react-router-dom";

const CreateCourseStep2 = () => {
    const [searchParams] = useSearchParams();
    const courseId = searchParams.get("courseId");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SectionFormValues>({
    resolver: zodResolver(sectionFormSchema),
  });

  const mutate = useMutation({
    mutationFn: (data: SectionFormValues) => {
      return api.post(`/course/create-section/${courseId}`, data);
    },
    onSuccess: () => {
      toast.success("Section created successfully");
      reset();
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Something went wrong!");
    },
  });

  const sectionHandler = (data: SectionFormValues) => {
    mutate.mutate(data);
  };

  return (
    <div>
      <ProtectedLayout>
        <div className="bg-yellow-200 p-6 gap-3 flex flex-col">
          <h1>Course Builder</h1>
          <form
            action=""
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(sectionHandler)}
          >
            <div>
              <label htmlFor="">Title</label>
              <Input
                type="text"
                placeholder="Course Name"
                {...register("title")}
              />
              {
                errors.title && <p className="text-red-500">{errors.title.message}</p>
              }
            </div>
            <div>
              <label htmlFor="">Description</label>
              <Input
                type="text"
                placeholder="Course Description"
                {...register("description")}
              />
              {
                errors.description && <p className="text-red-500">{errors.description.message}</p>
              }
            </div>
            <Button disabled={mutate.isPending}>
              <Plus /> {mutate.isPending ? "Creating..." : "Create Section"}
            </Button>
          </form>
        </div>
      </ProtectedLayout>
    </div>
  );
};

export default CreateCourseStep2;
