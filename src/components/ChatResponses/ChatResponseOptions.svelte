<script>
  import { Block,Row, Col, Button } from 'framework7-svelte';
  
   import {lastMessage} from "../../stores/lastMessage";  

  import { createEventDispatcher,afterUpdate } from 'svelte';

	const dispatch = createEventDispatcher();

  import SendContainer from "./SendContainer.svelte";
  import GetEmail from "./GetEmail.svelte";
  import ImgGallery from "./ImgGallery.svelte";
  import MultiSelect from "./MultiSelect.svelte";
  //import Calendar from "./Calendar.svelte";

  function addMessage(response) {
    dispatch('reply', response)
  }
  </script>
  
 <Block>
  {#if $lastMessage && $lastMessage.id}
    
    {#if $lastMessage.replytype == 'text'}
      <SendContainer {addMessage} />
    {/if}

    {#if $lastMessage.replytype == 'fullName'}
      <SendContainer {addMessage} />
    {/if}

    {#if $lastMessage.replytype == 'firstName'}
      <SendContainer {addMessage} />
    {/if}

    {#if $lastMessage.replytype == 'email'}
      <GetEmail {addMessage} />
    {/if}

    {#if $lastMessage.replytype == 'imgGallery'}
        <ImgGallery {addMessage} images={$lastMessage.images}/>
    {/if}

    {#if $lastMessage.replytype == 'multiSelect'}
        <MultiSelect {addMessage} options={$lastMessage.options} placeholder={$lastMessage.text}/>
    {/if}

    <!-- {#if $lastMessage.replytype == 'date'}
        <Calendar {addMessage} type="date"/>
    {/if}

    {#if $lastMessage.replytype == 'time'}
        <Calendar {addMessage} type="time"/>
    {/if}

    {#if $lastMessage.replytype == 'datetime'}
        <Calendar {addMessage} type="datetime"/>
    {/if} -->

    {#if $lastMessage.replytype == 'button'}
        <Row>
        {#each $lastMessage.buttons as btnOption}
         
            <Col width="50" medium="33" large="25">
             
              <Button outline round on:click={addMessage(btnOption)}>{btnOption.text || btnOption.value}</Button>
            </Col>
         
          
        {/each}
        </Row>
    {/if}

  {/if}
  </Block>
