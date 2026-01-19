// 공유하기 클릭
const shareButton = document.querySelector(".devShareBtn");
const toolDiv = document.querySelector(
    ".reaction-item .share-layer.tooltip-layer.qnaSpA",
);
shareButton.addEventListener("click", (e) => {
    toolDiv.style.display =
        toolDiv.style.display === "block" ? "none" : "block";
});

// URL 복사 클릭
const URLCopy = document.querySelector(
    ".button.button-copy-url.button-popup-component",
);
const URLCopyLayer = document.querySelector(".url-copy-layer");
const URLCopyLayerBefore = document.querySelector(".button.button-close");

URLCopy.addEventListener("click", (e) => {
    URLCopyLayer.classList.toggle("attached");
});

URLCopyLayerBefore.addEventListener("click", (e) => {
    URLCopyLayer.classList.remove("attached");
});

// 작성하기 버튼
const writeButtonDiv = document.querySelector(".navi-top-area.has-tooltip");
const writeButton = document.querySelector(".navi-top-area.has-tooltip a");

writeButton.addEventListener("click", (e) => {
    writeButtonDiv.classList.toggle("tooltip-open");
});

// 신고 버튼
const reportActiveButton = document.querySelector(".devQstnDetailMenuIcon");
const reportButton = document.querySelector(".view-more-layer");

reportActiveButton.addEventListener("click", (e) => {
    reportButton.classList.toggle("active");
});

// 좋아요
const buttonLike = document.querySelector(".icon-like.qnaSpB.devQstnLike");
const beforeLikeCount = document.querySelector(
    ".icon-like.qnaSpB.devQstnLike em",
);

buttonLike.addEventListener("click", (e) => {
    const afterLikeCount = Number(beforeLikeCount.textContent);
    buttonLike.classList.toggle("on");
    // if (buttonLike.classList.contains("on")) {
    //     beforeLikeCount.textContent = afterLikeCount + 1;
    // } else {
    //     beforeLikeCount.textContent = afterLikeCount - 1;
    // }
});

// 북마크 등록
const buttonBookMark = document.querySelector(
    ".btnBookmark.qnaSpB.devQnaDetailBookmark",
);
const bookMarkLayer = document.querySelector(
    ".book-mark-layer.tooltip-layer.qnaSpA",
);

buttonBookMark.addEventListener("click", (e) => {
    if (!buttonBookMark.classList.contains("on")) {
        bookMarkLayer.style.display = "block";
        bookMarkLayer.style.transition = "opacity 0.6s";
        bookMarkLayer.style.transition = "visibility 0.6s";

        setTimeout(() => {
            bookMarkLayer.style.display = "none";
        }, 1000);
    }
    buttonBookMark.classList.toggle("on");
});

// 댓글 좋아요
const chatLikeButtonList = document.querySelectorAll(
    ".answerArea li div button.btnHeart.qnaSpB.devBtnAnswerLike",
);
chatLikeButtonList.forEach((chatLike) => {
    chatLike.addEventListener("click", (e) => {
        chatLike.classList.toggle("active");
    });
});

// 대댓글
const commentReplyButtonList = document.querySelectorAll(
    ".answerArea li div button.btnCmt.devBtnComtList",
);
const commentSec = document.querySelector(".commentSec");
const focus = document.querySelector(
    "div.writeBoxWrap.cmtWrite.qnaSpB.dev-ComtEditor form fieldset div",
);

commentReplyButtonList.forEach((commentReply) => {
    commentReply.addEventListener("click", (e) => {
        e.target.classList.toggle("active");
        commentSec.style.display =
            commentSec.style.display === "none" ? "block" : "none";
    });
});
