<script>
   import {Button,List,ListInput} from "framework7-svelte"

  //import EmojiSelector from 'svelte-emoji-selector'; //commented for bundle size

  export let addMessage;
  let message = "";

  function sendMessage() {
    if (message.trim().length > 0) {
      addMessage(message.trim());
      message = "";
    }
  }

  function onEmoji(event) {
    message += event.detail;
  }

</script>

<List noHairlinesMd>
  <ListInput
    type="text"
    placeholder="Write Something"
    clearButton
    bind:value={message}
    on:keydown={(ev) => {
      if (ev.key == "Enter") {
        sendMessage();
      }
    }}
  />
  <Button on:click={sendMessage}>
      Send
  </Button>
</List>
