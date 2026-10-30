"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  CreditCard,
  GraduationCap,
  Info,
  PieChart,
} from "lucide-react";
import type { FeeClass, SiteContent } from "@/lib/types";
import { StateView } from "@/components/ui/StateView";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/cn";

const CHART_COLORS = ["#1A237E", "#F5A623", "#3949AB", "#FFB74D"];

function inr(n: number) {
  return `₹ ${Number(n || 0).toLocaleString("en-IN")}`;
}

function FeeSkeleton() {
  return (
    <div className="grid gap-5 lg:grid-cols-2" aria-busy="true" aria-label="Loading fee details">
      <div className="rounded-[1.75rem] border border-[#e8eaf0] bg-white p-6 shadow-sm">
        <Skeleton className="mb-5 h-8 w-48" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-xl" />
          ))}
          <Skeleton className="mt-2 h-16 w-full rounded-2xl" />
        </div>
      </div>
      <div className="rounded-[1.75rem] border border-[#e8eaf0] bg-white p-6 shadow-sm">
        <Skeleton className="mx-auto h-52 w-52 rounded-full" />
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Skeleton className="h-24 rounded-2xl" />
          <Skeleton className="h-24 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

function DonutChart({ values }: { values: number[] }) {
  const labels = ["1st Inst", "2nd Inst", "3rd Inst", "4th Inst"];
  const total = values.reduce((a, b) => a + b, 0) || 1;
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg viewBox="0 0 160 160" className="h-56 w-56" role="img" aria-label="How quarterly fees are split">
          <circle cx="80" cy="80" r={radius} fill="none" stroke="#EEF0F6" strokeWidth="22" />
          {values.map((value, index) => {
            const length = (value / total) * circumference;
            const el = (
              <circle
                key={labels[index]}
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke={CHART_COLORS[index]}
                strokeWidth="22"
                strokeLinecap="butt"
                strokeDasharray={`${length} ${circumference - length}`}
                strokeDashoffset={-offset}
                transform="rotate(-90 80 80)"
                className="transition-all duration-500"
              />
            );
            offset += length;
            return el;
          })}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <PieChart className="mb-1 h-5 w-5 text-[#1A237E]/80" />
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">Yearly fees</p>
          <p className="text-lg font-bold text-[#1A237E]">{inr(total)}</p>
          <p className="text-[11px] text-muted">4 parts</p>
        </div>
      </div>

      <div className="mt-5 grid w-full max-w-sm grid-cols-2 gap-x-4 gap-y-3">
        {labels.map((label, i) => {
          const pct = Math.round((values[i] / total) * 100);
          return (
            <div key={label} className="flex items-start gap-2">
              <span
                className="mt-1 h-3 w-3 shrink-0 rounded-full"
                style={{ background: CHART_COLORS[i] }}
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#1A237E]">{label}</p>
                <p className="text-xs text-muted">
                  {inr(values[i])} · {pct}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FeeResult({ current }: { current: FeeClass }) {
  const lineItems = [
    {
      label: "Admission Fee (One-Time)",
      hint: "Pay once at admission",
      value: current.admissionFee,
    },
    {
      label: "1st Installment (Quarterly)",
      hint: "April payment",
      value: current.installment1,
    },
    {
      label: "2nd Installment (Quarterly)",
      hint: "July payment",
      value: current.installment2,
    },
    {
      label: "3rd Installment (Quarterly)",
      hint: "October payment",
      value: current.installment3,
    },
    {
      label: "4th Installment (Quarterly)",
      hint: "January payment",
      value: current.installment4,
    },
  ];

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {/* Left: breakdown */}
      <article className="overflow-hidden rounded-[1.75rem] border border-[#e4e7ef] bg-white shadow-[0_12px_40px_rgba(26,35,126,0.06)]">
        <div className="flex items-center justify-between gap-3 px-6 pb-2 pt-6">
          <div>
            <h2 className="text-xl font-bold text-[#1A237E]">Fee Breakdown</h2>
            <p className="mt-0.5 text-sm text-muted">Easy list of what to pay for {current.name}</p>
          </div>
          <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-full bg-[#F5A623] px-3 text-sm font-extrabold text-white shadow-md">
            {current.badge || current.id}
          </span>
        </div>

        <ul className="px-4 pb-4 pt-2">
          {lineItems.map((item) => (
            <li
              key={item.label}
              className="flex items-center justify-between gap-4 rounded-2xl px-3 py-3.5 transition hover:bg-[#F7F8FC]"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#1A237E] md:text-[15px]">{item.label}</p>
                <p className="text-xs text-muted">{item.hint}</p>
              </div>
              <p className="shrink-0 text-base font-bold tabular-nums text-[#1A237E] md:text-lg">
                {inr(item.value)}
              </p>
            </li>
          ))}
        </ul>

        <div className="mx-4 mb-5 flex items-center justify-between gap-3 rounded-2xl bg-[#1A237E] px-5 py-4 text-white shadow-lg">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/70">Annual Total</p>
            <p className="text-sm text-white/85">Full year amount for this class</p>
          </div>
          <p className="text-2xl font-extrabold tabular-nums md:text-[1.7rem]">
            {inr(current.annualTotal)}
          </p>
        </div>
      </article>

      {/* Right: chart + summaries */}
      <article className="overflow-hidden rounded-[1.75rem] border border-[#e4e7ef] bg-white p-6 shadow-[0_12px_40px_rgba(26,35,126,0.06)]">
        <div className="mb-2 text-center">
          <h2 className="text-xl font-bold text-[#1A237E]">Fee at a glance</h2>
          <p className="mt-1 text-sm text-muted">See how the year is split into 4 payments</p>
        </div>

        <DonutChart
          values={[
            current.installment1,
            current.installment2,
            current.installment3,
            current.installment4,
          ]}
        />

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-[#F4F6FB] p-4">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#1A237E] shadow-sm">
              <CreditCard className="h-5 w-5" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Monthly Equivalent
            </p>
            <p className="mt-1 text-2xl font-extrabold tabular-nums text-[#1A237E]">
              {inr(current.monthlyEquivalent)}
            </p>
            <p className="mt-1 text-xs text-muted">Approx. if spread across 12 months</p>
          </div>
          <div className="rounded-2xl bg-[#FFF8EC] p-4">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#F5A623] shadow-sm">
              <CalendarDays className="h-5 w-5" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Payment Terms</p>
            <p className="mt-1 text-2xl font-extrabold text-[#1A237E]">4 Installments</p>
            <p className="mt-1 text-xs text-muted">Apr · Jul · Oct · Jan</p>
          </div>
        </div>
      </article>
    </div>
  );
}

export function FeeDashboard({ fees }: { fees: SiteContent["fees"] }) {
  const classes = fees.classes || [];
  const [selected, setSelected] = useState("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  const current = useMemo(
    () => classes.find((c) => c.id === selected),
    [classes, selected]
  );

  if (!classes.length) {
    return (
      <StateView
        kind="empty"
        title="Fee structure not published yet"
        description="School admin can add class-wise fees from the Fees panel."
      />
    );
  }

  function onSelect(id: string) {
    setSelected(id);
    if (!id) {
      setStatus("idle");
      return;
    }
    setStatus("loading");
    window.setTimeout(() => setStatus("idle"), 320);
  }

  return (
    <div className="space-y-6">
      {/* Intro + selector */}
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1A237E] text-white shadow-lg">
          <GraduationCap className="h-7 w-7" />
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight text-[#1A237E] md:text-3xl">
          Choose your class
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted md:text-base">
          Academic Year <strong className="text-[#1A237E]">{fees.academicYear}</strong> — pick a
          class to see fees in simple numbers and charts. Made easy for students and parents.
        </p>

        <div className="relative mx-auto mt-6 max-w-md">
          <label htmlFor="classSelect" className="sr-only">
            Select Class / Grade
          </label>
          <select
            id="classSelect"
            value={selected}
            onChange={(e) => onSelect(e.target.value)}
            className={cn(
              "w-full appearance-none rounded-2xl border-2 border-[#1A237E]/25 bg-white px-5 py-4 pr-12",
              "text-left text-base font-semibold text-[#1A237E] shadow-sm outline-none",
              "transition focus:border-[#1A237E] focus:ring-4 focus:ring-[#1A237E]/10"
            )}
          >
            <option value="">Choose Class / Grade...</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1A237E]" />
        </div>

        <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted">
          <Info className="h-3.5 w-3.5" />
          Tip: numbers update instantly when you change the class
        </p>
      </div>

      {status === "loading" ? <FeeSkeleton /> : null}

      {!selected && status !== "loading" ? (
        <div className="rounded-[1.75rem] border border-dashed border-[#1A237E]/20 bg-white/70 px-6 py-14 text-center">
          <StateView
            kind="empty"
            compact
            className="border-0 bg-transparent shadow-none"
            title="No class selected yet"
            description="Select Nursery to Class XII from the menu above to see the fee chart and payment list."
          />
        </div>
      ) : null}

      {selected && current && status !== "loading" ? (
        <div className="space-y-6 fade-up">
          <FeeResult current={current} />

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[#e4e7ef] bg-white p-5 shadow-sm">
              <h3 className="font-bold text-[#1A237E]">Payment Methods</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{fees.paymentMethods}</p>
            </div>
            <div className="rounded-2xl border border-[#e4e7ef] bg-white p-5 shadow-sm">
              <h3 className="font-bold text-[#1A237E]">Due Dates</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{fees.dueDates}</p>
            </div>
            <div className="rounded-2xl border border-[#e4e7ef] bg-white p-5 shadow-sm">
              <h3 className="font-bold text-[#1A237E]">Refund Policy</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{fees.refundPolicy}</p>
            </div>
          </div>
        </div>
      ) : null}

      {selected && !current && status !== "loading" ? (
        <StateView kind="error" title="Fee data missing for this class" />
      ) : null}
    </div>
  );
}
