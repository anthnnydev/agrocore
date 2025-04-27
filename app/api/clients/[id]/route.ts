import { NextRequest, NextResponse } from "next/server";
import { updateClientSchema, deleteClientSchema } from "@/src/schemas/client.schema";
import { prisma } from "@/src/lib/prisma";
import { ZodError } from "zod";

// GET: Obtener un cliente por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const client = await prisma.cliente.findUnique({
      where: { id },
      include: {
        _count: {
          select: { ventas: true },
        },
      },
    });
    
    if (!client) {
      return NextResponse.json(
        { error: "Cliente no encontrado" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(client);
  } catch (error) {
    console.error("Error al obtener cliente:", error);
    return NextResponse.json(
      { error: "Error al obtener cliente" },
      { status: 500 }
    );
  }
}

// PUT: Actualizar un cliente
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    
    // Validar datos con el esquema Zod
    const validatedData = updateClientSchema.parse({ id, ...body });
    
    // Verificar si existe el cliente
    const clientExists = await prisma.cliente.findUnique({
      where: { id },
    });
    
    if (!clientExists) {
      return NextResponse.json(
        { error: "Cliente no encontrado" },
        { status: 404 }
      );
    }
    
    // Actualizar cliente
    const updatedClient = await prisma.cliente.update({
      where: { id },
      data: {
        nombre: validatedData.nombre,
        ciudad: validatedData.ciudad,
        notas: validatedData.notas,
      },
    });
    
    return NextResponse.json(updatedClient);
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Datos inválidos", details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Error al actualizar cliente" },
      { status: 500 }
    );
  }
}

// DELETE: Eliminar un cliente
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Validar el ID con Zod
    deleteClientSchema.parse({ id });
    
    // Verificar si existe el cliente
    const cliente = await prisma.cliente.findUnique({
      where: { id },
      include: { 
        ventas: true 
      },
    });
    
    if (!cliente) {
      return NextResponse.json(
        { error: "Cliente no encontrado" },
        { status: 404 }
      );
    }
    
    // Eliminar las ventas asociadas al cliente si existen
    if (cliente.ventas.length > 0) {
      await prisma.venta.deleteMany({
        where: { clienteId: id },
      });
    }
    
    // Eliminar el cliente
    await prisma.cliente.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "ID inválido", details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Error al eliminar el cliente" },
      { status: 500 }
    );
  }
}