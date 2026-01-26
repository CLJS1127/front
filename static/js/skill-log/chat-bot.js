const toggle = document.getElementById("chatbotToggle");
const container = document.getElementById("chatbotContainer");
const messages = document.getElementById("chatbotMessages");
const input = document.getElementById("chatbotInput");
const sendBtn = document.getElementById("chatbotSend");

// 토글 기능
toggle.addEventListener("click", function () {
    toggle.classList.toggle("active");
    container.classList.toggle("active");
    if (container.classList.contains("active")) {
        input.focus();
    }
});

// 메시지 전송 함수
function sendMessage(text) {
    if (!text.trim()) return;

    addMessage(text, "user");
    input.value = "";

    showTyping();

    setTimeout(
        function () {
            hideTyping();
            const response = getBotResponse(text);
            addMessage(response, "bot");
        },
        1000 + Math.random() * 1000,
    );
}

// 메시지 추가 함수
function addMessage(text, type) {
    const time = new Date().toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
    });

    const avatarSvg =
        type === "bot"
            ? '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9H15V22H13V16H11V22H9V9H3V7H21V9Z"/></svg>'
            : '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/></svg>';

    const messageDiv = document.createElement("div");
    messageDiv.className = "chatbot-message " + type;
    messageDiv.innerHTML =
        '<div class="chatbot-message-avatar">' +
        avatarSvg +
        "</div>" +
        "<div>" +
        '<div class="chatbot-message-content">' +
        text +
        "</div>" +
        '<div class="chatbot-message-time">' +
        time +
        "</div>" +
        "</div>";

    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
}

// 타이핑 인디케이터
function showTyping() {
    const typingDiv = document.createElement("div");
    typingDiv.className = "chatbot-message bot";
    typingDiv.id = "typingIndicator";
    typingDiv.innerHTML =
        '<div class="chatbot-message-avatar">' +
        '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9H15V22H13V16H11V22H9V9H3V7H21V9Z"/></svg>' +
        "</div>" +
        '<div class="chatbot-message-content">' +
        '<div class="chatbot-typing"><span></span><span></span><span></span></div>' +
        "</div>";
    messages.appendChild(typingDiv);
    messages.scrollTop = messages.scrollHeight;
}

function hideTyping() {
    const typing = document.getElementById("typingIndicator");
    if (typing) typing.remove();
}

// 봇 응답 생성
function getBotResponse(userMessage) {
    const lowerMsg = userMessage.toLowerCase();

    if (lowerMsg.includes("체험") && lowerMsg.includes("신청")) {
        return '체험 신청은 다음 단계로 진행됩니다:<br><br>1. 원하는 체험 공고를 선택하세요<br>2. "신청하기" 버튼을 클릭하세요<br>3. 자기소개서를 작성해 주세요<br>4. 제출 후 결과를 기다려주세요!<br><br>더 궁금한 점이 있으시면 말씀해주세요 😊';
    } else if (lowerMsg.includes("자기소개서") || lowerMsg.includes("자소서")) {
        return '자기소개서 작성 팁을 알려드릴게요!<br><br>✅ 구체적인 경험을 작성하세요<br>✅ 지원 동기를 명확히 하세요<br>✅ 본인만의 강점을 어필하세요<br>✅ 맞춤법 검사를 꼭 하세요<br><br>블로그 메뉴의 "자소서 꿀팁"에서 더 많은 정보를 확인해보세요!';
    } else if (
        lowerMsg.includes("인기") ||
        lowerMsg.includes("기업") ||
        lowerMsg.includes("추천")
    ) {
        return '현재 인기 있는 체험 기업들입니다:<br><br>🏢 쿠팡 - 개발자 체험<br>🏢 네이버 - 기획자 체험<br>🏢 카카오 - 디자이너 체험<br><br>"체험 정보" 메뉴에서 더 많은 공고를 확인해보세요!';
    } else if (
        lowerMsg.includes("안녕") ||
        lowerMsg.includes("하이") ||
        lowerMsg.includes("hello")
    ) {
        return "안녕하세요! 반갑습니다 😊<br>TRY-CATCH에서 도움이 필요하신 게 있으신가요?";
    } else if (lowerMsg.includes("감사") || lowerMsg.includes("고마")) {
        return "도움이 되었다니 기쁩니다! 😄<br>다른 궁금한 점이 있으시면 언제든 물어봐주세요!";
    } else {
        return "말씀해주신 내용을 확인했습니다.<br><br>더 자세한 도움이 필요하시면 고객센터(1234-5678)로 연락해주시거나, 아래 주제에 대해 물어봐주세요:<br><br>• 체험 신청 방법<br>• 자기소개서 작성 팁<br>• 인기 기업 추천";
    }
}

// 전송 버튼 클릭
sendBtn.addEventListener("click", function () {
    sendMessage(input.value);
});

// Enter 키 전송
input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage(input.value);
    }
});

// 빠른 응답 버튼 클릭
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("chatbot-quick-reply")) {
        const message = e.target.getAttribute("data-message");
        sendMessage(message);
    }
});
