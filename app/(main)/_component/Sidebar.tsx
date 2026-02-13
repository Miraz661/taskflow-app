'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiInbox } from "react-icons/fi";
import { BiCalendarWeek } from "react-icons/bi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LuFolderKanban } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProjectContext } from "./MainLayout";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { MdLogout } from "react-icons/md";


const menuItems = [
    {
        name: "Inbox",
        icon: <FiInbox size={24} />,
        href: "/"
    },
    {
        name: "Projects",
        icon: <LuFolderKanban size={24} />,
        href: "/projects"
    }
]

type SidebarProps = {
    handleProjectModalOpen: () => void;
    onEditProject: (projectId: string) => void;
    handleDeleteProject: (projectId: string) => void;
    handleLogout: () => void;
}

export default function Sidebar({ handleProjectModalOpen, onEditProject, handleDeleteProject, handleLogout }: SidebarProps) {
    const pathname = usePathname();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const { projects } = useProjectContext();
    const isActive = (href: string) => {
        return pathname === href;
    }


    return (
        <div className="w-fit h-full bg-white" onClick={(e)=>e.stopPropagation()}>
            <div className="w-63.75 border-r border-gray-200 h-full grid grid-rows-[96px_1fr] grid-cols-1">
                <div>
                    <Link href="/" className="block text-2xl font-semibold cursor-pointer text-gray-900 px-6 py-8">TaskFlow</Link>
                </div>
                <div className="grid grid-rows-[auto_1fr] w-full h-[calc(100vh-96px)] overflow-y-auto gap-6">
                    <ul className="w-full h-full px-3 space-y-1">
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <Link href={item.href} className={`flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 rounded-lg ${isActive(item.href) ? "bg-gray-200 text-blue-600" : "text-gray-700"}`}>
                                    {item.icon}
                                    <span className="font-medium text-lg">{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="grid grid-rows-[1fr_auto] grid-cols-1 justify-between pb-6">
                        <div className="space-y-3">
                            <div className="px-3 py-2 flex items-center justify-between">
                                <h1 className="text-xs text-gray-500 uppercase tracking-wide">My Projects</h1>
                                <button type="button" onClick={handleProjectModalOpen} className="w-fit h-fit p-1 cursor-pointer text-gray-500 hover:bg-gray-100 rounded transition-colors" title="Create projects"><FaPlus size={12} /></button>
                            </div>
                            <ul className="px-2">
                                {projects.map((project) => (
                                    <li className={`group flex items-center justify-between px-3 py-2 rounded duration-300 ${openDropdown === project.name ? isActive(`/projects/${project._id}`) ? "bg-[#eff6ff] text-blue-600" : "bg-gray-100" : isActive(`/projects/${project._id}`) ? "bg-[#eff6ff] text-blue-600" : "hover:bg-gray-100"}`} key={project._id}>
                                        <Link href={`/projects/${project._id}`} className="flex items-center gap-2 flex-1 min-w-0">
                                            <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: project.color }}></div>
                                            <span className={`ml-2 truncate ${isActive(`/projects/${project._id}`) ? "text-blue-600" : "text-gray-700"}`}>{project.name}</span>
                                        </Link>
                                        <DropdownMenu open={openDropdown === project.name} onOpenChange={(isOpen) => setOpenDropdown(isOpen ? project.name : null)}>
                                            <DropdownMenuTrigger asChild className={`aspect-square rounded p-0.5 hover:bg-gray-200 cursor-pointer duration-300 outline-none transition-opacity ${openDropdown === project.name ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                >
                                                    <BsThreeDotsVertical size={16} />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    className="cursor-pointer hover:bg-gray-100 duration-300"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onEditProject(project._id);
                                                        handleProjectModalOpen();
                                                        setOpenDropdown(null);
                                                    }}
                                                >
                                                    <button
                                                        type="button"
                                                        className="flex items-center gap-1 cursor-pointer"
                                                    >
                                                        <CiEdit className="" />
                                                        <span>Edit</span>
                                                    </button>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="cursor-pointer hover:bg-gray-100 duration-300"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteProject(project._id);
                                                        setOpenDropdown(null);
                                                    }}
                                                >
                                                    <button
                                                        type="button"
                                                        className="text-red-600 flex items-center gap-1 cursor-pointer"
                                                    >
                                                        <MdDelete className="text-red-600" />
                                                        <span>Delete</span>
                                                    </button>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="w-full px-3">
                            <button type="button" onClick={handleLogout} className={`w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 rounded-lg text-gray-700 cursor-pointer`}>
                                <MdLogout size={24} />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}