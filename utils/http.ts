import { NextResponse } from "next/server"

export const Inserted = (message: string) => NextResponse.json({ message }, { status: 201 })

export const BadRequest = () => NextResponse.json({ message: "Bad Request" }, { status: 400 })