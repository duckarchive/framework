import React, { useRef } from "react";
import type { Preview } from "@storybook/nextjs-vite";
import { ThemeProvider } from "next-themes";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { SessionProvider, mockSession } from "./mocks/next-auth-react";
import "./tailwind.css";

// ag-grid-community v33+ requires the consuming app to register the modules
// it uses. DuckTable expects this to already be done by the host app, so we
// do it here for Storybook.
ModuleRegistry.registerModules([AllCommunityModule]);

const THEME_STORAGE_KEY = "storybook-duckarchive-theme";

// next-themes persists the resolved theme to localStorage and prefers that
// stored value over `defaultTheme` on every mount. Without clearing it, the
// "Theme" toolbar control only has an effect once — after that, next-themes
// keeps re-reading whatever was last stored (e.g. from clicking the real
// ThemeSwitch button, or from a previous story's session) and ignores the
// toolbar entirely. Clearing the storage synchronously during render — both
// on this component's first mount and whenever the toolbar value actually
// changes thereafter — keeps the toolbar authoritative on every story
// switch while still letting the real ThemeSwitch button toggle
// interactively in between toolbar changes.
const ThemeSync: React.FC<{ theme: string; children: React.ReactNode }> = ({ theme, children }) => {
  const prevTheme = useRef<string>();
  if (prevTheme.current !== theme) {
    prevTheme.current = theme;
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(THEME_STORAGE_KEY);
    }
  }
  return (
    <ThemeProvider key={theme} attribute="class" defaultTheme={theme} storageKey={THEME_STORAGE_KEY}>
      {children}
    </ThemeProvider>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      description: "Global theme for components",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
    authStatus: {
      description: "Mock next-auth session status",
      toolbar: {
        title: "Auth",
        icon: "user",
        items: [
          { value: "unauthenticated", title: "Signed out" },
          { value: "authenticated", title: "Signed in" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
    authStatus: "unauthenticated",
  },
  decorators: [
    (Story, context) => {
      const { theme, authStatus } = context.globals;
      return (
        // HeroUI v3 has no provider component (styling comes from CSS, theme
        // switching from next-themes' own `useTheme`), so there is nothing to
        // wrap with beyond ThemeSync + the mock SessionProvider.
        <ThemeSync theme={theme}>
          <SessionProvider
            session={authStatus === "authenticated" ? mockSession : null}
          >
            <div className="bg-background text-foreground">
              <Story />
            </div>
          </SessionProvider>
        </ThemeSync>
      );
    },
  ],
};
export default preview;
