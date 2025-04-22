import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../config/supabaseClient";
import "../index.css";

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Please fill in all fields");
      return;
    }

    const { data, error } = await supabase
      .from("tasks")
      .update({ title, description })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating task:", error);
    } else {
      console.log("Task updated:", data);
      navigate("/", { replace: true });
    }
  }


  useEffect(() => {
    const fetchTask = async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        navigate("/", { replace: true });
        console.error("Error fetching task:", error);
      } else {
        setTitle(data.title);
        setDescription(data.description);
        console.log("Fetched task:", data);
      }
      };
  
      fetchTask();
    }, [id, navigate]);

  

  return (
    <div className="update">
      <form onSubmit={handleSubmit}>
        <h2>Update Task</h2>
        <label htmlFor="title">Task title:</label>
        <input
          type="text"
          id="title"
          placeholder="Task title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="description">Task description:</label>
        <textarea
          id="description"
          placeholder="Task description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        
        <button type="submit">Update Task</button>

      </form>
    </div>
  );
}

export default Update;
