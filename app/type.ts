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