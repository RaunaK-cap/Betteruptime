import { AuthShell } from "../components/auth-shell";

export default function LoginPage() {
  return (
    <AuthShell
      mode="login"
      title="Log in to BetterUptime"
      description="Open your uptime dashboard, outage history, and regional stats from one focused login screen."
    />
  );
}
