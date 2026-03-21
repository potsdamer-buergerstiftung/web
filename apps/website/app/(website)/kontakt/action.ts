"use server";

import directus from "../directus";
import { createItem } from "@directus/sdk";
import * as alcha from 'altcha';
import { verifySolution } from "altcha-lib";
import { ALTCHA_HMAC_KEY } from "app/api/altcha/route";

export async function submitForm(prevState: any, formData: FormData) {
    const altcha = formData.get('altcha')

    if (!altcha) {
        return {
            success: false,
            message: "Senden fehlgeschlagen. Bitte versuchen Sie es später erneut."
        };
    }

    const verified = await verifySolution(String(altcha), ALTCHA_HMAC_KEY)

    if (!verified) {
        return {
            success: false,
            message: "Senden fehlgeschlagen. Bitte versuchen Sie es später erneut."
        };
    }

    const data = {
        first_name: formData.get("firstName"),
        last_name: formData.get("lastName"),
        organisation: formData.get("organisation"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        subject: formData.get("subject"),
        message: formData.get("message"),
    };

    try {
        await directus.request(createItem("contact_requests", data));
        return { success: true, message: "Nachricht erfolgreich gesendet!" };
    } catch {
        return { success: false, message: "Senden fehlgeschlagen. Bitte versuchen Sie es später erneut." };
    }
}
