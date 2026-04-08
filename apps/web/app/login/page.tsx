import { AuthShell } from "../components/auth-shell";

export default function LoginPage() {
  return (
    <AuthShell
      mode="login"
      title="Log in to Better Uptime"
      description="Access your monitors, on-call schedules, and status workflows from one place."
    />
  );
}
