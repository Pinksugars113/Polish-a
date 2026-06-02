import { db } from "../server/db";
import { polishes } from "../shared/schema";
import fs from "fs";
import { parse } from "csv-parse/sync";
import path from "path";

async function seed() {
  console.log("Importing nail polishes from CSV...");

  const csvPath = path.join(process.cwd(), "attached_assets/Nail_Polishes_💖_-_Sheet1_1767649926679.csv");

  if (!fs.existsSync(csvPath)) {
    throw new Error(`CSV file not found: ${csvPath}`);
  }

  let fileContent: string;
  try {
    fileContent = fs.readFileSync(csvPath, "utf-8");
  } catch (err) {
    throw new Error(`Failed to read CSV file: ${err instanceof Error ? err.message : String(err)}`);
  }

  let records: Record<string, string>[];
  try {
    records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });
  } catch (err) {
    throw new Error(`Failed to parse CSV: ${err instanceof Error ? err.message : String(err)}`);
  }

  if (records.length === 0) {
    throw new Error("CSV file contains no data rows");
  }

  const requiredColumns = ["Brand", "Color Name", "Hex"];
  const firstRow = records[0];
  const missingColumns = requiredColumns.filter((col) => !(col in firstRow));
  if (missingColumns.length > 0) {
    throw new Error(`CSV is missing required columns: ${missingColumns.join(", ")}`);
  }

  const polishData = records.map((record, index) => {
    if (!record.Brand || !record["Color Name"] || !record.Hex) {
      throw new Error(`Row ${index + 1} is missing required fields (Brand, Color Name, or Hex)`);
    }
    return {
      brand: record.Brand,
      name: record["Color Name"],
      color: record.Hex,
      notes: record.Finish ? `Finish: ${record.Finish}` : null,
    };
  });

  await db.delete(polishes);
  await db.insert(polishes).values(polishData);

  console.log(`Imported ${polishData.length} polishes!`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Import failed:", err);
  process.exit(1);
});
