import { google } from "googleapis";

export async function getGoogleDocContent(docId: string, accessToken: string) {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const docs = google.docs({ version: "v1", auth });

    try {
        const res = await docs.documents.get({
            documentId: docId,
        });

        const content = res.data.body?.content;
        if (!content) return "";

        let text = "";
        content.forEach((element) => {
            if (element.paragraph) {
                element.paragraph.elements?.forEach((el) => {
                    if (el.textRun?.content) {
                        text += el.textRun.content;
                    }
                });
                text += "\n"; // Improve paragraph spacing logic if needed
            }
        });

        return { title: res.data.title, text };
    } catch (error) {
        console.error("Error fetching doc:", error);
        throw error;
    }
}
