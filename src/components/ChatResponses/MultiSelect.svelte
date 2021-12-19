<script>
   import {Button,List,ListItem} from "framework7-svelte"
  export let addMessage;
  export let options;
  export let placeholder = "Select";

  let values = [];

  function sendMessage() {
      console.warn("VALUES:",values)
      addMessage({text:values.join(','),value:values});       
  }
 

</script>


  
<List>
 
  <ListItem title={placeholder} smartSelect smartSelectParams={{openIn: 'popover'}}>
    <select name="multi" multiple bind:value={values} >
      {#each options as multOption}

          <option value={multOption}>{multOption}</option>
      
      {/each}
    </select>
  </ListItem>

</List>

<Button
  on:click={sendMessage}
  >
   Select
  </Button>