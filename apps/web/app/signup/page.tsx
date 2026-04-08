import { AuthShell } from "../components/auth-shell";

export default function SignupPage() {
  return (
    <AuthShell
      mode="signup"
      title="Create your Better Uptime account"
      description="Set up your team workspace and start with a calmer monitoring and incident workflow."
    />
  );
}
