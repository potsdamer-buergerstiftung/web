import { FrappeApp } from "frappe-js-sdk";

const frappe = new FrappeApp("https://verwaltung.potsdamer-buergerstiftung.org", {
    useToken: true,
    token: () => "7a64b95fb6b2fe4:d29d70afca584db",
    type: "token"
})

export default async function PortalPage() {
    const db = frappe.db();

    db.getDocList('DocType')
        .then((docs) => console.log(docs))
        .catch((error) => console.error(error));

    return (
        <>
            <h1>Hallo</h1></>
    )
}