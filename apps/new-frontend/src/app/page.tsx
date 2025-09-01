'use client';
import { Title, Button, Text } from "@shared/ui/components";
import { useContext } from "react";
import { ClientContext } from "@shared/ui/providers";

export default function Home() {
  const { theme, setTheme } = useContext(ClientContext);
  return (
    <main className="p-8">
      <Title>Welcome</Title>
      <Text className="mt-2">This is the new frontend home page.</Text>
      <div className="mt-4">
        <Button onClick={() => setTheme(theme === 'dark' ? 'light': 'dark')}>Get started</Button>
      </div>
    </main>
  );
}
