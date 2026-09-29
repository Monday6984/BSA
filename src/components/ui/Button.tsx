import { ArrowRight } from 'lucide-react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router';
import { type ButtonSize, type ButtonVariant, buttonStyles } from './buttonStyles';

interface SharedProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Trailing arrow, as used on the campaign CTAs */
  withArrow?: boolean;
  children: ReactNode;
}

function Content({ children, withArrow }: Pick<SharedProps, 'children' | 'withArrow'>) {
  return (
    <>
      {children}
      {withArrow && <ArrowRight aria-hidden="true" className="size-4 shrink-0" />}
    </>
  );
}

type ButtonProps = SharedProps & ButtonHTMLAttributes<HTMLButtonElement>;

/** A real <button> — for actions (submit, open, toggle). */
export function Button({
  variant,
  size,
  withArrow,
  className,
  type = 'button',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={buttonStyles(variant, size, className)} {...rest}>
      <Content withArrow={withArrow}>{children}</Content>
    </button>
  );
}

type ButtonLinkProps = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    to: string;
  };

/** A link styled as a button — for navigation. External URLs and #anchors render a plain <a>. */
export function ButtonLink({
  variant,
  size,
  withArrow,
  className,
  to,
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = buttonStyles(variant, size, className);
  // In-page anchors also use a plain <a> so the browser scrolls to the target
  const isExternal = /^(https?:|mailto:|tel:|#)/.test(to);

  if (isExternal) {
    return (
      <a href={to} className={classes} {...rest}>
        <Content withArrow={withArrow}>{children}</Content>
      </a>
    );
  }

  return (
    <Link to={to} className={classes} {...rest}>
      <Content withArrow={withArrow}>{children}</Content>
    </Link>
  );
}
