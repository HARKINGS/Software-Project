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

        const timeElement = document.createElement("time");
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
    }

function truncateMessage(selector, maxLength) {
        const messages = document.querySelectorAll(selector);
        messages.forEach(message => {
            const fullText = message.textContent; 
            if (fullText.length > maxLength) {
                let truncatedText = fullText.substring(0, maxLength);
                const lastSpaceIndex = truncatedText.lastIndexOf(' ');
                if (lastSpaceIndex !== -1) {
                    truncatedText = truncatedText.substring(0, lastSpaceIndex);
                }
                message.textContent = truncatedText + "...";
            } else {
                message.style.cursor = "default"; 
            }
        });
    }

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

document.addEventListener("DOMContentLoaded", () => {
    truncateMessage('.message p', 40); 
});

document.addEventListener("DOMContentLoaded", () => {

    const maxLength = 100;

    addMessage(
        "Thông báo phạt",
        "December 17, 2024, 5:00 PM",
        "Hộ dân cư số 3 bị phạt 200.000 VND do để chó tè bậy lên poster của chung cư"
    );

    addMessage(
        "Bảo trì",
        "December 18, 2024, 2:00 PM",
        "Hệ thống sẽ được bảo trì vào ngày 20 tháng 10 năm 2024, từ 01 giờ 00 đến 03 giờ 00. Trân trọng !"
    );

    addMessage(
        "Nhắc nhở thu phí",
        "December 19, 2024, 11:00 AM",
        "Hộ dân cư số 7 nộp tiền điện nước chậm quá hạn 1 tháng ! Hãy hoàn thành khoản thu trước ngày 24 tháng 12 năm 2024 để được xét duyệt tiếp tục ở lại chung cư ! Hộ dân cư số 7 nộp tiền điện nước chậm quá hạn 1 tháng ! Hãy hoàn thành khoản thu trước ngày 24 tháng 12 năm 2024 để được xét duyệt tiếp tục ở lại chung cư !Hộ dân cư số 7 nộp tiền điện nước chậm quá hạn 1 tháng ! Hãy hoàn thành khoản thu trước ngày 24 tháng 12 năm 2024 để được xét duyệt tiếp tục ở lại chung cư !Hộ dân cư số 7 nộp tiền điện nước chậm quá hạn 1 tháng ! Hãy hoàn thành khoản thu trước ngày 24 tháng 12 năm 2024 để được xét duyệt tiếp tục ở lại chung cư !Hộ dân cư số 7 nộp tiền điện nước chậm quá hạn 1 tháng ! Hãy hoàn thành khoản thu trước ngày 24 tháng 12 năm 2024 để được xét duyệt tiếp tục ở lại chung cư !Hộ dân cư số 7 nộp tiền điện nước chậm quá hạn 1 tháng ! Hãy hoàn thành khoản thu trước ngày 24 tháng 12 năm 2024 để được xét duyệt tiếp tục ở lại chung cư !Hộ dân cư số 7 nộp tiền điện nước chậm quá hạn 1 tháng ! Hãy hoàn thành khoản thu trước ngày 24 tháng 12 năm 2024 để được xét duyệt tiếp tục ở lại chung cư !Hộ dân cư số 7 nộp tiền điện nước chậm quá hạn 1 tháng ! Hãy hoàn thành khoản thu trước ngày 24 tháng 12 năm 2024 để được xét duyệt tiếp tục ở lại chung cư !Hộ dân cư số 7 nộp tiền điện nước chậm quá hạn 1 tháng ! Hãy hoàn thành khoản thu trước ngày 24 tháng 12 năm 2024 để được xét duyệt tiếp tục ở lại chung cư !Hộ dân cư số 7 nộp tiền điện nước chậm quá hạn 1 tháng ! Hãy hoàn thành khoản thu trước ngày 24 tháng 12 năm 2024 để được xét duyệt tiếp tục ở lại chung cư !Hộ dân cư số 7 nộp tiền điện nước chậm quá hạn 1 tháng ! Hãy hoàn thành khoản thu trước ngày 24 tháng 12 năm 2024 để được xét duyệt tiếp tục ở lại chung cư !Hộ dân cư số 7 nộp tiền điện nước chậm quá hạn 1 tháng ! Hãy hoàn thành khoản thu trước ngày 24 tháng 12 năm 2024 để được xét duyệt tiếp tục ở lại chung cư !Hộ dân cư số 7 nộp tiền điện nước chậm quá hạn 1 tháng ! Hãy hoàn thành khoản thu trước ngày 24 tháng 12 năm 2024 để được xét duyệt tiếp tục ở lại chung cư !Hộ dân cư số 7 nộp tiền điện nước chậm quá hạn 1 tháng ! Hãy hoàn thành khoản thu trước ngày 24 tháng 12 năm 2024 để được xét duyệt tiếp tục ở lại chung cư !Hộ dân cư số 7 nộp tiền điện nước chậm quá hạn 1 tháng ! Hãy hoàn thành khoản thu trước ngày 24 tháng 12 năm 2024 để được xét duyệt tiếp tục ở lại chung cư !Hộ dân cư số 7 nộp tiền điện nước chậm quá hạn 1 tháng ! Hãy hoàn thành khoản thu trước ngày 24 tháng 12 năm 2024 để được xét duyệt tiếp tục ở lại chung cư !Hộ dân cư số 7 nộp tiền điện nước chậm quá hạn 1 tháng ! Hãy hoàn thành khoản thu trước ngày 24 tháng 12 năm 2024 để được xét duyệt tiếp tục ở lại chung cư !Hộ dân cư số 7 nộp tiền điện nước chậm quá hạn 1 tháng ! Hãy hoàn thành khoản thu trước ngày 24 tháng 12 năm 2024 để được xét duyệt tiếp tục ở lại chung cư !Hộ dân cư số 7 nộp tiền điện nước chậm quá hạn 1 tháng ! Hãy hoàn thành khoản thu trước ngày 24 tháng 12 năm 2024 để được xét duyệt tiếp tục ở lại chung cư !Hộ dân cư số 7 nộp tiền điện nước chậm quá hạn 1 tháng ! Hãy hoàn thành khoản thu trước ngày 24 tháng 12 năm 2024 để được xét duyệt tiếp tục ở lại chung cư !Hộ dân cư số 7 nộp tiền điện nước chậm quá hạn 1 tháng ! Hãy hoàn thành khoản thu trước ngày 24 tháng 12 năm 2024 để được xét duyệt tiếp tục ở lại chung cư !"
    );

    truncateMessage('.message p', maxLength);
});
