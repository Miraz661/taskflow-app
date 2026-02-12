'use client';

import Sidebar from "./Sidebar";
import { CreateProjectModal } from "../projects/page";
import { useState } from "react";


export default function MainLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
    return (
        <div className="grid grid-cols-[auto_1fr] h-screen overflow-hidden">
            <Sidebar handleProjectModalOpen={() => setIsCreateProjectModalOpen(true)} />
            {children}
            {isCreateProjectModalOpen && <CreateProjectModal onClose={() => setIsCreateProjectModalOpen(false)} />}
        </div>
    );
}