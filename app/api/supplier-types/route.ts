import { NextRequest, NextResponse } from "next/server";
import { createTipoProveedorSchema } from "@/src/schemas/suppliertype.schema";
import { prisma } from "@/src/lib/prisma";
import { ZodError } from "zod";

// GET: Obtener todos los tipos proveedores
export async function GET() {
  try {
    const suppliers = await prisma.tipoProveedor.findMany({
      include: {
        _count: {
          select: {
            proveedores: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(suppliers);
  } catch (error) {
    console.error("Error al obtener el tipo proveedor:", error);
    return NextResponse.json(
      { error: "Error al obtener tipo proveedor" },
      { status: 500 }
    );
  }
}

// POST: Crear un nuevo tipo proveedor
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar datos con Zod
    const validatedData = createTipoProveedorSchema.parse(body);

    const newSupplierType = await prisma.proveedor.create({
      data: {
        nombre: validatedData.nombre
      },
    });

    return NextResponse.json(newSupplierType, { status: 201 });
  } catch (error) {
    console.error("Error al crear el tipo proveedor:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Datos inválidos", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Error al crear tipo proveedor" },
      { status: 500 }
    );
  }
}
