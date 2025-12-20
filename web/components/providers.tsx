"use client";

import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'wagmi/chains';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
    return (
        <OnchainKitProvider
            chain={base}
            apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
        >
            {children}
        </OnchainKitProvider>
    );
}
