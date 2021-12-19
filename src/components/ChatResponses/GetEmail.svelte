<script>

  // I made a quick demo on how to send messages

  export let addMessage;
  let message = "";
  let errorMsg = '';


function emailIsValid (email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

  function sendMessage() {
    let msg = message.trim();
    if (msg.length > 0) {

       if(!emailIsValid(msg)){
          errorMsg = "Please enter valid email";
          return;
       }

      addMessage(msg);
      message = "";
    }
  }
</script>

<div class="chat__send-container px-2 px-md-3 pt-1 pt-md-3">
  <div class="custom-form__send-wrapper">
    <input
      type="text"
      class="form-control custom-form"
      id="message"
      placeholder="Enter Email"
      autocomplete="off"
      bind:value={message}
      on:keydown={(ev) => {
        errorMsg = "";
        if (ev.key == "Enter") {
          sendMessage();
        }
      }}
    />
    <button type="submit" class="custom-form__send-submit" on:click={sendMessage}>
      Send
    </button>
     <div>{errorMsg}</div>
  </div>
</div>
