import supabase from "../config/supabaseClient";
import { useState, useEffect } from "react";
import TaskCard from "../components/taskCard";

function Home() {
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("tasks").select("*");
      if (error) {
        setError(error.message);
        setTasks(null);
      } else {
        setTasks(data);
      }
      setLoading(false);
    };

    fetchTasks();
  }, []);
  return (
    <div className="home">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {tasks && (
        <div className="task-preview">
          <div className="task-gid">
            {tasks.map((task) => (
              <TaskCard task={task} key={task.id} />
            ))}
          </div>
        </div>
      )}
      {tasks && tasks.length === 0 && <p>No tasks found</p>}
    </div>
  );
}

export default Home;
