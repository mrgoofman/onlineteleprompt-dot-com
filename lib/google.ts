// Edge-compatible Google Docs API using fetch
// This replaces the 'googleapis' library which uses Node.js internals

interface GoogleDocsResponse {
    title?: string;
    body?: {
        content?: Array<{
            paragraph?: {
                elements?: Array<{
                    textRun?: {
                        content?: string;
                    };
                }>;
            };
        }>;
    };
}

export async function getGoogleDocContent(docId: string, accessToken: string) {
    const response = await fetch(
        `https://docs.googleapis.com/v1/documents/${docId}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Google Docs API error:", response.status, errorText);
        throw new Error(`Failed to fetch document: ${response.status}`);
    }

    const data: GoogleDocsResponse = await response.json();

    const content = data.body?.content;
    if (!content) return { title: data.title || "Untitled", text: "" };

    let text = "";
    content.forEach((element) => {
        if (element.paragraph) {
            element.paragraph.elements?.forEach((el) => {
                if (el.textRun?.content) {
                    text += el.textRun.content;
                }
            });
        }
    });

    return { title: data.title || "Untitled", text };
}
