import { FormEvent, useState } from "react";
import { useTodo } from "../Context/Todo";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const InputTodo = () => {
  const { addTodo } = useTodo();
  const [newTodo, setNewTodo] = useState("");
  const addNewTodo = (e : FormEvent) => {
    e.preventDefault();
    addTodo(newTodo);
    setNewTodo("");
  }
  return (
    <form onSubmit={addNewTodo} className="w-full h-8 rounded-3xl mb-8 flex gap-1">
      <Input className="w-11/12 mr-1 h-full rounded pl-3 outline-2 outline-zinc-900 dark:outline-zinc-400 outline opacity-50" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Write Todo..."/>
			<Button className="h-full hover:bg-blue-800 text-lg" type="submit">+</Button>
		</form>
    )
}

export default InputTodo
