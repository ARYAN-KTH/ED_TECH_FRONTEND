import { useQuery } from "@tanstack/react-query";
import api from "../../../../axiosService";
import ProtectedLayout from "@/components/layouts/ProtectedLayout";
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

const Courses = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= courseData?.totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-3 py-1 rounded-md ${i === page ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };
  

  const { data: courseData } = useQuery<CourseResponse>({
    queryKey: ["course", page],
    queryFn: async () => {
      const res = await api.get("/course", {
        params: { page },
      });
      return res.data;
    },
  });

  return (
    <ProtectedLayout>
      <div className="flex flex-col gap-6 p-4">
        

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseData?.data.map((course, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/course-details?id=${course._id}`)}
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
    </ProtectedLayout>
  );
};

export default Courses;
