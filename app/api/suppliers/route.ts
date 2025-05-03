import { NextRequest, NextResponse } from "next/server";
import { createProveedorSchema } from "@/src/schemas/supplier.schema";
import { prisma } from "@/src/lib/prisma";
import { ZodError } from "zod";

// GET: Obtener todos los proveedores
export async function GET() {
  try {
    const suppliers = await prisma.proveedor.findMany({
      include: {
        tipo: true,
        _count: {
          select: {
            gastos: true,
            lotes: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(suppliers);
  } catch (error) {
    console.error("Error al obtener proveedores:", error);
    return NextResponse.json(
      { error: "Error al obtener proveedores" },
      { status: 500 }
    );
  }
}

// POST: Crear un nuevo proveedor
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar datos con Zod
    const validatedData = createProveedorSchema.parse(body);

    const newSupplier = await prisma.proveedor.create({
      data: {
        nombre: validatedData.nombre,
        tipoId: validatedData.tipoId,
        contacto: validatedData.contacto,
        telefono: validatedData.telefono,
        email: validatedData.email,
        direccion: validatedData.direccion,
        ciudad: validatedData.ciudad,
        notas: validatedData.notas,
      },
    });

    return NextResponse.json(newSupplier, { status: 201 });
  } catch (error) {
    console.error("Error al crear proveedor:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Datos inválidos", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Error al crear proveedor" },
      { status: 500 }
    );
  }
}
