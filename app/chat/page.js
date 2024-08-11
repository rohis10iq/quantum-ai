"use client";

import { useState, useRef, useEffect } from "react";
import { Box, Button, Stack, TextField, IconButton } from "@mui/material";
import { Send as SendIcon } from '@mui/icons-material'; // Correct import path
import { signIn, logOut } from "../auth/auth";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
} from "firebase/firestore";
import '../styles/globals.css'

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello, I am Quantum. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  

  const sendMessage = async () => {
    if (!message.trim()) return;
    setIsLoading(true);
    setMessage("");
    const userMessage = { role: "user", content: message };

    setMessages((messages) => [
      ...messages,
      userMessage,
      { role: "assistant", content: "" },
    ]);

    let attempts = 0;
    const maxRetries = 3;

    while (attempts < maxRetries) {
      try {
        if (user) {
          await addDoc(collection(db, "messages"), {
            ...userMessage,
            timestamp: new Date(),
          });
        }

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([...messages, userMessage]),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const text = decoder.decode(value, { stream: true });
          setMessages((messages) => {
            let lastMessage = messages[messages.length - 1];
            let otherMessages = messages.slice(0, messages.length - 1);
            return [
              ...otherMessages,
              { ...lastMessage, content: lastMessage.content + text },
            ];
          });
        }
        break;
      } catch (error) {
        console.error("Error:", error);
        attempts++;
        if (attempts >= maxRetries) {
          setMessages((messages) => [
            ...messages,
            {
              role: "assistant",
              content:
                "I'm sorry, but I encountered an error. Please try again later.",
            },
          ]);
        } else {
          console.log(`Retrying... (${attempts}/${maxRetries})`);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSignIn = async () => {
    try {
      await signIn();
      setUser({ email: "User Email" }); // Dummy email for simplicity
    } catch (error) {
      alert("Failed to sign in");
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      setUser(null);
    } catch (error) {
      alert("Failed to sign out");
    }
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box
      className="w-screen h-screen flex flex-col items-center justify-center bg-gray-900 text-white selection:text-[#723ff3]"
    >
      <Stack
        direction={"column"}
        width="700px" 
        height="800px" 
        className="border border-gray-700 p-6 rounded-lg shadow-lg bg-gray-800 overflow-hidden"
      >
        <Stack
          direction={"column"}
          spacing={2}
          className="flex-grow overflow-auto"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              className={`flex ${
                message.role === "assistant" ? "justify-start" : "justify-end"
              } ${index === 0 ? 'font-bold text-xl' : ''}`} 
            >
              <Box
                className={
                  message.role === "assistant"
                  ? "bg-gray-700 p-2 rounded-lg text-white"
                  : "bg-[#723ff3] p-2 rounded-lg text-white"
                }
                text-white
                rounded-lg
                p-4
                shadow-lg
              >
                {message.content}
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
        <Stack direction={"row"} spacing={2} className="mt-4">
          <TextField
            className="bg-gray-700 text-white rounded-lg"
            label="Prompt here..."
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <IconButton
            className=" text-white font-bold py-2 px-4"
            onClick={sendMessage}
            disabled={isLoading}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
}
