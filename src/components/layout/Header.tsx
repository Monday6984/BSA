import { Menu } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router';
import { ButtonLink } from '@/components/ui/Button';
import { donateCta, mainNavigation } from '@/data/navigation';
import { cn } from '@/lib/cn';
import { Container } from './Container';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';

const MOBILE_MENU_ID = 'mobile-menu';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white">
      <Container className="flex h-header items-center justify-between gap-6 lg:h-header-lg">
        <Logo imgClassName="h-12 lg:h-15" />

        {/* Desktop navigation from lg; spacing opens up at xl */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-5 xl:gap-8">
            {mainNavigation.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      // Text stays navy for contrast; gold is carried by the underline.
                      'relative block py-2 text-sm font-medium whitespace-nowrap text-navy',
                      'after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:rounded-full after:bg-gold after:transition-transform',
                      isActive
                        ? 'font-semibold after:scale-x-100'
                        : 'after:scale-x-0 hover:after:scale-x-100',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ButtonLink to={donateCta.to} size="sm" withArrow>
            {donateCta.label}
          </ButtonLink>

          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-button text-navy transition-colors hover:bg-background lg:hidden"
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls={MOBILE_MENU_ID}
            onClick={() => setMenuOpen(true)}
          >
            <Menu aria-hidden="true" className="size-6" />
          </button>
        </div>
      </Container>

      <MobileMenu id={MOBILE_MENU_ID} open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
