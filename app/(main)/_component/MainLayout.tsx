'use client';

import Sidebar from "./Sidebar";
import { CreateProjectModal } from "../projects/page";
import { createContext, useContext, useEffect, useState } from "react";
import { Project } from "@/app/type";
import { UserService } from "@/usersService/user.service";
import toast from "react-hot-toast";

type ProjectContextType = {
    projects: Project[];
    getProjects: () => Promise<void>;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjectContext = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error("useProjectContext must be used within MainLayout");
    }
    return context;
};

export default function MainLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);

    const getProjects = async () => {
        try {
            const res = await UserService.getProjects();
            if (res?.data?.status === "success") {
                setProjects(res.data.data);
            } else {
                setProjects([]);
                toast.error("Failed to load projects.");
            }
        } catch {
            setProjects([]);
            toast.error("Error fetching projects.");
        }
    };

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <ProjectContext.Provider value={{ projects, getProjects }}>
            <div className="grid grid-cols-[auto_1fr] h-screen overflow-hidden">
                <Sidebar handleProjectModalOpen={() => setIsCreateProjectModalOpen(true)} />
                {children}
                {isCreateProjectModalOpen && (
                    <CreateProjectModal
                        onClose={() => setIsCreateProjectModalOpen(false)}
                        onSuccess={getProjects}
                    />
                )}
            </div>
        </ProjectContext.Provider>
    );
}