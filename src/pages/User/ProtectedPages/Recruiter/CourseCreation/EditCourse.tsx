import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { CourseSection, IndividualCourseResponse, SubSection } from "./types";
import { EditFormValues, SectionFormValues, editFormSchema } from "./schema";
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
import { Play, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

enum Category {
  WebDevelopment = "Web Development",
  DataScience = "Data Science",
  AI_ML = "AI/ML",
  Blockchain = "Blockchain",
  Others = "Others",
}

const EditCourse = ({ course }: { course: IndividualCourseResponse }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
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
      sections:
        course?.data?.courseSections?.map((section: CourseSection) => ({
          title: section.title || "",
          description: section.description || "",
          subSections:
            section.subSections?.map((sub: SubSection) => ({
              title: sub.title || "",
              description: sub.description || "",
              videoUrl: sub.videoUrl || "",
            })) || [],
        })) || [],
    },
  });

  // Watch form values
  const formValues = watch();

  const submitHandler = async (data: EditFormValues) => {
    try {
      console.log("Form submitted with data:", {
        ...data,
        sections: data.sections?.map((section) => ({
          ...section,
          subSections: section.subSections?.map((sub) => ({
            ...sub,
            videoUrl:
              sub.videoUrl instanceof File
                ? URL.createObjectURL(sub.videoUrl)
                : sub.videoUrl,
          })),
        })),
      });
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };

  const handlePreview = () => {
    window.open(course?.data.courseThumbnail, "_blank");
  };

  const handlePreviewVideo = (video: string) => {
    window.open(video, "_blank");
  };

  //requirement and benifits logic
  // State to hold the array of benefits
  const [benefits, setBenefits] = useState<string[]>([]);
  const [newBenefit, setNewBenefit] = useState("");
  const [requirements, setRequirements] = useState<string[]>([]);
  const [newRequirement, setNewRequirement] = useState("");

  useEffect(() => {
    setBenefits(course?.data.benifits);
    setRequirements(course?.data.requirements);
  }, [course]);

  const handleVideoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    sectionIndex: number,
    subIndex: number
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("file is ", file);
      setValue(
        `sections.${sectionIndex}.subSections.${subIndex}.videoUrl`,
        e.target.files[0]
      );
    }
  };

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

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Edit Course</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-scroll">
        <DialogTitle>Edit Course</DialogTitle>
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
                value={course?.data.category}
                onValueChange={(value: Category) => setValue("category", value)}
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
            <Button type="button" onClick={handlePreview}>
              Preview Thumbnail
            </Button>
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

          <Separator className="my-4" />
          <div className="space-y-2 p-2 border-2 border-gray-200 rounded-md">
            {course?.data?.courseSections.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className="p-2 border-2 border-gray-200 rounded-md space-y-2"
              >
                <div>
                  <label htmlFor={`section-title-${sectionIndex}`}>
                    Section Title
                  </label>
                  <Input
                    id={`section-title-${sectionIndex}`}
                    {...register(`sections.${sectionIndex}.title`)}
                    defaultValue={section.title}
                  />
                  {errors.sections?.[sectionIndex]?.title && (
                    <p className="text-red-500">
                      {errors.sections?.[sectionIndex]?.title.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor={`section-desc-${sectionIndex}`}>
                    Section Description
                  </label>
                  <Textarea
                    id={`section-desc-${sectionIndex}`}
                    {...register(`sections.${sectionIndex}.description`)}
                    defaultValue={section.description}
                  />
                  {errors.sections?.[sectionIndex]?.description && (
                    <p className="text-red-500">
                      {errors.sections?.[sectionIndex]?.description.message}
                    </p>
                  )}
                </div>

                {section.subSections.map((subSection, subIndex) => (
                  <div
                    key={subIndex}
                    className="p-2 border-2 border-gray-200 rounded-md space-y-2"
                  >
                    <div>
                      <label
                        htmlFor={`subsection-title-${sectionIndex}-${subIndex}`}
                      >
                        SubSection Title
                      </label>
                      <Input
                        id={`subsection-title-${sectionIndex}-${subIndex}`}
                        {...register(
                          `sections.${sectionIndex}.subSections.${subIndex}.title`
                        )}
                        defaultValue={subSection.title}
                      />
                      {errors.sections?.[sectionIndex]?.subSections?.[subIndex]
                        ?.title && (
                        <p className="text-red-500">
                          {
                            errors.sections?.[sectionIndex]?.subSections?.[
                              subIndex
                            ]?.title.message
                          }
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor={`subsection-desc-${sectionIndex}-${subIndex}`}
                      >
                        SubSection Description
                      </label>
                      <Textarea
                        id={`subsection-desc-${sectionIndex}-${subIndex}`}
                        {...register(
                          `sections.${sectionIndex}.subSections.${subIndex}.description`
                        )}
                        defaultValue={subSection.description}
                      />
                      {errors.sections?.[sectionIndex]?.subSections?.[subIndex]
                        ?.description && (
                        <p className="text-red-500">
                          {
                            errors.sections?.[sectionIndex]?.subSections?.[
                              subIndex
                            ]?.description.message
                          }
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor={`subsection-video-${sectionIndex}-${subIndex}`}
                      >
                        SubSection Video
                      </label>
                      <Input
                        id={`subsection-video-${sectionIndex}-${subIndex}`}
                        type="file"

                        onChange={(e) =>
                          handleVideoChange(e, sectionIndex, subIndex)
                        }
                      />
                      {errors.sections?.[sectionIndex]?.subSections?.[subIndex]
                        ?.videoUrl && (
                        <p className="text-red-500">
                          {
                            errors.sections?.[sectionIndex]?.subSections?.[
                              subIndex
                            ]?.videoUrl.message
                          }
                        </p>
                      )}
                      {subSection.videoUrl && (
                        <Button
                          type="button"
                          onClick={() =>
                            handlePreviewVideo(subSection.videoUrl)
                          }
                          className="mt-2"
                        >
                          <Play className="h-4 w-4 mr-2" /> Preview Video
                        </Button>
                      )}
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const currentSections = [...(formValues.sections || [])];
                    if (currentSections[sectionIndex]) {
                      currentSections[sectionIndex].subSections = [
                        ...(currentSections[sectionIndex].subSections || []),
                        { title: "", description: "", videoUrl: "" },
                      ];
                      setValue("sections", currentSections, {
                        shouldValidate: true,
                      });
                    }
                  }}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Subsection
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const currentSections = [...(formValues.sections || [])];
                setValue(
                  "sections",
                  [
                    ...currentSections,
                    {
                      title: "",
                      description: "",
                      subSections: [
                        { title: "", description: "", videoUrl: "" },
                      ],
                    },
                  ],
                  { shouldValidate: true }
                );
              }}
              className="mt-4"
            >
              <Plus className="h-4 w-4 mr-2" /> Add New Section
            </Button>

            <div className="flex justify-end space-x-4 mt-8">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCourse;
