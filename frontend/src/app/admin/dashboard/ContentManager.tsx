import React, { useState } from "react";
import { createProject, createService } from "@/lib/api";

export default function ContentManager() {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectSummary, setProjectSummary] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [projectLoading, setProjectLoading] = useState(false);
  const [projectMsg, setProjectMsg] = useState("");

  const [serviceName, setServiceName] = useState("");
  const [serviceSummary, setServiceSummary] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [serviceLoading, setServiceLoading] = useState(false);
  const [serviceMsg, setServiceMsg] = useState("");

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setProjectLoading(true);
    setProjectMsg("");
    try {
      await createProject({ title: projectTitle, ai_summary: projectSummary, isFeatured });
      setProjectMsg("Project added successfully!");
      setProjectTitle("");
      setProjectSummary("");
      setIsFeatured(false);
    } catch (err: any) {
      setProjectMsg(err.message || "Failed to add project.");
    } finally {
      setProjectLoading(false);
    }
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    setServiceLoading(true);
    setServiceMsg("");
    try {
      await createService({ name: serviceName, ai_summary: serviceSummary, isActive });
      setServiceMsg("Service added successfully!");
      setServiceName("");
      setServiceSummary("");
      setIsActive(true);
    } catch (err: any) {
      setServiceMsg(err.message || "Failed to add service.");
    } finally {
      setServiceLoading(false);
    }
  };

  return (
    <div className="mt-16 space-y-8">
      <h2 className="font-display text-xl font-semibold text-white">
        Content Management (Chatbot AI Context)
      </h2>
      <div className="grid gap-8 md:grid-cols-2">
        {/* ADD PROJECT FORM */}
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-8">
          <h3 className="mb-4 text-lg font-medium text-white">Add New Project</h3>
          <form onSubmit={handleAddProject} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs uppercase tracking-wider text-white/50">Project Title</label>
              <input required type="text" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white outline-none focus:border-cyan-400/50" />
            </div>
            <div>
              <label className="mb-1 block text-xs uppercase tracking-wider text-white/50">AI Bot Summary (Max 2 sentences)</label>
              <textarea required value={projectSummary} onChange={(e) => setProjectSummary(e.target.value)} rows={3} placeholder="Provide a concise summary for the AI Chatbot to reference..." className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white outline-none focus:border-cyan-400/50" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="isFeatured" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-cyan-400" />
              <label htmlFor="isFeatured" className="text-sm text-white/70">Featured Project (Visible to AI)</label>
            </div>
            <button type="submit" disabled={projectLoading} className="w-full rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/30 disabled:opacity-50">
              {projectLoading ? "Adding..." : "Add Project"}
            </button>
            {projectMsg && <p className="text-xs text-white/50">{projectMsg}</p>}
          </form>
        </div>

        {/* ADD SERVICE FORM */}
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-8">
          <h3 className="mb-4 text-lg font-medium text-white">Add New Service</h3>
          <form onSubmit={handleAddService} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs uppercase tracking-wider text-white/50">Service Name</label>
              <input required type="text" value={serviceName} onChange={(e) => setServiceName(e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white outline-none focus:border-cyan-400/50" />
            </div>
            <div>
              <label className="mb-1 block text-xs uppercase tracking-wider text-white/50">AI Bot Summary (Max 2 sentences)</label>
              <textarea required value={serviceSummary} onChange={(e) => setServiceSummary(e.target.value)} rows={3} placeholder="Provide a concise summary for the AI Chatbot to reference..." className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white outline-none focus:border-cyan-400/50" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="isActive" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-cyan-400" />
              <label htmlFor="isActive" className="text-sm text-white/70">Active Service (Visible to AI)</label>
            </div>
            <button type="submit" disabled={serviceLoading} className="w-full rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/30 disabled:opacity-50">
              {serviceLoading ? "Adding..." : "Add Service"}
            </button>
            {serviceMsg && <p className="text-xs text-white/50">{serviceMsg}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
