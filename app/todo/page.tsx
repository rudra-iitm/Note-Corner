"use client";

import { useEffect, useState } from 'react'
import { TodoProvider } from '@/Context/Todo'
import InputTodo from '@/components/InputTodo';
import Todo from '@/components/Todo';

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
		<TodoProvider value={{todos, addTodo, deleteTodo, updateTodo, toggleComplete}}>
			<div className="h-lvh w-lvw bg-[#555555] flex justify-center">
				<div className="w-1/2 px-10 pt-16">
					<p className='text-center text-5xl font-semibold mb-10 text-white'>Manage Your Todos</p>
					<InputTodo/>
					<div className="flex flex-col gap-5">
						{todos.map(thisTodo => (
							<Todo key={thisTodo.id} todo={thisTodo}/>
						))}
					</div>
				</div>
			</div>
		</TodoProvider>
  )
}

export default Page
