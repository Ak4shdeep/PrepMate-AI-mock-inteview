// Inside src/lib/helpers.ts (or similar file)

export interface Route {
    href: string;
    label: string;
    children?: Route[]; 
}

export const MainRoutes: Route[] = [
  {
        href: '/',
        label: 'Home',
    },
    {
        href: '/contact',
        label: 'Contact Us',
    },
    {
        href: '/about',
        label: 'About Us',
    },
    {
        href: '/services',
        label: 'Services',
        children: [ 
            {
                href: '/services',
                label: 'All Services',
            },
            {
                href: '/smart-search',
                label: 'Smart Search Assistant',
            },
            {
                href: '/file-analyser',
                label: 'Ai File Analyser',
            },
        ],
    },
];