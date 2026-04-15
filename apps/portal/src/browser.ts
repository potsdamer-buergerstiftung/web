"use client";

import { createDirectus, rest, staticToken } from "@directus/sdk";
import { Schema } from "./types/directus";

const browserClient = createDirectus<Schema>(
  "https://portal.potsdamer-buergerstiftung.org",
).with(rest());

export default browserClient;
