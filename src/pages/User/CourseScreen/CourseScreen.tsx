import {
  BookOpen,
  Clock,
  Star,
  Users,
  ArrowRight,
  Search,
  Code,
  Database,
  Layout,
  Smartphone,
  Server,
  Shield,
} from "lucide-react";
import Navbar from "@/components/uiComponents/Navbar";

const CoursePage = () => {
  const popularCourses = [
    {
      id: 1,
      title: "Mastering React Fundamentals",
      description: "Build modern, interactive web applications with React",
      level: "Beginner",
      duration: "10 hours",
      students: 3245,
      rating: 4.8,
      image: "/api/placeholder/600/400",
      instructor: "Sarah Johnson",
      price: "$49.99",
      category: "Frontend",
      icon: <Code size={30} />,
    },
    {
      id: 2,
      title: "Advanced Node.js Development",
      description: "Learn to build scalable backend services with Node.js",
      level: "Intermediate",
      duration: "12 hours",
      students: 2187,
      rating: 4.7,
      image: "/api/placeholder/600/400",
      instructor: "Michael Rodriguez",
      price: "$59.99",
      category: "Backend",
      icon: <Server size={30} />,
    },
    {
      id: 3,
      title: "Full-Stack Web Development",
      description: "Master both frontend and backend technologies",
      level: "Advanced",
      duration: "20 hours",
      students: 1823,
      rating: 4.9,
      image: "/api/placeholder/600/400",
      instructor: "Emily Chen",
      price: "$79.99",
      category: "Full-Stack",
      icon: <Layout size={30} />,
    },
    {
      id: 4,
      title: "iOS App Development with Swift",
      description: "Create professional iOS applications from scratch",
      level: "Intermediate",
      duration: "15 hours",
      students: 2056,
      rating: 4.6,
      image: "/api/placeholder/600/400",
      instructor: "David Kim",
      price: "$69.99",
      category: "Mobile",
      icon: <Smartphone size={30} />,
    },
    {
      id: 5,
      title: "Database Design and Optimization",
      description: "Learn to design efficient database systems",
      level: "Intermediate",
      duration: "8 hours",
      students: 1568,
      rating: 4.5,
      image: "/api/placeholder/600/400",
      instructor: "Lisa Wang",
      price: "$44.99",
      category: "Database",
      icon: <Database size={30} />,
    },
    {
      id: 6,
      title: "Cybersecurity Fundamentals",
      description: "Protect applications from common security threats",
      level: "Beginner",
      duration: "12 hours",
      students: 2831,
      rating: 4.7,
      image: "/api/placeholder/600/400",
      instructor: "Robert Jackson",
      price: "$54.99",
      category: "Security",
      icon: <Shield size={30} />,
    },
  ];

  const categories = [
    { name: "Frontend", count: 24, icon: <Code size={20} /> },
    { name: "Backend", count: 18, icon: <Server size={20} /> },
    { name: "Full-Stack", count: 12, icon: <Layout size={20} /> },
    { name: "Mobile", count: 15, icon: <Smartphone size={20} /> },
    { name: "Database", count: 9, icon: <Database size={20} /> },
    { name: "Security", count: 11, icon: <Shield size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Advance Your Programming Career
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Learn from industry experts and take your skills to the next level
            with our comprehensive programming courses.
          </p>

          <div className="max-w-xl mx-auto bg-white rounded-full overflow-hidden flex items-center p-1">
            <Search size={20} className="ml-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search for courses..."
              className="w-full px-4 py-2 focus:outline-none text-gray-800"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
              Search
            </button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <div
                key={category.name}
                className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-opacity-30 cursor-pointer transition-colors"
              >
                {category.icon}
                <span className="ml-2">{category.name}</span>
                <span className="ml-2 bg-white bg-opacity-30 px-2 rounded-full text-sm">
                  {category.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Courses Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Popular Courses
          </h2>
          <a
            href="#"
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            View all courses
            <ArrowRight size={16} className="ml-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-4 right-4 bg-white py-1 px-3 rounded-full text-sm font-medium text-blue-600">
                  {course.price}
                </span>
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                  <span className="text-white text-sm font-medium bg-blue-600 py-1 px-2 rounded">
                    {course.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600 mr-3">
                    {course.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{course.title}</h3>
                    <p className="text-sm text-gray-600">
                      by {course.instructor}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{course.description}</p>

                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock size={16} className="mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <BookOpen size={16} className="mr-1" />
                    {course.level}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users size={16} className="mr-1" />
                    {course.students.toLocaleString()}
                  </div>
                  <div className="flex items-center text-sm text-orange-600">
                    <Star size={16} className="mr-1" fill="currentColor" />
                    {course.rating}
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to start learning?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of students already learning on our platform. Get
            unlimited access to all courses for one low monthly price.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Sign Up Now
            </button>
            <button className="bg-transparent border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-gray-900 transition-colors font-medium">
              View Course Catalog
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">DevCourses</h3>
              <p className="text-gray-600 mb-4">
                The best platform for developers to enhance their skills with
                high-quality courses.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-600">
                {categories.map((category) => (
                  <li key={category.name} className="hover:text-blue-600">
                    <a href="#">{category.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="hover:text-blue-600">
                  <a href="#">About Us</a>
                </li>
                <li className="hover:text-blue-600">
                  <a href="#">Careers</a>
                </li>
                <li className="hover:text-blue-600">
                  <a href="#">Blog</a>
                </li>
                <li className="hover:text-blue-600">
                  <a href="#">Privacy Policy</a>
                </li>
                <li className="hover:text-blue-600">
                  <a href="#">Terms of Service</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-600">
                <li>support@devcourses.com</li>
                <li>+1 (555) 123-4567</li>
                <li>
                  123 Learning Street
                  <br />
                  San Francisco, CA 94103
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-gray-600">
            <p>© 2025 DevCourses. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CoursePage;
