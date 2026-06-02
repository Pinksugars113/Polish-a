import { db } from "../server/db";
import { polishes } from "../shared/schema";
import { runScript } from "./script-runner";

runScript("Seeding", async () => {
  console.log("Seeding database...");

  await db.insert(polishes).values([
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
    },
  ]);

  console.log("Seeding complete!");
  process.exit(0);
});
