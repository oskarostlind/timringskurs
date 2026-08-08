/**
 * Konfiguration för Sanity Studio — redigeringsverktyget som ligger på
 * timringskurs.nu/studio. Innehållsmodellen finns i sanity/schemaTypes.
 */
import { svSELocale } from "@sanity/locale-sv-se";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "norrhed",
  title: "Norrhed Skog",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    // Gör hela Studio svensk — annars står det "Publish" och "Add item".
    svSELocale(),
    structureTool({ structure }),
    // Vision är ett utvecklarverktyg för att testa frågor mot innehållet.
    ...(process.env.NODE_ENV === "development"
      ? [visionTool({ defaultApiVersion: apiVersion })]
      : []),
  ],
  document: {
    // Singletons ska varken kunna dupliceras eller raderas av misstag.
    actions: (input, context) =>
      ["startsida", "sidinstallningar"].includes(context.schemaType)
        ? input.filter(
            ({ action }) =>
              action && !["unpublish", "delete", "duplicate"].includes(action)
          )
        : input,
  },
});
