import { createClient, ApiKeyStrategy } from '@wix/sdk';
import { items } from '@wix/data';
import { wixEventsV2 } from '@wix/events'
import { files } from "@wix/media";

export const wixClient = createClient({
  modules: {
    items,
    wixEventsV2,
    files
  },
  auth: ApiKeyStrategy({
    siteId: 'f409256a-546a-4602-8ef0-1894a98c7c95',
    apiKey: process.env.WIX_API_KEY,
  }),
});