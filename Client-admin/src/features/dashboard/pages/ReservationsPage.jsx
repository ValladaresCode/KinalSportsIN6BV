import { useEffect, useState } from "react";
import { getReservations } from "../../../shared/api/dashboard.js";
import { Spinner } from "../../auth/components/Spinner.jsx";
import { showError } from "../../../shared/utils/toast.js";

export const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadReservations = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getReservations();
        setReservations(Array.isArray(data) ? data : []);
      } catch (err) {
        const message = err?.response?.data?.message || err.message || "No se pudieron cargar las reservaciones.";
        setError(message);
        showError(message);
      } finally {
        setLoading(false);
      }
    };

    loadReservations();
  }, []);

  return (
    <div className="p-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-main-blue mb-4">Reservaciones</h1>
        <p className="text-gray-600 mb-6">
          Aquí se muestran las reservaciones activas desde la API.
        </p>

        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
            <p className="font-semibold">Error al cargar las reservaciones</p>
            <p>{error}</p>
          </div>
        ) : reservations.length === 0 ? (
          <div className="rounded-lg bg-gray-50 border border-gray-200 p-6 text-gray-600">
            No se encontraron reservaciones para mostrar.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-4 py-3">Usuario</th>
                  <th className="px-4 py-3">Cancha</th>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Estado</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => (
                  <tr key={reservation.id || reservation._id || reservation.code} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">{reservation.userName || reservation.user || "-"}</td>
                    <td className="px-4 py-3">{reservation.fieldName || reservation.field || "-"}</td>
                    <td className="px-4 py-3">{reservation.date || reservation.startDate || "-"}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                        {reservation.status || "Activa"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
