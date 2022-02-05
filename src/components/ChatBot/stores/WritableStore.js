import {writable} from "svelte/store";
 export default function WritableStore(value) {  //we are making custom_writable in order to add support for get() method
  
  let originalWritable = writable(value);
  function set(newValue) {
    return originalWritable.set(value = newValue);
  }
  function update(fn) {
    originalWritable.update((oldValue) => value = fn(oldValue));
  }
  function get() {
    return value;
  }
  return {set, update, subscribe: originalWritable.subscribe, get};

}