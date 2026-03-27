# AGENTS.md

## Development Commands

```bash
# Install dependencies
pnpm install

# Run development server with HMR
pnpm dev

# Build for production
pnpm build

# Run ESLint
pnpm lint

# Preview production build
pnpm preview
```

### Testing

No test framework is currently configured. When adding tests:
- Use Vitest for unit and integration tests
- Install test dependencies via pnpm
- Create test files with `.test.ts` or `.spec.ts` suffixes
- Run tests with `pnpm test` (to be added to package.json)
- Run a single test file with `pnpm test <file-name>`

## Project Structure

```
src/
├── admin/          # Admin dashboard pages and components
├── api/            # API-related utilities
├── app.router.tsx  # React Router configuration
├── auth/           # Authentication pages, actions, and store
├── components/     # Shared components (UI, custom)
├── interfaces/     # TypeScript interfaces and types
├── lib/            # Utility functions
├── shop/           # Shop frontend pages and components
├── assets/         # Static assets
└── mocks/          # Mock data
```

## Code Style Guidelines

### Imports

- Use `type` keyword for type-only imports: `import type { MyType } from "module"`
- Organize imports: React/Next.js first, then 3rd party libraries, then local imports
- Use relative paths for local imports when possible
- Use alias `@` for src directory imports (configured in vite.config.ts and tsconfig.json)
- Prefer absolute imports from `@/` for library and utility code

```typescript
// Good
import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/auth/store/auth.store";

// Bad
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/auth/store/auth.store";
import type React from "react";
```

### TypeScript

- Strict null checks enabled
- Use interfaces for object shapes, types for unions/enums
- Use `React.ComponentProps<"tagName">` for component props typing
- Use `as const` for literal types when appropriate
- Avoid `any` type - use `unknown` or specific types
- Always include `type` keyword when importing types only

```typescript
// Good
interface User {
  id: string;
  name: string;
  email: string;
}

type AuthStatus = "authenticated" | "unauthenticated";

// Bad
const User = { id: string, name: string } // Missing semicolon
const data: any = {...}
```

### React Components

- Use functional components with hooks
- Prefer `const ComponentName = ...` or `export const ComponentName = ...`
- Use PascalCase for component names
- Use descriptive variable names (avoid `data`, `item`, `res`)
- Type component props using `React.ComponentProps<"div">` or similar

```typescript
// Good
export const LoginPage = ({ className, ...props }: React.ComponentProps<"div">) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Implementation
  };
  
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {/* JSX */}
    </div>
  );
};

// Bad
function App(props) {
  const d = []
  const handleSubmit = async (e: any) => {}
  return <div>{d}</div>
}
```

### State Management (Zustand)

- Use typed store with interface
- Access store via `useAuthStore()` hook
- Destructure only what you need: `const { login, logout } = useAuthStore()`

```typescript
// Good
interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: async (email, password) => {
    // Implementation
    return true;
  },
  logout: () => set({ user: null }),
}));

// Bad
const useStore = create((set) => ({ data: null }))
```

### Form Handling (React Hook Form)

- Use `<form onSubmit={handleSubmit}>` pattern
- Use `useForm` hook with Zod or custom validation
- Get form values with `useWatch` or `useFieldArray`
- Always type form values with TypeScript

```typescript
// Good
const form = useForm<LoginForm>({
  resolver: zodResolver(loginSchema),
  defaultValues: {
    email: "",
    password: "",
  },
});

const handleSubmit = form.handleSubmit(async (data) => {
  await login(data);
});

// Bad
const form = useForm()
const handleSubmit = form.handleSubmit(async (data: any) => {})
```

### Styling (Tailwind CSS)

- Use utility-first classes
- Use `cn()` utility from `@/lib/utils` for className merging
- Use responsive prefixes (`md:`, `lg:`)
- Use semantic class names (`flex`, `gap`, `p`)
- Prefer BEM-style component classes

```typescript
// Good
<div className={cn("flex flex-col gap-4 p-6", className)}>
  <div className="grid grid-cols-2 gap-4">
    {/* Content */}
  </div>
</div>

// Bad
<div class="flex flex-col gap-4 p-6">
  <div class="flex flex-row">
    {/* Content */}
  </div>
</div>
```

### Routing (React Router)

- Use `createBrowserRouter` for router setup
- Use `lazy` for code-splitting
- Use `Navigate` for redirects
- Use protected route components for authentication

```typescript
// Good
export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <ShopLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <ProductsPage /> },
    ],
  },
]);

// Bad
<BrowserRouter>
  <Routes>
    <Route path="/" element={<ShopLayout />}>
      <Route index element={<HomePage />} />
    </Route>
  </Routes>
</BrowserRouter>
```

### Error Handling

- Use try/catch for async operations
- Display user-friendly error messages via toast notifications
- Use TypeScript errors properly
- Handle API errors and network errors appropriately

```typescript
// Good
const handleLogin = async () => {
  try {
    const result = await login(email, password);
    if (result.success) {
      navigate("/");
    } else {
      toast.error(result.message);
    }
  } catch (error) {
    toast.error("An unexpected error occurred");
    console.error("Login failed:", error);
  }
};

// Bad
const handleLogin = async () => {
  await login(email, password)
  toast.error(error.message) // error might be undefined
}
```

### Naming Conventions

- **Components**: PascalCase (e.g., `LoginPage`, `AdminProductsPage`)
- **Files**: PascalCase for components, kebab-case for utilities (e.g., `auth.store.ts`)
- **Functions/Variables**: camelCase (e.g., `handleLogin`, `isLoading`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Types/Interfaces**: PascalCase (e.g., `User`, `AuthResponse`)
- **Private functions**: prefix with underscore (e.g., `_getUserId`)

### Files Organization

- Keep related code together in the same file (components, actions, interfaces)
- Use folders to group related functionality
- Actions in `src/{feature}/actions/`
- Pages in `src/{feature}/pages/`
- Store in `src/{feature}/store/`
- Components in `src/components/` (shared) or `src/{feature}/components/`

### Utility Functions

- Create reusable utilities in `src/lib/utils.ts`
- Export single-purpose functions
- Use TypeScript for all utility signatures

## Linting

- ESLint configured in `eslint.config.js`
- Follow ESLint rules from recommended configs
- Fix issues automatically with `pnpm lint --fix`
- Keep code consistent with project style
