export function AltchaWidget() {
    if (typeof window === undefined) {
        return null;
    }

    import("altcha");

    return (
        <altcha-widget
            challengeurl="/api/altcha"
            auto="onsubmit"
            debug
            hidelogo
            hidefooter
            strings="{&quot;label&quot;:&quot;Ich bin kein Bot&quot;}"
            style={{
                "--altcha-border-radius": "0.375rem",
                "--altcha-border-width": "1px",
                "--altcha-color-base": "transparent",
                "--altcha-color-border": "transparent",
                "--altcha-color-border-focus": "transparent",
                "--altcha-max-width": "320px",
            }}
        />
    )
}