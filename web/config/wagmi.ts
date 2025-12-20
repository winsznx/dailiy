
import { cookieStorage, createStorage } from 'wagmi'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { base, baseSepolia } from 'wagmi/chains'

export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || 'b56e18d47c72db683d10aaef436d4bd6'

if (!projectId) {
    throw new Error('Project ID is not defined')
}


export const networks = [base, baseSepolia]

export const wagmiAdapter = new WagmiAdapter({
    storage: createStorage({
        storage: cookieStorage
    }) as any,
    ssr: true,
    projectId,
    networks
})

export const config = wagmiAdapter.wagmiConfig
