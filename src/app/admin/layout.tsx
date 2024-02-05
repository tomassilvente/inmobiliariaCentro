import { ClerkProvider, UserButton } from "@clerk/nextjs";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <ClerkProvider>
        {children}
      </ClerkProvider>
    );
  }