export const testBotData = {
    "botId": "testBotId",
    "name": "Saad",
    "title": "Conversation",
    "img": "https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144",
    "online": true,
    "newMessage": false,
    "firstMsgId": "start",
    "dataUrl": "https://hidollars.newyearworks.com/analytics.php",
    "flow": {
        "start": {
            "id": "start", "user": "you", "time": "a moment ago",
            "dataProperty": "testingWhat",
            "replytype": "button",
            "typingDelay": 0.4,
            "text": "Please choose one below {firstName}",
            "buttons": [{ "value": "Form", "nextId": "Form" },
            { "value": "MultiSelect", "nextId": "MultiSelect" },
            { "value": "ImgGallery", "nextId": "ImgGallery" },
            { "value": "fullName", "nextId": "fullName" },
            { "value": "Text", "nextId": "Text" },
            { "value": "Email", "nextId": "Email" }]
        },
        "fullName": { "id": "fullName", "user": "you", "text": "Please provide you full name", "typingDelay": 0.4, "replytype": "fullName", "required": true, "nextId": "start" },
        "Form": { "id": "Form", 
        "replytype": "form", "typingDelay": 0.4, "nextId": "start"
         },
        "MultiSelect": { "id": "MultiSelect", "replytype": "multiSelect", "dataProperty": "skills", "typingDelay": 0.4, "nextId": "start", "options": ["SEO", "Web Design", "Web Development", "AWS", "Chat Bots"] },
        "ImgGallery": {
            "id": "ImgGallery", "replytype": "imgGallery", "typingDelay": 0.4, "images": [
                { "value": "Yelp", "src": "https://cdn.iconscout.com/icon/free/png-256/yelp-35-722661.png", "nextId": "start" },
                { "value": "Yelp 2", "src": "https://cdn.iconscout.com/icon/free/png-256/yelp-35-722661.png", "nextId": "start" },
                { "value": "Yelp 3", "src": "https://cdn.iconscout.com/icon/free/png-256/yelp-35-722661.png", "nextId": "start" },
                { "value": "Yelp 4", "src": "https://cdn.iconscout.com/icon/free/png-256/yelp-35-722661.png", "nextId": "start" },
                { "value": "Google", "src": "https://media.wired.com/photos/5926ffe47034dc5f91bed4e8/master/pass/google-logo.jpg", "nextId": "start" }
            ]
        },
        "Text": { "id": "Text", "replytype": "text", "typingDelay": 0.4, "nextId": "start", "sendData": true },
        "Email": { "id": "Email", "replytype": "email", "typingDelay": 0.4, "nextId": "start" }
    }
}