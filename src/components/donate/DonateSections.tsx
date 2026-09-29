import {
  Bus,
  Check,
  Coins,
  Copy,
  FileText,
  HandHeart,
  Landmark,
  type LucideIcon,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { Container } from '@/components/layout/Container';
import { donationAccount } from '@/data/campaign';
import { donatePage } from '@/data/donate';
import { cn } from '@/lib/cn';

const amountIcons: Record<string, LucideIcon> = {
  file: FileText,
  bus: Bus,
  users: Users,
  coins: Coins,
};

/** Short gold rule above a serif section heading. */
function SectionTitle({ id, children }: { id: string; children: string }) {
  return (
    <>
      <span aria-hidden="true" className="gold-rule block w-12" />
      <h2 id={id} className="mt-5 text-h2">
        {children}
      </h2>
    </>
  );
}

/** Round tinted icon badge used on the giving cards. */
function IconBadge({ Icon, tone = 'gold' }: { Icon: LucideIcon; tone?: 'gold' | 'navy' }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex size-12 shrink-0 items-center justify-center rounded-full sm:size-14',
        tone === 'gold' ? 'bg-gold-soft text-gold-deep' : 'bg-navy/[0.06] text-navy',
      )}
    >
      <Icon className="size-6" strokeWidth={1.75} />
    </span>
  );
}

/* -------------------------------------------------------------------------- */

/** Editorial intro: heading and two paragraphs at a comfortable reading width. */
export function WhySupport() {
  const { heading, paragraphs } = donatePage.why;

  return (
    <section aria-labelledby="why-heading" className="bg-white py-16 lg:py-24">
      <Container>
        <SectionTitle id="why-heading">{heading}</SectionTitle>
        <div className="mt-6 max-w-[42rem] space-y-5 text-[1.0625rem] leading-[1.75] text-text">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** Bank transfer (primary, wider) beside two secondary cards, then the safety notice. */
export function WaysToGive() {
  const { heading, bank, inPerson, time, notice } = donatePage.ways;

  return (
    <section aria-labelledby="ways-heading" className="bg-background py-16 lg:py-20">
      <Container>
        <SectionTitle id="ways-heading">{heading}</SectionTitle>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-12 lg:grid-cols-[1.9fr_1fr_1fr]">
          {/* Primary: bank transfer */}
          <article className="rounded-card border border-border bg-white p-6 sm:p-8 md:col-span-2 lg:col-span-1">
            <div className="flex items-start gap-4 sm:items-center sm:gap-6">
              <IconBadge Icon={Landmark} />
              <div>
                <h3 className="text-h3 sm:text-[1.75rem]">{bank.heading}</h3>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted sm:text-base">
                  {bank.description}
                </p>
              </div>
            </div>
            <BankDetails />
          </article>

          {/* Secondary */}
          <article className="rounded-card border border-border bg-white p-6 sm:p-7">
            <IconBadge Icon={Users} tone="navy" />
            <h3 className="mt-5 text-h3">{inPerson.heading}</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{inPerson.body}</p>
          </article>

          <article className="rounded-card border border-border bg-white p-6 sm:p-7">
            <IconBadge Icon={HandHeart} />
            <h3 className="mt-5 text-h3">{time.heading}</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
              {time.body.before}
              <Link
                to={time.body.to}
                className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-deep"
              >
                {time.body.linkText}
              </Link>
              {time.body.after}
            </p>
          </article>
        </div>

        <p
          role="note"
          className="mt-6 flex items-start gap-4 rounded-card border border-gold/50 bg-gold-soft px-5 py-4 text-sm leading-relaxed text-text sm:items-center sm:px-6"
        >
          <ShieldCheck
            aria-hidden="true"
            className="size-7 shrink-0 text-gold-deep"
            strokeWidth={1.75}
          />
          <span aria-hidden="true" className="hidden h-8 w-px shrink-0 bg-gold/50 sm:block" />
          <span>{notice}</span>
        </p>
      </Container>
    </section>
  );
}

/** Label/value rows for the official account, with a copy button on the account number. */
function BankDetails() {
  const { bankName, accountName, accountNumber } = donationAccount;
  const rows = [
    { label: 'Bank', value: bankName },
    { label: 'Account name', value: accountName },
  ];

  return (
    <dl className="mt-7 border-t border-border">
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid gap-1 border-b border-border py-4 sm:grid-cols-[10rem_1fr] sm:items-center sm:gap-4"
        >
          <dt className="eyebrow text-muted">{row.label}</dt>
          <dd className="font-semibold break-words text-navy sm:text-lg">{row.value}</dd>
        </div>
      ))}
      <div className="grid gap-2 pt-4 sm:grid-cols-[10rem_1fr] sm:items-center sm:gap-4">
        <dt className="eyebrow text-muted">Account number</dt>
        <dd className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xl font-bold tracking-wide break-all text-navy tabular-nums sm:text-2xl">
            {accountNumber}
          </span>
          <CopyButton value={accountNumber} label="account number" />
        </dd>
      </div>
    </dl>
  );
}

/** Writes to the clipboard, falling back to a hidden textarea on older/insecure contexts. */
async function copyText(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.append(area);
  area.select();
  const ok = document.execCommand('copy');
  area.remove();
  if (!ok) throw new Error('copy failed');
}

/** "Copy" → "Copied" for two seconds. Result is announced to screen readers. */
function CopyButton({ value, label }: { value: string; label: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onCopy = async () => {
    try {
      await copyText(value);
      setState('copied');
    } catch {
      setState('failed');
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState('idle'), 2000);
  };

  const Icon = state === 'copied' ? Check : Copy;

  return (
    <>
      <button
        type="button"
        onClick={onCopy}
        aria-label={`Copy ${label}`}
        className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-button border border-gold/50 bg-gold-soft px-4 text-sm font-semibold text-gold-deep transition-colors hover:border-gold hover:bg-gold/20"
      >
        <Icon aria-hidden="true" className="size-4" />
        {state === 'copied' ? 'Copied' : state === 'failed' ? 'Copy failed' : 'Copy'}
      </button>
      <span role="status" className="sr-only">
        {state === 'copied'
          ? `${label[0].toUpperCase()}${label.slice(1)} copied to clipboard`
          : state === 'failed'
            ? 'Could not copy. Please select and copy it manually.'
            : ''}
      </span>
    </>
  );
}

/** Four illustrative amounts: amount dominant, description beneath. */
export function EveryAmount() {
  const { heading, items } = donatePage.amounts;

  return (
    <section aria-labelledby="amounts-heading" className="bg-white py-16 lg:py-20">
      <Container>
        <SectionTitle id="amounts-heading">{heading}</SectionTitle>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:gap-5 xl:grid-cols-4">
          {items.map((item) => {
            const Icon = amountIcons[item.icon];
            return (
              <li
                key={item.amount}
                className="flex items-start gap-4 rounded-card border border-border bg-white p-5 sm:p-6"
              >
                <IconBadge Icon={Icon} />
                <div>
                  <p className="text-2xl leading-tight font-bold text-navy tabular-nums">
                    {item.amount}
                  </p>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
