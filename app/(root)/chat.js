import { useState } from 'react';
import axios from 'axios';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const userMsg = { role: 'user', content: input };
    setMessages([...messages, userMsg]);
    setInput('');

    const res = await axios.post('/api/chat', { message: input });
    const botMsg = { role: 'assistant', content: res.data.reply };
    setMessages((prev) => [...prev, botMsg]);
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>AI Chatbot</h1>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'auto' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: '10px' }}>
            <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '80%' }}
        placeholder="Ask something..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
