export interface CourseResponse {
    message: string
    data: Course[]
  }
  
  export interface Course {
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
    createdAt: string
    __v: number
  }
  
  export interface Instructor {
    _id: string
    firstName: string
    lastName: string
    email: string
  }
  