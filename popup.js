document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chat-window');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
  
    // Function to add a message to the chat window
    const addMessage = (message, sender = 'user') => {
      const messageElem = document.createElement('div');
      messageElem.textContent = `${sender === 'user' ? 'You: ' : 'Assistant: '}${message}`;
      messageElem.className = sender;
      chatWindow.appendChild(messageElem);
      chatWindow.scrollTop = chatWindow.scrollHeight;
    };
  
    // Event listener for the send button
    sendBtn.addEventListener('click', () => {
      const message = chatInput.value.trim();
      if (message) {
        addMessage(message, 'user');
        // Placeholder for assistant response
        setTimeout(() => {
          addMessage("I'm processing your request...", 'assistant');
        }, 500);
        chatInput.value = '';
      }
    });
  
    // Allow sending message with Enter key
    chatInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        sendBtn.click();
      }
    });
  });
  