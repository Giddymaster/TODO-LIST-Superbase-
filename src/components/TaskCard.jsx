import { MdEditNote, MdDoneAll, MdOutlineDeleteSweep, MdDone } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import supabase from "../config/supabaseClient";
import "../index.css";

function TaskCard({ task }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const handleDelete = async () => {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", task.id);

    if (error) {
      console.error("Error deleting task:", error);
    } else {
      console.log("Task deleted:", task.id);
    }
  };

  const handleComplete = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div className="task-card">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <div className="task-card-actions">
        <Link to={`/${task.id}`}>
          <i><button className="btn-edit"><MdEditNote />
          </button></i>
        </Link>
        <i><button className="btn-delete" onClick={handleDelete}><MdOutlineDeleteSweep /></button></i>
        <i>
          <button
            className="btn-complete"
            onClick={handleComplete}
            style={{
              backgroundColor: isCompleted ? "var(--color-primary)" : "var(--color-white)",
              color: isCompleted ? "var(--color-white)" : "var(--color-primary)",
            }}
          >
            {isCompleted ? <MdDoneAll /> : <MdDone />}
          </button>
        </i>
      </div>
    </div>
  );
}

export default TaskCard;
