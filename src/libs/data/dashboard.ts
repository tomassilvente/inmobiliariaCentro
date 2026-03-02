export async function getDashboardStats() {
    const [casasRes, contratosRes, pagosRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/casas`, { cache: "no-store" }),
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/contratos`, { cache: "no-store" }),
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/pagos`, { cache: "no-store" }),
    ]);
  
    if (!casasRes.ok || !contratosRes.ok || !pagosRes.ok) {
      throw new Error("Error cargando stats del dashboard");
    }
  
    const casas = await casasRes.json();
    const contratos = await contratosRes.json();
    const pagos = await pagosRes.json();
  
    const inmuebles = Array.isArray(casas) ? casas.length : 0;
  
    const alquileres = Array.isArray(contratos)
      ? contratos.filter((c: any) => c.activo === 1).length
      : 0;
  
    const now = new Date();
    const mes = now.getMonth();
    const anio = now.getFullYear();
  
    const pagosMes = Array.isArray(pagos)
      ? pagos
          .filter((p: any) => {
            const f = new Date(p.fecha_pago);
            return f.getMonth() === mes && f.getFullYear() === anio;
          })
          .reduce((acc: number, p: any) => acc + Number(p.monto || 0), 0)
      : 0;
  
    return { inmuebles, alquileres, pagosMes };
  }