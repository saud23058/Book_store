import { dbConnection } from "@/app/lib/db";
import { userSchema } from "@/app/lib/types";
import { userModel } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { generateToken } from "@/app/lib/token";
import { cookies } from "next/headers";

dbConnection();
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validateUser = userSchema.safeParse(body);
    if (!validateUser.success) {
      return NextResponse.json({
        message: "Invalid credentials",
        error: validateUser.error?.format(),
      }, {
        status: 400
      });
    }
    const userExist = await userModel.findOne({
      email: body.email
    });

    if (userExist) {
      return NextResponse.json({
        message: "User already exists"
      }, {
        status: 400
      });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    
    const user = await userModel.create({
      email: body.email,
      password: hashedPassword,
      username: body.username
    });

    const token = generateToken(user._id.toString());
    const cookieStore = await cookies();
    cookieStore.set("authToken", token, { httpOnly: true, secure: true });

    return NextResponse.json({
      message: "User created successfully"
    }, {
      status: 200
    });
  } catch (error) {
    return NextResponse.json({
      message: `Error occurred during creating user ${error}`
    }, {
      status: 400
    });
  }
}


