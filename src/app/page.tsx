"use client";

import { useState } from "react";

interface FormData {
  companyName: string;
  industry: string;
  employees: number;
  manualHoursPerWeek: number;
  avgHourlyRate: number;
  processes: string[];
  email: string;
}

interface ROIResult {
  annualManualCost: number;
  estimatedSavingsPercent: number;
  annualSavings: number;
  monthlyProductivityGain: number;
  paybackWeeks: number;
  fiveYearValue: number;
}

const PROCESSES = [
  { id: "data-entry", label: "Data Entry & Processing", savingsMultiplier: 0.85 },
  { id: "email-comms", label: "Email & Communications", savingsMultiplier: 0.60 },
  { id: "reporting", label: "Reporting & Analytics", savingsMultiplier: 0.75 },
  { id: "scheduling", label: "Scheduling & Calendar", savingsMultiplier: 0.70 },
  { id: "invoicing", label: "Invoicing & Billing", savingsMultiplier: 0.80 },
  { id: "customer-support", label: "Customer Support", savingsMultiplier: 0.65 },
  { id: "document-mgmt", label: "Document Management", savingsMultiplier: 0.70 },
  { id: "social-media", label: "Social Media Management", savingsMultiplier: 0.55 },
  { id: "crm-updates", label: "CRM Updates", savingsMultiplier: 0.75 },
  { id: "inventory", label: "Inventory Management", savingsMultiplier: 0.65 },
];

const INDUSTRIES = [
  "Professional Services",
  "Healthcare",
  "Real Estate",
  "E-Commerce",
  "Manufacturing",
  "Financial Services",
  "Legal",
  "Marketing Agency",
  "Construction",
  "Other",
];

function calculateROI(data: FormData): ROIResult {
  const selectedProcesses = PROCESSES.filter((p) => data.processes.includes(p.id));
  const avgSavingsMultiplier =
    selectedProcesses.length > 0
      ? selectedProcesses.reduce((sum, p) => sum + p.savingsMultiplier, 0) / selectedProcesses.length
      : 0.65;

  const annualManualCost = data.manualHoursPerWeek * data.avgHourlyRate * 52;
  const estimatedSavingsPercent = Math.round(avgSavingsMultiplier * 100);
  const annualSavings = Math.round(annualManualCost * avgSavingsMultiplier);
  const monthlyProductivityGain = Math.round((data.manualHoursPerWeek * avgSavingsMultiplier * 4.33));
  const implementationCost = Math.max(2000, annualSavings * 0.15);
  const paybackWeeks = Math.round((implementationCost / (annualSavings / 52)));
  const fiveYearValue = annualSavings * 5 - implementationCost;

  return {
    annualManualCost,
    estimatedSavingsPercent,
    annualSavings,
    monthlyProductivityGain,
    paybackWeeks,
    fiveYearValue,
  };
}

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export default function Home() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    companyName: "",
    industry: "",
    employees: 10,
    manualHoursPerWeek: 20,
    avgHourlyRate: 35,
    processes: [],
    email: "",
  });
  const [result, setResult] = useState<ROIResult | null>(null);

  const toggleProcess = (id: string) => {
    setForm((f) => ({
      ...f,
      processes: f.processes.includes(id) ? f.processes.filter((p) => p !== id) : [...f.processes, id],
    }));
  };

  const handleCalculate = () => {
    const r = calculateROI(form);
    setResult(r);
    setStep(3);
  };

  const handleSubmitLead = async () => {
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, result }),
      });
    } catch {
      // fire and forget
    }
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <header className="border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center font-bold text-sm">A</div>
            <span className="font-semibold text-lg">AutomateROI</span>
          </div>
          <a href="mailto:yhanic@waypoint.vc" className="text-sm text-gray-400 hover:text-white transition">Contact</a>
        </div>
      </header>

      {step === 1 && (
        <section className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            How much is manual work costing your business?
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Get a free, instant estimate of how much time and money AI automation could save your team. Takes 60 seconds.
          </p>
          <button
            onClick={() => setStep(2)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl text-lg font-semibold hover:opacity-90 transition shadow-lg shadow-blue-500/25"
          >
            Calculate My ROI →
          </button>
          <div className="mt-16 grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400">73%</div>
              <div className="text-sm text-gray-500 mt-1">Avg. time saved on repetitive tasks</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-400">6 weeks</div>
              <div className="text-sm text-gray-500 mt-1">Average payback period</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">$127K</div>
              <div className="text-sm text-gray-500 mt-1">Avg. annual savings (SMBs)</div>
            </div>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="max-w-2xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-8">Tell us about your business</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Company Name</label>
              <input
                type="text"
                value={form.companyName}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                placeholder="Acme Inc."
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Industry</label>
              <select
                value={form.industry}
                onChange={(e) => setForm({ ...form, industry: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select industry...</option>
                {INDUSTRIES.map((i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Number of Employees: <span className="text-white font-semibold">{form.employees}</span>
              </label>
              <input
                type="range"
                min={1}
                max={500}
                value={form.employees}
                onChange={(e) => setForm({ ...form, employees: Number(e.target.value) })}
                className="w-full accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-600">
                <span>1</span><span>500+</span>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Hours spent on manual/repetitive tasks per week (team total): <span className="text-white font-semibold">{form.manualHoursPerWeek}h</span>
              </label>
              <input
                type="range"
                min={5}
                max={200}
                step={5}
                value={form.manualHoursPerWeek}
                onChange={(e) => setForm({ ...form, manualHoursPerWeek: Number(e.target.value) })}
                className="w-full accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-600">
                <span>5h</span><span>200h+</span>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Average hourly rate of employees doing these tasks: <span className="text-white font-semibold">${form.avgHourlyRate}/hr</span>
              </label>
              <input
                type="range"
                min={15}
                max={150}
                step={5}
                value={form.avgHourlyRate}
                onChange={(e) => setForm({ ...form, avgHourlyRate: Number(e.target.value) })}
                className="w-full accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-600">
                <span>$15/hr</span><span>$150/hr</span>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-3">Which processes are most manual? (select all that apply)</label>
              <div className="grid grid-cols-2 gap-2">
                {PROCESSES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => toggleProcess(p.id)}
                    className={`px-3 py-2 rounded-lg text-sm text-left transition ${
                      form.processes.includes(p.id)
                        ? "bg-blue-600/30 border border-blue-500 text-blue-300"
                        : "bg-gray-900 border border-gray-700 text-gray-400 hover:border-gray-500"
                    }`}
                  >
                    {form.processes.includes(p.id) ? "✓ " : ""}{p.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleCalculate}
              disabled={form.processes.length === 0}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl text-lg font-semibold hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Calculate My Savings →
            </button>
          </div>
        </section>
      )}

      {step === 3 && result && (
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-2">Your Automation ROI Estimate</h2>
          {form.companyName && <p className="text-gray-400 mb-8">for {form.companyName}</p>}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div className="text-sm text-gray-500 mb-1">Current Annual Cost</div>
              <div className="text-2xl font-bold text-red-400">{formatCurrency(result.annualManualCost)}</div>
              <div className="text-xs text-gray-600 mt-1">spent on manual tasks</div>
            </div>
            <div className="bg-gray-900 border border-blue-800/50 rounded-xl p-5">
              <div className="text-sm text-gray-500 mb-1">Estimated Annual Savings</div>
              <div className="text-2xl font-bold text-green-400">{formatCurrency(result.annualSavings)}</div>
              <div className="text-xs text-gray-600 mt-1">{result.estimatedSavingsPercent}% automation rate</div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div className="text-sm text-gray-500 mb-1">Monthly Hours Freed</div>
              <div className="text-2xl font-bold text-cyan-400">{result.monthlyProductivityGain}h</div>
              <div className="text-xs text-gray-600 mt-1">redirected to high-value work</div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div className="text-sm text-gray-500 mb-1">Payback Period</div>
              <div className="text-2xl font-bold text-yellow-400">{result.paybackWeeks} weeks</div>
              <div className="text-xs text-gray-600 mt-1">until automation pays for itself</div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 col-span-2">
              <div className="text-sm text-gray-500 mb-1">5-Year Value</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {formatCurrency(result.fiveYearValue)}
              </div>
              <div className="text-xs text-gray-600 mt-1">net savings over 5 years</div>
            </div>
          </div>

          {/* Lead capture */}
          {!submitted ? (
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8">
              <h3 className="text-lg font-semibold mb-2">Want a detailed automation roadmap?</h3>
              <p className="text-gray-400 text-sm mb-4">
                Get a free, personalized automation plan showing exactly which processes to automate first for maximum ROI.
              </p>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="flex-1 bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleSubmitLead}
                  disabled={!form.email.includes("@")}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-40"
                >
                  Get My Roadmap
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-green-900/20 border border-green-700 rounded-xl p-8 text-center">
              <div className="text-2xl mb-2">✅</div>
              <h3 className="text-lg font-semibold mb-1">We&apos;ll be in touch!</h3>
              <p className="text-gray-400 text-sm">
                Expect a personalized automation roadmap within 24 hours.
              </p>
            </div>
          )}

          <button
            onClick={() => { setStep(2); setResult(null); }}
            className="mt-6 text-sm text-gray-500 hover:text-gray-300 transition"
          >
            ← Recalculate
          </button>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20">
        <div className="max-w-5xl mx-auto px-6 py-8 text-center text-sm text-gray-600">
          © 2026 AutomateROI. Built by{" "}
          <a href="https://waypoint.vc" className="text-gray-400 hover:text-white transition">Waypoint Ventures</a>.
        </div>
      </footer>
    </main>
  );
}
