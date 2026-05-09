export type UserRole = "admin" | "user";

export type AppUser = {
  id: string;
  clerkUserId: string;
  email?: string;
  name?: string;
  role: UserRole;
};

export type AppErrorItem = {
  message: string;
  code?: string;
};

export type ApiEnvelope<T> = {
  status: "success" | "error";
  data: T | null;
  meta?: Record<string, undefined>;
  error?: AppErrorItem[];
};
