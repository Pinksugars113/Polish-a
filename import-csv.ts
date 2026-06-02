import { db } from "../server/db";
import { polishes } from "../shared/schema";
import fs from "fs";
import { parse } from "csv-parse/sync";
import path from "path";
import { runScript } from "./script-runner";

runScript("Import CSV", async () => {
  console.log("Importing nail polishes from CSV...");

  const csvPath = path.join(process.cwd(), "attached_assets/Nail_Polishes_💖_-_Sheet1_1767649926679.csv");
  const fileContent = fs.readFileSync(csvPath, "utf-8");

  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  const polishData = records.map((record: any) => ({
    brand: record.Brand,
    name: record["Color Name"],
    color: record.Hex,
    notes: record.Finish ? `Finish: ${record.Finish}` : null,
  }));

  await db.delete(polishes);
  await db.insert(polishes).values(polishData);

  console.log(`Imported ${polishData.length} polishes!`);
  process.exit(0);
});
