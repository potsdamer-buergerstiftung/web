import { Button } from "@/components/ui/button";
import LocalizedClientLink from "@/modules/common/components/localized-client-link";

const SignInPrompt = () => {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-background/60 p-5">
      <div>
        <h2 className="font-header text-2xl font-bold text-foreground">
          Sie haben bereits ein Konto?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Melden Sie sich an für ein besseres Einkaufserlebnis.
        </p>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button variant="secondary" size="lg" data-testid="sign-in-button">
            Anmelden
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  );
};

export default SignInPrompt;
