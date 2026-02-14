'use client'

import { FaPlus } from "react-icons/fa6";
import { TaskProgressCard, TaskCard, CreateTaskModal } from "../../_component/Inbox";
import { useState } from "react";
import type { Task } from "@/app/type";
import ConfirmationModal from "@/helper/ConfirmationModal";

type PropType = {
    id: string
}

export default function ProjectDetails({ id }: PropType) {
    const [sampleTask, setSampleTask] = useState<Task[]>([
        {
            id: "1",
            title: "Design new landing page",
            priority: "High",
            dueDate: "2024-12-01",
            project: "Website Redesign",
            completed: false,
            createdAt: "2024-11-20",
            updatedAt: "2024-11-22"
        },
        {
            id: "2",
            title: "Design new landing page",
            priority: "Medium",
            dueDate: "2024-12-01",
            project: "Website Redesign",
            completed: false,
            createdAt: "2024-11-20",
            updatedAt: "2024-11-22"
        },
        {
            id: "3",
            title: "Design new landing page",
            priority: "High",
            dueDate: "2024-12-01",
            project: "Website Redesign",
            completed: false,
            createdAt: "2024-11-20",
            updatedAt: "2024-11-22"
        },
        {
            id: "4",
            title: "Design new landing page",
            priority: "Low",
            dueDate: "2024-12-01",
            project: "Website Redesign",
            completed: true,
            createdAt: "2024-11-20",
            updatedAt: "2024-11-22"
        },
        {
            id: "5",
            title: "Design new landing page",
            priority: "High",
            dueDate: "2024-12-01",
            project: "Website Redesign",
            completed: true,
            createdAt: "2024-11-20",
            updatedAt: "2024-11-22"
        }
    ]);

    const [deletedTaskId, setDeletedTaskId] = useState<string>("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);


    const handleEditTask = (taskId: string) => {
        setEditingTaskId(taskId);
        setIsCreateModalOpen(true);
    }

    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(prev => !prev);
    }

    const toggleTaskCompletion = (taskId: string) => {
        setSampleTask(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const handleDeleteTask = (taskId: string) => {
        setDeletedTaskId(taskId);
    };

    const handleConfirmDelete = () => {
        setSampleTask(prevTasks => prevTasks.filter(task => task.id !== deletedTaskId));
        setDeletedTaskId("");
    };

    const handleCancelDelete = () => {
        setDeletedTaskId("");
    };
    return (
        <div className="w-full h-full min-h-0 grid grid-rows-[auto_1fr] grid-cols-1">
            <div className="w-full flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 px-4 py-4 md:px-6 md:py-5 xl:px-8 xl:py-6 2xl:px-12 2xl:py-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-700">Project Details</h1>
                </div>
                <button type="button" className="flex items-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg space-x-2 cursor-pointer duration-300" onClick={handleOpenCreateModal}>
                    <FaPlus />
                    <span>New Task</span>
                </button>
            </div>
            <div className="w-full h-full grid px-4 py-4 md:px-6 md:py-6 xl:px-8 xl:py-7 2xl:px-12 2xl:py-8 space-y-8 bg-[#f9fafb] overflow-y-auto">
                <div className="flex flex-wrap gap-6">
                    <TaskProgressCard />
                    <TaskProgressCard />
                </div>
                <div className="space-y-4">
                    <h3 className="text-sm text-gray-500 uppercase tracking-wide">Active Tasks</h3>
                    <div className="space-y-3">
                        {sampleTask?.filter(task => !task.completed).map((task) => (
                            <TaskCard
                                key={task.id}
                                data={task}
                                toggleTaskCompletion={toggleTaskCompletion}
                                handleDeleteTask={handleDeleteTask}
                                handleEditTask={handleEditTask}
                            />
                        ))}
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="text-sm text-gray-500 uppercase tracking-wide">Completed Tasks</h3>
                    <div className="space-y-3">
                        {sampleTask?.filter(task => task.completed).map((task) => (
                            <TaskCard
                                key={task.id}
                                data={task}
                                toggleTaskCompletion={toggleTaskCompletion}
                                handleDeleteTask={handleDeleteTask}
                                handleEditTask={handleEditTask}
                            />
                        ))}
                    </div>
                </div>
                <ConfirmationModal
                    isOpen={!!deletedTaskId}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    description="You want to delete this task!"
                />
                {isCreateModalOpen && <CreateTaskModal
                    handleOpenCreateModal={handleOpenCreateModal}
                    projectId={id}
                    editingTaskId={editingTaskId}
                />}
            </div>
        </div>
    )
}