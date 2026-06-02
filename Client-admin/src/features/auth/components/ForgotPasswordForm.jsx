
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { forgotPassword } from '../../../shared/api'

export const ForgotPasswordForm = ({ onSwitch }) => {

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const response = await forgotPassword(data.email)
      
      if (response.data.success) {
        setSubmitted(true)
        toast.success('Se ha enviado un enlace de recuperación a tu email', { duration: 4000 })
      } else {
        toast.error(response.data.message || 'Error al enviar el correo', { duration: 4000 })
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error(error.response?.data?.message || 'Error al procesar la solicitud', { duration: 4000 })
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="space-y-5">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 text-sm">
            Si el email existe en nuestro sistema, recibirás un enlace de recuperación en tu bandeja de entrada.
          </p>
          <p className="text-green-800 text-sm mt-2">
            El enlace expirará en 1 hora.
          </p>
        </div>

        <button
          type="button"
          className="w-full bg-main-blue text-white py-2 rounded-lg hover:opacity-90"
          onClick={onSwitch}
        >
          Volver a Iniciar Sesión
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1.5">
          Email
        </label>

        <input
          type="email"
          placeholder="correo@ejemplo.com"
          className="w-full px-3 py-2 border rounded-lg"
          disabled={loading}
          {...register("email", {
            required: "El email es obligatorio",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Debes proporcionar un email válido"
            }
          })}
        />
        {errors.email && (
          <p className="text-red-600 text-xs mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-main-blue text-white py-2 rounded-lg disabled:opacity-50 hover:opacity-90"
      >
        {loading ? "Enviando..." : "Enviar Correo"}
      </button>

      <p className="text-center text-sm text-gray-600">
        ¿Recordaste tu contraseña?{" "}
        <button
          type="button"
          className="text-main-blue font-medium hover:opacity-80"
          onClick={onSwitch}
        >
          Iniciar Sesión
        </button>
      </p>
    </form>
  )
}
