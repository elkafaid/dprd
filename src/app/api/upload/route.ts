import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file found in request' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Get the /public/uploads directory
    const uploadDir = join(process.cwd(), 'public', 'uploads');

    // Create the directory if it doesn't exist
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      // Directory already exists, proceed
    }

    // Generate unique filename to avoid overwrites
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const originalName = file.name.replace(/\s+/g, '-');
    const filename = `${uniqueSuffix}-${originalName}`;

    // Create the path
    const path = join(uploadDir, filename);

    // Write file to disk
    await writeFile(path, buffer);

    // Return the URL string
    const url = `/uploads/${filename}`;

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Internal server error while uploading file' },
      { status: 500 }
    );
  }
}
