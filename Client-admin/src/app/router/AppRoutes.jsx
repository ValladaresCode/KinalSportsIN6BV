import { Routes, Route } from "react-router-dom"
import { AuthPage } from "../../features/auth/pages/AuthPage.jsx"
import { ResetPasswordPage } from "../../features/auth/pages/ResetPasswordPage.jsx"
import { DashboardPage } from "../layouts/DashboardPage.jsx"
import { Users } from "../../features/users/components/Users.jsx"
import { FieldsPage } from "../../features/dashboard/pages/FieldsPage.jsx"
import { ReservationsPage } from "../../features/dashboard/pages/ReservationsPage.jsx"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthPage/>} />
            <Route path="/reset-password" element={<ResetPasswordPage/>} />
            <Route path="/dashboard" element={<DashboardPage />}>
                <Route index element={<Users />} />
                <Route path="users" element={<Users />} />
                <Route path="fields" element={<FieldsPage />} />
                <Route path="reservations" element={<ReservationsPage />} />
            </Route>
        </Routes>
    )
}
