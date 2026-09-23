"use client";

// imports react and state hook
import { useState } from "react";

// defines task object type
interface Task {
  id: number;
  name: string;
  dueDate: string;
  urgency: "low" | "medium" | "high";
  workType: "personal" | "school" | "work";
}

export default function TodoPage() {
  // initial tasks list is empty
  const [tasks, setTasks] = useState<Task[]>([]);

  // stores input task name
  const [name, setName] = useState("");
  // stores input due date
  const [dueDate, setDueDate] = useState("");
  // stores input urgency level
  const [urgency, setUrgency] = useState<"low" | "medium" | "high">("low");
  // stores input work type
  const [workType, setWorkType] = useState<"personal" | "school" | "work">("personal");

  // adds new task to the list
  const addTask = (e: React.FormEvent) => {
    // prevents page reload on form submit
    e.preventDefault();
    // ignores empty task names
    if (!name.trim()) return;

    // creates new task object
    const newTask: Task = {
      id: Date.now(),
      name: name.trim(),
      dueDate: dueDate || "No date",
      urgency: urgency,
      workType: workType,
    };

    // appends new task to list
    setTasks([...tasks, newTask]);
    // resets task name input
    setName("");
    // resets due date input
    setDueDate("");
    // resets urgency to low
    setUrgency("low");
    // resets work type to personal
    setWorkType("personal");
  };

  // subtracts task by id
  const subtractTask = (id: number) => {
    // filters out clicked task
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // returns color styles for urgency level
  const getUrgencyStyle = (level: "low" | "medium" | "high") => {
    // green for low urgency
    if (level === "low") return "bg-emerald-100 text-emerald-800 border-emerald-300";
    // yellow for medium urgency
    if (level === "medium") return "bg-amber-100 text-amber-800 border-amber-300";
    // red for high urgency
    return "bg-rose-100 text-rose-800 border-rose-300";
  };

  return (
    // centers content on white page
    <main className="min-h-screen bg-white text-zinc-800 flex flex-col items-center justify-center p-4 sm:p-6">
      {/* centered task list container */}
      <div className="w-full max-w-xl">
        {/* page title with green accent */}
        <h1 className="text-2xl font-bold text-center mb-6 text-emerald-700 tracking-tight">
          To-Do List
        </h1>

        {/* list of existing tasks */}
        <div className="space-y-3 mb-4">
          {/* maps each task to a row */}
          {tasks.map((task) => (
            // task card container
            <div
              key={task.id}
              className="flex items-center justify-between p-3.5 bg-white border border-zinc-200 rounded-lg shadow-xs hover:border-emerald-400 transition"
            >
              {/* task details on left */}
              <div className="flex-1 min-w-0 pr-3">
                {/* task name */}
                <div className="font-medium text-sm text-zinc-900 truncate">
                  {task.name}
                </div>
                {/* badges for date, urgency, and work type */}
                <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs">
                  {/* displays due date */}
                  <span className="text-zinc-500">
                    due: {task.dueDate}
                  </span>
                  {/* displays urgency with color code */}
                  <span
                    className={`px-2 py-0.5 rounded-full border text-[11px] font-medium capitalize ${getUrgencyStyle(
                      task.urgency
                    )}`}
                  >
                    {task.urgency}
                  </span>
                  {/* displays work type */}
                  <span className="px-2 py-0.5 rounded-full border border-zinc-200 bg-zinc-50 text-zinc-600 text-[11px] capitalize">
                    {task.workType}
                  </span>
                </div>
              </div>

              {/* subtract task button */}
              <button
                type="button"
                onClick={() => subtractTask(task.id)}
                className="text-zinc-400 hover:text-rose-600 p-1 rounded hover:bg-zinc-100 transition cursor-pointer text-sm font-semibold"
                title="Subtract task"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* empty task input row to add new task */}
        <form
          onSubmit={addTask}
          className="p-3.5 bg-white border-2 border-dashed border-emerald-300 rounded-lg space-y-3"
        >
          {/* task name input */}
          <input
            type="text"
            placeholder="Task name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full text-sm px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:border-emerald-600"
          />

          {/* grid of inputs for date, urgency, and category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {/* due date input */}
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="text-xs px-2.5 py-1.5 border border-zinc-300 rounded-md focus:outline-none focus:border-emerald-600 text-zinc-700"
            />

            {/* urgency drop down box */}
            <select
              value={urgency}
              onChange={(e) =>
                setUrgency(e.target.value as "low" | "medium" | "high")
              }
              className={`text-xs px-2.5 py-1.5 border rounded-md focus:outline-none focus:border-emerald-600 font-medium ${getUrgencyStyle(
                urgency
              )}`}
            >
              <option value="low">low urgency</option>
              <option value="medium">medium urgency</option>
              <option value="high">high urgency</option>
            </select>

            {/* work type drop down box */}
            <select
              value={workType}
              onChange={(e) =>
                setWorkType(e.target.value as "personal" | "school" | "work")
              }
              className="text-xs px-2.5 py-1.5 border border-zinc-300 rounded-md focus:outline-none focus:border-emerald-600 text-zinc-700 bg-white"
            >
              <option value="personal">personal</option>
              <option value="school">school</option>
              <option value="work">work</option>
            </select>
          </div>

          {/* adds add task button on screen */}
          <button
            type="submit"
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-md transition shadow-xs cursor-pointer"
          >
            + Add Task
          </button>
        </form>
      </div>
    </main>
  );
}
