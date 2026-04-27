import NewListingForm from "./NewListingForm";

export default function NewListingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">List a Property</h1>
        <p className="text-muted mt-2">Fill in the details below to publish your listing.</p>
      </div>
      <div className="bg-white border border-border rounded-2xl p-8 shadow-sm">
        <NewListingForm />
      </div>
    </div>
  );
}
