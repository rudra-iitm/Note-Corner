import { FormEvent, useState } from "react";
import { useTodo } from "../Context/Todo";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CiCirclePlus } from "react-icons/ci";

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
      <Input className="flex-1 rounded-lg p-4" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Write Todo..."/>
			<Button className="rounded-lg w-16 h-10 ml-4" type="submit"><CiCirclePlus size={20}/></Button>
		</form>
    )
}

export default InputTodo
