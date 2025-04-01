

import React from "react"

import { useState, useEffect } from "react"
import {
  BookOpen,
  Clock,
  Star,
  Users,
  ArrowRight,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import api from "../../../axiosService"
import Navbar from "@/components/uiComponents/Navbar"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

interface ApiResponse {
  message: string
  totalPages: number
  totalDocuments: number
  data: Course[]
}

interface Course {
  _id: string
  title: string
  description: string
  instructor: Instructor
  price: number
  category: string
  tag: string
  courseThumbnail: string
  benifits: string[]
  requirements: string[]
  courseStatus: string
  courseSections: string[]
  createdAt: string
  updatedAt: string
  __v: number
  students: string[]
}

interface Instructor {
  _id: string
  firstName: string
  lastName: string
  email: string
}

const CoursePage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()

  // Query with search, pagination and category filter
  const { data: courseData, isLoading } = useQuery<ApiResponse>({
    queryKey: ["course", searchTerm, currentPage],
    queryFn: async () => {
      const params: Record<string, string | number> = {
        page: currentPage,
      }

      if (searchTerm) {
        params.search = searchTerm
      }


      const res = await api.get("/course", { params })
      return res.data
    },
  })

  // Reset to page 1 when search or category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // The query will automatically run due to the queryKey dependency
  }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Advance Your Programming Career</h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Learn from industry experts and take your skills to the next level with our comprehensive programming
            courses.
          </p>

          <form
            onSubmit={handleSearchSubmit}
            className="max-w-xl mx-auto bg-white rounded-full overflow-hidden flex items-center p-1"
          >
            <Search size={20} className="ml-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search for courses..."
              className="w-full px-4 py-2 focus:outline-none text-gray-800"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </form>

        </div>
      </div>

      {/* Courses Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {searchTerm ? `Search Results for "${searchTerm}"` : "All Courses"}
          </h2>
          <Link to="/login" className="text-blue-600 hover:text-blue-800 flex items-center">
            View course details
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : courseData?.data && courseData.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courseData.data.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={course.courseThumbnail || "/api/placeholder/600/400"}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-4 right-4 bg-white py-1 px-3 rounded-full text-sm font-medium text-blue-600">
                    ${course.price.toFixed(2)}
                  </span>
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                    <span className="text-white text-sm font-medium bg-blue-600 py-1 px-2 rounded">
                      {course.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  

                  <p className="text-gray-700 mb-4 line-clamp-2">{course?.title}</p>

                  <div className="flex flex-wrap gap-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock size={16} className="mr-1" />
                      {course.courseSections.length} sections
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <BookOpen size={16} className="mr-1" />
                      {course.tag}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users size={16} className="mr-1" />
                      {course.students.length.toLocaleString()}
                    </div>
                    <div className="flex items-center text-sm text-orange-600">
                      <Star size={16} className="mr-1" fill="currentColor" />
                      {/* Placeholder rating since it's not in the API data */}
                      4.5
                    </div>
                  </div>

                  <button onClick={() => navigate("/login")} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No courses found. Try a different search term.</p>
          </div>
        )}

        {/* Pagination */}
        {courseData && courseData.totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-md border border-gray-300 disabled:opacity-50"
              >
                <ChevronLeft size={20} />
              </button>

              {Array.from({ length: courseData.totalPages }, (_, i) => i + 1)
                .filter(
                  (page) =>
                    page === 1 ||
                    page === courseData.totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1),
                )
                .map((page, index, array) => (
                  <React.Fragment key={page}>
                    {index > 0 && array[index - 1] !== page - 1 && <span className="px-2">...</span>}
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-md ${
                        currentPage === page ? "bg-blue-600 text-white" : "border border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, courseData.totalPages))}
                disabled={currentPage === courseData.totalPages}
                className="p-2 rounded-md border border-gray-300 disabled:opacity-50"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to start learning?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of students already learning on our platform. Get unlimited access to all courses for one low
            monthly price.
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

     
    </div>
  )
}

export default CoursePage

