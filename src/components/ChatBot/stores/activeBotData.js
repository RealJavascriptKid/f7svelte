import WritableStore from './WritableStore';

//bot's own data like name, status etc 
export const activeBotData = WritableStore({
    isWaiting:false,
    name:'',
    botId:''
});
