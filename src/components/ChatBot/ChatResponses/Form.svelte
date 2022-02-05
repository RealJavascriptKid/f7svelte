<script>
    import {List,ListItem,ListInput,Button} from "framework7-svelte";

    export let addMessage;

    export let isSingleInput = false;

    export let inputs = [{
        type:'text',
        placeholder:'Enter First Name',
        required:false

    },{
        type:'email',
        placeholder:'Enter Email',
        required:false
    },{
        type:'date',
        placeholder:'Enter DOB',
        
    },{
        type:'daterange',
        placeholder:'Enter Range',
        
    }];

    function sendMessage(e) {
        for(let input of inputs){
            console.log(`${input.placeholder}:`,input)
        }
        let val;
        if(isSingleInput){
            val = inputs[0].value || '';
            addMessage(val);
        }else{
            let text = '';
            for(let input of inputs){
               
                if(!input.value)
                    continue;
               switch (input.type) {                 
                   case 'date':
                       if(input.value.length)
                            text += `\n${input.value[0].toLocaleDateString()}`
                       break;
                   case 'daterange':
                       if(input.value.length == 2)
                            text += `\n${input.value[0].toLocaleDateString()} - ${input.value[1].toLocaleDateString()}`
                       break;    
                   default:
                        text += `${input.value}`
                       break;
               }
            }
            addMessage({text,value:inputs});
        }
        
   }

</script>
<List inset form on:submit={sendMessage}>
    {#each inputs as input}

        {#if input.type == 'date'}

            <ListInput
            type="datepicker"
                placeholder={input.placeholder || 'Select Date'}
                bind:value={input.value}
                validate
                readonly
                required={input.required}
                calendarParams={{openIn: 'customModal', header: true, footer: true, dateFormat: 'MM dd yyyy'}}
            ></ListInput>

        {:else if input.type == 'daterange'}

            <ListInput
                type="datepicker"
                placeholder={input.placeholder || 'Select Date Range'}
                bind:value={input.value}
                validate
                readonly
                required={input.required}
                calendarParams={{openIn: 'customModal', header: true, footer: true,  dateFormat: 'MM dd yyyy', rangePicker: true }}
            ></ListInput>

        {:else if input.type == 'datetime'}

            <ListInput
                type="datepicker"
                placeholder={input.placeholder || 'Select Date Time'}
                bind:value={input.value}
                validate
                readonly
                required={input.required}
                calendarParams={{openIn: 'customModal', header: true, footer: true,  dateFormat: 'MM dd yyyy H::mm:ss A', timePicker: true }}
            ></ListInput>

        {:else if input.type == 'firstName' || input.type == 'fullName'}

            <ListInput
                type="text"
                placeholder={input.placeholder || input.type}
                validate
                clearButton
                required={input.required}
                bind:value={input.value}
                />

        {:else }

                <ListInput
                    type={input.type}
                    placeholder={input.placeholder || input.type}
                    validate
                    clearButton
                    required={input.required}
                    bind:value={input.value}
                    />        

        {/if}
    {/each}
     
   <ListItem>       
        <Button type="submit">Submit</Button>
   </ListItem>
 
  </List>