import type { ChatResponse, Report, StatusResponse, UploadResponse } from "@/types/api";

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "") || "http://localhost:8000";

async function handleJson<T>(res: Response): Promise<T> {
    const isJson = res.headers.get("content-type")?.includes("application/json");
    const data = isJson ? await res.json() : null;

    if (!res.ok) {
        const detail = (data && (data.detail || data.error)) || res.statusText;
        const err: any = new Error(detail);
        err.status = res.status;
        err.data = data;
        throw err;
    }
    return data as T;
}

export async function uploadAudio(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
    });
    return handleJson<UploadResponse>(res);
}

export async function getStatus(id: string): Promise<StatusResponse> {
    const res = await fetch(`${API_BASE_URL}/status/${encodeURIComponent(id)}`, {
        method: "GET",
    });
    return handleJson<StatusResponse>(res);
}

export async function getReport(id: string): Promise<Report> {
    const res = await fetch(`${API_BASE_URL}/reports/${encodeURIComponent(id)}`, {
        method: "GET",
    });

    if (res.status === 202) {
        const err: any = new Error("Report is not ready yet");
        err.status = 202;
        throw err;
    }
    return handleJson<Report>(res);
}

export async function askChat(jobId: string, question: string): Promise<ChatResponse> {
    const res = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_id: jobId, question }),
    });
    return handleJson<ChatResponse>(res);
}
