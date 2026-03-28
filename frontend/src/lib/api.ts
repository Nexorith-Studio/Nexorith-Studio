const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export function apiUrl(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export async function submitLead(body: {
  name: string;
  email: string;
  projectType: string;
  budgetRange: string;
  message: string;
}) {
  const res = await fetch(apiUrl("/api/leads"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as { error?: string }).error || "Request failed");
  }
  return data as { id: string; message: string };
}

export async function adminLogin(email: string, password: string) {
  const res = await fetch(apiUrl("/api/auth/login"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as { error?: string }).error || "Login failed");
  }
  return data;
}

export async function adminMe() {
  const res = await fetch(apiUrl("/api/auth/me"), { credentials: "include" });
  return res.json() as Promise<{ authenticated: boolean; email?: string }>;
}

export async function adminLogout() {
  await fetch(apiUrl("/api/auth/logout"), {
    method: "POST",
    credentials: "include",
  });
}

export type LeadRow = {
  _id: string;
  name: string;
  email: string;
  projectType: string;
  budgetRange: string;
  message: string;
  contacted: boolean;
  createdAt: string;
};

export async function fetchLeads(sort: "newest" | "oldest") {
  const q = sort === "oldest" ? "?sort=oldest" : "";
  const res = await fetch(apiUrl(`/api/admin/leads${q}`), {
    credentials: "include",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as { error?: string }).error || "Failed to load");
  }
  return data as LeadRow[];
}

export async function patchLeadContacted(id: string, contacted: boolean) {
  const res = await fetch(apiUrl(`/api/admin/leads/${id}`), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ contacted }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error((data as { error?: string }).error || "Update failed");
  }
}

export async function deleteLead(id: string) {
  const res = await fetch(apiUrl(`/api/admin/leads/${id}`), {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error((data as { error?: string }).error || "Delete failed");
  }
}
