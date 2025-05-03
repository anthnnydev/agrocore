import { NextRequest, NextResponse } from "next/server";
import { updateTipoProveedorSchema, deleteTipoProveedorSchema } from "@/src/schemas/suppliertype.schema";
import { prisma } from "@/src/lib/prisma";
import { ZodError } from "zod";

// GET: Obtener un tipo proveedor por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const typesupplier = await prisma.tipoProveedor.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            proveedores: true
          },
        },
      },
    });
    
    if (!typesupplier) {
      return NextResponse.json(
        { error: "Tipo proveedor no encontrado" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(typesupplier);
  } catch (error) {
    console.error("Error al obtener el tipo proveedor:", error);
    return NextResponse.json(
      { error: "Error al obtener el tipo proveedor" },
      { status: 500 }
    );
  }
}

// PUT: Actualizar un tipo proveedor
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    
    // Validar datos con el esquema Zod
    const validatedData = updateTipoProveedorSchema.parse({ id, ...body });
    
    // Verificar si existe el proveedor
    const typeSupplierExists = await prisma.tipoProveedor.findUnique({
      where: { id },
    });
    
    if (!typeSupplierExists) {
      return NextResponse.json(
        { error: "Tipo proveedor no encontrado" },
        { status: 404 }
      );
    }
    
    // Actualizar tipo proveedor
    const updatedTypeSupplier = await prisma.tipoProveedor.update({
      where: { id },
      data: {
        nombre: validatedData.nombre
      },
    });
    
    return NextResponse.json(updatedTypeSupplier);
  } catch (error) {
    console.error("Error al actualizar el tipo de proveedor:", error);
    
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

// DELETE: Eliminar un tipo proveedor
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Validar el ID con Zod
    deleteTipoProveedorSchema.parse({ id });
    
    // Verificar si existe el proveedor
    const typesupplier = await prisma.tipoProveedor.findUnique({
      where: { id },
      include: { 
        proveedores: true,
      },
    });
    
    if (!typesupplier) {
      return NextResponse.json(
        { error: "TIpo proveedor no encontrado" },
        { status: 404 }
      );
    }
    
    // Eliminar los lotes asociadas al proveedor si existen
    if (typesupplier.proveedores.length > 0) {
      await prisma.proveedor.deleteMany({
        where: { tipoId: id },
      });
    }
    
    // Eliminar el proveedor
    await prisma.tipoProveedor.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar el tipo proveedor:", error);
    
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "ID inválido", details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Error al eliminar el tipo proveedor" },
      { status: 500 }
    );
  }
}