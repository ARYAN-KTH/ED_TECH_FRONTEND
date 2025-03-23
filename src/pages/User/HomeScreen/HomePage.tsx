import { Book, Users, Award, ArrowRight } from "lucide-react";
import Navbar from "@/components/uiComponents/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Learn Anytime, Anywhere
          </h1>
          <p className="text-xl mb-8">
            Unlock your potential with our cutting-edge online learning platform
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-100 transition duration-300">
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Study Notion?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Book className="w-12 h-12 text-blue-600" />}
              title="Extensive Course Library"
              description="Access a wide range of courses covering various subjects and skill levels."
            />
            <FeatureCard
              icon={<Users className="w-12 h-12 text-blue-600" />}
              title="Expert Instructors"
              description="Learn from industry professionals and experienced educators."
            />
            <FeatureCard
              icon={<Award className="w-12 h-12 text-blue-600" />}
              title="Recognized Certifications"
              description="Earn certificates upon course completion to boost your resume."
            />
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-gray-200 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Students Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <TestimonialCard
              name="Sarah Johnson"
              role="Web Developer"
              content="Study Notion has been a game-changer for my career. The courses are well-structured and the instructors are top-notch."
            />
            <TestimonialCard
              name="Michael Chen"
              role="Data Scientist"
              content="I've tried many online learning platforms, but Study Notion stands out with its interactive content and supportive community."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of students already learning on Study Notion
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-100 transition duration-300 inline-flex items-center"
          onClick={() => navigate("/login")}
          >
            Explore Courses <ArrowRight className="ml-2" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Study Notion</h3>
              <p className="text-gray-400">Empowering learners worldwide</p>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
              <ul className="text-gray-400">
                <li>
                  <Link to="#" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <Link to="#" className="text-gray-400 hover:text-white">
                  Facebook
                </Link>
                <Link to="#" className="text-gray-400 hover:text-white">
                  Twitter
                </Link>
                <Link to="#" className="text-gray-400 hover:text-white">
                  LinkedIn
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-center text-gray-400">
            © 2023 Study Notion. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const TestimonialCard: React.FC<{
  name: string;
  role: string;
  content: string;
}> = ({ name, role, content }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="text-gray-600 mb-4">"{content}"</p>
      <div className="font-semibold">{name}</div>
      <div className="text-sm text-gray-500">{role}</div>
    </div>
  );
};

export default HomePage;
