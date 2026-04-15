import { cookies as nextCookies } from "next/headers";

import { Button } from "@/components/ui/button";

async function ProductOnboardingCta() {
  const cookies = await nextCookies();

  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true";

  if (!isOnboarding) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-border bg-background/70 p-6 shadow-sm">
      <div className="flex flex-col gap-4">
        <p className="text-lg font-semibold text-foreground">
          Ihr Demo-Produkt wurde erfolgreich erstellt! 🎉
        </p>
        <p className="text-sm text-muted-foreground">
          Sie können nun die Einrichtung Ihres Shops im Admin fortsetzen.
        </p>
        <a href="http://localhost:7001/a/orders?onboarding_step=create_order_nextjs">
          <Button className="w-full" size="lg">
            Einrichtung im Admin fortsetzen
          </Button>
        </a>
      </div>
    </div>
  );
}

export default ProductOnboardingCta;
