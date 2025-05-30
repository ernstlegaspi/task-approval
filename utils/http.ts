import { NextResponse } from "next/server"

export const OK = (data: any) => NextResponse.json({ data }, { status: 200 })
export const Inserted = (data: any) => NextResponse.json({ data }, { status: 201 })

export const BadRequest = () => NextResponse.json({ message: "Bad Request" }, { status: 400 })
export const NotFound = () => NextResponse.json({ message: "Not Found" }, { status: 404 })

export const ServerError = (e: Error) => NextResponse.json({ message: e.message }, { status: 500 })
