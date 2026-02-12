'use client'

import { FaPlus } from "react-icons/fa6";
import Inbox from "./_component/Inbox";
import { useState } from "react";

export default function page() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(prev => !prev);
    }

    return (
        <div className="w-full h-full min-h-0 grid grid-rows-[auto_1fr] grid-cols-1">
            <div className="w-full flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 px-4 py-4 md:px-6 md:py-5 xl:px-8 xl:py-6 2xl:px-12 2xl:py-6">
                <h1 className="text-2xl font-semibold text-gray-700">Inbox</h1>
                <button type="button" onClick={handleOpenCreateModal} className="flex items-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg space-x-2 cursor-pointer duration-300">
                    <FaPlus />
                    <span>New Task</span>
                </button>
            </div>
            <div className="w-full h-full min-h-0 overflow-y-auto">
                <Inbox handleOpenCreateModal={handleOpenCreateModal} isCreateModalOpen={isCreateModalOpen} />
            </div>
        </div>
    )
}