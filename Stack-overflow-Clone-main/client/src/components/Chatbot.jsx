import React, { useState } from 'react';
import axios from 'axios';

const ChatGPTBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message to the chat
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    try {
      // Make API call to OpenAI
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo', // Replace with `gpt-4` if available
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            ...newMessages.map((msg) => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text,
            })),
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            // Replace with your API key
          },
        }
      );

      // Add assistant response to the chat
      const botReply = response.data.choices[0].message.content;
      setMessages([...newMessages, { sender: 'bot', text: botReply }]);
    } catch (error) {
      console.error('Error communicating with OpenAI:', error);
      setMessages([...newMessages, { sender: 'bot', text: 'Something went wrong. Please try again.' }]);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>ChatGPT Bot</h2>
      <div
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          maxHeight: '300px',
          overflowY: 'scroll',
          marginBottom: '10px',
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.sender === 'user' ? 'right' : 'left',
              margin: '5px 0',
            }}
          >
            <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        style={{ width: '80%', padding: '10px' }}
      />
      <button onClick={handleSend} style={{ padding: '10px', marginLeft: '10px' }}>
        Send
      </button>
    </div>
  );
};

export default ChatGPTBot;
