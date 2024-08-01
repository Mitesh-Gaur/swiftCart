"use client"

import { useState } from 'react';
import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface Props {
  readonly children: ReactNode;
}

export const ReactQueryProvider = ({ children }: Props) => {
	const [client] = useState(new QueryClient())

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}