let listMessage = [];
const maxLength = 100;

function showDetail(title, time, message) {
  const overlay = document.querySelector(".overlay");
  const fullMessage = overlay.querySelector(".full-message");
  fullMessage.querySelector("h2").textContent = title;
  fullMessage.querySelector("time").textContent = time;
  fullMessage.querySelector("p").textContent = message;
  overlay.style.display = "flex";
}

function closeDetail() {
  const overlay = document.querySelector(".overlay");
  overlay.style.display = "none";
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
  const overlay = document.querySelector(".overlay");
  const fullMessage = overlay.querySelector(".full-message");
  fullMessage.querySelector("h2").textContent = title;
  fullMessage.querySelector("span").textContent = time;
  fullMessage.querySelector("p").textContent = message;
  overlay.style.display = "flex";
}

function closeDetail() {
  const overlay = document.querySelector(".overlay");
  overlay.style.display = "none";
}

// Call truncateMessage on page load
document.addEventListener("DOMContentLoaded", () => {
  truncateMessage(".message p", 40);
});

const showAddButton = document.getElementById("addBtn");
const addNoti = document.querySelector(".addNoti");

showAddButton.addEventListener("click", (event) => {
  addNoti.style.display = "block"; // Hiển thị form
  event.stopPropagation(); // Ngừng sự kiện click lan truyền để không đóng form
});


showAddButton.addEventListener("click", (event) => {
  addNoti.style.display = "block"; // Hiển thị form
  event.stopPropagation(); // Ngừng sự kiện click lan truyền để không đóng form
});

function exitAddNoti() {
  addNoti.style.display = "none"; // Đảm bảo đóng đúng phần tử form
  // Reset form về trạng thái ban đầu
  const inputs = document.querySelectorAll(".addNoti input");
  inputs.forEach((input) => {
    input.value = ""; // Xóa các giá trị trong input
  });
}

window.addEventListener("click", (event) => {
  // Kiểm tra nếu click ra ngoài form và không click vào nút hiển thị
  if (!addNoti.contains(event.target) && event.target !== showAddButton) {
    exitAddNoti(); // Đóng form
  }
});

document.getElementById("addNotiForm").addEventListener('submit', async function (event) {
        event.preventDefault(); // Ngăn hành động mặc định của form

        const titleInput = document.getElementById("tieude").value;
        const contentInput = document.getElementById("noidung").value;
        if (
          !titleInput ||
          !contentInput
        ) {
          alert("Vui lòng nhập đầy đủ và chính xác thông tin!");
          return;
        }

        const newMessage = {
          title: titleInput,
          content: contentInput,
        };
        console.log(newMessage);
        let sendMessage = JSON.stringify(newMessage);
        fetch("/admin/notification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: sendMessage,
        })
          .then((response) => {
            if (response.status !== 201) {
              throw new Error("Không thể thêm ");
            }
            exitAddNoti();
            alert("Them thanh cong");
            return response.json();
          })
          .then(returnData =>{
            let listMessage = returnData;
            console.log(listMessage);
            const date = new Date(listMessage.date); 
            addMessage(listMessage.title,date,listMessage.content);
            truncateMessage('.message p', maxLength);
          })
          .catch((error) => {
            console.error("Lỗi:", error);
            alert("Có lỗi xảy ra khi gửi dữ liệu!");
          });
});

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