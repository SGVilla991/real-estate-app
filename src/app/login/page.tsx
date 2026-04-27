import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Welcome back</h1>
          <p className="text-muted mt-2">Sign in to your EstatePrime account</p>
        </div>
        <div className="bg-white border border-border rounded-2xl p-8 shadow-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
