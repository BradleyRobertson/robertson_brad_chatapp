(() => {
  const socket = io();

  let messageList = document.querySelector('ul'),
  chatForm = document.querySelector('form'),
  nameInput = document.querySelector('.nickname'),
  chatMessage = chatForm.querySelector('.message'),
  nickName = null;

  function setNickname() {
    nickName = this.value;
  }

  function appendMessage(msg) {
  let newMsg = `<li>${msg.message}</li>`;
  messageList.innerHTML += newMsg;
  }

  function appendDescMessage(msg) {
    let newMsg = `<li>${msg}</li>`;
    messageList.innerHTML += newMsg;
  }
	
	  function handleSendMessage(e) {
    e.preventDefault();
   nickName = ( nickName && nickName.length > 0) ? nickName : 'user';
   msg = `${nickName} says ${chatMessage.value}`;

   socket.emit('chat message', msg);
   chatMessage.value = "";
   return false;
}


  nameInput.addEventListener('change', setNickname, false);
  chatForm.addEventListener('submit', handleSendMessage, false);
  socket.addEventListener('chat message', appendMessage, false);
  socket.addEventListener('disconnect message', appendDescMessage, false);
})();
