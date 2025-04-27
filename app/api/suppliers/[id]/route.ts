import { NextRequest, NextResponse } from "next/server";
import { updateProveedorSchema, deleteProveedorSchema } from "@/src/schemas/supplier.schema";
import { prisma } from "@/src/lib/prisma";
import { ZodError } from "zod";

// GET: Obtener un proveedor por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const proveedor = await prisma.proveedor.findUnique({
      where: { id },
      include: {
        _count: {
          select: { 
            lotes: true,
            gastos: true
        },
        },
      },
    });
    
    if (!proveedor) {
      return NextResponse.json(
        { error: "Proveedor no encontrado" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(proveedor);
  } catch (error) {
    console.error("Error al obtener proveedor:", error);
    return NextResponse.json(
      { error: "Error al obtener proveedor" },
      { status: 500 }
    );
  }
}

// PUT: Actualizar un proveedor
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    
    // Validar datos con el esquema Zod
    const validatedData = updateProveedorSchema.parse({ id, ...body });
    
    // Verificar si existe el proveedor
    const supplierExists = await prisma.proveedor.findUnique({
      where: { id },
    });
    
    if (!supplierExists) {
      return NextResponse.json(
        { error: "Proveedor no encontrado" },
        { status: 404 }
      );
    }
    
    // Actualizar proveedor
    const updatedSupplier = await prisma.proveedor.update({
      where: { id },
      data: {
        nombre: validatedData.nombre,
        contacto: validatedData.contacto,
        telefono: validatedData.telefono,
        email: validatedData.email,
        direccion: validatedData.direccion,
        ciudad: validatedData.ciudad,
        notas: validatedData.notas,
        tipoId: validatedData.tipoId || null,
      },
    });
    
    return NextResponse.json(updatedSupplier);
  } catch (error) {
    console.error("Error al actualizar proveedor:", error);
    
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Datos inválidos", details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Error al actualizar proveedor" },
      { status: 500 }
    );
  }
}

// DELETE: Eliminar un proveedor
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Validar el ID con Zod
    deleteProveedorSchema.parse({ id });
    
    // Verificar si existe el proveedor
    const proveedor = await prisma.proveedor.findUnique({
      where: { id },
      include: { 
        lotes: true,
        gastos: true 
      },
    });
    
    if (!proveedor) {
      return NextResponse.json(
        { error: "Proveedor no encontrado" },
        { status: 404 }
      );
    }
    
    // Eliminar los lotes asociadas al proveedor si existen
    if (proveedor.lotes.length > 0) {
      await prisma.lote.deleteMany({
        where: { proveedorId: id },
      });
    }

    // Eliminar los gastos asociadas al proveedor si existen
    if (proveedor.gastos.length > 0) {
        await prisma.gasto.deleteMany({
          where: { proveedorId: id },
        });
      }
    
    // Eliminar el proveedor
    await prisma.proveedor.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar proveedor:", error);
    
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "ID inválido", details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Error al eliminar el proveedor" },
      { status: 500 }
    );
  }
}