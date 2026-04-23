import Layout from "../components/Layout"
import AboutSection from "../components/AboutSection";
import TechStack from "../components/TechStack";
import ExperienceItem from "../components/ExperienceItem";

function About() {

    const aboutData = {
        overview: {
            content: `I have taught myself software development by building things, getting stuck, and figuring my way through it. What started as curiosity slowly turned into something more serious. The more I learned, the more I wanted to understand not just how to write code, but how systems actually work.

A lot of my growth has come from trial and error. I’ve built things that didn’t work the first time, had to rethink them, and learned to be patient with the process. That experience shaped how I approach development today: I try to keep things simple, think through problems carefully, and build in a way that will still make sense later.

I’m drawn to the bigger picture; how pieces connect, how decisions affect the whole system, and how something behind the scenes can shape the entire experience. Over time, I’ve gone from just trying to make things work to being intentional about how I build and why.`,
            highlights: ["Go and TypeScript"]
        },
        
        philosophy: {
            content: `I'm a strong advocate for open source development and believe in giving back to the community that has shaped my career. Whether it's contributing to existing projects, maintaining libraries, or sharing knowledge through documentation, I find fulfillment in collaborative problem-solving.

                    My approach to development emphasizes simplicity, performance, and reliability. I prefer solutions that are elegant in their simplicity rather than complex in their cleverness.`,
            highlights: ["open source development", "simplicity, performance, and reliability"]
        },
        
        techStack: [
            {
                title: "Languages",
                items: ["Go", "TypeScript", "Python"]
            },
            {
                title: "Frameworks & Tools",
                items: ["Reactjs", "Nodejs", "Express"]
            },
            {
                title: "Databases",
                items: ["PostgreSQL", "Redis", "MySQL"]
            },
            {
                title: "DevOps & Cloud",
                items: ["Docker", "AWS", "CI/CD", "Linux"]
            }
        ],
        
        experience: [
            {
                title: "Software Developer - Zedu.chat",
                duration: "April 2025 – Sept. 2025",
                description: "Paticipated in the design and development of the backend systems for a real-estate listings app. Focused on API optimization, database performance tuning, and implementing robust authentication systems."
            },
            {
                title: "Backend Developer Intern",
                duration: "Feb 2024 – April 2024",
                description: "Developed and maintained RESTful APIs using Go and Node.js. Collaborated with frontend teams to deliver seamless user experiences while ensuring backend systems remained secure and performant."
            },
            {
                title: "Backend Developer Intern",
                duration: "Feb 2024 – April 2024",
                description: "Developed and maintained RESTful APIs using Go and Node.js. Collaborated with frontend teams to deliver seamless user experiences while ensuring backend systems remained secure and performant."
            }
        ],
        
        interests: {
            content: `Beyond coding, I'm passionate about distributed systems architecture, performance optimization, and exploring emerging technologies in the backend space. I enjoy contributing to open source projects.

                    When I'm not coding, you'll find me reading about system design patterns, experimenting with new databases, or contributing to community projects that aim to make development tools more accessible.`,
            highlights: ["distributed systems architecture", "performance optimization"]
        }

    };
    return (
        <Layout>
            <div className="main-page">
                <div className="page-header">
                    <h1 className="page-title">About Me</h1>
                    <p className="page-subtitle">I build with curiosity first, and scale second</p>
                </div>

                <div className="response-container">

                    <div className="content-grid">
                        <AboutSection 
                            title="Overview" 
                            highlights={aboutData.overview.highlights}
                        >
                            {aboutData.overview.content}
                        </AboutSection>

                        <AboutSection title="Technical Skills">
                            <TechStack categories={aboutData.techStack} />
                        </AboutSection>

                        <AboutSection title="Experience">
                            {aboutData.experience.map((exp, index) => (
                                <ExperienceItem
                                    key={index}
                                    title={exp.title}
                                    duration={exp.duration}
                                    description={exp.description}
                                />
                            ))}
                        </AboutSection>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default About
