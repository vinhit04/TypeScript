import { useState } from "react";

interface EditBookProps {
  book: { id: number; title: string };
  onSave: (id: number, newTitle: string) => void;
  mode?: "edit" | "update";
}

const EditBook: React.FC<EditBookProps> = ({ book, onSave, mode = "edit" }) => {
  const [value, setValue] = useState(book.title);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSave(book.id, value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border px-2 py-1 rounded flex-1"
      />
      <button
        type="submit"
        className={`${
          mode === "edit"
            ? "bg-blue-500"
            : "bg-yellow-500"
        } text-white px-3 py-1 rounded`}
      >
        {mode === "edit" ? "Lưu" : "Cập nhật"}
      </button>
    </form>
  );
};

export default EditBook;
