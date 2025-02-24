import { useSearchParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import { Loader2, Plus, BookOpen, FileText, Video } from 'lucide-react'
import { toast } from "sonner"
import ProtectedLayout from "@/components/layouts/ProtectedLayout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { sectionFormSchema, type SectionFormValues } from "./schema"
import type { SectionResponse } from "./types"
import api from "../../../../../axiosService"
import CreateSubSection from "./CreateSubSection"

export default function CreateCourseStep2() {
  const [searchParams] = useSearchParams()
  const courseId = searchParams.get("courseId")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SectionFormValues>({
    resolver: zodResolver(sectionFormSchema),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SectionFormValues) => {
      return api.post(`/course/create-section/${courseId}`, data)
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

  const { data: sectionData, isLoading, refetch } = useQuery<SectionResponse>({
    queryKey: ["sections", courseId],
    queryFn: async () => {
      const res = await api.get(`/course/course-sections/${courseId}`)
      return res.data
    },
  })

  const sectionHandler = (data: SectionFormValues) => {
    mutate(data)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <ProtectedLayout>
      <div className="container mx-auto p-6 space-y-8">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-3xl font-bold flex items-center gap-2">
              <BookOpen className="w-8 h-8" />
              Course Builder
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[60vh] pr-4">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {sectionData?.data.map((section, index) => (
                  <AccordionItem value={`section-${index}`} key={index} className="border rounded-lg">
                    <AccordionTrigger className="px-4 py-2 hover:bg-muted/50">
                      <span className="text-lg font-semibold flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        {section.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-2">
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">{section.description}</p>
                        <div className="space-y-2">
                          <h4 className="text-md font-semibold">Subsections:</h4>
                          {section.subSections.map((subSection, subIndex) => (
                            <Card key={subIndex} className="bg-muted/30">
                              <CardContent className="p-4 space-y-2">
                                <h5 className="text-sm font-semibold flex items-center gap-2">
                                  <Video className="w-4 h-4" />
                                  {subSection.title}
                                </h5>
                                <p className="text-xs text-muted-foreground">{subSection.description}</p>
                                <p className="text-xs text-blue-600">{subSection.videoUrl}</p>
                              </CardContent>
                            </Card>
                          ))}
                          <CreateSubSection sectionId={section._id} courseId={courseId} refetch={refetch} />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Plus className="w-6 h-6" />
              Create New Section
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(sectionHandler)} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <Input id="title" placeholder="Enter section title" {...register("title")} />
                {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea id="description" placeholder="Enter section description" {...register("description")} />
                {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
              </div>
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                {isPending ? "Creating..." : "Create Section"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  )
}