
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { resetPassword } from '../../../shared/api'

export const ResetPasswordForm = ({ token, onSuccess }) => {

  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const password = watch('newPassword')

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const response = await resetPassword(token, data.newPassword)
      
      if (response.data.success) {
        toast.success('Contraseña actualizada exitosamente', { duration: 4000 })
        setTimeout(() => {
          onSuccess()
        }, 1500)
      } else {
        toast.error(response.data.message || 'Error al actualizar la contraseña', { duration: 4000 })
      }
    } catch (error) {
      console.error('Error:', error)
      const message = error.response?.data?.message || 'Error al procesar la solicitud'
      toast.error(message, { duration: 4000 })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1.5">
          Nueva Contraseña
        </label>

        <input
          type="password"
          placeholder="Ingresa tu nueva contraseña"
          className="w-full px-3 py-2 border rounded-lg"
          disabled={loading}
          {...register("newPassword", {
            required: "La contraseña es obligatoria",
            minLength: {
              value: 8,
              message: "La contraseña debe tener al menos 8 caracteres"
            }
          })}
        />
        {errors.newPassword && (
          <p className="text-red-600 text-xs mt-1">
            {errors.newPassword.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1.5">
          Confirmar Contraseña
        </label>

        <input
          type="password"
          placeholder="Confirma tu contraseña"
          className="w-full px-3 py-2 border rounded-lg"
          disabled={loading}
          {...register("confirmPassword", {
            required: "Debes confirmar la contraseña",
            validate: (value) =>
              value === password || "Las contraseñas no coinciden"
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-600 text-xs mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-main-blue text-white py-2 rounded-lg disabled:opacity-50 hover:opacity-90"
      >
        {loading ? "Actualizando..." : "Actualizar Contraseña"}
      </button>
    </form>
  )
}
