import React from 'react'
import AllRoutes from './routes'
import { dashboardLightTheme } from './theme/dashboard_theme'
import { ThemeProvider } from 'styled-components'

function App() {
    return (
        <div>
            <ThemeProvider theme={dashboardLightTheme}>
                <AllRoutes />
            </ThemeProvider>
        </div>
    )
}

export default App
