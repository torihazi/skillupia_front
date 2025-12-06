import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  // ここで auth.jsのsessionを取得
  const session = await auth();
  // これはdead codeではないか？
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const accessToken = session.accessToken;
  try {
    const res = await fetch("http://localhost:8000/users/setup", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to setup user" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "User setup successful" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
