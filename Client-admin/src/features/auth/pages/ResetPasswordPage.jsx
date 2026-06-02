
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ResetPasswordForm } from '../components/ResetPasswordForm'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const token = searchParams.get('token')

    useEffect(() => {
        if (!token) {
            toast.error('Token de recuperación no válido', { duration: 4000 })
            navigate('/login')
        }
    }, [token, navigate])

    if (!token) {
        return null
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-10">
                <div className="flex justify-center mb-6">
                    <img
                        src="/src/assets/img/kinal_sports.png"
                        alt="Kinal Sports"
                        className="h-20 w-auto"
                    />
                </div>

                <div className="text-center mb-6">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                        Restablecer Contraseña
                    </h1>
                    <p className="text-gray-600 text-base max-w-md mx-auto">
                        Ingresa tu nueva contraseña para recuperar acceso a tu cuenta
                    </p>
                </div>

                <ResetPasswordForm
                    token={token}
                    onSuccess={() => {
                        navigate('/login')
                    }}
                />
            </div>
        </div>
    )
}
