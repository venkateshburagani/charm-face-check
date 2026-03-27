import { useMemo } from "react";
import StatsCard from "@/components/StatsCard";
import AttendanceTable from "@/components/AttendanceTable";
import { getUsers, getAttendance } from "@/lib/store";

export default function Dashboard() {
  const stats = useMemo(() => {
    const users = getUsers();
    const records = getAttendance();
    const today = new Date().toISOString().split("T")[0];
    const todayRecords = records.filter((r) => r.date === today);
    const avgConf = records.length ? Math.round((records.reduce((s, r) => s + r.confidence, 0) / records.length) * 10) / 10 : 0;

    return {
      totalUsers: users.length,
      todayCount: todayRecords.length,
      avgConfidence: avgConf,
      totalRecords: records.length,
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="animate-fade-in text-center">
        <h1 className="font-display text-3xl font-bold">
          <i className="fa-solid fa-chart-line mr-2 text-primary" />
          Attendance Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Monitor and manage attendance records</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatsCard icon="fa-users" label="Registered Users" value={stats.totalUsers} color="text-primary" delay={0} />
        <StatsCard icon="fa-calendar-check" label="Today's Attendance" value={stats.todayCount} color="text-success" delay={100} />
        <StatsCard icon="fa-bullseye" label="Avg Confidence" value={`${stats.avgConfidence}%`} color="text-warning" delay={200} />
        <StatsCard icon="fa-database" label="Total Records" value={stats.totalRecords} color="text-secondary" delay={300} />
      </div>

      {/* Table */}
      <AttendanceTable />
    </div>
  );
}
