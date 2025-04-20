function TaskCard({ task }) {
  return (
    <div className="task-card">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <div className="task-card-actions">
        <button className="btn btn-edit">Edit</button>
        <button className="btn btn-complete">Complete</button>
        <button className="btn btn-delete">Delete</button>
      </div>
    </div>
  );
}

export default TaskCard;
