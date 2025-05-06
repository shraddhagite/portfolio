import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Menu, X, ChevronRight } from 'lucide-react';

const GITHUB_BASE_URL = "https://shraddhagite.github.io/public";

const Portfolio = () => {

    const [personalInfo, setPersonalInfo] = useState(null);
    const [projects, setProjects] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [skills, setSkills] = useState([]);
    const [work, setWork] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const fetchAllJSON = async () => {
            try {
                const [infoRes, projectsRes, blogsRes, skillsRes, workRes] = await Promise.all([
                    fetch(`${GITHUB_BASE_URL}/personalinfo.json`),
                    fetch(`${GITHUB_BASE_URL}/projects.json`),
                    fetch(`${GITHUB_BASE_URL}/blogs.json`),
                    fetch(`${GITHUB_BASE_URL}/skills.json`),
                    fetch(`${GITHUB_BASE_URL}/work.json`)
                ]);

                const [info, projects, blogs, skills, work] = await Promise.all([
                    infoRes.json(),
                    projectsRes.json(),
                    blogsRes.json(),
                    skillsRes.json(),
                    workRes.json()
                ]);

                setPersonalInfo(info);
                setProjects(projects);
                setBlogs(blogs);
                setSkills(skills);
                setWork(work);
                setError(false);
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchAllJSON();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                <div className="text-lg text-gray-700 animate-pulse">Fetching data...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                <div className="text-lg text-red-500">Error fetching data. Please try again later!</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">

            {/* NavBar */}
            <nav className="bg-white shadow-sm fixed w-full z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <span className="text-xl font-bold text-gray-900">{personalInfo.name}</span>
                        </div>

                        <div className="flex items-center sm:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:space-x-8">

                            <a href="#about" className="text-gray-700 hover:text-blue-600">About</a>

                            {work.length > 0 && (
                                <a href="#experience" className="text-gray-700 hover:text-blue-600">Experience</a>
                            )}

                            {projects.length > 0 && (
                                <a href="#projects" className="text-gray-700 hover:text-blue-600">Projects</a>
                            )}

                            {blogs.length > 0 && (
                                <a href="#blog" className="text-gray-700 hover:text-blue-600">Blog</a>
                            )}

                            {skills.length > 0 && (
                                <a href="#skills" className="text-gray-700 hover:text-blue-600">Skills</a>
                            )}

                            <div className="flex space-x-4">
                                <a href={personalInfo.socialDetails.github} target="_blank"
                                    className="text-gray-500 hover:text-gray-700">
                                    <Github size={20} />
                                </a>
                                <a href={personalInfo.socialDetails.linkedin} target="_blank"
                                    className="text-gray-500 hover:text-gray-700">
                                    <Linkedin size={20} />
                                </a>
                                <a href={personalInfo.socialDetails.mail} target="_blank"
                                    className="text-gray-500 hover:text-gray-700">
                                    <Mail size={20} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="sm:hidden bg-white border-t">
                        <div className="px-2 pt-2 pb-3 space-y-1">

                            <a href="#about" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">About</a>

                            {work.length > 0 && (
                                <a href="#experience" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">Experience</a>
                            )}

                            {projects.length > 0 && (
                                <a href="#projects" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">Projects</a>
                            )}

                            {blogs.length > 0 && (
                                <a href="#blog" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">Blog</a>
                            )}

                            {skills.length > 0 && (
                                <a href="#skills" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">Skills</a>
                            )}

                        </div>
                    </div>
                )}
            </nav>

            {/* About Section */}
            <section id="about" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="text-left">
                        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                            {personalInfo.role}
                        </h1>
                        <p className="mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl">
                            {personalInfo.summary}
                        </p>
                        {/* <div className="mt-5 flex space-x-4">
                            <a href="/resume.pdf" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                                <FileText className="mr-2" size={20} />
                                Download Resume
                            </a>
                        </div> */}
                    </div>
                    <div className="flex justify-center md:justify-end">
                        <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-lg">
                            <img
                                src={personalInfo.profileImageUrl}
                                alt={personalInfo.name}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            {projects.length > 0 && (
                <section id="projects" className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Projects</h2>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {projects.map((project, index) => (
                                <div key={index}
                                    className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{project.period}</p>
                                    <p className="mt-4 text-gray-600">{project.description}</p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {project.highlights.map((highlight, i) => (
                                            <span key={i}
                                                className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                                                {highlight}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Work Section */}
            {work.length > 0 && (
                <section id="experience" className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Work Experience</h2>
                        <div className="space-y-8">
                            {work.map((job, index) => (
                                <div key={index}
                                    className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow mt-8">
                                    <div className="flex flex-wrap justify-between items-start gap-4">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">{job.role}</h3>
                                            <p className="text-lg text-blue-600">{job.company}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-gray-600">{job.period}</p>
                                            <p className="text-gray-500">{job.location}</p>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-gray-600">Domain: {job.domain}</p>
                                    <ul className="mt-4 space-y-2">
                                        {job.achievements.map((achievement, i) => (
                                            <li key={i} className="flex items-start">
                                                <span
                                                    className="inline-block w-2 h-2 mt-2 mr-2 bg-blue-500 rounded-full"></span>
                                                <span className="text-gray-700">{achievement}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Blogs Section */}
            {blogs.length > 0 && (
                <section id="blog" className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Technical Writing</h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            {blogs.map((post, index) => (
                                <a
                                    key={index}
                                    href={post.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                                            <p className="text-sm text-gray-500 mt-1">{post.date}</p>
                                        </div>
                                        <ExternalLink className="text-gray-400" size={20} />
                                    </div>
                                    <p className="mt-4 text-gray-600">{post.description}</p>
                                    <div className="mt-4 flex items-center text-blue-600 hover:text-blue-700">
                                        <span className="text-sm font-medium">Read article</span>
                                        <ChevronRight size={16} className="ml-1" />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Skills Section */}
            {skills.length > 0 && (
                <section id="skills" className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Technical Skills</h2>
                        <div className="flex flex-wrap gap-3">
                            {skills.map((skill, index) => (
                                <span key={index} className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="bg-white border-t">
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center space-x-6">
                        <a href={personalInfo.socialDetails.github} target="_blank"
                            className="text-gray-400 hover:text-gray-500">
                            <Github size={20} />
                        </a>
                        <a href={personalInfo.socialDetails.linkedin} target="_blank"
                            className="text-gray-400 hover:text-gray-500">
                            <Linkedin size={20} />
                        </a>
                        <a href={personalInfo.socialDetails.mail} target="_blank"
                            className="text-gray-400 hover:text-gray-500">
                            <Mail size={20} />
                        </a>
                    </div>
                    <p className="mt-4 text-center text-gray-500">
                        © 2025 {personalInfo.name}. All rights reserved | Built with <span
                            className="text-red-500">♥</span> with the help of <a className="underline text-[#DA7756]"
                                target="_blank" href="https://claude.ai">Claude
                            AI</a> | <a className="underline hover:text-blue-600" target="_blank"
                                href={personalInfo.portfolioSourceCode}>&lt;Source Code/&gt;</a>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Portfolio;
