import { PrismaClient } from '@prisma/client';

import { clientes } from './data/cliente';
import { proveedores } from './data/proveedor';
import { lotes } from './data/lote';
import { gastos } from './data/gasto';
import { mortalidades } from './data/mortalidad';
import { ventas } from './data/venta';
import { tiposProveedor } from './data/tipoproveedor'; // Importar los tipos de proveedor

const prisma = new PrismaClient();

async function main() {
  try {
    // Insertar tipos de proveedor
    const tiposProveedorInsertados = await Promise.all(
      tiposProveedor.map((tipo) => prisma.tipoProveedor.create({ data: tipo }))
    );

    // Insertar clientes
    const clientesInsertados = await Promise.all(
      clientes.map((cliente) => prisma.cliente.create({ data: cliente }))
    );

    // Insertar proveedores
    const proveedoresInsertados = await Promise.all(
      proveedores.map((proveedor) => 
        prisma.proveedor.create({
          data: {
            ...proveedor,
            tipoId: tiposProveedorInsertados.find(tipo => tipo.nombre === proveedor.tipo)?.id // Relacionar con tipo
          }
        })
      )
    );

    // Insertar lotes (relacionar con proveedor)
    const lotesInsertados = await Promise.all(
      lotes.map((lote, i) =>
        prisma.lote.create({
          data: {
            ...lote,
            proveedorId: proveedoresInsertados[i % proveedoresInsertados.length].id
          }
        })
      )
    );

    // Insertar gastos (relacionar con lote y proveedor)
    await Promise.all(
      gastos.map((gasto, i) =>
        prisma.gasto.create({
          data: {
            ...gasto,
            loteId: lotesInsertados[i % lotesInsertados.length].id,
            proveedorId: proveedoresInsertados[i % proveedoresInsertados.length].id
          }
        })
      )
    );

    // Insertar mortalidades (relacionar con lote)
    await Promise.all(
      mortalidades.map((mortalidad, i) =>
        prisma.mortalidad.create({
          data: {
            ...mortalidad,
            loteId: lotesInsertados[i % lotesInsertados.length].id
          }
        })
      )
    );

    // Insertar ventas (relacionar con cliente y lote)
    await Promise.all(
      ventas.map((venta, i) =>
        prisma.venta.create({
          data: {
            ...venta,
            loteId: lotesInsertados[i % lotesInsertados.length].id,
            clienteId: clientesInsertados[i % clientesInsertados.length].id
          }
        })
      )
    );

    console.log('🌱 ¡Seeding completado con éxito!');
  } catch (error) {
    console.error('❌ Error durante el seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
