import { useSearchParams } from "react-router-dom";
import {
  Loader2,
  BookOpen,
  FileText,
  Video,
} from "lucide-react";
import ProtectedLayout from "@/components/layouts/ProtectedLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { SectionResponse } from "./types";
import api from "../../../../../axiosService";
import CreateSubSection from "./CreateSubSection";
import CreateSection from "./CreateSection";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function CreateCourseStep2() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");

  const navigate = useNavigate();

  const handlePublishCourse = () => {
    if(sectionData?.data.length === 0 ) {
      toast.error("Please add at least one section");
      return;
    }
    toast.success("Course published successfully");
    navigate(`/create-course`);
  };


  const {
    data: sectionData,
    isLoading,
    refetch,
  } = useQuery<SectionResponse>({
    queryKey: ["sections", courseId],
    queryFn: async () => {
      const res = await api.get(`/course/course-sections/${courseId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <ProtectedLayout>
      <div className="container mx-auto p-6 space-y-8">
        <Card className="w-full">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-3xl font-bold flex items-center gap-2">
              <BookOpen className="w-8 h-8" />
              Course Builder
            </CardTitle>
            <div>
              <CreateSection courseId={courseId} refetch={refetch} />
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[60vh] pr-4">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {sectionData?.data.map((section, index) => (
                  <AccordionItem
                    value={`section-${index}`}
                    key={index}
                    className="border rounded-lg"
                  >
                    <AccordionTrigger className="px-4 py-2 hover:bg-muted/50">
                      <span className="text-lg font-semibold flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        {section.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-2">
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          {section.description}
                        </p>
                        <div className="space-y-2">
                          <h4 className="text-md font-semibold">
                            Subsections:
                          </h4>
                          {section.subSections.map((subSection, subIndex) => (
                            <Card key={subIndex} className="bg-muted/30">
                              <CardContent className="p-4 space-y-2">
                                <h5 className="text-sm font-semibold flex items-center gap-2">
                                  <Video className="w-4 h-4" />
                                  {subSection.title}
                                </h5>
                                <p className="text-xs text-muted-foreground">
                                  {subSection.description}
                                </p>
                                <p className="text-xs text-blue-600">
                                  {subSection.videoUrl}
                                </p>
                              </CardContent>
                            </Card>
                          ))}
                          <CreateSubSection
                            sectionId={section._id}
                            courseId={courseId}
                            refetch={refetch}
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollArea>
            <Button onClick={handlePublishCourse}>Publish Course</Button>
        
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  );
}
