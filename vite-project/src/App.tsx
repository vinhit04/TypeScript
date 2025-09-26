import { useState } from "react";
import AddBook from "./Book/addbook";
import ListBook from "./Book/listbook";
import type { Book } from "./Book/types";
import "./App.css";
function App() {
  const [books, setBooks] = useState<Book[]>([
    {
      id: 1,
      title: "Vi ban xung dang",
      author: "Nguyễn Hai Long",
      year: 2023,
      publisher: "NXB Kim Dong",
      category: "Đời Sống",
      quantity: 5,
    },
    {
      id: 2,
      title: "Chiến sĩ quả cảm",
      author: "Trần Cam Tú",
      year: 2022,
      publisher: "NXB Quân Đội",
      category: "Quân Đội",
      quantity: 3,
    },
    {
      id: 3,
      title: "Hành trình tuổi trẻ",
      author: "Phạm Minh Anh",
      year: 2021,
      publisher: "NXB Trẻ",
      category: "Tuổi Trẻ",
      quantity: 7,
    }
  ]);

  const handleAdd = (book: Book) => setBooks((s) => [...s, book]);

  const handleSave = (id: number, updatedBook: Book) =>
    setBooks((s) => s.map((b) => (b.id === id ? updatedBook : b)));

  const handleDelete = (id: number) =>
    setBooks((s) => s.filter((b) => b.id !== id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-extrabold text-indigo-700">📚 Library Manager</h1>
          <p className="text-gray-500 mt-2">Thêm / Sửa / Xóa sách — giao diện responsive, sạch sẽ</p>
        </div>

        <AddBook onAdd={handleAdd} />

        <div className="mt-8">
          <ListBook books={books} onSave={handleSave} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default App;
