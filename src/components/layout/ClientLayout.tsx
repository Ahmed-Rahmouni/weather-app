'use client'; // Indicates this component is a client-side component in a Next.js application

import { ReactNode } from 'react'; // Import ReactNode type for children prop
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import query client for data fetching

const queryClient = new QueryClient(); // Create an instance of QueryClient for managing server state

type ProvidersProps = {
  children: ReactNode; // Define type for children prop
};

// ClientLayout component that wraps children in QueryClientProvider
export const ClientLayout = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider> // Provide the query client to the component tree
  );
};
