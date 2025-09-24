import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
interface ITodo {
  id: number;
  title: string;
  completed: boolean;
}
const App = () => {
  const todosList: ITodo[] = [
    { id: 1, title: "Học React TypeScript", completed: false },
    { id: 2, title: "Làm bài tập TailwindCSS", completed: true },
    { id: 3, title: "Tạo giao diện todo list", completed: false },
  ];
  const [todos, setTodos] = useState<ITodo[]>(todosList);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  // Thêm mới
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), title: input, completed: false }]);
    setInput("");
  };

  // Xóa
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Đánh dấu hoàn thành
  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Sửa
  const handleEdit = (todo: ITodo) => {
    setEditId(todo.id);
    setEditValue(todo.title);
  };
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId === null || !editValue.trim()) return;
    setTodos(
      todos.map((todo) =>
        todo.id === editId ? { ...todo, title: editValue } : todo
      )
    );
    setEditId(null);
    setEditValue("");
  };

  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const uncompleted = total - completed;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📝 Todo List
          </h1>
          <p className="text-gray-600">
            Quản lý công việc của bạn một cách hiệu quả
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-blue-600">
              {todos.length}
            </div>
            <div className="text-sm text-gray-600">Tổng cộng</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-orange-600">
              {uncompleted}
            </div>
            <div className="text-sm text-gray-600">Chưa hoàn thành</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-green-600">{completed}</div>
            <div className="text-sm text-gray-600">Đã hoàn thành</div>
          </div>
        </div>

        {/* Add Todo Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <form className="flex gap-3" onSubmit={handleAdd}>
            <input
              type="text"
              placeholder="Nhập công việc mới..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Thêm
            </button>
          </form>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Chưa có công việc nào
              </h3>
              <p className="text-gray-500">
                Hãy thêm công việc đầu tiên của bạn!
              </p>
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`bg-white rounded-lg shadow-sm p-4 transition-all duration-200 hover:shadow-md ${
                  todo.completed ? "opacity-75" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                      todo.completed
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-300 hover:border-green-500"
                    }`}
                    aria-label={
                      todo.completed
                        ? "Đánh dấu chưa hoàn thành"
                        : "Đánh dấu hoàn thành"
                    }
                    onClick={() => handleToggle(todo.id)}
                  >
                    {todo.completed && "✓"}
                  </button>

                  {editId === todo.id ? (
                    <form className="flex-1 flex gap-2" onSubmit={handleUpdate}>
                      <input
                        type="text"
                        className="flex-1 px-2 py-1 border rounded"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="px-3 py-1 bg-green-500 text-white rounded"
                      >
                        Lưu
                      </button>
                      <button
                        type="button"
                        className="px-3 py-1 bg-gray-300 rounded"
                        onClick={() => setEditId(null)}
                      >
                        Hủy
                      </button>
                    </form>
                  ) : (
                    <>
                      <span
                        className={`flex-1 ${
                          todo.completed
                            ? "line-through text-gray-500"
                            : "text-gray-800"
                        }`}
                      >
                        {todo.title}
                      </span>
                      <button
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        aria-label="Sửa công việc"
                        onClick={() => handleEdit(todo)}
                      >
                        ✏️
                      </button>
                      <button
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        aria-label="Xóa công việc"
                        onClick={() => handleDelete(todo.id)}
                      >
                        🗑️
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
