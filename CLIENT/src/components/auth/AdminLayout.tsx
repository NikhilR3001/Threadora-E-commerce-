import { Outlet } from "react-router-dom";

export function AdminLayout() {
  return (
    <main className="flex-1">
      <Outlet />
    </main>
  );
}
