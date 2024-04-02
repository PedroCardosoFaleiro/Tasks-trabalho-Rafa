export interface Task {
    id: number;
    title: string;
    category: string;
    completed: boolean;
}

export interface Category {
    id: number;
    label: string;
    value: string;
    color: string;
}