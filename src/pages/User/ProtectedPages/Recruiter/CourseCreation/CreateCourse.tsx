import { useQuery } from "@tanstack/react-query";
import api from "../../../../../axiosService";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useNavigate } from "react-router-dom";
import { CourseResponse } from "./types";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { FadeLoader } from "react-spinners";
import { Separator } from "@/components/ui/separator";

const CreateCourseStep1 = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= courseData?.totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-3 py-1 rounded-md ${
            i === page ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  const {
    data: courseData,
    isLoading,
    isError,
  } = useQuery<CourseResponse>({
    queryKey: ["course", page],
    queryFn: async () => {
      const res = await api.get("/course/get-courses", {
        params: { page },
      });
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FadeLoader color="#36d7b7" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Something went wrong</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Courses</h2>
        <Button onClick={() => navigate("/create-course-step1")}>
          Add New Course
        </Button>
      </div>

      <Separator className="my-4" />

        {courseData?.data && courseData?.data?.length === 0 && (
          <div className="flex items-center justify-center">
            <p>No courses found!</p>
          </div>
        )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseData?.data?.map((course, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/individual-course?id=${course._id}`)}
          >
            <CardHeader>
              <div className="aspect-video w-full overflow-hidden rounded-lg mb-4">
                <img
                  src={course.courseThumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge variant="outline">{course.tag}</Badge>
              </div>
              <CardTitle className="text-xl font-bold">
                {course.title}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {course.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      <div className="flex items-center gap-2 justify-center">
        {/* Previous Page Button */}
        <ChevronLeft
          onClick={() => page > 1 && setPage(page - 1)}
          className="cursor-pointer"
        />
        {renderPageNumbers()}

        {/* Next Page Button */}
        <ChevronRight
          onClick={() => page < courseData.totalPages && setPage(page + 1)}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default CreateCourseStep1;
