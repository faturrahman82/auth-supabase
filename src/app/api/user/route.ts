import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";

// Define a schema for input validation

const FormSchema = z.object({
  username: z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = FormSchema.parse(body);

    // if email alredy exists
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: "user with this email already exists",
        },
        { status: 409 }
      );
    }

    // if username alredy exists
    const existingUserByUsername = await db.user.findUnique({
      where: { username: username },
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, message: "user with this username already exists" },
        { status: 409 }
      );
    }

    const hasedPassoword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hasedPassoword,
      },
    });

    const { password: NewUserPassword, ...rest } = newUser;

    return NextResponse.json(
      {
        user: rest,
        message: "user create success ",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Somethink wrong!!! ",
      },
      { status: 500 }
    );
  }
}
