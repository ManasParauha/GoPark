import {connect } from "@/dbConfig/dbconfig"
import User from "@/models/userSchema"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const {
      name,
      email,
      password,
      role, // 'host' or 'parker'
      address,
      spaceType,
      pricePerHour,
      vehicleType
    } = reqBody

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    // Create new user with role-specific fields
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      address: role === 'host' ? address : undefined,
      spaceType: role === 'host' ? spaceType : undefined,
      pricePerHour: role === 'host' ? pricePerHour : undefined,
      vehicleType: role === 'parker' ? vehicleType : undefined,
    })

    const savedUser = await newUser.save()

    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      savedUser
    })

  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 })
  }
}
