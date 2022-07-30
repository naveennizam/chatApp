
const db = firebase.database();
const username = prompt("Please Tell Us Your Name");

document.querySelector("#message-form").addEventListener("submit", sendMessage);

function sendMessage(e) {
    e.preventDefault();

   
    const messageInput = document.querySelector("#message-input");
    const message = messageInput.value;

    // clear the input box
    messageInput.value = "";

    //auto scroll to bottom
    document
        .querySelector("#messages")
        .scrollIntoView({ behavior: "smooth", block: "end", inline: "start" });

    // create db collection and send in the data
    // // get values to be submitted
   // const timestamp = Date.now();
    // db.ref("memo/" + timestamp).set({
    //   username,
    //   message,
    // });

    firebase.database().ref(`memo`).push().set({
        username,
        message
    })
    
}
const fetchChat = db.ref(`memo`)
fetchChat.on("child_added",  (retriveByMemo) => {
    
    const sms = retriveByMemo.val();
    console.log(sms)
    
    const message = `<li class=${username === sms.username ? "sent" : "receive"  //ternary operator
        }> <span>${sms.username}: </span>${sms.message} </li>`;

    // append the message on the page
    document.querySelector("#messages").innerHTML += message;
});
