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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const EditCourse = ({ course }: { course: IndividualCourseResponse }) => {
  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm<EditFormValues>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      title: course?.data?.title,
      price: course?.data?.price,
      description: course?.data?.description,
      tag: course?.data?.tag,
      requirements: course?.data?.requirements,
      benifits: course?.data?.benifits,
      category:
        (course?.data?.category as
          | "Web Development"
          | "Data Science"
          | "AI/ML"
          | "Blockchain"
          | "Others") || "Others",
      courseThumbnail: course?.data?.courseThumbnail,
      sections: course?.data?.courseSections?.map((section) => ({
        title: section.title,
        description: section.description,
        _id: section._id,
        subsections: section.subSections.map((subsection) => ({
          title: subsection.title,
          description: subsection.description,
          videoUrl: subsection.videoUrl,
          _id: subsection._id,
        })),
      })) || [],
    },
  });

  //requirement and benifits
  const [benefits, setBenefits] = useState<string[]>(
    course?.data?.benifits || []
  );
  const [newBenefit, setNewBenefit] = useState("");
  const [requirements, setRequirements] = useState<string[]>(
    course?.data?.requirements || []
  );
  const [newRequirement, setNewRequirement] = useState("");

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

  const submitHandler = (data: EditFormValues) => {
    console.log(data);
  };

  // State for sections and subsections
  const [sections, setSections] = useState(
    course?.data?.courseSections?.map((section) => ({
      title: section.title,
      description: section.description,
      _id: section._id,
      subsections: section.subSections.map((subsection) => ({
        title: subsection.title,
        description: subsection.description,
        videoUrl: subsection.videoUrl,
        _id: subsection._id,
      })),
    })) || []
  );

  const addNewSection = () => {
    const newSection = {
      title: "",
      description: "",
      subsections: [],
    };
    setSections([...sections, newSection]);
    setValue("sections", [...sections, newSection]);
  };

  const addNewSubsection = (sectionIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].subsections.push({
      title: "",
      description: "",
      videoUrl: "",
    });
    setSections(updatedSections);
    setValue("sections", updatedSections);
  };

  const removeSection = (sectionIndex: number) => {
    const updatedSections = sections.filter((_, index) => index !== sectionIndex);
    setSections(updatedSections);
    setValue("sections", updatedSections);
  };

  const removeSubsection = (sectionIndex: number, subsectionIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].subsections = updatedSections[
      sectionIndex
    ].subsections.filter((_, index) => index !== subsectionIndex);
    setSections(updatedSections);
    setValue("sections", updatedSections);
  };

  const updateSectionField = (
    sectionIndex: number,
    field: string,
    value: string
  ) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex][field] = value;
    setSections(updatedSections);
    setValue("sections", updatedSections);
  };

  const updateSubsectionField = (
    sectionIndex: number,
    subsectionIndex: number,
    field: string,
    value: string | File
  ) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].subsections[subsectionIndex][field] = value;
    setSections(updatedSections);
    setValue("sections", updatedSections);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button>Edit Course</Button>
        </DialogTrigger>
        <DialogContent className="max-h-[600px] max-w-[800px] overflow-y-auto">
          <DialogTitle>Are you absolutely sure?</DialogTitle>
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
                  defaultValue={
                    (course?.data?.category as
                      | "Web Development"
                      | "Data Science"
                      | "AI/ML"
                      | "Blockchain"
                      | "Others") || "Others"
                  }
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
              <Button
                onClick={() => window.open(course?.data?.courseThumbnail)}
              >
                {" "}
                View current thumbnail
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

            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Course Sections</h2>
              {sections.map((section, sectionIndex) => (
                <div key={section._id || sectionIndex} className="border p-4 rounded-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Section {sectionIndex + 1}</h3>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeSection(sectionIndex)}
                    >
                      Remove Section
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Section Title</label>
                      <Input
                        value={section.title}
                        onChange={(e) =>
                          updateSectionField(sectionIndex, "title", e.target.value)
                        }
                        placeholder="Enter section title"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Section Description</label>
                      <Textarea
                        value={section.description}
                        onChange={(e) =>
                          updateSectionField(sectionIndex, "description", e.target.value)
                        }
                        placeholder="Enter section description"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-md font-medium">Subsections</h4>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addNewSubsection(sectionIndex)}
                        >
                          Add Subsection
                        </Button>
                      </div>

                      {section.subsections.map((subsection, subsectionIndex) => (
                        <div
                          key={subsection._id || subsectionIndex}
                          className="border p-3 rounded-md space-y-3"
                        >
                          <div className="flex justify-between items-center">
                            <h5 className="text-sm font-medium">
                              Subsection {subsectionIndex + 1}
                            </h5>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() =>
                                removeSubsection(sectionIndex, subsectionIndex)
                              }
                            >
                              Remove
                            </Button>
                          </div>

                          <div>
                            <label className="text-sm font-medium">Title</label>
                            <Input
                              value={subsection.title}
                              onChange={(e) =>
                                updateSubsectionField(
                                  sectionIndex,
                                  subsectionIndex,
                                  "title",
                                  e.target.value
                                )
                              }
                              placeholder="Enter subsection title"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium">Description</label>
                            <Textarea
                              value={subsection.description}
                              onChange={(e) =>
                                updateSubsectionField(
                                  sectionIndex,
                                  subsectionIndex,
                                  "description",
                                  e.target.value
                                )
                              }
                              placeholder="Enter subsection description"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium">Video</label>
                            <div className="space-y-2">
                              <Input
                                type="file"
                                accept="video/*"
                                onChange={(e) => {
                                  if (e.target.files?.[0]) {
                                    updateSubsectionField(
                                      sectionIndex,
                                      subsectionIndex,
                                      "videoUrl",
                                      e.target.files[0]
                                    );
                                  }
                                }}
                              />
                              {typeof subsection.videoUrl === "string" &&
                                subsection.videoUrl && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(subsection.videoUrl)}
                                  >
                                    View Current Video
                                  </Button>
                                )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={addNewSection}
              >
                Add New Section
              </Button>
            </div>

            <Button type="submit" className="w-full">Save Changes</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditCourse;
