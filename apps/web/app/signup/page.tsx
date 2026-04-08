import { AuthShell } from "../components/auth-shell";

export default function SignupPage() {
  return (
    <AuthShell
      mode="signup"
      title="Create your BetterUptime workspace"
      description="Set up region-aware website monitoring with simple username access and a cleaner first-run flow."
    />
  );
}
