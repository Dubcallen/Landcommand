"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type FormState = {
  name: string;
  email: string;
  phone: string;
  state: string;
  county: string;
  acreage: string;
  price: string;
  timeline: "immediately" | "30-60" | "60-90" | "unsure";
  mediaUrl?: string;
  notes?: string;
  agree: boolean;
};

const GOLD = "#CBB26A";

export default function SellIntakePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    state: "",
    county: "",
    acreage: "",
    price: "",
    timeline: "immediately",
    mediaUrl: "",
    notes: "",
    agree: false,
  });

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value =
        e.currentTarget.type === "checkbox"
          ? (e.currentTarget as HTMLInputElement).checked
          : e.currentTarget.value;
      setForm((f) => ({ ...f, [key]: value }));
    };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    if (!form.agree) {
      setErr("Please accept the terms to continue.");
      return;
    }

    setSubmitting(true);
    try {
      const leadId = crypto.randomUUID();
      const res = await fetch("/api/sell", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, leadId }),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Request failed");
      }

      // redirect to Packages page with leadId for continuity
      router.push(`/packages?lead=${encodeURIComponent(leadId)}`);
    } catch (e: any) {
      setErr(e?.message ?? "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#1B1B1B] text-[#EFECE0]">
      <section className="mx-auto w-full max-w-[980px] px-6 py-16">
        <h1 className="font-serif text-4xl md:text-5xl">List Your Land</h1>
        <p className="mt-3 max-w-2xl text-white/75">
          Tell us about your property. We’ll review and get right back to you.
          After submitting, you’ll be taken to our packages page to choose the
          level of marketing that fits your goals.
        </p>

        <div className="mt-10 rounded-2xl border border-white/10 bg-black/40 p-6 md:p-8">
          <form onSubmit={onSubmit} className="grid gap-6 md:grid-cols-2">
            {/* Contact */}
            <Field label="Your Name" required>
              <input
                type="text"
                className="input"
                value={form.name}
                onChange={onChange("name")}
                required
              />
            </Field>
            <Field label="Email" required>
              <input
                type="email"
                className="input"
                value={form.email}
                onChange={onChange("email")}
                required
              />
            </Field>
            <Field label="Phone" required>
              <input
                type="tel"
                className="input"
                value={form.phone}
                onChange={onChange("phone")}
                required
              />
            </Field>

            {/* Location */}
            <Field label="State" required>
              <input
                type="text"
                className="input"
                placeholder="e.g., TN"
                value={form.state}
                onChange={onChange("state")}
                required
              />
            </Field>
            <Field label="County" required>
              <input
                type="text"
                className="input"
                placeholder="e.g., Williamson"
                value={form.county}
                onChange={onChange("county")}
                required
              />
            </Field>

            {/* Property basics */}
            <Field label="Acreage" required>
              <input
                type="number"
                min={0}
                step="0.01"
                className="input"
                placeholder="e.g., 45"
                value={form.acreage}
                onChange={onChange("acreage")}
                required
              />
            </Field>
            <Field label="Asking Price (USD)" required>
              <input
                type="number"
                min={0}
                step="100"
                className="input"
                placeholder="e.g., 650000"
                value={form.price}
                onChange={onChange("price")}
                required
              />
            </Field>

            <Field label="Timeline" required>
              <select
                className="input"
                value={form.timeline}
                onChange={onChange("timeline")}
                required
              >
                <option value="immediately">Immediately</option>
                <option value="30-60">30–60 days</option>
                <option value="60-90">60–90 days</option>
                <option value="unsure">Unsure</option>
              </select>
            </Field>

            <Field label="Photos/Video Link (optional)">
              <input
                type="url"
                className="input"
                placeholder="https://drive.google.com/…"
                value={form.mediaUrl}
                onChange={onChange("mediaUrl")}
              />
            </Field>

            <div className="md:col-span-2">
              <Field label="Notes (optional)">
                <textarea
                  rows={5}
                  className="input resize-y"
                  placeholder="Tell us anything else helpful…"
                  value={form.notes}
                  onChange={onChange("notes")}
                />
              </Field>
            </div>

            <div className="md:col-span-2 flex items-start gap-3">
              <input
                id="agree"
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-white/30 bg-transparent"
                checked={form.agree}
                onChange={onChange("agree")}
              />
              <label htmlFor="agree" className="text-sm text-white/80">
                I agree that Land Command may contact me about this submission and
                I accept the{" "}
                <a href="/terms" className="underline hover:text-white">
                  Terms
                </a>{" "}
                &{" "}
                <a href="/privacy" className="underline hover:text-white">
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            {err && (
              <div className="md:col-span-2 rounded-lg border border-red-400/50 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {err}
              </div>
            )}

            <div className="md:col-span-2 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-xl border border-[rgba(203,178,106,0.6)] bg-[rgba(203,178,106,0.92)] px-6 py-3 text-[15px] font-medium text-[#1B1B1B] hover:bg-[rgba(203,178,106,1)] disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "Submit & Continue"}
              </button>
              <a
                href="/"
                className="rounded-xl border border-white/25 px-6 py-3 text-white hover:bg-white/10"
              >
                Cancel
              </a>
            </div>
          </form>
        </div>

        <style jsx global>{`
          .input {
            width: 100%;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.18);
            background: rgba(0, 0, 0, 0.25);
            padding: 10px 12px;
            color: #efece0;
            outline: none;
          }
          .input:focus {
            border-color: rgba(255, 255, 255, 0.35);
          }
        `}</style>
      </section>
    </main>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-[12px] uppercase tracking-[0.22em] text-white/70">
        {label} {required && <span className="text-white/60">*</span>}
      </div>
      {children}
    </label>
  );
}
