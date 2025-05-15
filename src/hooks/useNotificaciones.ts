import { useEffect, useState } from "react";

const useNotificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    const fetchNotificaciones = async () => {
      const res = await fetch("/api/pagos");
      const data = await res.json();

      // Filtrar pagos vencidos o pendientes
      const pagosPendientes = data.filter(
        (pago) => !pago.fecha_pago // No tiene fecha de pago
      );

      setNotificaciones(pagosPendientes);
    };

    fetchNotificaciones();

  }, []);

  return notificaciones;
};

export default useNotificaciones;
