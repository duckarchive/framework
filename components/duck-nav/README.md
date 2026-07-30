This package includes authorization module and require additional setup:

1. Installation:

```bash
pnpm add next-auth
```

2. Create _app/api/auth/[...nextauth]/route.ts_:

```typescript
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: any; account?: any }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
```

3. Add environment variables to _.env_:

```env
NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID=your_google_oauth_client_id
GOOGLE_OAUTH_CLIENT_SECRET=your_google_oauth_client_secret
```

4. Wrap your application with `SessionProvider` in _app/providers.tsx_:

```tsx
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface ProvidersProps {
  session?: Session;
}

export const Providers: React.FC<PropsWithChildren<ProvidersProps>> = ({
  children,
  session,
}) => {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      {children}
    </SessionProvider>
  );
};
```

## Client-side navigation (HeroUI v3)

HeroUI v3's `Link` is built on `react-aria-components` and has no polymorphic
`as` prop, so it can no longer be rendered as `next/link`. Instead, wrap your
app root in `react-aria-components`' `RouterProvider`, giving it your
router's `push` function — every `Link` inside DuckNav (and everywhere else in
your app, if you use HeroUI's `Link` directly) will then navigate through
Next.js's router instead of doing a full page load:

```tsx
"use client";

import { RouterProvider } from "react-aria-components";
import { useRouter } from "next/navigation";

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  return (
    <RouterProvider navigate={router.push}>{children}</RouterProvider>
  );
};
```

Without this, links still work — they just perform a normal `<a>` navigation
(full page reload) rather than a client-side transition.

