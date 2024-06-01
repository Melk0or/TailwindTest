import Header from '@/components/Header'
import { ThemeProvider } from '@/components/theme-provider'
import { store } from '@/shared/redux/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Provider } from 'react-redux'

const queryClient = new QueryClient()

export const Route = createRootRoute({
    component: () => (
        <>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        <Header />
                        <Outlet />
                        <TanStackRouterDevtools />
                    </Provider>
                </QueryClientProvider>
            </ThemeProvider>
        </>
    ),
})
