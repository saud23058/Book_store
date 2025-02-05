import { dbConnection } from "@/app/lib/db";
import { loginSchema } from "@/app/lib/types";
import { userModel } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"

dbConnection();

export async function POST(req:NextRequest) {
  try {
    const body = await req.json();


   


    const validateUser = loginSchema.safeParse(body);
    if (!validateUser.success) {
      return NextResponse.json({
        message: "Invalid credentials",
        error: validateUser.error?.format(),
      }, {
        status:400
      })
    }
    const { email, password } = validateUser.data;
   
    const user = await userModel.findOne({
      email
    })
    if (!user) {
      return NextResponse.json({
        message:"User not found"
      },
        {
        status:404
      }
      )
    }
    const isCorrectPassword =await bcrypt.compare(password, user.password);
    if (isCorrectPassword) {
      return NextResponse.json({
        message:"Successfully logged in"
      },
        {
        status:200
      }
      )
    } else {
      return NextResponse.json({
        message:"Invalid password"
      },
        {
        status:404
      }
      )
    }


  } catch (error) {
    return NextResponse.json({
      message:`Unable to log in due to ${error}`  
    },
      {
      status:404
    }
    )
  }
}
