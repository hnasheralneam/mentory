"use client";

import React, { useState } from 'react';
import { BookOpen, Users, Calendar, Star, ArrowRight, User, Mail, Lock, Eye, EyeOff, GraduationCap, Clock, MapPin, CheckCircle } from 'lucide-react';

const TutoringPlatform = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loginMode, setLoginMode] = useState('login'); // 'login' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('both'); // 'tutor', 'student', 'both'

  const features = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Be Both Tutor & Student",
      description: "Switch seamlessly between teaching subjects you excel at and learning new ones."
    },
    {
      icon: <Calendar className="w-8 h-8 text-purple-600" />,
      title: "Easy Scheduling",
      description: "Book sessions instantly or schedule them for later. Like Uber, but for learning."
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-600" />,
      title: "Verified Tutors",
      description: "All tutors are verified college students with proven expertise in their subjects."
    },
    {
      icon: <Clock className="w-8 h-8 text-green-600" />,
      title: "Flexible Hours",
      description: "Study when it works for you. Find tutors available 24/7 across different time zones."
    }
  ];

  const subjects = [
    "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", 
    "Economics", "Psychology", "English", "History", "Statistics"
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Junior, Computer Science",
      content: "I tutor Python and get help with Calculus. Made $800 last month while improving my own grades!",
      rating: 5
    },
    {
      name: "Jake L.",
      role: "Sophomore, Economics",
      content: "Found an amazing stats tutor in minutes. The scheduling system is so convenient.",
      rating: 5
    },
    {
      name: "Emma R.",
      role: "Senior, Biology",
      content: "Teaching organic chemistry helped me understand it better. Win-win situation!",
      rating: 5
    }
  ];

  const LoginScreen = () => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="w-10 h-10 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900 ml-2">TutorLink</h2>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            {loginMode === 'login' ? 'Welcome Back' : 'Join TutorLink'}
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            {loginMode === 'login' ? 'Sign in to your account' : 'Create your account to get started'}
          </p>
        </div>

        <div className="space-y-4">
          {loginMode === 'signup' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">I want to</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setUserType('student')}
                    className={`p-2 text-sm rounded-lg border ${userType === 'student' 
                      ? 'bg-blue-50 border-blue-500 text-blue-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                    Learn
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType('tutor')}
                    className={`p-2 text-sm rounded-lg border ${userType === 'tutor' 
                      ? 'bg-blue-50 border-blue-500 text-blue-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                    Teach
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType('both')}
                    className={`p-2 text-sm rounded-lg border ${userType === 'both' 
                      ? 'bg-blue-50 border-blue-500 text-blue-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                    Both
                  </button>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">College Email</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="email"
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="your.email@university.edu"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            {loginMode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {loginMode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setLoginMode(loginMode === 'login' ? 'signup' : 'login')}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              {loginMode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        >
          ×
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">TutorLink</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#subjects" className="text-gray-600 hover:text-blue-600 transition-colors">Subjects</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Reviews</a>
            </nav>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Learn & Teach
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  On Demand
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Connect with verified college tutors instantly. Be a student, be a tutor, or be both. 
                It's like Uber, but for academic success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowLogin(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center group"
                >
                  Start Learning
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-600 hover:text-blue-600 transition-colors">
                  Become a Tutor
                </button>
              </div>
              <div className="flex items-center mt-8 space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">10k+</div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Subjects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">24/7</div>
                  <div className="text-sm text-gray-600">Available</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Math Tutoring</h3>
                    <p className="text-gray-600 text-sm">Available now</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    Online Session
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    1-2 hours
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    4.9 rating (120 reviews)
                  </div>
                </div>
                <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                  Book Session - $25/hr
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How TutorLink Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're looking to learn something new or share your expertise, 
              we make it easy to connect with the right people.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-200">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-4 group-hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section id="subjects" className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Subjects</h2>
            <p className="text-xl text-gray-600">Find expert tutors in hundreds of subjects</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {subjects.map((subject, index) => (
              <div key={index} className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{subject}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Student Success Stories</h2>
            <p className="text-xl text-gray-600">See how TutorLink is transforming academic success</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Academic Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already learning and earning through TutorLink. 
            Start your journey today.
          </p>
          <button
            onClick={() => setShowLogin(true)}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors transform hover:scale-105 duration-200"
          >
            Get Started for Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <GraduationCap className="w-8 h-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">TutorLink</span>
              </div>
              <p className="text-gray-400">Connecting students and tutors for academic success.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Find Tutors</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Become a Tutor</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How it Works</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TutorLink. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLogin && <LoginScreen />}
    </div>
  );
};

export default TutoringPlatform;