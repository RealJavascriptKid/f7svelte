<script>
 
  //unfortunately I have to introduce external lib
  import Flatpickr from 'svelte-flatpickr';
	import 'flatpickr/dist/flatpickr.css';
  


  export let addMessage;
  export let type = "date"; //date|datetime|time

  let value, formattedValue;


  let options = {		
    disableMobile: true, //it will force mobile device to use native datepicker (NOT Recommened to set to true)
	};

  if(type == 'datetime'){
    
    options = {
      ...options,
      enableTime: true,
    }

  }else if(type == 'time'){
    
    options = {
      ...options,
      noCalendar: true, 
      enableTime: true,
    }

  }

  function handleChange(event) {
		const [ selectedDates, dateStr ] = event.detail;
		console.log("handleChange",{ selectedDates, dateStr });
	}

  function sendMessage() {
    console.log("value:",value)
    console.log("formattedValue:",formattedValue)
    if (formattedValue.trim().length > 0) {
      addMessage(formattedValue.trim());
    }
  }


</script>



    
    
    <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <div class="relative flex">
        
        <Flatpickr {options} bind:value bind:formattedValue on:change={handleChange} name="date" />

        <div class="absolute right-0 items-center inset-y-0 flex">
         
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
            on:click={sendMessage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-6 w-6 transform rotate-90"
            >
              <path
                d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>