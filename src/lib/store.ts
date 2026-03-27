// Mock data store with localStorage persistence

export interface RegisteredUser {
  id: string;
  name: string;
  studentId: string;
  registeredAt: string;
  imageCount: number;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  name: string;
  studentId: string;
  date: string;
  time: string;
  confidence: number;
  status: "recognized" | "unknown";
}

const USERS_KEY = "facerecog_users";
const ATTENDANCE_KEY = "facerecog_attendance";

// Sample data
const sampleUsers: RegisteredUser[] = [
  { id: "u1", name: "Aarav Sharma", studentId: "STU001", registeredAt: "2025-03-20T10:00:00Z", imageCount: 20 },
  { id: "u2", name: "Priya Patel", studentId: "STU002", registeredAt: "2025-03-20T10:15:00Z", imageCount: 20 },
  { id: "u3", name: "Rohan Gupta", studentId: "STU003", registeredAt: "2025-03-21T09:00:00Z", imageCount: 20 },
  { id: "u4", name: "Ananya Singh", studentId: "STU004", registeredAt: "2025-03-21T09:30:00Z", imageCount: 20 },
  { id: "u5", name: "Vikram Reddy", studentId: "STU005", registeredAt: "2025-03-22T11:00:00Z", imageCount: 20 },
  { id: "u6", name: "Sneha Joshi", studentId: "STU006", registeredAt: "2025-03-22T11:20:00Z", imageCount: 20 },
  { id: "u7", name: "Karthik Nair", studentId: "STU007", registeredAt: "2025-03-23T08:45:00Z", imageCount: 20 },
  { id: "u8", name: "Divya Menon", studentId: "STU008", registeredAt: "2025-03-23T09:00:00Z", imageCount: 20 },
];

function generateSampleAttendance(): AttendanceRecord[] {
  const records: AttendanceRecord[] = [];
  const dates = ["2025-03-24", "2025-03-25", "2025-03-26", "2025-03-27"];
  const times = ["08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00"];

  let id = 1;
  for (const date of dates) {
    const usersForDay = sampleUsers.slice(0, Math.floor(Math.random() * 3) + 5);
    for (const user of usersForDay) {
      records.push({
        id: `a${id++}`,
        userId: user.id,
        name: user.name,
        studentId: user.studentId,
        date,
        time: times[Math.floor(Math.random() * times.length)],
        confidence: Math.round((85 + Math.random() * 14) * 10) / 10,
        status: "recognized",
      });
    }
  }
  return records;
}

function initStore() {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(sampleUsers));
  }
  if (!localStorage.getItem(ATTENDANCE_KEY)) {
    localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(generateSampleAttendance()));
  }
}

initStore();

export function getUsers(): RegisteredUser[] {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

export function addUser(user: RegisteredUser) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getAttendance(): AttendanceRecord[] {
  return JSON.parse(localStorage.getItem(ATTENDANCE_KEY) || "[]");
}

export function addAttendance(record: AttendanceRecord) {
  const records = getAttendance();
  records.push(record);
  localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(records));
}

export function isAlreadyMarkedToday(userId: string): boolean {
  const today = new Date().toISOString().split("T")[0];
  return getAttendance().some((r) => r.userId === userId && r.date === today);
}

export function getRandomUser(): RegisteredUser | null {
  const users = getUsers();
  if (users.length === 0) return null;
  return users[Math.floor(Math.random() * users.length)];
}
