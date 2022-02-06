
  <Messagebar
      sheetVisible={showReplyOptions}
      value={messageText}
      onInput={(e) => messageText = e.target.value}
    >
    <a class="link icon-only" slot="inner-start" on:click={() => showReplyOptions = !showReplyOptions}>
      <Icon
        ios="f7:camera_fill"
        aurora="f7:camera_fill"
        md="material:camera_alt"
      />
    </a>
    
      <a class="link icon-only" slot="inner-end" on:click={sendMessage}>
        <Icon
          ios="f7:arrow_up_circle_fill"
          aurora="f7:arrow_up_circle_fill"
          md="material:send"
        />
      </a>
  
      <MessagebarSheet>
        <!-- {#each images as image, index (index)}
          <MessagebarSheetImage
            key={index}
            image={image}
            checked={attachments.indexOf(image) >= 0}
            onChange={handleAttachment}
          ></MessagebarSheetImage>
        {/each} -->
        <MessagebarSheetItem>         
             {#if showReplyOptions}
                <ChatResponseOptions on:reply={reply} />
             {/if}
        </MessagebarSheetItem>
      </MessagebarSheet>
      
    </Messagebar> 
    <Messages>
      
      {#each $messages as message, index (index)}
        <Message
          type={(message.user == 'me')?'sent':'received'}
          image={message.image}
          name={message.name}
          avatar={(message.user == 'you')?$activeBotData.img:''}
          last={true}
          text={message.text}
        > 
        
      </Message>
      {/each}
      {#if waiting}
        <Message
          type="received"
          typing={true}
          first={true}
          last={true}
          tail={true}
          header={`${$activeBotData.name} is typing`}
          avatar={$activeBotData.img}
        ></Message>
      {/if}
    </Messages>
  

  
    
  <style>
     :global(.messagebar-sheet){
       height:auto;
       max-height:var(--f7-messagebar-sheet-height);
     }
     :global(.messagebar-sheet-item){
      /* height: calc((var(--f7-messagebar-sheet-height) - 2px)); */
      height: 100%;
      width: 100%;
    }  
  
    :global(.messagebar .toolbar-inner) {display:none}
  
  </style>
  
  <script>
    export let bot;
    export let onDataSend;

   import axios from "axios";
  
    import { onDestroy, onMount } from "svelte";
    import { activeBotData } from "./stores/activeBotData"; //bot's own data like name, status etc
    import { collectedData } from "./stores/collectedData"; //data that bot collects from user
    import { lastMessage } from "./stores/lastMessage";
    import { messages } from "./stores/messages";
    import ChatResponseOptions from "./ChatResponses/ChatResponseOptions.svelte";
  
    import {testBotData} from "./stores/testBotData";
  
    if(!bot)
     bot= window.botUrl || testBotData || `http://localhost:9991/bot/testAll`; //it is either data or url to get Bot data
  
    let navbartitle = 'Messages';
  
    let showReplyOptions = false,
        waiting = 0;
  
    function reply(event) {
  
          let obj = event.detail;
          if (typeof obj === "string") obj = { text: obj, value: obj };
  
          if (typeof obj.value === "undefined" && typeof obj.text !== "undefined")
            obj.value = obj.text;
  
          if (typeof obj.text === "undefined" && typeof obj.value !== "undefined")
            obj.text = obj.value;
  
          if (obj.value === null) return;
  
          if(obj.text)
            $messages = [...$messages, { user: "me", text: obj.text }];
  
          fetchNextMessage(obj.value);
  
    }
  
    async function getBotData() {
  
      if (typeof bot === "object") {
        //we assume here bot data is passed as prop lets return it
        return bot;
      }
  
      try {
        waiting++;
        let res = await axios({
          url: `${bot}`,
          method: "GET",
        });
        waiting--;
        return res.data;
      } catch (err) {
        waiting--;
        console.log("Axios Error:", err);
        return {};
      }
    }
  
    function generateUUID() { // Public Domain/MIT
      var d = new Date().getTime();//Timestamp
      var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16;//random number between 0 and 16
          if(d > 0){//Use timestamp until depleted
              r = (d + r)%16 | 0;
              d = Math.floor(d/16);
          } else {//Use microseconds since page-load if supported
              r = (d2 + r)%16 | 0;
              d2 = Math.floor(d2/16);
          }
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
  }
  
    async function sendData(){
  
      if(!$activeBotData || !$activeBotData.dataUrl){
          if(typeof onDataSend !== 'function')          
            return;
      }
        
      let sessionid = localStorage.botClientId || '';
      if(!sessionid){
        sessionid = generateUUID();
        localStorage.botClientId = sessionid;
      }
  
      let url = $activeBotData.dataUrl,
          data = {
            botid:$activeBotData.botId,
            sessionid,
            ...JSON.parse(JSON.stringify($collectedData))
          };
  
      try {
        
        if(typeof onDataSend === 'function'){

            onDataSend(data)            
        }else{

            let res = await axios({
                url,
                method: "POST",
                data
            });
            return res.data;
        }
       
      } catch (err) {
        console.log("Sending Data Error:", err);
        return {};
      }
    }
  
    async function getNextMessage(response) {
      let wait = (time) => {
        return new Promise((res) => setTimeout(res, time * 1000));
      };
  
      let defaultReply = { time: "Chat is ended", text: "", replytype: "done" };
  
      let getNextMsg = async (id) => {
       
  
        if (!$activeBotData.flow) return defaultReply;
  
        if (!id) id = $activeBotData.firstMsgId;
  
        let nextMsg = JSON.parse(JSON.stringify($activeBotData.flow[id]));
  
        if (nextMsg) {
          if (nextMsg.typingDelay) await wait(nextMsg.typingDelay);
  
          return nextMsg;
        }
  
        return defaultReply;
      };
  
      if (!$lastMessage.id) return getNextMsg();
  
      if (response) {
        //if we get valid response then we need to find next flow based off of lastMsg.replytype
        switch ($lastMessage.replytype) {
          case "fullName":
            if ($lastMessage.dataProperty) {
              //if dataProperty is specified then override it
  
              $collectedData[$lastMessage.dataProperty] = response;
  
              if($lastMessage.sendData) 
                  await sendData();
        
              break; //breaks the switch statement
            }
  
            let respTokens = response.split(" ");
            let firstName = respTokens.length > 1 ? respTokens[0] : response;
  
            $collectedData.fullName = response;
            $collectedData.firstName = firstName;
            if($lastMessage.sendData) 
               await sendData();
  
            return getNextMsg($lastMessage.nextId);
            break;
  
          case "firstName":
            if ($lastMessage.dataProperty) {
              //if dataProperty is specified then override it
              $collectedData[$lastMessage.dataProperty] = response;
              break; //breaks the switch statement
            }
  
            $collectedData.firstName = response;
            if($lastMessage.sendData) 
                  await sendData();
  
            return getNextMsg($lastMessage.nextId);
            break;
  
          case "button":
            if ($lastMessage.dataProperty)
              $collectedData[$lastMessage.dataProperty] = response;
  
            let opts = $lastMessage.buttons;
            for (let opt of opts) {
              if (opt.value == response) {
                if($lastMessage.sendData) 
                  await sendData();
                
                if(opt.redirect){
                  window.location = opt.redirect;
                  return;
                }
                  
                if (!opt.nextId) 
                  return defaultReply;
  
                return getNextMsg(opt.nextId);
                break; //break loop NOT switch statment
              }
            }
  
            break;
          case "imgGallery":
            if ($lastMessage.dataProperty)
              $collectedData[$lastMessage.dataProperty] = response;
  
            let imgs = $lastMessage.images;
            for (let img of imgs) {
              if (img.value == response) {

                if($lastMessage.sendData) 
                  await sendData();

                if (!img.nextId) return defaultReply;
  
                return getNextMsg(img.nextId);
                break; //break loop NOT switch statment
              }
            }
  
            break;
          default:
            if ($lastMessage.dataProperty)
              $collectedData[$lastMessage.dataProperty] = response;
              if($lastMessage.sendData) 
                  await sendData();
            return getNextMsg($lastMessage.nextId);
            break;
        }
      } else {
        return getNextMsg($lastMessage.nextId);
      }
    }
  
    function filterDynamicTextFromReplyMsg(msg) {
      if (!String.prototype.replaceAll) {
        String.prototype.replaceAll = function (str, newStr) {
          return this.replace(new RegExp(str, "g"), newStr);
        };
      }
  
      //the point is to filter out dynamic values
      if (msg.text) {
        let dynamicProps = msg.text.match(/[^{\}]+(?=})/g);
        if (dynamicProps) {
          for (let prop of dynamicProps) {
            let replaceWith = $collectedData[prop] || "";
            msg.text = msg.text.replaceAll(`{${prop}}`, replaceWith);
          }
        }
      }
  
      // switch (msg.replytype) {
      //   case 'text': case 'fullName': case 'firstName': case 'email':
      //       msg.text = msg.text
      //     break;
  
      // }
      return msg;
    }
  
    async function fetchNextMessage(response) {
      showReplyOptions = false;
      waiting++;
      let res = await getNextMessage(response);
  
      res = filterDynamicTextFromReplyMsg(res);
  
      if(res.text)
        $messages = [...$messages, res];
      $lastMessage = res;
      waiting--;
      return res;
    }
  
    const initBot = async () => {
      let data = await getBotData();
      
      if(data.title)
        navbartitle = data.title;
  
      $messages = [];
      $activeBotData = data;
      $collectedData = {};
      //await fetchNextMessage();
  
      if (!$activeBotData.started) {
        $activeBotData.started = true;
        await fetchNextMessage();
      }
  
    };
  
    const unsubLastMessage = lastMessage.subscribe(async (data) => {
      showReplyOptions = data.replytype != "none" && data.replytype != "done";
      if (data.replytype == "none") await fetchNextMessage();
    });
  
    onDestroy(() => {
      //unsubscribe();
      unsubLastMessage();
    });
  
  
    //================================
    import {
      f7,
      f7ready,
      Navbar,
      Page,
      Messages,
      MessagesTitle,
      Message,
      Messagebar,
      MessagebarSheet, MessagebarSheetItem,
      Icon
    } from 'framework7-svelte';
    
  
    let messagebarInstance;
  
    let sheetVisible = false;
    let typingMessage = null;
    let messageText = '';
    let messagesData = [
      {
        type: 'sent',
        text: 'Hi, Kate',
      },
      {
        type: 'sent',
        text: 'How are you?',
      },
      {
        name: 'Kate',
        type: 'received',
        text: 'Hi, I am good!',
        avatar: 'https://cdn.framework7.io/placeholder/people-100x100-9.jpg',
      },
      {
        name: 'Blue Ninja',
        type: 'received',
        text: 'Hi there, I am also fine, thanks! And how are you?',
        avatar: 'https://cdn.framework7.io/placeholder/people-100x100-7.jpg',
        hascheckbox:true
      },
      {
        type: 'sent',
        text: 'Hey, Blue Ninja! Glad to see you ;)',
        avatar: 'https://cdn.framework7.io/placeholder/people-100x100-9.jpg',
      },
      {
        type: 'sent',
        text: 'Hey, look, cutest kitten ever!',
      },
      {
        type: 'sent',
        image: 'https://cdn.framework7.io/placeholder/cats-200x260-4.jpg',
      },
      {
        name: 'Kate',
        type: 'received',
        text: 'Nice!',
        avatar: 'https://cdn.framework7.io/placeholder/people-100x100-9.jpg',
      },
      {
        name: 'Kate',
        type: 'received',
        text: 'Like it very much!',
        avatar: 'https://cdn.framework7.io/placeholder/people-100x100-9.jpg',
      },
      {
        name: 'Blue Ninja',
        type: 'received',
        text: 'Awesome!',
        avatar: 'https://cdn.framework7.io/placeholder/people-100x100-7.jpg',
      },
    ];
    let responseInProgress = false;
  
    onMount(() => {
      f7ready(() => {
        messagebarInstance = f7.messagebar.get('.messagebar');
        initBot();
      });
    });
  
    function sendMessage() {
      const text = messageText.replace(/\n/g, '<br>').trim();
      const messagesToSend = [];
   
      if (text.length) {
        messagesToSend.push({
          text,
          type: 'sent',
        });
      }
      if (messagesToSend.length === 0) {
        return;
      }
  
      // Hide sheet
      sheetVisible = true;
      // Send message
      messagesData = [...messagesData, ...messagesToSend];
      // Clear
      messageText = '';
      messagebarInstance.clear();
  
      // Focus area
      //if (text.length) messagebarInstance.focus();
  
      // Mock response
      if (responseInProgress) return;
      responseInProgress = true;
  
    
    }
  </script>