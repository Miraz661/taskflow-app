import { Progress } from "@/components/ui/progress"
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import type { Project } from "@/app/type";
import { useEffect, useState } from "react";
import { UserService } from "@/usersService/user.service";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function Projects({projects}: {projects: Project[]}) {
    return (
        <div className="w-full h-full grid px-4 py-4 md:px-6 md:py-6 xl:px-8 xl:py-7 2xl:px-12 2xl:py-8 space-y-8 bg-[#f9fafb]">
            {projects.length > 0 && <div className="flex flex-wrap gap-4 h-fit">
                {projects.map((project) => (
                    <ProjectCard key={project._id} data={project} />
                ))}
            </div>}
            {projects.length === 0 && <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-500">No projects found. Create a new project to get started!</p>
            </div>}
        </div>
    )
}


const ProjectCard = ({ data }: { data: Project }) => {
    return (
        <Link href={`/projects/${data._id}`} className="flex-1 grid p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition-all cursor-pointer group bg-white space-y-4">
            <div>
                <h2 className="text-lg text-gray-700">{data.name}</h2>
                <p className="text-gray-500">{data.description}</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap text-gray-500">
                {data?.tags?.map((campaign, index) => (
                    <span key={index} className="px-2.5 capitalize py-0.5 border rounded-lg bg-gray-100 text-sm">{campaign}</span>
                ))}
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center justify-between gap-4">
                        <h2 className="whitespace-nowrap">Daily Progress</h2>
                        <p className="text-gray-900">{(data.taskCompleted || 0)}/{data.goal}</p>
                    </div>
                    <div>
                        <Progress value={data.taskCompleted} className="h-2 rounded-full bg-gray-100" indicatorClassName="bg-blue-600" />
                    </div>
                </div>
                {data.goal && <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5">
                        <FaRegCheckCircle className="text-green-500" />
                        <span className="text-nowrap text-gray-500 capitalize">{data.taskCompleted || 0} completed</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <FaRegCircle className="text-gray-500" />
                        <span className="text-nowrap text-gray-500 capitalize">{data.taskPending || 0} pending</span>
                    </div>
                </div>}
            </div>
        </Link>
    )
}