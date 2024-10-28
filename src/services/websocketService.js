// src/services/websocketService.js
class WebSocketService {
   constructor(url) {
       this.url = url;
       this.ws = null;
       this.isConnected = false;
       this.messageQueue = [];
       this.onMessageCallback = null;
       this.onOpenCallback = null;
       this.onErrorCallback = null;
       this.onCloseCallback = null;
   }

   connect() {
       this.ws = new WebSocket(this.url);

       this.ws.onopen = (event) => {
           console.log('WebSocket connection established', event);
           this.isConnected = true;
           if (this.onOpenCallback) {
               this.onOpenCallback(event);
           }
           // Send any queued messages after connection opens
           while (this.messageQueue.length > 0) {
               const message = this.messageQueue.shift();
               this.sendMessage(message);
           }
       };

       this.ws.onmessage = (event) => {
           const message = JSON.parse(event.data);
           console.log('Received message:', message);
           if (this.onMessageCallback) {
               this.onMessageCallback(message);
           }
       };

       this.ws.onerror = (error) => {
           console.error("WebSocket Error: ", error);
           if (this.onErrorCallback) {
               this.onErrorCallback(error);
           }
       };

       this.ws.onclose = (event) => {
           console.log('WebSocket connection closed:', event);
           this.isConnected = false;
           if (this.onCloseCallback) {
               this.onCloseCallback(event);
           }
           // Attempt to reconnect if the close was unexpected
           if (!event.wasClean) {
               setTimeout(() => {
                   if (!this.isConnected) {
                       this.connect();
                   }
               }, 3000); // Retry connection after 3 seconds
           }
       };
   }

   sendMessage(message) {
       if (this.ws && this.ws.readyState === WebSocket.OPEN) {
           this.ws.send(JSON.stringify(message));
       } else {
           console.error('WebSocket is not open. Queueing message:', message);
           this.messageQueue.push(message);
       }
   }

   close() {
       if (this.ws) {
           this.ws.close();
           this.isConnected = false;
       }
   }

   setOnMessageCallback(callback) {
       this.onMessageCallback = callback;
   }

   setOnOpenCallback(callback) {
       this.onOpenCallback = callback;
   }

   setOnErrorCallback(callback) {
       this.onErrorCallback = callback;
   }

   setOnCloseCallback(callback) {
       this.onCloseCallback = callback;
   }
}

export default WebSocketService;
