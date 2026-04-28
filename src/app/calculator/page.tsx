import MortgageCalculator from "@/components/MortgageCalculator";

export default function CalculatorPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <span className="text-accent font-semibold text-xs uppercase tracking-widest">Free Tool</span>
        <h1 className="text-3xl font-bold text-foreground mt-2 mb-3">Mortgage Calculator</h1>
        <p className="text-muted max-w-xl mx-auto">
          Estimate your monthly mortgage payment. Adjust the values below to explore different scenarios.
        </p>
      </div>
      <MortgageCalculator />
    </div>
  );
}
