const BASE_URL = "http://localhost:5000/api";

export async function api(path, options = {}) {
  const res = await fetch(BASE_URL + path, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

export function apiAuth(path, token) {
  return api(path, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
