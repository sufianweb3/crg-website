import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const clientsDir = path.join(process.cwd(), "public", "assets", "clients");

  try {
    if (!fs.existsSync(clientsDir)) {
      return NextResponse.json({ logos: [] });
    }

    const files = fs.readdirSync(clientsDir);
    const imageFiles = files.filter((file) =>
      /\.(png|jpg|jpeg|svg|webp)$/i.test(file)
    );

    const logos = imageFiles.map((file) => ({
      src: `/assets/clients/${file}`,
      alt: file.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
    }));

    return NextResponse.json({ logos });
  } catch {
    return NextResponse.json({ logos: [] });
  }
}