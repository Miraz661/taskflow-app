export type Task = {
    id: string;
    title: string;
    description?: string;
    priority: "Low" | "Medium" | "High";
    dueDate?: string;
    project?: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

export type Project = {
    _id: string;
    name: string;
    description?: string;
    color: string;
    goal?: string;
    tags?: string[];
    taskCompleted?: number;
    taskPending?: number;
    taskTotal?: number;
}