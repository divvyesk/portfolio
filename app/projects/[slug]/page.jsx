import { notFound } from "next/navigation";
import ProjectDetail from "@/components/ProjectDetail";
import { getProject, profile, projects } from "@/lib/resume";

export const generateStaticParams = async () => projects.map((project) => ({ slug: project.slug }));

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} | ${profile.name}`,
    description: project.summary,
    openGraph: { title: `${project.title} | ${project.subtitle}`, description: project.summary },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return <ProjectDetail project={project} next={next} />;
}
