import ChatPreviewClient from "./ChatPreviewClient";

interface Props {
  params: Promise<{ apiKey: string }>;
}

export default async function ChatPreviewPage({ params }: Props) {
  const { apiKey } = await params;

  return <ChatPreviewClient apiKey={apiKey} />;
}