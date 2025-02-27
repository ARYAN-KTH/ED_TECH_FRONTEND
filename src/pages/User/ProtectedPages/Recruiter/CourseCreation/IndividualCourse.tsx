"use client"

import ProtectedLayout from "@/components/layouts/ProtectedLayout"
import api from "../../../../../axiosService"
import { useQuery } from "@tanstack/react-query"
import type { IndividualCourseResponse } from "./types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Clock,
  DollarSign,
  FileVideo,
  GraduationCap,
  ListChecks,
  Target,
  Star,
  Play,
  Share2,
  Bookmark,
  Download,
  MessageSquare,
  Info,
} from "lucide-react"
import { format } from "date-fns"
import { useSearchParams } from "react-router-dom"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const IndividualCourse = () => {
  const [searchParams] = useSearchParams()
  const id = searchParams.get("id")
  const [isBookmarked, setIsBookmarked] = useState(false)

  const { data: courseData, isLoading } = useQuery({
    queryKey: ["individualCourse", id],
    queryFn: async () => {
      const response = await api.get<IndividualCourseResponse>(`/course/individual-course/${id}`)
      return response.data
    },
  })

  // Calculate total lessons
  const getTotalLessons = (course) => {
    if (!course) return 0
    return course.courseSections.reduce((total, section) => total + section.subSections.length, 0)
  }

  // Mock data for reviews and students
  const mockReviews = [
    {
      id: 1,
      user: "Alex Johnson",
      avatar: null,
      rating: 5,
      comment:
        "This course exceeded my expectations. The content is well-structured and the instructor explains complex concepts clearly.",
      date: "2023-10-15",
    },
    {
      id: 2,
      user: "Sarah Miller",
      avatar: null,
      rating: 4,
      comment: "Great course overall. Some sections could use more examples, but the knowledge gained is invaluable.",
      date: "2023-09-28",
    },
  ]

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Skeleton className="h-[300px] w-full rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-[200px] col-span-2" />
          <Skeleton className="h-[200px]" />
        </div>
      </div>
    )
  }

  const course = courseData?.data

  if (!course) {
    return (
      <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-[50vh]">
        <Info className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
        <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist or has been removed.</p>
        <Button>Browse Courses</Button>
      </div>
    )
  }

  const totalLessons = getTotalLessons(course)

  return (
    <ProtectedLayout>
      <div className="container mx-auto p-6">
        {/* Hero Section */}
        <div className="relative w-full rounded-xl overflow-hidden mb-8 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img
            src={course.courseThumbnail || "/placeholder.svg"}
            alt={course.title}
            className="w-full h-[300px] object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Tabs Navigation */}
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="w-full justify-start mb-6 bg-background border-b rounded-none h-auto p-0">
                <TabsTrigger
                  value="content"
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary h-12"
                >
                  Course Content
                </TabsTrigger>
                <TabsTrigger
                  value="overview"
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary h-12"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary h-12"
                >
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="mt-0">
                {/* Course Progress */}
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Your Progress</h3>
                        <span className="text-sm text-muted-foreground">0%</span>
                      </div>
                      <Progress value={0} className="h-2" />
                      <p className="text-sm text-muted-foreground">Start learning to track your progress</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Course Sections */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                      <BookOpen className="w-6 h-6" />
                      Course Content
                    </CardTitle>
                    <CardDescription>
                      {course.courseSections.length} sections • {totalLessons} lessons •{" "}
                      {course.courseSections.reduce(
                        (total, section) =>
                          total + section.subSections.reduce((subTotal, sub) => subTotal + (sub.duration || 0), 0),
                        0,
                      )}{" "}
                      total minutes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {course.courseSections.map((section, index) => (
                        <AccordionItem key={section._id} value={`section-${index}`}>
                          <AccordionTrigger className="text-lg">
                            <div className="flex items-center gap-2">
                              <span>{section.title}</span>
                              <Badge variant="secondary">{section.subSections.length} lessons</Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2 pl-4">
                              {section.subSections.map((subsection) => (
                                <div
                                  key={subsection._id}
                                  className="flex items-center justify-between p-3 rounded-lg hover:bg-accent group cursor-pointer"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                      <Play className="w-4 h-4 text-primary" />
                                    </div>
                                    <span>{subsection.title}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge
                                      variant="outline"
                                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      {subsection.duration || 10} min
                                    </Badge>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      <Download className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="overview" className="mt-0 space-y-6">
                {/* Course Description */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold">About This Course</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <p>{course.description}</p>
                      <p>
                        This comprehensive course is designed to take you from beginner to proficient in{" "}
                        {course.category}. Whether you're just starting out or looking to enhance your existing skills,
                        this course provides the perfect balance of theory and practical examples.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* What You'll Learn */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      What you'll learn
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.benifits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="mt-1 text-primary">•</div>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Requirements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                      <ListChecks className="w-5 h-5" />
                      Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="mt-1 text-primary">•</div>
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Instructor */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                      <GraduationCap className="w-5 h-5" />
                      Instructor
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src="/placeholder.svg?height=64&width=64" />
                        <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-lg">{course.instructor}</h3>
                        <p className="text-muted-foreground mb-2">Expert in {course.category}</p>
                        <p className="text-sm">
                          An experienced instructor with over 10 years of industry experience. Passionate about teaching
                          and helping students achieve their goals.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-0 space-y-6">
                {/* Reviews Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold">Student Reviews</CardTitle>
                    <CardDescription>See what our students are saying about this course</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex flex-col items-center justify-center">
                        <div className="text-5xl font-bold">4.8</div>
                        <div className="flex items-center mt-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">Course Rating</div>
                      </div>

                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center gap-2 mb-1">
                            <div className="w-12 text-sm text-right">{rating} stars</div>
                            <Progress
                              value={rating === 5 ? 75 : rating === 4 ? 20 : rating === 3 ? 5 : 0}
                              className="h-2 flex-1"
                            />
                            <div className="w-12 text-sm">
                              {rating === 5 ? "75%" : rating === 4 ? "20%" : rating === 3 ? "5%" : "0%"}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Review List */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      {mockReviews.map((review) => (
                        <div key={review.id} className="pb-6 border-b last:border-0">
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage src={review.avatar || "/placeholder.svg?height=40&width=40"} />
                              <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{review.user}</h4>
                                <span className="text-sm text-muted-foreground">
                                  {format(new Date(review.date), "MMM dd, yyyy")}
                                </span>
                              </div>
                              <div className="flex items-center mt-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-4 h-4 ${star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                                  />
                                ))}
                              </div>
                              <p className="mt-2">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Load More Reviews
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Card */}
            <Card className="sticky top-6">
              <CardContent className="p-0">
                <img
                  src={course.courseThumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-3xl font-bold flex items-center">
                      <DollarSign className="w-6 h-6" />
                      {course.price}
                    </div>
                  </div>

                  <Button className="w-full mb-3 text-lg py-6">Enroll Now</Button>

                  <div className="flex justify-between gap-2 mb-6">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon" onClick={() => setIsBookmarked(!isBookmarked)}>
                            <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-primary" : ""}`} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{isBookmarked ? "Remove from wishlist" : "Add to wishlist"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Share2 className="w-5 h-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Share this course</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Button variant="outline" className="flex-1">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Contact Instructor
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">This course includes:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-sm">
                        <FileVideo className="w-4 h-4 text-muted-foreground" />
                        <span>{totalLessons} on-demand video lessons</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Download className="w-4 h-4 text-muted-foreground" />
                        <span>Downloadable resources</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>Full lifetime access</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <GraduationCap className="w-4 h-4 text-muted-foreground" />
                        <span>Certificate of completion</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  )
}

export default IndividualCourse

