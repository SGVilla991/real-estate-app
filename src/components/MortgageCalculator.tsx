"use client";

import { useState, useMemo } from "react";

function calcMonthly(principal: number, annualRate: number, years: number): number {
  if (annualRate === 0) return principal / (years * 12);
  const r = annualRate / 100 / 12;
  const n = years * 12;
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(850000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(30);

  const results = useMemo(() => {
    const down = (homePrice * downPct) / 100;
    const principal = homePrice - down;
    const monthly = calcMonthly(principal, rate, term);
    const total = monthly * term * 12;
    const totalInterest = total - principal;
    return { down, principal, monthly, total, totalInterest };
  }, [homePrice, downPct, rate, term]);

  const ic = "w-full px-4 py-3 rounded-xl border border-border outline-none focus:border-primary transition-colors bg-surface text-foreground text-sm font-semibold";
  const lc = "text-xs font-semibold text-muted uppercase tracking-wider mb-1.5 block";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="bg-surface border border-border rounded-2xl p-8 space-y-6">
        <h2 className="font-bold text-foreground text-lg">Loan Details</h2>

        <div>
          <label className={lc}>Home Price</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-sm font-bold">$</span>
            <input
              type="number"
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
              className={`${ic} pl-8`}
              min={10000}
              step={10000}
            />
          </div>
          <input type="range" min={50000} max={5000000} step={10000} value={homePrice}
            onChange={(e) => setHomePrice(Number(e.target.value))}
            className="w-full mt-2 accent-primary" />
          <div className="flex justify-between text-xs text-muted mt-0.5">
            <span>$50K</span><span>$5M</span>
          </div>
        </div>

        <div>
          <label className={lc}>Down Payment — {downPct}% ({fmt(homePrice * downPct / 100)})</label>
          <input
            type="number" value={downPct}
            onChange={(e) => setDownPct(Math.min(100, Math.max(0, Number(e.target.value))))}
            className={ic} min={0} max={100} step={1}
          />
          <input type="range" min={0} max={50} step={1} value={downPct}
            onChange={(e) => setDownPct(Number(e.target.value))}
            className="w-full mt-2 accent-primary" />
          <div className="flex justify-between text-xs text-muted mt-0.5">
            <span>0%</span><span>50%</span>
          </div>
        </div>

        <div>
          <label className={lc}>Annual Interest Rate — {rate}%</label>
          <input
            type="number" value={rate}
            onChange={(e) => setRate(Math.max(0, Number(e.target.value)))}
            className={ic} min={0} max={30} step={0.1}
          />
          <input type="range" min={1} max={15} step={0.1} value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full mt-2 accent-primary" />
          <div className="flex justify-between text-xs text-muted mt-0.5">
            <span>1%</span><span>15%</span>
          </div>
        </div>

        <div>
          <label className={lc}>Loan Term</label>
          <div className="grid grid-cols-3 gap-2">
            {[10, 15, 20, 25, 30].map((y) => (
              <button
                key={y}
                onClick={() => setTerm(y)}
                className={`py-3 rounded-xl border text-sm font-bold transition-colors ${
                  term === y ? "bg-primary text-white border-primary" : "border-border text-muted hover:border-primary hover:text-primary"
                }`}
              >
                {y} yr
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {/* Monthly payment hero */}
        <div className="bg-primary rounded-2xl p-8 text-center text-white">
          <p className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-2">Monthly Payment</p>
          <p className="text-5xl font-bold text-accent">{fmt(results.monthly)}</p>
          <p className="text-white/60 text-sm mt-2">per month for {term} years</p>
        </div>

        {/* Breakdown */}
        <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-foreground">Loan Summary</h3>
          {[
            { label: "Home Price", value: fmt(homePrice) },
            { label: "Down Payment", value: `${fmt(results.down)} (${downPct}%)` },
            { label: "Loan Amount", value: fmt(results.principal), accent: true },
            { label: "Total of Payments", value: fmt(results.total) },
            { label: "Total Interest Paid", value: fmt(results.totalInterest), red: true },
          ].map((r) => (
            <div key={r.label} className="flex items-center justify-between text-sm">
              <span className="text-muted">{r.label}</span>
              <span className={`font-bold ${r.accent ? "text-primary" : r.red ? "text-red" : "text-foreground"}`}>
                {r.value}
              </span>
            </div>
          ))}
        </div>

        {/* Pie visual (simple bar) */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h3 className="font-bold text-foreground mb-4">Payment Breakdown</h3>
          <div className="flex rounded-full overflow-hidden h-6 mb-3">
            <div
              className="bg-primary transition-all duration-300"
              style={{ width: `${Math.round((results.principal / results.total) * 100)}%` }}
            />
            <div className="bg-accent flex-1" />
          </div>
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary inline-block" />
              <span className="text-muted">Principal {Math.round((results.principal / results.total) * 100)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-accent inline-block" />
              <span className="text-muted">Interest {Math.round((results.totalInterest / results.total) * 100)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
