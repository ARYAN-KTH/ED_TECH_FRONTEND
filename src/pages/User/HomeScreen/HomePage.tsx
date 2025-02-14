import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/uiComponents/Navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ApiResponse {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const HomePage = () => {
  const { data } = useQuery<ApiResponse[]>({
    queryKey: ["user"],
    queryFn: () =>
      axios
        .get("https://jsonplaceholder.typicode.com/photos")
        .then((res) => res.data),
  });

  console.log(data);

  return (
    <div className="min-h-screen bg-gray-50">
    {/* Navbar */}
    <Navbar />

    {/* Page Title */}
    <h1 className="text-4xl font-bold text-center my-8 text-gray-800">
      Welcome to the Home Page!
    </h1>

    {/* Card Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 lg:px-12">
      {data?.map((item) => (
        <Card
          key={item.id}
          className="border shadow-md hover:shadow-lg rounded-lg transition-all duration-300 bg-white"
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800 truncate">
              {item.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/034/210/204/small/3d-cartoon-baby-genius-photo.jpg"
              alt={item.title}
              className="w-full h-40 object-cover rounded-lg"
            />
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
  );
};

export default HomePage;
