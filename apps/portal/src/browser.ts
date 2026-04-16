"use client";

import { createDirectus, rest } from "@directus/sdk";
import { Schema } from "./types/directus";

const browserClient = createDirectus<Schema>(process.env.NEXT_PUBLIC_PORTAL_URL).with(rest());

export default browserClient;
