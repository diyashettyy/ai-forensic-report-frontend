export type JobStatus = "pending" | "processing" | "completed" | "failed";

export interface TranscriptEntry {
    id: string;
    timestamp: string;
    speaker: string;
    text: string;
}

export interface ReportMetadata {
    fileName: string;
    duration?: string | null;
    processingDate: string; // ISO string
    aiConfidence?: string | null;
}

export interface Report {
    id: string;
    status: JobStatus;
    transcript: TranscriptEntry[];
    executiveSummary: string;
    keyFindings: string[];
    recommendations: string[];
    metadata: ReportMetadata;
}

export interface UploadResponse {
    id: string;
    message: string;
    filename: string;
    size: number;
    type: string;
}

export interface StatusResponse {
    id: string;
    status: JobStatus;
    progress: number;
    error?: string | null;
}

export interface ChatRequest {
    job_id: string;
    question: string;
}

export interface ChatResponse {
    job_id: string;
    answer: string;
}
