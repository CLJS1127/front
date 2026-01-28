// 위의 전체, 수락, 거절, 미응답 누르면 span태그 class에 active 삽입
const listChecks = document.querySelectorAll(".status-box-list li span");

let templist = listChecks[0];

listChecks[0].classList.add("active");

listChecks.forEach((list, i) => {
    list.addEventListener("click", (e) => {
        if (templist) {
            templist.classList.remove("active");
        }
        templist = listChecks[i];
        listChecks[i].classList.add("active");
    });
});

// 조회 버튼 클릭시 숨겨진 모달 나오게한다

const showBtn = document.querySelector(".sort-button");
const monthModal = document.querySelector(".select-modal_common");

const applicantWrapper = document.querySelector(".applicant-list-container");

showBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    monthModal.style.display = "block";
});

document.addEventListener("click", () => {
    monthModal.style.display = "none";
});

// 모달의 n개월 클릭시 버튼의 내용 변경한다.
const monthModalList = document.querySelectorAll(
    ".select-modal_common ul li button",
);

monthModalList.forEach((list, i) => {
    list.addEventListener("click", (e) => {
        showBtn.textContent = list.textContent;
    });
});

// 필터 아이콘 클릭하면 필터모달이 나온다.
const filterBtn = document.querySelector(".fillter-button");
const filterModal = document.querySelector(".filter-modal");

filterBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    filterModal.style.display = "block";
});

document.addEventListener("click", () => {
    filterModal.style.display = "none";
});

// 하,,,
const filterBtnList = document.querySelectorAll(".devFilterItem");
const addbox = document.querySelector(".selItems");
const modalResetBtn = document.querySelector(".search-reset");
console.log(modalResetBtn);

filterBtnList.forEach((list, i) => {
    filterModal.addEventListener("click", (e) => {
        e.stopPropagation();
    });
    list.addEventListener("click", (e) => {
        const value = list.textContent;
        const spanId = `filter${i}`;
        const isActive = list.classList.toggle("active");

        const existSpan = document.getElementById(spanId);

        if (isActive && !existSpan) {
            const span = document.createElement("span");
            span.id = spanId;
            span.classList.add("item");
            span.textContent = value;
            console.log(value);
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "btnSelDel mtcBtnB devFilterItemDelBtn";
            btn.dataset.filterGroup = "1_" + (i + 1);

            const skip = document.createElement("span");
            skip.className = "skip";
            skip.textContent = "삭제";

            span.append(btn);
            btn.append(skip);

            addbox.append(span);
            return;
        }

        if (!isActive && existSpan) {
            existSpan.remove();
        }
    });

    addbox.addEventListener("click", (e) => {
        const delBtn = e.target.closest(".btnSelDel");
        if (!delBtn) return;

        const item = delBtn.closest(".item");
        const index = item.id.replace("filter", "");

        filterBtnList[index].classList.remove("active");
        item.remove();
    });

    // modalResetBtn.addEventListener("click", (e) => {
    //     const delBtn = addbox.closest(".btnSelDel");
    //     if (!delBtn) return;

    //     const item = delBtn.closest(".item");
    //     const index = item.id.replace("filter", "");

    //     filterBtnList[index].classList.remove("active");
    //     item.remove();
    // });
});
