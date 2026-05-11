import { publicApi } from "@/requests/public.request";
import { getLocale } from "next-intl/server";
import { About } from "./_components/about/About";
import { Blog } from "./_components/blog/Blog";
import { Contact } from "./_components/contact/Contact";
import { Footer } from "./_components/footer/Footer";
import { Hero } from "./_components/hero/Hero";
import { Navbar } from "./_components/navbar/Navbar";
import { Newsletter } from "./_components/news-letter/Newsletter";
import { Projects } from "./_components/project/Project";
import { Skills } from "./_components/skill/Skills";

export default async function HomePage() {
  const locale = await getLocale();

  const [settingsResult, skillsResult, projectCategoriesResult, projectsResult] = await Promise.allSettled([
    publicApi.getSettings({ locale }),
    publicApi.getSkills({ locale }),
    publicApi.getProjectCategories({ locale }),
    publicApi.getProjects({ locale }),
  ]);

  const setting = settingsResult.status === "fulfilled" ? settingsResult.value.setting : null;
  const skillCategories = skillsResult.status === "fulfilled" ? skillsResult.value.skillCategories : [];
  const projectCategories = projectCategoriesResult.status === "fulfilled" ? projectCategoriesResult.value.projectCategories : [];
  const projects = projectsResult.status === "fulfilled" ? projectsResult.value.projects : [];

  return (
    <main className="relative">
      <Navbar setting={setting} />
      <Hero setting={setting} />
      <Skills skillCategories={skillCategories} />
      <Projects projects={projects} projectCategories={projectCategories} />
      <About />
      <Blog />
      <Newsletter />
      <Contact setting={setting} />
      <Footer setting={setting} />
    </main>
  );
}
