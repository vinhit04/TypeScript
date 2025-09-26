import { useState } from "react";
import type { Book } from "./types";

interface AddBookProps {
  onAdd: (book: Book) => void;
}

const AddBook: React.FC<AddBookProps> = ({ onAdd }) => {
  const [form, setForm] = useState<Omit<Book, "id">>({
    title: "",
    author: "",
    year: new Date().getFullYear(),
    publisher: "",
    category: "",
    quantity: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name === "year" || name === "quantity" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onAdd({ id: Date.now(), ...form });
    setForm({
      title: "",
      author: "",
      year: new Date().getFullYear(),
      publisher: "",
      category: "",
      quantity: 1,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
    >
      <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Tên sách"
          className="w-full rounded-lg border border-gray-200 px-3 py-2 placeholder:italic focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
        />
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Tác giả"
          className="w-full rounded-lg border border-gray-200 px-3 py-2 placeholder:italic focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
        />
        <input
          name="publisher"
          value={form.publisher}
          onChange={handleChange}
          placeholder="Nhà xuất bản"
          className="w-full rounded-lg border border-gray-200 px-3 py-2 placeholder:italic focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Thể loại"
          className="w-full rounded-lg border border-gray-200 px-3 py-2 placeholder:italic focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
        />
      </div>

      <div className="flex flex-col gap-3">
        <input
          name="year"
          type="number"
          value={form.year}
          onChange={handleChange}
          placeholder="Năm xuất bản"
          className="rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
        />
        <input
          name="quantity"
          type="number"
          min={1}
          value={form.quantity}
          onChange={handleChange}
          placeholder="Số lượng"
          className="rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
        />

        <button
          type="submit"
          className="mt-1 bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-medium py-2 rounded-lg shadow-md hover:scale-[1.01] active:scale-[0.99] transition transform"
        >
          ➕ Thêm sách
        </button>
      </div>
    </form>
  );
};

export default AddBook;
