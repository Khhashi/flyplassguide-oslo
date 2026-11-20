import { useState } from 'react';
import { Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { Screen } from '@/components/Screen';
import { TextField } from '@/components/TextField';
import { useChat } from '@/features/assistant/useChat';

export default function AssistantScreen() {
  const { messages, send } = useChat();
  const [draft, setDraft] = useState('');

  function submit() {
    send(draft);
    setDraft('');
  }

  return (
    <Screen>
      <Text accessibilityRole="header" className="text-3xl font-bold text-ink">
        AI-assistent
      </Text>
      <View className="gap-3">
        {messages.map((message) => (
          <View
            key={message.id}
            className={`max-w-[85%] rounded-card px-4 py-3 ${
              message.role === 'user' ? 'self-end bg-primary' : 'self-start bg-surface-muted'
            }`}
          >
            <Text
              className={message.role === 'user' ? 'text-base text-white' : 'text-base text-ink'}
            >
              {message.text}
            </Text>
          </View>
        ))}
      </View>
      <TextField
        label="Spørsmål"
        placeholder="Skriv et spørsmål om reisen"
        value={draft}
        onChangeText={setDraft}
        onSubmitEditing={submit}
        returnKeyType="send"
      />
      <Button label="Send" onPress={submit} />
    </Screen>
  );
}
