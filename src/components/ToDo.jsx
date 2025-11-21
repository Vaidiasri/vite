import { useState, useEffect } from "react";

const ToDo = () => {
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [tasks, setTasks] = useState(() => {
        const stored = localStorage.getItem("tasks");
        if (!stored) return [];
        try {
            const parsed = JSON.parse(stored);
            // Migration logic for existing tasks
            return parsed.map((t, i) => ({
                ...t,
                id: t.id || Date.now() + i,
                status: t.status || 'Pending',
                createdAt: t.createdAt || new Date().toISOString()
            }));
        } catch (e) {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const handleAdd = () => {
        if (task.trim() === "" && description.trim() === "") return;

        const newTask = {
            id: Date.now(),
            task,
            description,
            status: 'Pending',
            createdAt: new Date().toISOString()
        };

        setTasks([...tasks, newTask]);
        setTask("");
        setDescription("");
    };

    const handleDelete = (id) => {
        setTasks(tasks.filter((t) => t.id !== id));
    };

    const handleStatusChange = (id, newStatus) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const TaskColumn = ({ title, status, items }) => (
        <div className="flex-1 w-full min-w-0 bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${status === 'Pending' ? 'text-yellow-700' :
                    status === 'In Progress' ? 'text-blue-700' : 'text-green-700'
                }`}>
                {title}
                <span className="text-sm font-normal bg-white px-2 py-0.5 rounded-full border border-gray-200 text-gray-500">
                    {items.length}
                </span>
            </h2>
            <div className="space-y-3">
                {items.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-gray-800 break-words">{item.task}</h3>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="text-gray-400 hover:text-red-500 lg:opacity-0 lg:group-hover:opacity-100 opacity-100 transition-opacity p-1"
                                title="Delete"
                            >
                                ×
                            </button>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 break-words">{item.description}</p>
                        <div className="flex flex-wrap justify-between items-center pt-2 border-t border-gray-50 gap-2">
                            <span className="text-xs text-gray-400">
                                {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                            <select
                                value={item.status}
                                onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                className={`text-xs font-medium px-2 py-1 rounded-md border cursor-pointer outline-none ${getStatusColor(item.status)}`}
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </div>
                ))}
                {items.length === 0 && (
                    <div className="text-center py-8 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-lg">
                        No tasks
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <main className="min-h-screen bg-white p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 md:mb-10 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">Task Manager</h1>
                    <p className="text-gray-500">Manage your tasks efficiently</p>
                </header>

                {/* Add Task Section */}
                <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-100 mb-8 md:mb-12 max-w-2xl mx-auto">
                    <div className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="What needs to be done?"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                            onChange={(e) => setTask(e.target.value)}
                            value={task}
                        />
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="Add a description..."
                                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            />
                            <button
                                onClick={handleAdd}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-md hover:shadow-lg active:scale-95 transform duration-100 w-full md:w-auto"
                            >
                                Add Task
                            </button>
                        </div>
                    </div>
                </div>

                {/* Kanban Board */}
                <div className="flex flex-col lg:flex-row gap-6 pb-4">
                    <TaskColumn
                        title="Pending"
                        status="Pending"
                        items={tasks.filter(t => t.status === 'Pending')}
                    />
                    <TaskColumn
                        title="In Progress"
                        status="In Progress"
                        items={tasks.filter(t => t.status === 'In Progress')}
                    />
                    <TaskColumn
                        title="Completed"
                        status="Completed"
                        items={tasks.filter(t => t.status === 'Completed')}
                    />
                </div>
            </div>
        </main>
    );
};

export default ToDo;
