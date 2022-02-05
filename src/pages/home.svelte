<Page name="home">
  <Navbar title={navbartitle} />
    <ChatBot/>

</Page>
  

<script>
  import ChatBot from '../components/ChatBot/ChatBot.svelte';
  
   import { onDestroy, onMount } from "svelte";
   import {
      f7ready,
      Navbar,
      Page
    } from 'framework7-svelte';
  let navbartitle = 'Messages';
 

</script>