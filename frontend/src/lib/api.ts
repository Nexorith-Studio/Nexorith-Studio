const base = process.env.NEXT_PUBLIC_API_URL || "";

export function apiUrl(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export async function submitLead(body: {
  name: string;
  email: string;
  phone?: string;
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
  return data as { id: string; trackingId: string; message: string };
}

export async function fetchLeadStatus(trackingId: string) {
  const res = await fetch(apiUrl(`/api/leads/status/${trackingId}`));
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as { error?: string }).error || "Failed to load status");
  }
  return data as {
    name: string;
    projectType: string;
    projectStatus: string;
    projectUpdate: string;
    createdAt: string;
    updatedAt: string;
  };
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

export async function resetAdminPassword(currentPassword: string, newPassword: string) {
  const res = await fetch(apiUrl("/api/admin/password"), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as { error?: string }).error || "Password reset failed");
  }
}

export async function adminMe() {
  try {
    const res = await fetch(apiUrl("/api/auth/me"), { credentials: "include" });
    if (!res.ok) return { authenticated: false };
    return res.json() as Promise<{ authenticated: boolean; email?: string }>;
  } catch {
    return { authenticated: false };
  }
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
  phone?: string;
  projectType: string;
  budgetRange: string;
  message: string;
  contacted: boolean;
  trackingId: string;
  projectStatus: string;
  projectUpdate: string;
  createdAt: string;
  updatedAt: string;
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

export async function patchLeadStatus(
  id: string,
  projectStatus: string,
  projectUpdate: string
) {
  const res = await fetch(apiUrl(`/api/admin/leads/${id}/status`), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ projectStatus, projectUpdate }),
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

export type ProjectRow = {
  _id: string;
  title: string;
  ai_summary: string;
  isFeatured: boolean;
};

export async function fetchProjects() {
  const res = await fetch(apiUrl("/api/admin/projects"), { credentials: "include" });
  if (!res.ok) throw new Error("Failed to load projects");
  return res.json() as Promise<ProjectRow[]>;
}

export async function createProject(data: { title: string; ai_summary: string; isFeatured: boolean }) {
  const res = await fetch(apiUrl("/api/admin/projects"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create project");
  return res.json();
}

export type ServiceRow = {
  _id: string;
  name: string;
  ai_summary: string;
  isActive: boolean;
};

export async function fetchServices() {
  const res = await fetch(apiUrl("/api/admin/services"), { credentials: "include" });
  if (!res.ok) throw new Error("Failed to load services");
  return res.json() as Promise<ServiceRow[]>;
}

export async function createService(data: { name: string; ai_summary: string; isActive: boolean }) {
  const res = await fetch(apiUrl("/api/admin/services"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create service");
  return res.json();
}
