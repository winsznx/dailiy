'use client'

import { wagmiAdapter, projectId } from '@/config/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import { base, baseSepolia } from 'wagmi/chains'
import React, { type ReactNode, useState } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'
import { OnchainKitProvider } from '@coinbase/onchainkit'

const metadata = {
    name: 'Dailiy',
    description: 'On-Chain Journaling',
    url: 'https://dailiy.vercel.app',
    icons: ['https://dailiy.vercel.app/icon.png']
}

createAppKit({
    adapters: [wagmiAdapter],
    projectId,

    networks: [base, baseSepolia],
    metadata,
    themeMode: 'dark',
    features: {
        analytics: true
    }
})

export function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
    const [queryClient] = useState(() => new QueryClient())
    const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>
                <OnchainKitProvider
                    chain={base}
                    apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
                >
                    {children}
                </OnchainKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
