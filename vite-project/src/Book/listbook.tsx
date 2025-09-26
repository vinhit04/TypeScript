import { useState } from "react";
import type { Book } from "./types";

interface ListBookProps {
  books: Book[];
  onSave: (id: number, updatedBook: Book) => void;
  onDelete: (id: number) => void;
}

const ListBook: React.FC<ListBookProps> = ({ books, onSave, onDelete }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Book | null>(null);

  const handleEditClick = (book: Book) => {
    if (editingId === book.id) {
      if (editForm) onSave(book.id, editForm);
      setEditingId(null);
      setEditForm(null);
    } else {
      setEditingId(book.id);
      setEditForm(book);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editForm) return;
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: name === "year" || name === "quantity" ? Number(value) : value,
    });
  };

  if (books.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        📚 Chưa có sách nào — thêm ngay bằng form phía trên!
      </div>
    );
  }
  return (
    <div className="mt-6">
      {/* Desktop: table */}
      <div className="hidden md:block overflow-hidden rounded-xl shadow-lg">
        <table className="w-full table-auto bg-white">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
              <th className="p-3 text-left">Tên sách</th>
              <th className="p-3 text-left">Tác giả</th>
              <th className="p-3 text-center">Năm</th>
              <th className="p-3 text-left">NXB</th>
              <th className="p-3 text-left">Thể loại</th>
              <th className="p-3 text-center">SL</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr
                key={book.id}
                className="border-b even:bg-gray-50 hover:bg-gray-50 transition"
              >
                {editingId === book.id ? (
                  <>
                    <td className="p-2">
                      <input
                        name="title"
                        value={editForm?.title || ""}
                        onChange={handleChange}
                        className="w-full px-2 py-1 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        name="author"
                        value={editForm?.author || ""}
                        onChange={handleChange}
                        className="w-full px-2 py-1 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      />
                    </td>
                    <td className="p-2 text-center">
                      <input
                        name="year"
                        type="number"
                        value={editForm?.year || ""}
                        onChange={handleChange}
                        className="w-20 px-2 py-1 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        name="publisher"
                        value={editForm?.publisher || ""}
                        onChange={handleChange}
                        className="w-full px-2 py-1 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        name="category"
                        value={editForm?.category || ""}
                        onChange={handleChange}
                        className="w-full px-2 py-1 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      />
                    </td>
                    <td className="p-2 text-center">
                      <input
                        name="quantity"
                        type="number"
                        min={0}
                        value={editForm?.quantity || ""}
                        onChange={handleChange}
                        className="w-20 px-2 py-1 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      />
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-3">
                      <div className="font-semibold text-gray-800">{book.title}</div>
                      <div className="text-xs text-gray-500">{book.publisher} • {book.year}</div>
                    </td>
                    <td className="p-3">{book.author}</td>
                    <td className="p-3 text-center">{book.year}</td>
                    <td className="p-3">{book.publisher}</td>
                    <td className="p-3">{book.category}</td>
                    <td className="p-3 text-center">
                      <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                        {book.quantity}
                      </span>
                    </td>
                  </>
                )}

                <td className="p-3 text-center">
                  <div className="inline-flex gap-2">
                    <button
                      onClick={() => handleEditClick(book)}
                      className={`px-3 py-1 rounded-md font-medium transition transform ${
                        editingId === book.id
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-yellow-500 hover:bg-yellow-600 text-white"
                      }`}
                    >
                      {editingId === book.id ? "💾 Lưu" : "✏️ Sửa"}
                    </button>
                    <button
                      onClick={() => onDelete(book.id)}
                      className="px-3 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white transition"
                    >
                      🗑️ Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: card list */}
      <div className="md:hidden grid gap-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="text-lg font-semibold text-gray-800">{book.title}</div>
                <div className="text-sm text-gray-500">{book.author} • {book.publisher}</div>
                <div className="mt-2 text-sm text-gray-600">Thể loại: {book.category}</div>
                <div className="mt-2">
                  <span className="inline-block bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-sm">
                    SL: {book.quantity}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={() => handleEditClick(book)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                    editingId === book.id ? "bg-green-500 text-white" : "bg-yellow-500 text-white"
                  }`}
                >
                  {editingId === book.id ? "💾 Lưu" : "✏️ Sửa"}
                </button>
                <button
                  onClick={() => onDelete(book.id)}
                  className="px-3 py-1 rounded-md bg-red-500 text-white text-sm"
                >
                  🗑️
                </button>
              </div>
            </div>

            {/* Inline edit form for mobile */}
            {editingId === book.id && editForm && (
              <div className="mt-3 grid grid-cols-1 gap-2">
                <input
                  name="title"
                  value={editForm.title}
                  onChange={handleChange}
                  className="w-full px-2 py-1 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
                <input
                  name="author"
                  value={editForm.author}
                  onChange={handleChange}
                  className="w-full px-2 py-1 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListBook;
