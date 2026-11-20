import { useState } from 'react';

export interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  text: string;
}

/** Ærlig svar til assistenten er koblet til ekte data. Den skal aldri gjette. */
export const NOT_CONNECTED_REPLY =
  'Jeg er ikke koblet til fly- eller kartdata ennå, så jeg kan ikke svare på dette. Sjekk skjermene på flyplassen eller avinor.no.';

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((previous) => [
      ...previous,
      { id: previous.length, role: 'user', text: trimmed },
      { id: previous.length + 1, role: 'assistant', text: NOT_CONNECTED_REPLY },
    ]);
  }

  return { messages, send };
}
