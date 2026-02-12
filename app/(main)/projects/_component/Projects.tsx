import { Progress } from "@/components/ui/progress"
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";

export default function Projects() {
    return (
        <div className="w-full h-full px-4 py-4 md:px-6 md:py-6 xl:px-8 xl:py-7 2xl:px-12 2xl:py-8 space-y-8 bg-[#f9fafb]">
            <div className="flex flex-wrap gap-4">
                <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            </div>
        </div>
    )
}


const ProjectCard = () => {
    return (
        <div className="flex-1 p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition-all cursor-pointer group bg-white space-y-4">
            <div>
                <h2 className="text-lg text-gray-700">Marketing</h2>
                <p className="text-gray-500">Marketing campaigns and strategies</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap text-gray-500">
                <span className="px-2.5 capitalize py-0.5 border rounded-lg bg-gray-100 text-sm">campaigns</span>
                <span className="px-2.5 capitalize py-0.5 border rounded-lg bg-gray-100 text-sm">strategies</span>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center justify-between gap-4">
                    <h2 className="whitespace-nowrap">Daily Progress</h2>
                    <p className="text-gray-900">2/8</p>
                </div>
                <div>
                    <Progress value={25} className="h-2 rounded-full bg-gray-100" indicatorClassName="bg-blue-600" />
                </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5">
                        <FaRegCheckCircle className="text-green-500" />
                        <span className="text-nowrap text-gray-500 capitalize">2 completed</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <FaRegCircle className="text-gray-500" />
                        <span className="text-nowrap text-gray-500 capitalize">6 pending</span>
                    </div>
                </div>
            </div>
        </div>
    )
}