import type { SchemaTypeDefinition } from "sanity";

import { kurs } from "./kurs";
import { sidinstallningar } from "./sidinstallningar";
import { startsida } from "./startsida";
import { tillfalle } from "./tillfalle";

export const schemaTypes: SchemaTypeDefinition[] = [
  kurs,
  startsida,
  sidinstallningar,
  tillfalle,
];
