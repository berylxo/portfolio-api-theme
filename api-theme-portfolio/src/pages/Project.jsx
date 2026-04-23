import Layout from "../components/Layout"
import ProjectCard from "../components/ProjectCard"
import '../css/projects.css'

function Project() {

    const projectsData = [
        {
            title: "My HomeFinder",
            description: "A high-performance rental listing app API built with Typescript and PostgreSQL. Features real-time messaging, advanced querying, and a secure authentication system. Handles over 1000 concurrent users with sub-100ms response times. Includes comprehensive authentication, role-based access control, and automated testing pipeline.",
            techStack: ["Typescript", "Prisma", "PostgreSQL", "Docker", "JWT", "WebSocket"],
            githubUrl: "https://github.com/Techies-Collab-and-Upskill-Live-Project/my-homefinder-backend",
            demoUrl: "https://my-homefinder-frontend.onrender.com/",
            highlights: ["1000 concurrent users"],
            terminalContent: [
                "$ curl -X GET api.taskflow.dev/v1/projects",
                "{",
                '  "status": "success",',
                '  "data": {',
                '    "projects": [...],',
                '    "total": 47',
                "  }",
                "}"
            ]
        },
    ];
    return (
        <Layout>
            <div className="opensource-page">
                <div className="page-header">
                    <h1 className="page-title">Projects</h1>
                    <p className="page-subtitle">Featured applications and systems</p>
                </div>

                <div className="response-container">
                    <div className="projects-grid">
                        {projectsData.map((project, index) => (
                            <ProjectCard
                                key={index}
                                title={project.title}
                                description={project.description}
                                techStack={project.techStack}
                                githubUrl={project.githubUrl}
                                demoUrl={project.demoUrl}
                                highlights={project.highlights}
                                terminalContent={project.terminalContent}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Project

// add real project information