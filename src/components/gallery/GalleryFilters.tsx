import { type GalleryFilter, galleryFilters } from '@/data/gallery';
import { cn } from '@/lib/cn';

interface GalleryFiltersProps {
  active: GalleryFilter;
  onChange: (filter: GalleryFilter) => void;
}

/**
 * Category toggle buttons (aria-pressed). A single row that scrolls
 * sideways on small screens instead of wrapping.
 */
export function GalleryFilters({ active, onChange }: GalleryFiltersProps) {
  return (
    <div
      role="group"
      aria-label="Filter gallery by category"
      className="-mx-gutter [scrollbar-width:none] overflow-x-auto px-gutter py-1"
    >
      <ul className="flex w-max gap-2">
        {galleryFilters.map((filter) => {
          const selected = filter.value === active;
          return (
            <li key={filter.value}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => onChange(filter.value)}
                className={cn(
                  'inline-flex min-h-11 items-center rounded-button border px-4 text-sm font-semibold whitespace-nowrap transition-colors',
                  selected
                    ? 'border-gold bg-gold text-navy'
                    : 'border-border bg-white text-navy hover:border-navy/40 hover:bg-background',
                )}
              >
                {filter.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
