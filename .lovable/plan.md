

## AI Face Recognition Attendance System — Web Demo UI

A visually impressive, multi-page React demo of an AI-powered face recognition attendance system. Uses simulated face detection with webcam preview, mock data, and polished glassmorphism UI. Perfect for college demos.

### Design System
- Dark gradient background (deep blue/purple gradients)
- Glassmorphism cards with backdrop blur, subtle borders
- Accent colors: cyan/teal for success, orange for warnings, red for errors
- Smooth fade/scale/slide animations throughout
- Font Awesome icons via CDN
- Dark/Light mode toggle

### Pages

**1. Landing Page (`/`)**
- Hero section with animated gradient background
- Project title "AI Face Recognition Attendance System" with typing animation
- Feature cards (3-4) with icons: Real-time Detection, High Accuracy, Smart Dashboard, Easy Registration
- Animated CTA buttons → Register, Mark Attendance, Dashboard
- Subtle floating particle/dot animation in background

**2. Register User (`/register`)**
- Glassmorphism form card: Name, Employee/Student ID inputs
- Live webcam preview using browser `getUserMedia`
- "Capture" button that simulates capturing face samples with progress bar (e.g., "Capturing 8/20 images...")
- Simulated face detection box overlay on webcam feed (CSS animated box)
- Success animation (checkmark) on completion
- Stores registered users in React state/localStorage

**3. Mark Attendance (`/attendance`)**
- Live webcam feed with animated scanning overlay
- Simulated face detection: after 2-3 seconds, "recognizes" a registered user
- Display card showing: Name, ID, Confidence % (e.g., 94.2%), Status badge (Recognized ✅ / Unknown ❌)
- "Already Marked Today" warning for duplicate attempts
- Toast notifications for success/errors
- "Unknown Person" state with option to navigate to register

**4. Dashboard (`/dashboard`)**
- Stats cards at top: Total Users, Today's Attendance, Average Confidence, Recognition Rate
- Data table with columns: Name, ID, Date, Time, Confidence %
- Search bar, date filter, name filter
- Export to CSV button
- Pagination
- Mock data (20-30 realistic records)

### Navigation
- Sleek top navbar with glassmorphism effect
- Active page indicator
- Dark/Light mode toggle button

### Mock Data & Simulation
- Pre-loaded sample users and attendance records
- Webcam feed is real (browser API), face detection is simulated with animated overlays
- localStorage persistence for registered users and attendance records
- Confidence scores randomly generated in realistic range (85-99%)

### Components to Build
- `Layout` with navbar and theme toggle
- `WebcamFeed` component using `react-webcam`
- `FaceDetectionOverlay` with animated scanning box
- `AttendanceTable` with filters, search, pagination
- `StatsCards` for dashboard metrics
- `ProgressCapture` for registration flow
- Toast notifications for all actions

