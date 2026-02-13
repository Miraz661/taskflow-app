'use client'

import { Progress } from "@/components/ui/progress"
import { LuCalendar, LuFolderOpen } from "react-icons/lu";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import type { Task } from "@/app/type";
import { useState } from "react";
import ConfirmationModal from "@/helper/ConfirmationModal";
import ModalWrapper from "@/helper/ModalWrapper";
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronDownIcon } from "lucide-react";
import { format } from "date-fns"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useProjectContext } from "./MainLayout";

type PropType = {
    handleOpenCreateModal: () => void,
    isCreateModalOpen: boolean,
}

export default function Inbox({ handleOpenCreateModal, isCreateModalOpen }: PropType) {
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
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

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

    const handleEditTask = (taskId: string) => {
        setEditingTaskId(taskId);
        handleOpenCreateModal();
    }

    return (
        <div className="w-full h-full px-4 py-4 md:px-6 md:py-6 xl:px-8 xl:py-7 2xl:px-12 2xl:py-8 space-y-8 bg-[#f9fafb]">
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
                editingTaskId={editingTaskId}
            />}
        </div>
    )
}


export const TaskProgressCard = () => {
    return (
        <div className="flex-1 p-6 border border-gray-200 rounded-2xl space-y-3 text-gray-600 bg-white">
            <div className="flex items-center justify-between gap-4">
                <h2 className="whitespace-nowrap">Daily Progress</h2>
                <p className="text-gray-900">2/8</p>
            </div>
            <div>
                <Progress value={25} className="h-2 rounded-full bg-gray-100" indicatorClassName="bg-blue-600" />
            </div>
            <div>
                Keep going!
            </div>
        </div>
    )
}

export const TaskCard = (
    {
        data,
        toggleTaskCompletion,
        handleDeleteTask,
        handleEditTask
    }: {
        data: Task,
        toggleTaskCompletion: (taskId: string) => void,
        handleDeleteTask: (taskId: string) => void,
        handleEditTask: (taskId: string) => void
    }) => {
    return (
        <div className="group bg-white rounded-xl p-5 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all">
            <div className="flex items-start gap-4">
                <button onClick={() => toggleTaskCompletion(data.id)} className={`cursor-pointer mt-0.5 w-5 h-5 rounded-full border-2 shrink-0 transition-all hover:border-blue-600 flex items-center justify-center text-white ${data?.completed ? "bg-blue-600 border-blue-600" : "bg-white"}`}>
                    <FaCheck size={14} className={`${data?.completed ? "" : "hidden"}`} />
                </button>
                <div className="flex-1 min-w-0">
                    {data?.completed ? (
                        <del className="text-gray-900 mb-3 ">{data?.title}</del>
                    ) : (
                        <p className="text-gray-900 mb-3 ">{data?.title}</p>
                    )}
                    <div className="flex items-center gap-3 flex-wrap">
                        <span className="px-2.5 py-1 rounded-md text-xs border bg-red-100 text-red-700 border-red-200">{data?.priority}</span>
                        <div className="flex items-center gap-1.5 text-sm text-red-600">
                            <LuCalendar />
                            <span>
                                {data?.dueDate
                                    ? new Date(data.dueDate).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric"
                                    })
                                    : "No due date"}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                            <LuFolderOpen />
                            <span>{data?.project}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                    <button className="cursor-pointer p-2 -m-2 text-gray-400 hover:text-blue-600 transition-all" title="Edit task" onClick={() => handleEditTask(data.id)}>
                        <CiEdit size={20} />
                    </button>
                    <button onClick={() => handleDeleteTask(data.id)} className="cursor-pointer p-2 -m-2 text-gray-400 hover:text-red-600 transition-all" title="Delete task">
                        <MdDelete size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}

type CreateTaskModalPropType = {
    handleOpenCreateModal: () => void,
    projectId?: string,
    editingTaskId: string | null
}

export const CreateTaskModal = ({ handleOpenCreateModal, projectId, editingTaskId }: CreateTaskModalPropType) => {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<{
        title: string,
        priority: string,
        dueDate: string,
        project?: string
    }>({
        defaultValues: {
            priority: "medium",
            project: projectId
        }
    });

    const [date, setDate] = useState<Date>()
    const [project, setProject] = useState<string>(projectId || "")
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
    const { projects } = useProjectContext();

    const onSubmit = (data: {
        title: string,
        priority: string,
        dueDate: string,
        project?: string
    }) => {
        console.log(data);
        reset();
        setDate(undefined);
        setProject("");
    }

    return (
        <ModalWrapper onClose={handleOpenCreateModal}>
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-normal p-5 border-b text-gray-900">Create New Task</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-6">
                    <div className="space-y-2 text-gray-700">
                        <label htmlFor="title" className="block text-gray-700">Task Name</label>
                        <input
                            id="title"
                            type="text"
                            placeholder="Enter task name..."
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            {...register("title", { required: "Task name is required" })}
                        />
                        {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
                    </div>
                    <fieldset className="space-y-2 text-gray-700">
                        <legend className="block text-gray-700">Priority</legend>
                        <div className="flex flex-wrap items-center gap-3">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    value="low"
                                    {...register("priority", { required: "Priority is required" })}
                                    className="sr-only peer"
                                />
                                <span className="min-w-25 cursor-pointer rounded-lg border-2 border-gray-200 bg-white px-4 py-2 text-center text-base text-gray-700 transition-all peer-checked:border-blue-600 peer-checked:text-blue-600">
                                    Low
                                </span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    value="medium"
                                    {...register("priority", { required: "Priority is required" })}
                                    className="sr-only peer"
                                />
                                <span className="min-w-25 cursor-pointer rounded-lg border-2 border-gray-200 bg-white px-4 py-2 text-center text-base text-gray-700 transition-all peer-checked:border-blue-600 peer-checked:text-blue-600">
                                    Medium
                                </span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    value="high"
                                    {...register("priority", { required: "Priority is required" })}
                                    className="sr-only peer"
                                />
                                <span className="min-w-22 cursor-pointer rounded-lg border-2 border-gray-200 bg-white px-4 py-2 text-center text-base text-gray-700 transition-all peer-checked:border-blue-600 peer-checked:text-blue-600">
                                    High
                                </span>
                            </label>
                        </div>
                        {errors.priority && <p className="text-sm text-red-600">{errors.priority.message}</p>}
                    </fieldset>
                    <div className="space-y-2 text-gray-700">
                        <label htmlFor="dueDateButton" className="block text-gray-700">Due Date</label>
                        <input type="hidden" id="dueDate" {...register("dueDate", { required: "Due date is required" })} />
                        <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                            <PopoverTrigger asChild className="ring-0 outline-none shadow-none">
                                <Button
                                    type="button"
                                    id="dueDateButton"
                                    variant="outline"
                                    data-empty={!date}
                                    className="data-[empty=true]:text-muted-foreground w-full justify-between text-left font-normal bg-gray-50 border border-gray-200 rounded-lg px-10 py-6"
                                >
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    <ChevronDownIcon />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="z-9999 w-auto p-0 shadow-lg border border-gray-200" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={(nextDate) => {
                                        setDate(nextDate);
                                        setValue("dueDate", nextDate ? format(nextDate, "yyyy-MM-dd") : "", { shouldValidate: true });
                                        setIsDatePickerOpen(false);
                                    }}
                                    defaultMonth={date}
                                />
                            </PopoverContent>
                        </Popover>
                        {errors.dueDate && <p className="text-sm text-red-600">{errors.dueDate.message}</p>}
                    </div>
                    <div className="space-y-2 text-gray-700">
                        <label htmlFor="project" className="block text-gray-700">Project (Optional)</label>
                        <input type="hidden" id="project" {...register("project")} />
                        <Select value={project} onValueChange={(value) => { setProject(value); setValue("project", value); }}>
                            <SelectTrigger className="w-full px-4 py-6 bg-gray-50 border border-gray-200 rounded-lg">
                                <SelectValue placeholder="Select a project" />
                            </SelectTrigger>
                            <SelectContent className="z-9999" position="popper">
                                {projects?.map((project) => (
                                    <SelectItem key={project._id} value={project?._id}>{project.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-full flex flex-wrap gap-4">
                        <button type="button" onClick={handleOpenCreateModal} className="flex-1 cursor-pointer px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                        <button type="submit" className="flex-1 cursor-pointer px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Create Task</button>
                    </div>
                </form>
            </div>
        </ModalWrapper>
    )
}