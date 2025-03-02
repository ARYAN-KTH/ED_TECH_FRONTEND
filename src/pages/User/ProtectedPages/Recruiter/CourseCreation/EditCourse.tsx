import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IndividualCourseResponse } from "./types";
import { EditFormValues, editFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const EditCourse = ({ course }: { course: IndividualCourseResponse }) => {
  const { handleSubmit, setValue, register,formState: { errors } } = useForm<EditFormValues>({
    resolver: zodResolver(editFormSchema),
  });

  setValue("title", course?.data?.title);
  setValue("price",course?.data?.price)
  setValue("description",course?.data?.description)
  setValue("tag",course?.data?.tag)
  const submitHandler = (data: EditFormValues) => {
    console.log(data);
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button>Edit Course</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <form action="" onSubmit={handleSubmit(submitHandler)}>
            <div>
              <label htmlFor="">Course Name</label>
              <Input type="text" {...register("title")} />
            </div>
            <div>
              <label htmlFor="">Course Price</label>
              <Input type="number" {...register("price")} />
            </div>
            <div>
              <label htmlFor="">Course Description</label>
              <Input type="text" {...register("description")} />
            </div>
            <div>
              <label htmlFor="">Course Tag</label>
              <Input type="text" {...register("tag")} />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Course Category *
                </label>
                <Select
                defaultValue={course?.data?.category}
                // value={category}
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
              <Button type="submit">Save Changes</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditCourse;
