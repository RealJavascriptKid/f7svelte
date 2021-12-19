<script>
  import { Block,Row, Col, Button } from 'framework7-svelte';
  
   import {lastMessage} from "../../stores/lastMessage";  

  import { createEventDispatcher,afterUpdate } from 'svelte';

	const dispatch = createEventDispatcher();

  import ImgGallery from "./ImgGallery.svelte";
  import MultiSelect from "./MultiSelect.svelte";
  import Form from "./Form.svelte";

  function addMessage(response) {
    dispatch('reply', response)
  }
  </script>
  
 <Block>
  {#if $lastMessage && $lastMessage.id}
  

    {#if $lastMessage.replytype == 'imgGallery'}

        <ImgGallery {addMessage} images={$lastMessage.images}/>

    {:else if $lastMessage.replytype == 'multiSelect'}

        <MultiSelect {addMessage} options={$lastMessage.options} placeholder={$lastMessage.text}/>

    {:else if $lastMessage.replytype == 'button'}
    
        <Row>
        {#each $lastMessage.buttons as btnOption}
         
            <Col width="50" medium="33" large="25">
             
              <Button outline round on:click={addMessage(btnOption)}>{btnOption.text || btnOption.value}</Button>
            </Col>
         
          
        {/each}
        </Row>

    {:else if $lastMessage.replytype == 'form'}    

        <Form {addMessage} inputs={$lastMessage.inputs}/>

    {:else}

        <Form {addMessage} isSingleInput={true} inputs={[{type:$lastMessage.replytype,placeholder:$lastMessage.label}]}/>

    {/if}

  {/if}
  </Block>
