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


  export interface SectionResponse {
    message: string
    data: Section[]
  }
  
  export interface Section {
    _id: string
    title: string
    description: string
    course: string
    subSections: SubSection[]
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface SubSection {
    _id: string
    title: string
    description: string
    course: string
    section: string
    videoUrl: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  