'use client';

import Sidebar from "./Sidebar";
import { CreateProjectModal } from "../projects/page";
import { createContext, useContext, useEffect, useState } from "react";
import { Project } from "@/app/type";
import { UserService } from "@/usersService/user.service";
import toast from "react-hot-toast";
import ConfirmationModal from "@/helper/ConfirmationModal";
import { useRouter } from "next/navigation";
import { FaAngleRight } from "react-icons/fa6";

type ProjectContextType = {
    projects: Project[];
    getProjects: () => Promise<void>;
    toggleSidebar: () => void;
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
    const router = useRouter();
    const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [editProjectId, setEditProjectId] = useState<string>("");
    const [deleteProjectId, setDeleteProjectId] = useState<string>("");
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);


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

    const deleteProject = async (projectId: string) => {
        setDeleting(true);
        try {
            // const res = await UserService.deleteProject(projectId);
            // if (res?.data?.status === "success") {
            //     toast.success("Project deleted successfully.");
            //     getProjects();
            // }
        } catch {
            toast.error("Error deleting project.");
        }
        finally {
            setDeleting(false);
            setIsDeleteConfirmationOpen(false);
        }
    };

    const handleDeleteProject = (projectId: string) => {
        setDeleteProjectId(projectId);
        setIsDeleteConfirmationOpen(prev => !prev);
    };

    const handleLogout = () => {
        setIsLoggedOut(prev => !prev);
    }

    const toggleSidebar = () => {
        setOpenSidebar(prev => !prev);
    }

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <ProjectContext.Provider value={{ projects, getProjects, toggleSidebar }}>
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] h-screen overflow-hidden">
                <div className={`fixed z-99 inset-0 bg-[#0003] h-full md:relative md:bg-transparent transition-transform duration-300 ${openSidebar ? "w-full md:w-fit translate-x-0" : "-translate-x-full md:translate-x-0 w-fit"}`} onClick={()=>setOpenSidebar(false)}>
                    <Sidebar
                        handleProjectModalOpen={() => setIsCreateProjectModalOpen(true)}
                        onEditProject={(projectId: string) => setEditProjectId(projectId)}
                        handleDeleteProject={handleDeleteProject}
                        handleLogout={handleLogout}
                    />
                </div>
                <div className="w-full h-full grid-cols-1 min-h-0 relative">
                    {children}
                    <button type="button" className="fixed -left-7 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white mix-blend-difference border border-gray-300 shadow md:hidden flex items-center justify-end cursor-pointer">
                        <FaAngleRight size={32} className="text-white mix-blend-difference" onClick={toggleSidebar}/>
                    </button>
                </div>
                {isCreateProjectModalOpen && (
                    <CreateProjectModal
                        onClose={() => setIsCreateProjectModalOpen(false)}
                        onSuccess={getProjects}
                        projectId={editProjectId}
                    />
                )}
                <ConfirmationModal
                    isOpen={isDeleteConfirmationOpen}
                    title="Delete Project"
                    description="Are you sure you want to delete this project?"
                    onConfirm={() => {
                        deleteProject(deleteProjectId);
                    }}
                    onCancel={() => {
                        setIsDeleteConfirmationOpen(false);
                    }}
                    loading={deleting}
                />
                <ConfirmationModal
                    isOpen={isLoggedOut}
                    title="Log out"
                    description="Are you sure you want to log out?"
                    onConfirm={() => {
                        router.push("/login");
                    }}
                    onCancel={() => {
                        setIsLoggedOut(false);
                    }}
                />
            </div>
        </ProjectContext.Provider>
    );
}