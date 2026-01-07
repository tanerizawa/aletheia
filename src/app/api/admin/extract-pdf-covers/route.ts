import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const limit = body && typeof body.limit === 'number' ? body.limit : undefined;

    const scriptPath = path.join(process.cwd(), 'scripts', 'extract-pdf-covers.js');
    const arg = limit && Number.isInteger(limit) && limit > 0 ? String(limit) : '';
    const { stdout } = await execAsync(`node "${scriptPath}" ${arg}`, { timeout: 10 * 60 * 1000 });
    try {
      const parsed = JSON.parse(stdout);
      return NextResponse.json({ success: true, results: parsed.results });
    } catch (parseErr) {
      return NextResponse.json({ success: true, output: stdout });
    }
  } catch (error) {
    console.error('[PDF Cover Extract] Failed to run script:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to run extraction script' }, { status: 500 });
  }
}
