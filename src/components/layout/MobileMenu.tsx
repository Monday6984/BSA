import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router';
import { ButtonLink } from '@/components/ui/Button';
import { donateCta, mainNavigation } from '@/data/navigation';
import { cn } from '@/lib/cn';
import { Logo } from './Logo';

interface MobileMenuProps {
  id: string;
  open: boolean;
  onClose: () => void;
}

/** Matches the lg breakpoint where the desktop navigation takes over. */
const DESKTOP_QUERY = '(min-width: 64rem)';

/**
 * Full-screen navigation for mobile/tablet, built on the native <dialog>:
 * focus is trapped, Escape closes it, the page behind is inert, and focus
 * returns to the menu button on close.
 */
export function MobileMenu({ id, open, onClose }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      // Start on the close button rather than the logo link.
      dialog.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // If the viewport grows to desktop while open, close — otherwise the hidden
  // modal would leave the page inert.
  useEffect(() => {
    if (!open) return;
    const query = window.matchMedia(DESKTOP_QUERY);
    const handleChange = () => query.matches && onClose();
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, [open, onClose]);

  return (
    <dialog
      ref={dialogRef}
      id={id}
      aria-label="Site menu"
      onClose={onClose}
      className={cn(
        'm-0 h-dvh max-h-none w-full max-w-none bg-white p-0 text-text backdrop:bg-navy/40 lg:hidden',
        // Subtle fade/slide; skipped by browsers without @starting-style and by reduced motion.
        '-translate-y-2 opacity-0 transition-[opacity,translate,display,overlay] transition-discrete',
        'open:translate-y-0 open:opacity-100 starting:open:-translate-y-2 starting:open:opacity-0',
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-header shrink-0 items-center justify-between border-b border-border px-gutter">
          <Logo imgClassName="h-12" />
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-button border border-border text-navy transition-colors hover:bg-background"
            aria-label="Close menu"
            data-autofocus
            onClick={onClose}
          >
            <X aria-hidden="true" className="size-6" />
          </button>
        </div>

        <nav aria-label="Main" className="flex-1 overflow-y-auto px-gutter py-6">
          <ul className="flex flex-col">
            {mainNavigation.map((item) => (
              <li key={item.to} className="border-b border-border">
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={onClose}
                  className="group flex items-center gap-3 py-4 font-heading text-2xl font-bold text-navy"
                >
                  {({ isActive }) => (
                    <>
                      <span
                        aria-hidden="true"
                        className={cn(
                          'h-6 w-0.5 bg-gold transition-opacity',
                          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
                        )}
                      />
                      {item.label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-border px-gutter py-5">
          <ButtonLink to={donateCta.to} withArrow onClick={onClose} className="w-full">
            {donateCta.label}
          </ButtonLink>
        </div>
      </div>
    </dialog>
  );
}
