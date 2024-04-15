"use client";

import { useEffect, useState } from 'react'
import { TodoProvider } from '@/Context/Todo'
import InputTodo from '@/components/InputTodo';
import Todo from '@/components/Todo';
import { SidebarDrawer } from '@/components/SidebarDrawer';

const Page = () => {
  const [todos, setTodos] = useState<{ id: number; todo: string; complete: boolean; }[]>([]);
  const addTodo = (todo : string) => {
    setTodos(prev => [
      {
        id: Date.now(),
        todo: todo,
        complete: false,
      },
      ...prev
    ])
  }
  const deleteTodo = (id: number): void => {
    setTodos(prev => prev.filter(thisTodo => thisTodo.id !== id))
  }
  const updateTodo = (todo : string, id : number) => {
    setTodos(prev => prev.map(thisTodo => thisTodo.id === id ? {...thisTodo, todo : todo} : thisTodo));
  }
  const toggleComplete = (id : number) => {
    setTodos(prev => prev.map(thisTodo => thisTodo.id === id ? {...thisTodo, complete: !thisTodo.complete} : thisTodo));
  }
	useEffect(() => {
		const localTodos = JSON.parse(localStorage.getItem("todos") || "[]");
		if (localTodos && localTodos.length > 0) setTodos(localTodos);
	},[])
	useEffect(() => {
		localStorage.setItem("todos",JSON.stringify(todos));
	},[todos])
  return (
    <div>
      <TodoProvider value={{todos, addTodo, deleteTodo, updateTodo, toggleComplete}}>
        <SidebarDrawer urll='to-do'/>
        <div className="h-lvh w-lvw dark:bg-[#555555] flex justify-center pt-16 overflow-hidden absolute -z-10">
          <div className="w-1/2 px-10 mt-12 border border-zinc-900 h-3/4 p-6 rounded-lg overflow-auto">
            <p className='text-center md:text-5xl font-semibold mb-10 dark:text-white sm:text-3xl'>Manage Your Todos</p>
            <InputTodo/>
            <div className="flex flex-col gap-5">
              {todos.map(thisTodo => (
                <Todo key={thisTodo.id} todo={thisTodo}/>
              ))}
            </div>
          </div>
        </div>
      </TodoProvider>
    </div>
  )
}

export default Page
