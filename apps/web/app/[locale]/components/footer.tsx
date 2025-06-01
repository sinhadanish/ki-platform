import { env } from '@/env';
import { Status } from '@repo/observability/status';
import Link from 'next/link';

export const Footer = () => {
  const navigationItems = [
    {
      title: 'Product',
      items: [
        {
          title: 'Demo',
          href: '/demo',
        },
        {
          title: 'Features',
          href: '/#features',
        },
        {
          title: 'Pricing',
          href: '/pricing',
        },
      ],
    },
    {
      title: 'Company',
      items: [
        {
          title: 'About',
          href: '/about',
        },
        {
          title: 'Contact',
          href: '/contact',
        },
        ...(env.NEXT_PUBLIC_DOCS_URL ? [{
          title: 'Docs',
          href: env.NEXT_PUBLIC_DOCS_URL,
        }] : []),
      ],
    },
    {
      title: 'Legal',
      items: [
        {
          title: 'Privacy Policy',
          href: '/legal/privacy',
        },
        {
          title: 'Terms of Service',
          href: '/legal/terms',
        },
      ],
    },
  ];

  return (
    <section className="border-foreground/10 border-t bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-950 dark:via-gray-900 dark:to-pink-950">
      <div className="w-full py-20 lg:py-40">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="flex flex-col items-start gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-white font-bold">Ki</span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Ki
                    </span>
                  </h2>
                </div>
                <p className="max-w-lg text-left text-muted-foreground text-lg leading-relaxed">
                  The world's first Human-AI-Human relationship intelligence platform. 
                  Transforming how couples navigate relationships through empathetic AI.
                </p>
              </div>
              <Status />
            </div>
            <div className="grid items-start gap-10 lg:grid-cols-3">
              {navigationItems.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-start gap-4 text-base"
                >
                  <p className="text-xl font-semibold text-foreground">{item.title}</p>
                  <div className="flex flex-col gap-2">
                    {item.items?.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                        target={
                          subItem.href.includes('http')
                            ? '_blank'
                            : undefined
                        }
                        rel={
                          subItem.href.includes('http')
                            ? 'noopener noreferrer'
                            : undefined
                        }
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Bottom section */}
          <div className="mt-16 pt-8 border-t border-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Ki. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/legal/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/legal/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};