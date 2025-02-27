import Navbar from '@/components/uiComponents/Navbar';
import {
  Users,
  Award,
  BookOpen,
  Map,
  Globe,
  Briefcase,
  CheckCircle,
  MessageCircle,
  Clock,
} from 'lucide-react';

const AboutUsPage = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former software engineer at Google with 15+ years of experience. Passionate about making education accessible to everyone.",
      image: "/api/placeholder/200/200"
    },
    {
      name: "Michael Rodriguez",
      role: "Chief Technical Officer",
      bio: "Full-stack developer with expertise in React, Node, and cloud infrastructure. Previously led engineering teams at Microsoft.",
      image: "/api/placeholder/200/200"
    },
    {
      name: "Emily Chen",
      role: "Head of Content",
      bio: "Computer Science professor turned educator. Has developed curriculum for top universities and online platforms.",
      image: "/api/placeholder/200/200"
    },
    {
      name: "David Kim",
      role: "Head of User Experience",
      bio: "Award-winning designer with a focus on creating intuitive learning experiences. Previously at Coursera and LinkedIn.",
      image: "/api/placeholder/200/200"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Students", icon: <Users size={24} /> },
    { number: "200+", label: "Courses", icon: <BookOpen size={24} /> },
    { number: "35", label: "Countries", icon: <Globe size={24} /> },
    { number: "97%", label: "Satisfaction", icon: <Award size={24} /> }
  ];

  const values = [
    {
      title: "Quality Education",
      description: "We believe in providing the highest quality educational content, with practical examples and real-world applications.",
      icon: <Award size={24} />
    },
    {
      title: "Accessibility",
      description: "Making education accessible to everyone, regardless of their background, location, or financial situation.",
      icon: <Globe size={24} />
    },
    {
      title: "Continuous Improvement",
      description: "We constantly update our courses and platform based on student feedback and industry changes.",
      icon: <CheckCircle size={24} />
    },
    {
      title: "Community",
      description: "Building a supportive community of learners and instructors who help each other grow.",
      icon: <MessageCircle size={24} />
    },
    {
      title: "Practical Skills",
      description: "Focus on teaching practical, job-ready skills that help our students advance their careers.",
      icon: <Briefcase size={24} />
    },
    {
      title: "Lifelong Learning",
      description: "Fostering a mindset of continuous learning and adaptation in a rapidly changing world.",
      icon: <Clock size={24} />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar/
      >

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About DevCourses
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            We're on a mission to provide high-quality tech education 
            for everyone, everywhere.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                DevCourses was founded in 2020 with a simple premise: technology education
                should be accessible, practical, and up-to-date with industry needs.
              </p>
              <p>
                What started as a small collection of web development tutorials has grown
                into a comprehensive platform with hundreds of courses spanning the entire
                software development ecosystem.
              </p>
              <p>
                Today, we're proud to have helped over 50,000 students from 35 countries
                advance their careers in technology through our practical, expert-led courses.
              </p>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="/api/placeholder/600/400" 
              alt="Team working together" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Key Stats */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center shadow-sm">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            To empower individuals to reach their full potential through 
            high-quality, accessible technology education.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-gray-700">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Team */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Our diverse team of educators, engineers, and designers work together
              to create the best learning experience for our students.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm text-center">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 mb-3">{member.role}</p>
                <p className="text-gray-700 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Global Presence */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Global Presence</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                While we're headquartered in San Francisco, our community spans the globe.
                We're proud to have students and instructors from over 35 countries.
              </p>
              <p>
                Our courses are available 24/7, allowing learners to study at their own pace,
                regardless of time zone or location.
              </p>
              <p>
                We're committed to expanding our reach and making quality tech education
                accessible to learners in every corner of the world.
              </p>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-blue-100 rounded-lg p-6 flex items-center justify-center">
              <Map size={300} className="text-blue-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Become part of our growing community of learners and start your journey toward mastering new tech skills.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-700 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Browse Courses
            </button>
            <button className="bg-transparent border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition-colors font-medium">
              Sign Up Now
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="font-bold text-xl text-blue-600 mb-4">DevCourses</div>
            <p className="text-gray-600 mb-4 max-w-lg mx-auto">
              Empowering the next generation of developers with high-quality, accessible education.
            </p>
            <div className="flex justify-center space-x-4 mb-6">
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <p className="text-sm text-gray-500">
              © 2025 DevCourses. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUsPage;