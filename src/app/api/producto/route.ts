import { NextRequest, NextResponse } from "next/server";
import { productodto } from "./producto.dto";

export async function GET() {
    return NextResponse.json(productos)
}

export async function POST(req: NextRequest){
    const data:productodto = await req.json()
    productos = [...productos, data]
    return NextResponse.json({message: "Producto agregado correctamente", succedded: true})
}

export async function PUT(req: NextRequest){
    const data:productodto = await req.json()
    let indexProduct = productos.findIndex(x => x.Id == data.Id)
    productos[indexProduct] = data
    return NextResponse.json({message: "Producto actualizado correctamente", succedded: true})

}

export async function DELETE(req: NextRequest){
    let searchParams = req.nextUrl.searchParams
    const id = parseInt( searchParams.get('id') ?? "0")
    let indexProduct = productos.findIndex(x => x.Id == id)
    productos.splice(indexProduct,1)
    return NextResponse.json({message: "Producto eliminado correctamente", succedded: true})
}

//lista objetos JS
let productos = [
    {
        Id: 1,
        Nombre: "Rollo",
        Descripcion: "papel higienico",
        Costo: 111
    },
    {
        Id: 2,
        Nombre: "Gel",
        Descripcion: "Gel para el pelo",
        Costo: 120
    },
    {
        Id: 3,
        Nombre: "clayolas",
        Descripcion: "Colorear",
        Costo: 300
    },
    {
        Id: 4,
        Nombre: "pañales",
        Descripcion: "pañales para bebe",
        Costo: 350
    },
    {
        Id: 5,
        Nombre: "corta uñas",
        Descripcion: "recorte de uñas",
        Costo: 310
    },
    {
        Id: 6,
        Nombre: "Peine",
        Descripcion: "Acomodo de pelo",
        Costo: 110
    },
    {
        Id: 7,
        Nombre: "ligas para pelo",
        Descripcion: "ligas para el pelo",
        Costo: 50
    }
]