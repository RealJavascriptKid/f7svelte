<script>
   import {Button,List,ListItem} from "framework7-svelte"
  export let addMessage;
export let options;
  export let placeholder

  let values = [];

  function sendMessage() {
      addMessage({text:values.join(','),value:values});       
  }

  function onChange(e) {
    var value = e.target.value;
    if (e.target.checked) {
      values.push(value);
    } else {
      values.splice(values.indexOf(value), 1);
    }
    values = values;
  }
  

</script>


  
<List>
  {#each options as multOption}


  <ListItem checkbox value={multOption} title={multOption} onChange={onChange}></ListItem>


  {/each}
</List>

<Button
  on:click={sendMessage}
  >
   Select
  </Button>