import { useContext } from "react";
import { createContext } from "react";

interface TodoContextType {
    todos: {
        id: number;
        todo: string;
        complete: boolean;
    }[];
    addTodo: (todo: string) => void;
    deleteTodo: (id: number) => void;
    updateTodo: (todo: string, id: number) => void;
    toggleComplete: (id: number) => void;
}

export const TodoContext = createContext<TodoContextType>({
    todos: [],
    addTodo: (todo : string) => {},
    deleteTodo: (id : number) => {},
    updateTodo: (todo : string, id : number) => {},
    toggleComplete: (id : number) => {},
});

export const TodoProvider = TodoContext.Provider;

export const useTodo = () => {
    return useContext(TodoContext);
}