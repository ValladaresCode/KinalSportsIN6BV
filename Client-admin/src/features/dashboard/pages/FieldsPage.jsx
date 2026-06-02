import { useEffect, useState } from "react";
import { getFields } from "../../../shared/api/dashboard.js";
import { Spinner } from "../../auth/components/Spinner.jsx";
import { showError } from "../../../shared/utils/toast.js";

export const FieldsPage = () => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFields = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getFields();
        setFields(Array.isArray(data) ? data : []);
      } catch (err) {
        const message = err?.response?.data?.message || err.message || "No se pudo cargar las canchas.";
        setError(message);
        showError(message);
      } finally {
        setLoading(false);
      }
    };

    loadFields();
  }, []);

  return (
    <div className="p-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-main-blue mb-4">Canchas</h1>
        <p className="text-gray-600 mb-6">
          Aquí se muestran las canchas disponibles desde la API.
        </p>

        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
            <p className="font-semibold">Error al cargar las canchas</p>
            <p>{error}</p>
          </div>
        ) : fields.length === 0 ? (
          <div className="rounded-lg bg-gray-50 border border-gray-200 p-6 text-gray-600">
            No se encontraron canchas para mostrar.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Tipo</th>
                  <th className="px-4 py-3">Ubicación</th>
                  <th className="px-4 py-3">Estado</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field) => (
                  <tr key={field.id || field._id || field.name} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">{field.name || field.title || "-"}</td>
                    <td className="px-4 py-3">{field.type || field.category || "-"}</td>
                    <td className="px-4 py-3">{field.location || field.address || "-"}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                        {field.status || "Disponible"}
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
