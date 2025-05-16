const API_BASE_URL = "http://127.0.0.1:8000/api/spycats/";

export async function fetchCats() {
  const res = await fetch(API_BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch spy cats");
  return res.json();
}

export async function createCat(data: any) {
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function updateCat(id: number, salary: number) {
  const res = await fetch(`${API_BASE_URL}${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ salary }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function deleteCat(id: number) {
  const res = await fetch(`${API_BASE_URL}${id}/`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete cat");
}
