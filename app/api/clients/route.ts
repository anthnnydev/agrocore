import { NextRequest, NextResponse } from "next/server";
import { createClientSchema } from "@/src/schemas/client.schema";
import { prisma } from "@/src/lib/prisma";
import { ZodError } from "zod";

// GET: Obtener todos los clientes
export async function GET() {
  try {
    const clients = await prisma.cliente.findMany({
      include: {
        _count: {
          select: { ventas: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    
    return NextResponse.json(clients);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    return NextResponse.json(
      { error: "Error al obtener clientes" },
      { status: 500 }
    );
  }
}

// POST: Crear un nuevo cliente
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar datos con Zod
    const validatedData = createClientSchema.parse(body);
    
    const newClient = await prisma.cliente.create({
      data: {
        nombre: validatedData.nombre,
        ciudad: validatedData.ciudad,
        notas: validatedData.notas,
      },
    });
    
    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    console.error("Error al crear cliente:", error);
    
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Datos inválidos", details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Error al crear cliente" },
      { status: 500 }
    );
  }
}