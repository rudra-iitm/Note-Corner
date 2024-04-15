import { FormEvent, useState } from "react";
import { useTodo } from "../Context/Todo"
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Pencil, Save, Trash2 } from "lucide-react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { IoIosSave } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import { Card } from "./ui/card";

interface TodoProps {
  todo: {
    id: number;
    todo: string;
    complete: boolean;
  }
}

const Todo : React.FC<TodoProps> = ({ todo }) => {
  const { 
    deleteTodo, 
    updateTodo, 
    toggleComplete,
  } = useTodo();
  const [thisTodo, setThisTodo] = useState(todo.todo);
  const [editable, setEditable] = useState(false);
  const handleSubmit = (e : FormEvent) => {
    e.preventDefault();
    if (editable) {
      updateTodo(thisTodo, todo.id);
      setEditable(false);
    } else {
      if (!todo.complete) {
        setEditable(true);
      }
    }
  }
  const deleteThisTodo = () => {
    deleteTodo(todo.id);
  }
  return (
    <div className="w-full h-12">
      <Card>
        <form onSubmit={handleSubmit} className={`h-full w-full flex gap-3 justify-center items-center px-4 py-2 rounded-xl`}>
          <Checkbox checked={todo.complete} onClick={() => toggleComplete(todo.id)} className=""/>
          <Input className={`w-10/12 p-2 border-0 outline-2  ${todo.complete ? "line-through" : ""}`} type="text" readOnly={!editable} value={thisTodo} onChange={(e) => setThisTodo(e.target.value)} />
          <Button variant={editable ? "default" : "outline"} className="w-1/12 h-full p-2" type="submit">
            {editable ? <IoIosSave size={20}/> : <HiOutlinePencilAlt size={20}/> }
          </Button>
          <Button className="w-1/12 h-full bg-red-600 rounded-lg p-2" onClick={deleteThisTodo}>
            <MdOutlineDelete size={20}/>
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default Todo
