import { useState } from "react";
import supabase from "../config/supabaseClient";

function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError("Please fill in all fields");
      return;
    }
    setError(null);

    const { data, error } = await supabase
      .from("tasks")
      .insert([
        { title, description }
      ])
      .select();
    if (error) {
      setError("Failed to create task");
      console.error(error);
    }
    if (data) {
      console.log("Task created:", data);
      setTitle("");
      setDescription("");
      setError(null);
    }
  }

  return (
    <div className="create">
      <form onSubmit={handleSubmit}>
        <h2>Create a new task</h2>
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
        {error && <div className="error">{error}</div>}
        <button type="submit">Add Task</button>

      </form>
    </div>

  );
}

export default Create;
