import { useQuery } from "@tanstack/react-query";
import api from "../../../../../axiosService";
import ProtectedLayout from "@/components/layouts/ProtectedLayout";
import {  DollarSign, User, Award, CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CourseResponse } from "./types";
import { Badge } from "@/components/ui/badge";

const IndividualCourse = () => {

  const { data: courseData } = useQuery<CourseResponse>({
    queryKey: ["course"],
    queryFn: async () => {
      const res = await api.get("/course/get-courses");
      return res.data;
    },
  });

  return (
    <ProtectedLayout>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseData?.data.map((course, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
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
                <CardTitle className="text-xl font-bold">{course.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {course.instructor.firstName} {course.instructor.lastName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-semibold">${course.price}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Benefits</span>
                    </div>
                    <ul className="text-sm space-y-1 ml-6">
                      {course.benifits.slice(0, 3).map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3 text-green-500" />
                          <span className="line-clamp-1">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Requirements</span>
                    </div>
                    <ul className="text-sm space-y-1 ml-6">
                      {course.requirements.slice(0, 3).map((requirement, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3 text-green-500" />
                          <span className="line-clamp-1">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
    </ProtectedLayout>
  );
};

export default IndividualCourse;
