import { HttpTypes } from "@medusajs/types";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.MEDUSA_BACKEND_URL;
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "de";

const SHOP_BASE_PATH = "/shop";

const regionMapCache = {
  regionMap: new Map<string, HttpTypes.StoreRegion>(),
  regionMapUpdated: Date.now(),
};

async function getRegionMap(cacheId: string) {
  const { regionMap, regionMapUpdated } = regionMapCache;

  if (!BACKEND_URL) {
    throw new Error(
      "Proxy.ts: Error fetching regions. Did you set up regions in your Medusa Admin and define a MEDUSA_BACKEND_URL environment variable? Note that the variable is no longer named NEXT_PUBLIC_MEDUSA_BACKEND_URL.",
    );
  }

  if (
    !regionMap.keys().next().value ||
    regionMapUpdated < Date.now() - 3600 * 1000
  ) {
    // Fetch regions from Medusa. We can't use the JS client here because proxy is running on Edge and the client needs a Node environment.
    const { regions } = await fetch(`${BACKEND_URL}/store/regions`, {
      headers: {
        "x-publishable-api-key": PUBLISHABLE_API_KEY!,
      },
    }).then(async (response) => {
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message);
      }

      return json;
    });

    if (!regions?.length) {
      throw new Error(
        "No regions found. Please set up regions in your Medusa Admin.",
      );
    }

    // Create a map of country codes to regions.
    regions.forEach((region: HttpTypes.StoreRegion) => {
      region.countries?.forEach((c) => {
        regionMapCache.regionMap.set(c.iso_2 ?? "", region);
      });
    });

    regionMapCache.regionMapUpdated = Date.now();
  }

  return regionMapCache.regionMap;
}

async function getCountryCode(
  request: NextRequest,
  regionMap: Map<string, HttpTypes.StoreRegion | number>,
) {
  try {
    let countryCode;

    const vercelCountryCode = request.headers
      .get("x-vercel-ip-country")
      ?.toLowerCase();

    // Expect country code at /shop/:countryCode/...
    const urlCountryCode = request.nextUrl.pathname
      .split("/")
      .filter(Boolean)[1]
      ?.toLowerCase();

    if (urlCountryCode && regionMap.has(urlCountryCode)) {
      countryCode = urlCountryCode;
    } else if (vercelCountryCode && regionMap.has(vercelCountryCode)) {
      countryCode = vercelCountryCode;
    } else if (regionMap.has(DEFAULT_REGION)) {
      countryCode = DEFAULT_REGION;
    } else if (regionMap.keys().next().value) {
      countryCode = regionMap.keys().next().value;
    }

    return countryCode;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "Proxy.ts: Error getting the country code. Did you set up regions in your Medusa Admin and define a MEDUSA_BACKEND_URL environment variable? Note that the variable is no longer named NEXT_PUBLIC_MEDUSA_BACKEND_URL.",
      );
    }
  }
}

function isShopPath(pathname: string) {
  return (
    pathname === SHOP_BASE_PATH || pathname.startsWith(`${SHOP_BASE_PATH}/`)
  );
}

function isStaticAsset(pathname: string) {
  return pathname.includes(".");
}

export async function proxy(request: NextRequest) {
  // Only proxy shop routes.
  if (!isShopPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  let redirectUrl = request.nextUrl.href;
  let response = NextResponse.redirect(redirectUrl, 307);

  const cacheIdCookie = request.cookies.get("_medusa_cache_id");
  const cacheId = cacheIdCookie?.value || crypto.randomUUID();

  const regionMap = await getRegionMap(cacheId);
  const countryCode = regionMap && (await getCountryCode(request, regionMap));

  const pathSegments = request.nextUrl.pathname.split("/").filter(Boolean);
  const urlHasCountryCode =
    Boolean(countryCode) && pathSegments[1]?.toLowerCase() === countryCode;

  if (urlHasCountryCode && cacheIdCookie) {
    return NextResponse.next();
  }

  if (urlHasCountryCode && !cacheIdCookie) {
    response.cookies.set("_medusa_cache_id", cacheId, {
      maxAge: 60 * 60 * 24,
    });
    return response;
  }

  if (isStaticAsset(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const shopPathAfterBase =
    request.nextUrl.pathname.slice(SHOP_BASE_PATH.length) || "/";
  const redirectPath = shopPathAfterBase === "/" ? "" : shopPathAfterBase;
  const queryString = request.nextUrl.search ? request.nextUrl.search : "";

  if (!urlHasCountryCode && countryCode) {
    redirectUrl = `${request.nextUrl.origin}${SHOP_BASE_PATH}/${countryCode}${redirectPath}${queryString}`;
    response = NextResponse.redirect(redirectUrl, 307);
  } else if (!urlHasCountryCode && !countryCode) {
    return new NextResponse(
      "No valid regions configured. Please set up regions with countries in your Medusa Admin.",
      { status: 500 },
    );
  }

  return response;
}

export const config = {
  matcher: ["/shop", "/shop/:path*"],
};
