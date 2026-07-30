import React, { createContext, useContext } from "react";

export interface MockSession {
  user?: { name?: string | null; email?: string | null; image?: string | null };
  expires: string;
  error?: string;
}

export const mockSession: MockSession = {
  user: { name: "Тестова Качка", email: "duck@duckarchive.com" },
  expires: "2099-01-01T00:00:00.000Z",
};

type SessionStatus = "authenticated" | "unauthenticated" | "loading";

interface SessionContextValue {
  data: MockSession | null;
  status: SessionStatus;
}

const SessionContext = createContext<SessionContextValue>({
  data: null,
  status: "unauthenticated",
});

interface MockSessionProviderProps {
  session?: MockSession | null;
  children: React.ReactNode;
}

// Aliased in place of the real "next-auth/react" SessionProvider for Storybook,
// since there is no live NextAuth backend to talk to in this environment.
export const SessionProvider: React.FC<MockSessionProviderProps> = ({
  session = null,
  children,
}) => (
  <SessionContext.Provider
    value={{
      data: session,
      status: session ? "authenticated" : "unauthenticated",
    }}
  >
    {children}
  </SessionContext.Provider>
);

export const useSession = () => useContext(SessionContext);

export const signIn = async (...args: unknown[]) => {
  console.log("[storybook mock] next-auth signIn() called with", args);
};

export const signOut = async (...args: unknown[]) => {
  console.log("[storybook mock] next-auth signOut() called with", args);
};
