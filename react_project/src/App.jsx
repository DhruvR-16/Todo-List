import { useState } from "react";
import "./App.css"; 

function Search({ onSearch }) {
  function handleSearchChange(event) {
    onSearch(event.target.value);
  }
  return <input type="text" placeholder="Search" onChange={handleSearchChange} />;
}

function Description() {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [priority, setPriority] = useState("low"); 
  let [todo, setTodo] = useState([]);
  let [edit, setEdit] = useState(false);
  let [editIndex, setEditIndex] = useState(null);
  let [searchQuery, setSearchQuery] = useState("");
  let [priorityFilter, setPriorityFilter] = useState("all");

  function titlechange(event) {
    setTitle(event.target.value);
  }

  function deschange(event) {
    setDescription(event.target.value);
  }

  function priorityChange(event) {
    setPriority(event.target.value);
  }

  function add() {
    if (edit) {
      let update = [...todo];
      update[editIndex] = { 
        title: title, 
        description: description,
        priority: priority
      };
      setTodo(update);
      setEdit(false);
      setEditIndex(null);
    } else {
      setTodo([
        ...todo, 
        { 
          title: title, 
          description: description,
          priority: priority
        }
      ]);
    }
    setTitle("");
    setDescription("");
    setPriority("medium"); 
  }

  function del(del) {
    setTodo(todo.filter((a, i) => i !== del));
  }

  function Edit(index) {
    setEdit(true);
    setEditIndex(index);
    setTitle(todo[index].title);
    setDescription(todo[index].description);
    setPriority(todo[index].priority || "medium");
  }

  function handleSearch(query) {
    setSearchQuery(query);
  }

  function filterByPriority(priority) {
    setPriorityFilter(priority);
  }

  const filteredTodos = todo.filter(
    (t) => {
      const matchesSearch = 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPriority = 
        priorityFilter === "all" || t.priority === priorityFilter;
      
      return matchesSearch && matchesPriority;
    }
  );

  return (
    <div>
      <h1>Todo List</h1>
      <Search onSearch={handleSearch} />
      
      <input 
        type="text" 
        placeholder="Title" 
        onChange={titlechange} 
        value={title} 
      />
      
      <input 
        type="text" 
        placeholder="Description" 
        onChange={deschange} 
        value={description}
      />
      
      <select 
        className="priority-select" 
        value={priority} 
        onChange={priorityChange}
      >
        <option value="high">High Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="low">Low Priority</option>
      </select>
      
      <button onClick={add}>{edit ? "Update" : "Add"}</button>
      
      <div className="priority-filters">
        <button 
          className={priorityFilter === "high" ? "active" : ""} 
          onClick={() => filterByPriority("high")}
        >
          High Priority
        </button>
        <button 
          className={priorityFilter === "medium" ? "active" : ""} 
          onClick={() => filterByPriority("medium")}
        >
          Medium Priority
        </button>
        <button 
          className={priorityFilter === "low" ? "active" : ""} 
          onClick={() => filterByPriority("low")}
        >
          Low Priority
        </button>
        <button 
          className={priorityFilter === "all" ? "active" : ""} 
          onClick={() => filterByPriority("all")}
        >
          All
        </button>
      </div>
      
      <ul>
        {filteredTodos.map((todo, index) => (
          <li 
            key={index} 
            className={`priority-${todo.priority || "medium"}`}
          >
            <h3>{todo.title}</h3>
            <span className="priority-badge">
              {todo.priority === "high" ? "High" : 
               todo.priority === "low" ? "Low" : "Medium"}
            </span>
            <p>{todo.description}</p>
            <button onClick={() => del(index)}>Delete</button>
            <button onClick={() => Edit(index)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <div>
      <Description />
    </div>
  );
}

export default App;