import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password, role } = reqBody;

    console.log("Login request body:", reqBody);

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }

    // Check password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // Check role match
    if (user.role !== role) {
      return NextResponse.json({ error: `This account is registered as a ${user.role}, not a ${role}` }, { status: 403 });
    }

    // Prepare token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    // Generate JWT
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d"
    });

    // Create response and set cookie
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      role: user.role
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
