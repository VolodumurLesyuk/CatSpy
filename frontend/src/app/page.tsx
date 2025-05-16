
"use client";

import { useEffect, useState } from "react";
import { fetchCats, createCat, updateCat, deleteCat } from "@/lib/api";

interface SpyCat {
  id: number;
  name: string;
  years_of_experience: number;
  breed: string;
  salary: number;
}

export default function HomePage() {
  const [cats, setCats] = useState<SpyCat[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", years_of_experience: 0, breed: "", salary: 0 });

  const loadCats = async () => {
    try {
      const data = await fetchCats();
      setCats(data);
      setError(null);
    } catch (err: any) {
      setError("Failed to load cats");
    }
  };

  useEffect(() => {
    loadCats();
  }, []);

  const handleCreate = async () => {
    try {
      await createCat(form);
      setForm({ name: "", years_of_experience: 0, breed: "", salary: 0 });
      await loadCats();
    } catch (err: any) {
      setError(JSON.stringify(err));
    }
  };

  const handleUpdate = async (id: number, salary: number) => {
    try {
      await updateCat(id, salary);
      await loadCats();
    } catch (err: any) {
      setError(JSON.stringify(err));
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCat(id);
      await loadCats();
    } catch (err: any) {
      setError("Delete failed");
    }
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🐱 Spy Cats Management</h1>

      {error && <p className="text-red-600 mb-4">Error: {error}</p>}

      <div className="mb-6 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">Add New Spy Cat</h2>
        <input
          className="border p-2 mr-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2 mr-2"
          type="number"
          placeholder="Years of Experience"
          value={form.years_of_experience}
          onChange={(e) => setForm({ ...form, years_of_experience: Number(e.target.value) })}
        />
        <input
          className="border p-2 mr-2"
          placeholder="Breed"
          value={form.breed}
          onChange={(e) => setForm({ ...form, breed: e.target.value })}
        />
        <input
          className="border p-2 mr-2"
          type="number"
          placeholder="Salary"
          value={form.salary}
          onChange={(e) => setForm({ ...form, salary: Number(e.target.value) })}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleCreate}>
          Add Cat
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">All Spy Cats</h2>
      <ul>
        {cats.map((cat) => (
          <li key={cat.id} className="mb-4 border p-4 rounded">
            <div><strong>{cat.name}</strong> ({cat.breed})</div>
            <div>Experience: {cat.years_of_experience} years</div>
            <div>
              Salary:
              <input
                className="border ml-2 p-1 w-24"
                type="number"
                value={cat.salary}
                onChange={(e) => handleUpdate(cat.id, Number(e.target.value))}
              />
            </div>
            <button
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => handleDelete(cat.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
