import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Create account</h1>
          <p className="text-muted mt-2">Join EstatePrime and start exploring properties</p>
        </div>
        <div className="bg-white border border-border rounded-2xl p-8 shadow-sm">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
