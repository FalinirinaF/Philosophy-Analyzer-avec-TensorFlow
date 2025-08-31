"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Moon,
  Sun,
  Github,
  Linkedin,
  Facebook,
  MessageCircle,
  Download,
  Mail,
  ExternalLink,
  Code,
  Brain,
  Database,
  BarChart3,
  Menu,
  X,
} from "lucide-react"

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/falinirina.andrianjafy.9", label: "Facebook" },
  { icon: Github, href: "https://github.com/FalinirinaF/", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/falinirina-andrianjafinombana-42461a2b7", label: "LinkedIn" },
  { icon: MessageCircle, href: "https://wa.me/261349299446", label: "WhatsApp" },
]

const skills = [
  { name: "Python", level: 95, icon: Code },
  { name: "Machine Learning", level: 90, icon: Brain },
  { name: "scikit-learn", level: 85, icon: BarChart3 },
  { name: "pandas", level: 90, icon: Database },
  { name: "TensorFlow", level: 80, icon: Brain },
  { name: "Data Analysis", level: 88, icon: BarChart3 },
  { name: "Deep Learning", level: 75, icon: Brain },
  { name: "SQL", level: 85, icon: Database },
]

const projects = [
  {
    title: "ML Prediction System",
    description: "Machine learning model for data prediction with interactive web interface.",
    tech: ["Python", "scikit-learn", "Flask", "pandas"],
    link: "https://github.com/FalinirinaF/",
  },
  {
    title: "Advanced Data Analysis",
    description: "Complete data analysis pipeline with interactive visualizations.",
    tech: ["Python", "pandas", "matplotlib", "seaborn"],
    link: "https://github.com/FalinirinaF/",
  },
  {
    title: "AI API Platform",
    description: "REST API for deep learning models with cloud deployment.",
    tech: ["Python", "TensorFlow", "FastAPI", "Docker"],
    link: "https://github.com/FalinirinaF/",
  },
]

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isDark, setIsDark] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  const sections = ["home", "projects", "about", "contact"]
  const sectionLabels = {
    home: "Home",
    projects: "Projects",
    about: "About",
    contact: "Contact",
  }

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Contact from portfolio - ${formData.name}`)
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
    window.open(`mailto:falinirna0007@gmail.com?subject=${subject}&body=${body}`)
  }

  const scrollToSection = (section: string) => {
    setActiveSection(section)
    setIsMenuOpen(false)
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Content Container */}
        <div className="relative z-10 min-h-screen p-2 sm:p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* White Content Frame with Background Image */}
            <div
              className={`relative rounded-2xl sm:rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 transition-colors duration-300 overflow-hidden`}
              style={{
                backgroundImage: "url('/images/new-background.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* Overlay for better content readability */}
              <div className="absolute inset-0 bg-white/85 dark:bg-gray-900/85 backdrop-blur-sm" />

              {/* Content Layer */}
              <div className="relative z-10">
                {/* Navigation */}
                <nav className="border-b border-gray-200/50 dark:border-gray-700/50 bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg">
                  <div className="px-3 sm:px-4 lg:px-8">
                    <div className="flex justify-between items-center h-14 sm:h-16">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white"
                      >
                        MY PORTFOLIO
                      </motion.div>

                      {/* Desktop Navigation - Centered */}
                      <div className="hidden md:flex space-x-6 lg:space-x-8 absolute left-1/2 transform -translate-x-1/2">
                        {sections.map((section) => (
                          <button
                            key={section}
                            onClick={() => scrollToSection(section)}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                              activeSection === section
                                ? "text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-900/30"
                                : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20"
                            }`}
                          >
                            {sectionLabels[section as keyof typeof sectionLabels]}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center space-x-2 sm:space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsDark(!isDark)}
                          className="p-2 hover:bg-gray-100/70 dark:hover:bg-gray-800/70"
                          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                        >
                          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </Button>

                        {/* Mobile menu button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="md:hidden p-2 hover:bg-gray-100/70 dark:hover:bg-gray-800/70"
                          onClick={() => setIsMenuOpen(!isMenuOpen)}
                          title="Toggle menu"
                        >
                          {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <AnimatePresence>
                    {isMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50"
                      >
                        <div className="px-3 py-3 space-y-1">
                          {sections.map((section) => (
                            <button
                              key={section}
                              onClick={() => scrollToSection(section)}
                              className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                                activeSection === section
                                  ? "text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-900/40"
                                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50/80 dark:hover:bg-gray-800/60"
                              }`}
                            >
                              {sectionLabels[section as keyof typeof sectionLabels]}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </nav>

                {/* Mobile Social Links - Floating */}
                <div className="fixed bottom-4 right-4 z-50 md:hidden">
                  <div className="flex space-x-2">
                    {socialLinks.slice(0, 2).map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-white/30 dark:border-gray-700/30"
                        title={social.label}
                      >
                        <social.icon className="h-5 w-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Desktop Social Links - Fixed */}
                <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden md:flex flex-col space-y-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      className="p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 border border-white/30 dark:border-gray-700/30"
                      title={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </motion.a>
                  ))}
                </div>

                {/* Main Content */}
                <main>
                  <AnimatePresence mode="wait">
                    {activeSection === "home" && (
                      <motion.section
                        key="home"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center px-3 sm:px-6 lg:px-8 py-8 sm:py-12"
                      >
                        <div className="max-w-6xl mx-auto w-full">
                          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                            {/* Left side - Text content */}
                            <motion.div
                              initial={{ opacity: 0, x: -50 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 }}
                              className="text-center lg:text-left order-2 lg:order-1"
                            >
                              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                                ANDRIANJAFINOMBANA
                              </h1>
                              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4 sm:mb-6 leading-tight">
                                Falinirina Ferdinand
                              </h2>
                              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 leading-relaxed px-2 sm:px-0">
                                Python Developer & Machine Learning Specialist
                              </p>

                              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-2 sm:px-0">
                                <Button
                                  size="lg"
                                  onClick={() => scrollToSection("projects")}
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg rounded-lg w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                  View My Projects
                                </Button>
                                <Button
                                  size="lg"
                                  variant="outline"
                                  className="px-6 sm:px-8 py-3 text-base sm:text-lg rounded-lg border-gray-300 hover:bg-gray-50/80 dark:hover:bg-gray-800/80 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300"
                                  onClick={() =>
                                    window.open(
                                      "https://drive.google.com/file/d/1lYwN0YDMYvRY07_oRmlA6Ii-8wfhmvXU/view?usp=drive_link",
                                      "_blank",
                                    )
                                  }
                                >
                                  <Download className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                                  <span className="hidden sm:inline">Download My Resume</span>
                                  <span className="sm:hidden">My Resume</span>
                                </Button>
                              </div>
                            </motion.div>

                            {/* Right side - Profile image */}
                            <motion.div
                              initial={{ opacity: 0, x: 50 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 }}
                              className="flex justify-center order-1 lg:order-2"
                            >
                              <div className="relative">
                                <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-blue-600 dark:border-blue-400 shadow-2xl">
                                  <img
                                    src="/images/profile.jpg"
                                    alt="ANDRIANJAFINOMBANA Falinirina Ferdinand"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                {/* Code icon badge */}
                                <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 dark:bg-blue-400 rounded-full flex items-center justify-center shadow-lg">
                                  <Code className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </motion.section>
                    )}

                    {activeSection === "projects" && (
                      <motion.section
                        key="projects"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="min-h-[70vh] sm:min-h-[80vh] py-8 sm:py-12 px-3 sm:px-6 lg:px-8"
                      >
                        <div className="max-w-6xl mx-auto">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-8 sm:mb-16"
                          >
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                              My Projects
                            </h2>
                            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 px-2 sm:px-0">
                              Discover my work in Python and Machine Learning
                            </p>
                            <Button
                              size="lg"
                              variant="outline"
                              onClick={() => window.open("https://github.com/FalinirinaF/", "_blank")}
                              className="mb-8 sm:mb-12 w-full sm:w-auto bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-gray-300 hover:bg-gray-50/80 dark:hover:bg-gray-800/80 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              <Github className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                              <span className="hidden sm:inline">View All Projects on GitHub</span>
                              <span className="sm:hidden">GitHub Projects</span>
                            </Button>
                          </motion.div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-16">
                            {projects.map((project, index) => (
                              <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="h-full"
                              >
                                <Card className="h-full hover:shadow-xl transition-all duration-300 border-gray-200/60 dark:border-gray-700/60 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                                  <CardContent className="p-4 sm:p-6">
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                                      {project.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 leading-relaxed">
                                      {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                                      {project.tech.map((tech) => (
                                        <Badge
                                          key={tech}
                                          variant="secondary"
                                          className="text-xs bg-blue-50/80 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                                        >
                                          {tech}
                                        </Badge>
                                      ))}
                                    </div>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => window.open(project.link, "_blank")}
                                      className="w-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm hover:bg-gray-50/80 dark:hover:bg-gray-800/80 transition-all duration-300"
                                    >
                                      <ExternalLink className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                      <span className="text-sm">View Project</span>
                                    </Button>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            ))}
                          </div>

                          {/* Skills Timeline */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 text-center">
                              Technical Skills
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                              {skills.map((skill, index) => (
                                <motion.div
                                  key={skill.name}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-lg border border-gray-200/40 dark:border-gray-700/40"
                                >
                                  <div className="p-2 bg-blue-100/80 dark:bg-blue-900/40 rounded-lg flex-shrink-0">
                                    <skill.icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="font-medium text-sm sm:text-base text-gray-900 dark:text-white truncate">
                                        {skill.name}
                                      </span>
                                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 ml-2">
                                        {skill.level}%
                                      </span>
                                    </div>
                                    <div className="w-full bg-gray-200/80 dark:bg-gray-700/80 rounded-full h-2">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${skill.level}%` }}
                                        transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                                        className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full"
                                      />
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        </div>
                      </motion.section>
                    )}

                    {activeSection === "about" && (
                      <motion.section
                        key="about"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="min-h-[70vh] sm:min-h-[80vh] py-8 sm:py-12 px-3 sm:px-6 lg:px-8"
                      >
                        <div className="max-w-4xl mx-auto">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-8 sm:mb-16"
                          >
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-8">
                              About Me
                            </h2>
                          </motion.div>

                          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 }}
                              className="order-2 lg:order-1"
                            >
                              <div className="relative mx-auto max-w-sm lg:max-w-none">
                                <div className="w-full h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl border border-white/30 dark:border-gray-700/30">
                                  <img
                                    src="/images/profile.jpg"
                                    alt="ANDRIANJAFINOMBANA Falinirina Ferdinand"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                  <Brain className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white" />
                                </div>
                              </div>
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 }}
                              className="space-y-4 sm:space-y-6 order-1 lg:order-2"
                            >
                              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white text-center lg:text-left">
                                Passionate About Artificial Intelligence
                              </h3>
                              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed text-center lg:text-left">
                                Experienced Python developer with a specialization in Machine Learning and Artificial
                                Intelligence. I transform data into valuable insights and develop innovative solutions
                                to solve complex problems.
                              </p>
                              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed text-center lg:text-left">
                                My expertise covers the entire data pipeline, from collection and cleaning to advanced
                                modeling and production deployment of models. I have a particular passion for machine
                                learning and predictive analytics.
                              </p>

                              <div className="space-y-3 sm:space-y-4">
                                <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white text-center lg:text-left">
                                  Areas of Expertise:
                                </h4>
                                <ul className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                                  <li className="flex items-center justify-center lg:justify-start">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                                    <span>Advanced Python Development</span>
                                  </li>
                                  <li className="flex items-center justify-center lg:justify-start">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                                    <span>Machine Learning & Deep Learning</span>
                                  </li>
                                  <li className="flex items-center justify-center lg:justify-start">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                                    <span>Data Analysis & Visualization</span>
                                  </li>
                                  <li className="flex items-center justify-center lg:justify-start">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                                    <span>AI Model Deployment</span>
                                  </li>
                                </ul>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </motion.section>
                    )}

                    {activeSection === "contact" && (
                      <motion.section
                        key="contact"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="min-h-[70vh] sm:min-h-[80vh] py-8 sm:py-12 px-3 sm:px-6 lg:px-8"
                      >
                        <div className="max-w-4xl mx-auto">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-8 sm:mb-16"
                          >
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                              Contact Me
                            </h2>
                            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 px-2 sm:px-0">
                              Let's discuss your Python and Machine Learning projects
                            </p>
                          </motion.div>

                          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 }}
                              className="space-y-6 sm:space-y-8"
                            >
                              <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center lg:text-left">
                                  Contact Information
                                </h3>
                                <div className="space-y-4">
                                  <div className="flex items-center space-x-4 justify-center lg:justify-start p-3 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-lg border border-gray-200/40 dark:border-gray-700/40">
                                    <div className="p-3 bg-blue-100/80 dark:bg-blue-900/40 rounded-lg flex-shrink-0">
                                      <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div className="text-center lg:text-left">
                                      <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">
                                        Email
                                      </p>
                                      <a
                                        href="mailto:falinirna0007@gmail.com"
                                        className="text-sm sm:text-base text-blue-600 dark:text-blue-400 hover:underline break-all"
                                      >
                                        falinirna0007@gmail.com
                                      </a>
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-4 justify-center lg:justify-start p-3 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-lg border border-gray-200/40 dark:border-gray-700/40">
                                    <div className="p-3 bg-green-100/80 dark:bg-green-900/40 rounded-lg flex-shrink-0">
                                      <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div className="text-center lg:text-left">
                                      <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">
                                        WhatsApp
                                      </p>
                                      <a
                                        href="https://wa.me/261349299446"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm sm:text-base text-green-600 dark:text-green-400 hover:underline"
                                      >
                                        +261 34 92 994 46
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center lg:text-left">
                                  Follow me on social media
                                </h4>
                                <div className="flex justify-center lg:justify-start space-x-3 sm:space-x-4">
                                  {socialLinks.map((social) => (
                                    <a
                                      key={social.label}
                                      href={social.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-3 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-lg hover:bg-gray-50/80 dark:hover:bg-gray-800/80 transition-colors text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-200/40 dark:border-gray-700/40 shadow-sm hover:shadow-md"
                                      title={social.label}
                                    >
                                      <social.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 }}
                            >
                              <Card className="border-gray-200/60 dark:border-gray-700/60 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
                                <CardContent className="p-4 sm:p-6">
                                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
                                    Send me a message
                                  </h3>
                                  <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                      <Input
                                        placeholder="Your name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="border-gray-300/60 dark:border-gray-600/60 h-12 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm"
                                      />
                                    </div>
                                    <div>
                                      <Input
                                        type="email"
                                        placeholder="Your email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        className="border-gray-300/60 dark:border-gray-600/60 h-12 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm"
                                      />
                                    </div>
                                    <div>
                                      <Textarea
                                        placeholder="Your message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                        className="border-gray-300/60 dark:border-gray-600/60 resize-none bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm"
                                      />
                                    </div>
                                    <Button
                                      type="submit"
                                      className="w-full bg-blue-600 hover:bg-blue-700 h-12 shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                      <Mail className="mr-2 h-4 w-4" />
                                      Send Message
                                    </Button>
                                  </form>
                                </CardContent>
                              </Card>
                            </motion.div>
                          </div>
                        </div>
                      </motion.section>
                    )}
                  </AnimatePresence>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}
