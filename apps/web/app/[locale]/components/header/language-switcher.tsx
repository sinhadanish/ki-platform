'use client';

import { Button } from '@repo/design-system/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';

const languages = [
  { label: '🇬🇧 English', value: 'en' },
  { label: '🇪🇸 Español', value: 'es' },
  { label: '🇩🇪 Deutsch', value: 'de' },
  { label: '🇨🇳 中文', value: 'zh' },
  { label: '🇫🇷 Français', value: 'fr' },
  { label: '🇵🇹 Português', value: 'pt' },
];

export const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  // Get current locale from params or default to 'en'
  const currentLocale = (params.locale as string) || 'en';

  const switchLanguage = (locale: string) => {
    // Remove current locale from pathname to get the base path
    let basePath = pathname;
    
    // If pathname starts with current locale, remove it
    if (pathname.startsWith(`/${currentLocale}`)) {
      basePath = pathname.substring(`/${currentLocale}`.length) || '/';
    }
    
    // Construct new path with selected locale
    const newPath = `/${locale}${basePath === '/' ? '' : basePath}`;
    
    console.log(`Switching from ${currentLocale} to ${locale}: ${pathname} -> ${newPath}`);
    
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 text-foreground"
        >
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {languages.map(({ label, value }) => (
          <DropdownMenuItem 
            key={value} 
            onClick={() => switchLanguage(value)}
            className={currentLocale === value ? 'bg-accent font-medium' : ''}
          >
            {label}
            {currentLocale === value && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
