// app/api/me/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const token = (await cookies()).get("token")?.value;
  const { userId, theme } = await request.json();

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/theme`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
    body: theme,
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user: data });
}
