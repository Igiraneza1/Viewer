import {
  ClerkProvider,
  SignedIn,
  UserButton
} from '@clerk/nextjs';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <SignedIn>
        <div className="flex justify-end items-center bg-white shadow px-6 py-4">
          <UserButton />
        </div>
      </SignedIn>

      <Component {...pageProps} />
    </ClerkProvider>
  );
}
