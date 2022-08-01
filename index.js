
const db = firebase.database();
const username = prompt("Please Tell Us Your Name");

document.querySelector("#forms").addEventListener("submit", sendMessage);
function sendMessage(e) {
    e.preventDefault();

   
    const Input = document.querySelector("#input");
    const message = Input.value;

    // clear the input box
    Input.value = "";

    //auto scroll to bottom
    document
        .querySelector("#messages")
        .scrollIntoView({ behavior: "smooth", block: "end" });


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
