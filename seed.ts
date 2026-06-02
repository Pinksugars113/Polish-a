import { db } from "../server/db";
import { polishes } from "../shared/schema";

async function seed() {
  console.log("Seeding database...");

  const rows = await db.insert(polishes).values([
    {
      brand: "OPI",
      name: "Bubble Bath",
      color: "#F2D8D8",
      notes: "Classic sheer pink",
    },
    {
      brand: "Essie",
      name: "Bordeaux",
      color: "#4C061D",
      notes: "Deep red wine",
    },
    {
      brand: "Sally Hansen",
      name: "Mellow Yellow",
      color: "#FFE761",
      notes: "Bright summer yellow",
    },
    {
      brand: "OPI",
      name: "Alpine Snow",
      color: "#FFFFFF",
      notes: "Crisp white",
    },
    {
      brand: "Essie",
      name: "Mint Candy Apple",
      color: "#99EDC3",
      notes: "Perfect mint green",
    }
  ]).returning();

  if (rows.length === 0) {
    throw new Error("Seeding returned no rows — insert may have failed silently");
  }

  console.log(`Seeding complete! Inserted ${rows.length} polishes.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
