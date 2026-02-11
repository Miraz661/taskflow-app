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
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const menuItems = [
    {
        name: "Inbox",
        icon: <FiInbox size={24} />,
        href: "/"
    },
    {
        name: "Today",
        icon: <BiCalendarWeek size={24} />,
        href: "/today"
    },
    {
        name: "Upcoming",
        icon: <FaRegCalendarAlt size={24} />,
        href: "/upcoming"
    },
    {
        name: "Projects",
        icon: <LuFolderKanban size={24} />,
        href: "/projects"
    }
]

const projects = [
    {
        name: "Marketing",
        color: "bg-blue-500"
    }, {
        name: "Design",
        color: "bg-green-500"
    }, {
        name: "Development",
        color: "bg-orange-500"
    }
]

export default function Sidebar() {
    const pathname = usePathname();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const isActive = (href: string) => {
        return pathname === href;
    }
    return (
        <div className="w-fit h-full">
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
                    <div className="space-y-3">
                        <div className="px-3 py-2 flex items-center justify-between">
                            <h1 className="text-xs text-gray-500 uppercase tracking-wide">My Projects</h1>
                            <button type="button" className="w-fit h-fit p-1 cursor-pointer text-gray-500 hover:bg-gray-100 rounded transition-colors" title="Create projects"><FaPlus size={12} /></button>
                        </div>
                        <ul className="px-2">
                            {projects.map((project) => (
                                <li className={`group flex items-center justify-between px-3 py-2 rounded cursor-default duration-300 ${openDropdown === project.name ? "bg-gray-100" : "hover:bg-gray-100"}`} key={project.name}>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${project.color}`}></div>
                                        <span className="ml-2 text-gray-700">{project.name}</span>
                                    </div>
                                    <DropdownMenu open={openDropdown === project.name} onOpenChange={(isOpen) => setOpenDropdown(isOpen ? project.name : null)}>
                                        <DropdownMenuTrigger asChild className={`aspect-square rounded p-0.5 hover:bg-gray-200 cursor-pointer duration-300 outline-none transition-opacity ${openDropdown === project.name ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                                            <button type="button"><BsThreeDotsVertical size={16} /></button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 duration-300">Profile</DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 duration-300">Billing</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}