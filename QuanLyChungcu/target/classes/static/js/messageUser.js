let listMessage = [];
const maxLength = 100;

function showDetail(title, time, message) {
    const overlay = document.querySelector('.overlay');
    const fullMessage = overlay.querySelector('.full-message');
    fullMessage.querySelector('h2').textContent = title;
    fullMessage.querySelector('time').textContent = time;
    fullMessage.querySelector('p').textContent = message;
    overlay.style.display = 'flex';
}

function closeDetail() {
    const overlay = document.querySelector('.overlay');
    overlay.style.display = 'none';
}

function addMessage(title, time, content) {
    const container = document.querySelector(".container");

    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");

    const titleElement = document.createElement("h2");
    titleElement.textContent = title;
    messageDiv.appendChild(titleElement);

    const timeElement = document.createElement("span");
    timeElement.type = "date";
    timeElement.textContent = time;
    messageDiv.appendChild(timeElement);

    const contentElement = document.createElement("p");
    contentElement.textContent = content;
    messageDiv.appendChild(contentElement);

    const buttonElement = document.createElement("button");
    buttonElement.textContent = "Chi tiết";
    buttonElement.onclick = () => showDetail(title, time, content);
    messageDiv.appendChild(buttonElement);

    container.appendChild(messageDiv);
    console.log("add succesfully " + title);
}

function truncateMessage(selector, maxLength) {
        const messages = document.querySelectorAll(selector);
        messages.forEach(message => {
            let fullText = message.textContent; 
            const newlineIndex = fullText.indexOf("\n");
            console.log(newlineIndex);
            if (newlineIndex !== -1) {
                fullText = fullText.slice(0, newlineIndex); 
                message.textContent = fullText;
            }
            else if (fullText.length > maxLength) {
                let truncatedText = fullText.substring(0, maxLength);
                const lastSpaceIndex = truncatedText.lastIndexOf(' ');
                if (lastSpaceIndex !== -1) {
                    truncatedText = truncatedText.substring(0, lastSpaceIndex);
                }
                message.textContent = truncatedText + "...";
            } 
            else {
                message.style.cursor = "default"; 
            }
        });
    }

function showDetail(title, time, message) {
    const overlay = document.querySelector('.overlay');
    const fullMessage = overlay.querySelector('.full-message');
    fullMessage.querySelector('h2').textContent = title;
    fullMessage.querySelector('span').textContent = time;
    fullMessage.querySelector('p').textContent = message;
    overlay.style.display = 'flex';
}

function closeDetail() {
    const overlay = document.querySelector('.overlay');
    overlay.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", async function () {
    fetch("/getAllNotification", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
      .then(response => {
        if (response.status !== 200) {
          throw new Error("Không thể get all message");
        }
        return response.json();
      })
      .then( returnData =>{
        let listMessage = returnData;
        console.log(listMessage);
        for(var i = 0; i < listMessage.length; i++){
            const date = new Date(listMessage[i].date); 
            addMessage(listMessage[i].title,date,listMessage[i].content);
        }
        truncateMessage('.message p', maxLength);
      })
      .catch(error => {
        console.error("Đã xảy ra lỗi khi hien thi", error);
        alert("Đã xảy ra lỗi khi hien thi");
      });
});

