import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const entry = {
      timestamp: new Date().toISOString(),
      companyName: body.companyName || "",
      industry: body.industry || "",
      employees: body.employees || 0,
      manualHoursPerWeek: body.manualHoursPerWeek || 0,
      avgHourlyRate: body.avgHourlyRate || 0,
      processes: body.processes || [],
      email: body.email || "",
      result: body.result || null,
    };

    // Append to a local JSON lines file
    const dataDir = path.join(process.cwd(), "data");
    await fs.mkdir(dataDir, { recursive: true });
    const filePath = path.join(dataDir, "leads.jsonl");
    await fs.appendFile(filePath, JSON.stringify(entry) + "\n");

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Lead capture error:", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
