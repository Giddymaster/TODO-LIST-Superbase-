function Update() {
  return (
    <div className="update">
      <h2>Update</h2>
      <form>
        <label>Task Title:</label>
        <input type="text" required />
        <label>Task Description:</label>
        <input type="text" required />
        <button>Update Task</button>
      </form>
    </div>
  );
}

export default Update;
