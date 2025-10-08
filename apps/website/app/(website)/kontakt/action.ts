
// Weist NextJS an, dass diese Funktion auf dem Server ausgeführt wird
"use server";

import directus from "../directus";
import { createItem } from "@directus/sdk";

export async function submitForm(prevState: any, formData: FormData) {

    const data = {
        first_name: formData.get("firstName"),
        last_name: formData.get("lastName"),
        organisation: formData.get("organisation"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        subject: formData.get("subject"),
        message: formData.get("message"),
    };

    console.log(data);

    await directus.request(createItem("contact_requests", data));

    return { success: true, message: "Nachricht erfolgreich gesendet!" };
}