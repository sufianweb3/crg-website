import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const licenseDir = path.join(process.cwd(), "public", "assets", "license");

  try {
    if (!fs.existsSync(licenseDir)) {
      return NextResponse.json({ logos: [] });
    }

    const files = fs.readdirSync(licenseDir);
    const imageFiles = files.filter((file) =>
      /\.(png|jpg|jpeg|svg|webp)$/i.test(file)
    );

    const logos = imageFiles.map((file) => ({
      src: `/assets/license/${file}`,
      alt: file.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
    }));

    return NextResponse.json({ logos });
  } catch {
    return NextResponse.json({ logos: [] });
  }
}