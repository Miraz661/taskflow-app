'use client'

import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import ModalWrapper from "@/helper/ModalWrapper";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { LuTarget } from "react-icons/lu";
import { FaTags } from "react-icons/fa";
import Projects from "./_component/Projects";
import type { Project } from "@/app/type";
import { UserService } from "@/usersService/user.service";
import toast from "react-hot-toast";
import { useProjectContext } from "../_component/MainLayout";

export default function page() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const { projects, getProjects } = useProjectContext();

    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(prev => !prev);
    }

    return (
        <div className="w-full h-full min-h-0 grid grid-rows-[auto_1fr] grid-cols-1">
            <div className="w-full flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 px-4 py-4 md:px-6 md:py-5 xl:px-8 xl:py-6 2xl:px-12 2xl:py-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-700">Projects</h1>
                    <p className="text-gray-500">Manage and organize your projects</p>
                </div>
                <button type="button" onClick={handleOpenCreateModal} className="flex items-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg space-x-2 cursor-pointer duration-300">
                    <FaPlus />
                    <span>New Project</span>
                </button>
            </div>
            <div className="w-full h-full grid min-h-0 overflow-y-auto">
                <Projects projects={projects} />
            </div>
            {isCreateModalOpen && <CreateProjectModal onClose={handleOpenCreateModal} onSuccess={getProjects} />}
        </div>
    )
}


const colorOptions = [
    { value: "blue", label: "Blue", hex: "#3b82f6" },
    { value: "purple", label: "Purple", hex: "#8b5cf6" },
    { value: "pink", label: "Pink", hex: "#ec4899" },
    { value: "amber", label: "Amber", hex: "#f59e0b" },
    { value: "green", label: "Green", hex: "#10b981" },
    { value: "red", label: "Red", hex: "#ef4444" },
    { value: "indigo", label: "Indigo", hex: "#6366f1" },
    { value: "teal", label: "Teal", hex: "#14b8a6" },
];

export const CreateProjectModal = ({ onClose, onSuccess, projectId }: { onClose: () => void, onSuccess?: () => void, projectId?: string }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Project>();
    const [loading, setLoading] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState<string>("");

    const handleAddTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const onSubmit = async (data: Project) => {
        setSubmitting(true);
        try {
            const project: Project = {
                _id: data._id,
                name: data.name,
                description: data.description,
                color: data.color,
                goal: data.goal,
                tags: tags,
            };
            const res = await UserService.createProject(project);
            console.log("Project created successfully: ", res);
            if (res?.data?.status === "success") {
                toast.success("Project created successfully!");
                setSubmitting(false);
                onClose();
                if (onSuccess) {
                    onSuccess();
                }
            }else{
                toast.error("Failed to create project. Please try again.");
                setSubmitting(false);
            }
        } catch (err) {
            console.error("Error creating project: ", err);
            toast.error("An error occurred while creating the project. Please try again.");
            setSubmitting(false);
        }
    }

    return (
        <div>
            <ModalWrapper onClose={onClose}>
                <div className="overflow-hidden rounded-2xl max-w-[90vw]">
                    <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm max-h-[90vh] grid grid-rows-[auto_1fr]" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-xl font-normal p-5 border-b text-gray-900">Create New Project</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6 overflow-y-auto">
                            <div className="space-y-2 text-gray-700">
                                <label htmlFor="title" className="block text-gray-700">Project Name</label>
                                <input
                                    id="title"
                                    type="text"
                                    placeholder="Enter project name..."
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg "
                                    {...register("name", { required: "Project name is required" })}
                                />
                                {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
                            </div>
                            <div className="space-y-2 text-gray-700">
                                <label htmlFor="description" className="block text-gray-700">Project Description</label>
                                <textarea
                                    id="description"
                                    placeholder="Enter project description..."
                                    className="w-full px-4 py-3 h-30 resize-none bg-gray-50 border border-gray-200 rounded-lg"
                                    {...register("description", { required: "Project description is required" })}
                                >
                                </textarea>
                                {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
                            </div>
                            <fieldset className="space-y-2 text-gray-700">
                                <legend className="block text-gray-700">Color</legend>
                                <div className="flex flex-wrap items-center gap-3">
                                    {colorOptions.map((color) => (
                                        <label key={color.value} className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                value={color.hex}
                                                {...register("color", { required: "Color is required" })}
                                                className="sr-only peer"
                                            />
                                            <div className="cursor-pointer rounded-lg border-2 border-gray-200 bg-white p-2 text-center text-sm text-gray-700 transition-all peer-checked:border-blue-600 peer-checked:text-blue-600 space-y-1">
                                                <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: color.hex }}></div>
                                                <span>{color.label}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                {errors.color && <p className="text-sm text-red-600">{errors.color.message}</p>}
                            </fieldset>

                            <div className="space-y-2 text-gray-700">
                                <label htmlFor="taskGoal" className="flex items-center gap-2 text-gray-700">
                                    <LuTarget />
                                    <span>Task Goal (Optional)</span>
                                </label>
                                <input
                                    id="taskGoal"
                                    type="number"
                                    placeholder="How many tasks do you want to complete?"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg"
                                    {...register("goal")}
                                />
                                <p className="text-sm text-gray-500">Set a target number of tasks to complete in this project</p>
                            </div>

                            <div className="space-y-2 text-gray-700">
                                <label htmlFor="tags" className="flex items-center gap-2 text-gray-700">
                                    <FaTags />
                                    <span>Tags (Optional)</span>
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        id="tags"
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleAddTag();
                                            }
                                        }}
                                        placeholder="Add tags..."
                                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddTag}
                                        className="cursor-pointer px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Add
                                    </button>
                                </div>
                                {tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm"
                                            >
                                                {tag}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveTag(tag)}
                                                    className="hover:text-blue-900"
                                                >
                                                    <IoMdClose size={16} />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="w-full flex flex-wrap gap-4">
                                <button type="button" onClick={onClose} className="flex-1 cursor-pointer px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                                <button type="submit" disabled={submitting} className="flex-1 cursor-pointer px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Create Task</button>
                            </div>
                        </form>
                    </div>
                </div>
            </ModalWrapper>
        </div>
    )
}