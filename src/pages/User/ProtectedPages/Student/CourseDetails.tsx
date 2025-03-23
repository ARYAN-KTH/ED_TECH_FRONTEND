import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../../../axiosService";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import {
  CourseSection,
  IndividualCourseResponse,
} from "../Recruiter/CourseCreation/types";
import { format } from "date-fns";
import { toast } from "sonner";

const CourseDetails = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { data: courseData, isLoading } = useQuery({
    queryKey: ["individualCourse", id],
    queryFn: async () => {
      const response = await api.get<IndividualCourseResponse>(
        `/course/individual-course/${id}`
      );
      return response.data;
    },
  });

  // Calculate total lessons
  const getTotalLessons = (course) => {
    if (!course) return 0;
    return course.courseSections.reduce(
      (total, section) => total + section.subSections.length,
      0
    );
  };

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
      comment:
        "Great course overall. Some sections could use more examples, but the knowledge gained is invaluable.",
      date: "2023-09-28",
    },
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <Skeleton className="h-[300px] w-full rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <Skeleton className="h-[200px] lg:col-span-2" />
          <Skeleton className="h-[200px]" />
        </div>
      </div>
    );
  }

  const course = courseData?.data;

  if (!course) {
    return (
      <div className="container mx-auto p-4 md:p-6 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="bg-muted/30 rounded-full p-6 mb-6">
          <Info className="w-12 h-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
        <p className="text-muted-foreground mb-6 text-center max-w-md">
          The course you're looking for doesn't exist or has been removed.
        </p>
        <Button size="lg">Browse Courses</Button>
      </div>
    );
  }

  const totalLessons = getTotalLessons(course);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await api.post("/course/create-order", {
      amount: 50,
      currency: "INR",
      courseId: course._id,
    });

    console.log("Response:", res);

    const orderData = await res.data;

    console.log("Order Data:", orderData);

    if (!(await loadRazorpayScript())) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    console.log("Order Data:", orderData);

    const options = {
      key: "rzp_test_mr5aVn2tvekqLL", // Public Key
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Your App Name",
      description: "Test Transaction",
      order_id: orderData.id,
      handler: function (response: {razorpay_payment_id: string,razorpay_order_id: string,razorpay_signature: string}) {
        const verifyPayment = async () => {
          try {
            const res = await api.post("/course/verify-payment", {
              response,
            });

            console.log("Payment Response:", res);

            toast.success("Payment successful");
          } catch (error) {
            toast.error("Payment verification failed",error.message);
            return null;
          }
        };
        verifyPayment();
        
      },
      prefill: {
        name: "Aryan",
        email: "aryan@example.com",
        contact: "7296967119",
      },
      theme: { color: "#3399cc" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
      <div className="container mx-auto p-4 md:p-6">
        {/* Hero Section */}
        <div className="relative w-full rounded-xl overflow-hidden mb-8 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30 z-10"></div>
          <img
            src={
              course.courseThumbnail || "/placeholder.svg?height=400&width=1200"
            }
            alt={course.title}
            className="w-full h-[300px] md:h-[400px] object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 z-20">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge
                variant="secondary"
                className="bg-primary/20 text-primary-foreground"
              >
                {course.category}
              </Badge>
              <Badge
                variant="outline"
                className="bg-background/20 backdrop-blur-sm"
              >
                {totalLessons} lessons
              </Badge>
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {course.title}
            </h1>
            <p className="text-white/80 max-w-2xl mb-4 line-clamp-2">
              {course.description}
            </p>
            <div className="flex items-center gap-3">
              <Avatar className="border-2 border-white">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white font-medium">{course.instructor}</p>
                <p className="text-white/70 text-sm">Course Instructor</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
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

              <TabsContent value="content" className="mt-0 space-y-6">
                {/* Course Progress */}
                <Card className="overflow-hidden border-none shadow-md">
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
                    <div className="flex flex-col gap-3">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        Your Progress
                      </h3>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">0% complete</span>
                        <span className="text-sm text-muted-foreground">
                          0/{totalLessons} lessons
                        </span>
                      </div>
                      <Progress value={0} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        Start learning to track your progress
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Course Sections */}
                <Card className="border-none shadow-md">
                  <CardHeader className="bg-muted/30">
                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      Course Content
                    </CardTitle>
                    <CardDescription className="flex flex-wrap justify-between items-center gap-2">
                      <div className="flex items-center gap-1">
                        <span>{course.courseSections.length} sections</span>
                        <span>•</span>
                        <span>{totalLessons} lessons</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Accordion type="single" collapsible className="w-full">
                      {course.courseSections.map(
                        (section: CourseSection, index: number) => (
                          <AccordionItem
                            key={section._id}
                            value={`section-${index}`}
                            className="border-b last:border-0"
                          >
                            <AccordionTrigger className="px-6 py-4 hover:bg-muted/30 transition-colors">
                              <div className="flex items-center gap-2 text-left">
                                <span className="font-medium">
                                  {section.title}
                                </span>
                                <Badge variant="secondary" className="ml-2">
                                  {section.subSections.length} lessons
                                </Badge>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-0 pb-0">
                              <div className="divide-y">
                                {section.subSections.map((subsection) => (
                                  <div
                                    key={subsection._id}
                                    className="flex flex-wrap md:flex-nowrap items-center justify-between p-4 hover:bg-muted/30 transition-colors"
                                  >
                                    <div className="flex items-center gap-3 w-full md:w-auto">
                                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <Play className="w-5 h-5 text-primary" />
                                      </div>
                                      <div>
                                        <span className="font-medium block">
                                          {subsection.title}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                          Video • 10:30 min
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        )
                      )}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="overview" className="mt-0 space-y-6">
                {/* Course Description */}
                <Card className="border-none shadow-md overflow-hidden">
                  <CardHeader className="bg-muted/30">
                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                      <Info className="w-5 h-5 text-primary" />
                      About This Course
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="prose max-w-none">
                      <p className="mb-4">{course.description}</p>
                      <p>
                        This comprehensive course is designed to take you from
                        beginner to proficient in {course.category}. Whether
                        you're just starting out or looking to enhance your
                        existing skills, this course provides the perfect
                        balance of theory and practical examples.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* What You'll Learn */}
                <Card className="border-none shadow-md overflow-hidden">
                  <CardHeader className="bg-muted/30">
                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      What you'll learn
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {course.benifits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="mt-1 bg-primary/10 rounded-full p-1">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                          </div>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Requirements */}
                <Card className="border-none shadow-md overflow-hidden">
                  <CardHeader className="bg-muted/30">
                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                      <ListChecks className="w-5 h-5 text-primary" />
                      Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {course.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="mt-1 text-primary">
                            <ChevronRight className="w-4 h-4" />
                          </div>
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Instructor */}
                <Card className="border-none shadow-md overflow-hidden">
                  <CardHeader className="bg-muted/30">
                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      Instructor
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-start gap-6">
                      <Avatar className="w-20 h-20 border">
                        <AvatarImage src="/placeholder.svg?height=80&width=80" />
                        <AvatarFallback className="text-xl">
                          {course.instructor.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-xl mb-1">
                          {course.instructor}
                        </h3>
                        <p className="text-primary font-medium mb-3">
                          Expert in {course.category}
                        </p>
                        <p className="text-muted-foreground">
                          An experienced instructor with over 10 years of
                          industry experience. Passionate about teaching and
                          helping students achieve their goals.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-0 space-y-6">
                {/* Reviews Summary */}
                <Card className="border-none shadow-md overflow-hidden">
                  <CardHeader className="bg-muted/30">
                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                      <Star className="w-5 h-5 text-primary" />
                      Student Reviews
                    </CardTitle>
                    <CardDescription>
                      See what our students are saying about this course
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex flex-col items-center justify-center bg-muted/30 p-6 rounded-lg">
                        <div className="text-5xl font-bold">4.8</div>
                        <div className="flex items-center mt-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="w-5 h-5 text-yellow-400 fill-yellow-400"
                            />
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Course Rating
                        </div>
                      </div>

                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div
                            key={rating}
                            className="flex items-center gap-3 mb-2"
                          >
                            <div className="w-12 text-sm text-right font-medium">
                              {rating} stars
                            </div>
                            <Progress
                              value={
                                rating === 5
                                  ? 75
                                  : rating === 4
                                  ? 20
                                  : rating === 3
                                  ? 5
                                  : 0
                              }
                              className="h-2 flex-1"
                            />
                            <div className="w-12 text-sm font-medium">
                              {rating === 5
                                ? "75%"
                                : rating === 4
                                ? "20%"
                                : rating === 3
                                ? "5%"
                                : "0%"}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Review List */}
                <Card className="border-none shadow-md">
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {mockReviews.map((review) => (
                        <div
                          key={review.id}
                          className="p-4 rounded-lg bg-muted/30 mb-4"
                        >
                          <div className="flex items-start gap-4">
                            <Avatar className="border">
                              <AvatarImage
                                src={
                                  review.avatar ||
                                  "/placeholder.svg?height=40&width=40"
                                }
                              />
                              <AvatarFallback>
                                {review.user.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex flex-wrap justify-between items-center gap-2">
                                <h4 className="font-medium">{review.user}</h4>
                                <span className="text-sm text-muted-foreground">
                                  {format(
                                    new Date(review.date),
                                    "MMM dd, yyyy"
                                  )}
                                </span>
                              </div>
                              <div className="flex items-center mt-1 mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-4 h-4 ${
                                      star <= review.rating
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                              <p>{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-0">
                    <Button variant="outline" className="w-full">
                      Load More Reviews
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div>
            <Card className="sticky top-6 border-none shadow-md overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={
                    course.courseThumbnail ||
                    "/placeholder.svg?height=200&width=400"
                  }
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-3xl font-bold flex items-center">
                      <DollarSign className="w-6 h-6 text-primary" />
                      {course.price}
                    </div>
                  </div>

                  <Button
                    className="w-full mb-4 text-lg py-6 bg-primary hover:bg-primary/90"
                    onClick={handlePayment}
                  >
                    Enroll Now
                  </Button>

                  <div className="flex justify-between gap-2 mb-6">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10"
                            onClick={() => setIsBookmarked(!isBookmarked)}
                          >
                            <Bookmark
                              className={`w-5 h-5 ${
                                isBookmarked ? "fill-primary text-primary" : ""
                              }`}
                            />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {isBookmarked
                              ? "Remove from wishlist"
                              : "Add to wishlist"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10"
                          >
                            <Share2 className="w-5 h-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Share this course</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Button variant="outline" className="flex-1 h-10">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Contact Instructor
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">
                      This course includes:
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <FileVideo className="w-5 h-5 text-primary" />
                        </div>
                        <span>{totalLessons} on-demand video lessons</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Download className="w-5 h-5 text-primary" />
                        </div>
                        <span>Downloadable resources</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <span>Full lifetime access</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <GraduationCap className="w-5 h-5 text-primary" />
                        </div>
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
  );
};

export default CourseDetails;
