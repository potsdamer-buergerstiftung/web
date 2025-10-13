import { anthropic } from '@ai-sdk/anthropic';
import { streamText, convertToModelMessages, experimental_createMCPClient, consumeStream, UIMessage, stepCountIs, validateUIMessages, InferUITools, UIDataTypes } from 'ai';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp';

export const maxDuration = 30;

export type UseChatToolsMessage = UIMessage<
  never,
  UIDataTypes
>;

export async function POST(req: Request) {
    let mcpClient: any = null;

    try {
        const body = await req.json();

        const mcpUrl = process.env.DIRECTUS_MCP_URL;
        if (!mcpUrl) {
            throw new Error('DIRECTUS_MCP_URL environment variable is not set');
        }

        // Create transport for this request
        const transport = new StreamableHTTPClientTransport(new URL(mcpUrl), {
            fetch: async (url, options) => {
                
                const response = await fetch(url, {
                    ...options,
                    headers: {
                        ...options?.headers,
                        "Authorization": `Bearer ${process.env.DIRECTUS_MCP_TOKEN || ''}`,
                        "Content-Type": "application/json",
                    }
                });

                return response;
            }
        });

        const mcpClient = await experimental_createMCPClient({
            transport,
        });

        // Get tools from MCP server
        const tools = await mcpClient.tools();
        const messages = await validateUIMessages<UseChatToolsMessage>({
            messages: body.messages,
            tools,
        });
        
        const result = streamText({
            model: anthropic('claude-sonnet-4-5-20250929'),
            messages: convertToModelMessages(messages),
            system: `Rolle:
Du bist ein freundlicher, kompetenter und engagierter persönlicher Assistent der Potsdamer Bürgerstiftung.
Deine Hauptaufgabe ist es, mit Menschen zu sprechen, die sich für ehrenamtliches Engagement interessieren oder mehr über die Stiftung erfahren möchten.
Ziel:
Unterstütze Interessierte dabei,
passende Ehrenamtsmöglichkeiten zu finden,
Informationen über Projekte, Veranstaltungen und Mitmach-Angebote zu erhalten,
den Kontakt zur Bürgerstiftung Potsdam herzustellen,
und bei Bedarf hilfreiche Ressourcen, Links oder Ansprechpartner zu nennen.
Tonfall und Stil:
Herzlich, zugewandt und respektvoll
Klar und leicht verständlich (kein Amtsdeutsch)
Motivierend, aber nicht aufdringlich
Duzen ist erlaubt, wenn es natürlich wirkt (z. B. bei jüngeren Interessierten oder informellen Kontexten)
Beispielhafte Gesprächsaufgaben:
„Ich möchte mich ehrenamtlich engagieren – was kann ich tun?“
„Welche Projekte unterstützt die Bürgerstiftung?“
„Wie kann ich spenden oder Mitglied werden?“
„Gibt es aktuell Veranstaltungen oder Informationsabende?“
Verhalten:
Stelle bei Bedarf Rückfragen, um besser zu verstehen, was die Person interessiert (z. B. Themenfelder, verfügbare Zeit, Fähigkeiten).
Biete passende Vorschläge oder Informationen an.
Wenn du etwas nicht genau weißt, erkläre das transparent und biete an, die richtigen Kontaktinformationen oder Quellen zu liefern.
Bewahre stets einen positiven, lösungsorientierten Ton.
Wichtige Hintergrundinfos (Kurzfassung):
Die Potsdamer Bürgerstiftung ist eine gemeinnützige Organisation, die sich für das Miteinander und die Lebensqualität in Potsdam engagiert. Sie fördert Projekte in Bereichen wie Bildung, Kultur, Umwelt, Nachbarschaft und bürgerschaftliches Engagement.`,
            tools,
            stopWhen: stepCountIs(10),
        });

        return result.toUIMessageStreamResponse({
            consumeSseStream: consumeStream,
        });
    } catch (error) {
        console.error('Chat API error:', error);

        // Cleanup MCP connection on error
        if (mcpClient) {
            try {
                await mcpClient.close();
            } catch (closeError) {
                console.error('Error closing MCP client:', closeError);
            }
        }

        return new Response(
            JSON.stringify({
                error: 'Failed to process chat request',
                details: error instanceof Error ? error.message : 'Unknown error'
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}

