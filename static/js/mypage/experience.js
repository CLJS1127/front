// 1. 지원취소 팝업 관련

const applyCancelButtons = document.querySelectorAll(
    ".btn.btnGyBd.devBtnCancel.devBtnOddInfo",
);
const buttonClose = document.querySelector(".butClose.mtuSpImg.devLyBtnClose");
const dimmedDiv = document.querySelector(".dimmed");
const popupApplyCancel = document.querySelector(".mtuPopup.popupApplyCancel");
const buttonCancel = document.querySelector(".button.button-cancel");
const applySubmitButton = document.querySelector(
    ".button.button-ok.devBtnSubmitCancel",
);

// 모든 지원취소 버튼에 이벤트 등록
applyCancelButtons.forEach((applyCancelButton) => {
    applyCancelButton.addEventListener("click", (e) => {
        dimmedDiv.style.position = "fixed";
        popupApplyCancel.style.display = "block";

        // 필요시 클릭한 버튼의 data 속성 활용 가능
        // const idx = applyCancelButton.dataset.idx;
        // const gino = applyCancelButton.dataset.gino;
    });
});

// 닫기 버튼 (X)
buttonClose.addEventListener("click", (e) => {
    dimmedDiv.style.position = "relative";
    popupApplyCancel.style.display = "none";
});

// 취소 버튼
buttonCancel.addEventListener("click", (e) => {
    dimmedDiv.style.position = "relative";
    popupApplyCancel.style.display = "none";
});

// 확인 버튼
applySubmitButton.addEventListener("click", (e) => {
    location.href = "";
});

// 2. 취소사유 드롭다운 관련

const applyListButton = document.querySelector(".btnChoose");
const applyListDrop = applyListButton.nextElementSibling;
const applyLists = applyListDrop.querySelectorAll("li");
const applyListButtonSpan = applyListButton.firstElementChild;
const applyCancelReason = document.getElementById("applyCancelreason");
const applyCancelReasonInput = document.getElementById("Apply_Cncl_Rsn_Etc");

// 드롭다운 열기/닫기
applyListButton.addEventListener("click", (e) => {
    applyListDrop.classList.toggle("visible");
});

// 드롭다운 항목 클릭
applyLists.forEach((applyList, i) => {
    applyList.addEventListener("click", (e) => {
        // li 안의 button에서 텍스트 가져오기
        const buttonText = applyList.querySelector("button").textContent;

        if (i !== 3) {
            // 기타가 아닌 경우
            applyListButtonSpan.textContent = buttonText;
            applyCancelReason.style.display = "none";
            applyListDrop.classList.remove("visible");
        } else {
            // 기타인 경우 - 직접입력 영역 표시
            applyListButtonSpan.textContent = buttonText;
            applyCancelReason.style.display = "block";
            applyListDrop.classList.remove("visible");
        }
    });
});

// 30자 제한 (input 이벤트로 분리)
applyCancelReasonInput.addEventListener("input", (e) => {
    if (applyCancelReasonInput.value.length > 30) {
        alert("최대 30자만 입력 가능합니다");
        // value를 다시 할당해야 실제로 잘림
        applyCancelReasonInput.value = applyCancelReasonInput.value.substring(
            0,
            30,
        );
    }
});

// 3. 조회기간 버튼 (1주일, 1개월, 2개월, 3개월)

const selectDueButtons = document.querySelectorAll(".formBx.clear button");
selectDueButtons.forEach((selectDueButton) => {
    selectDueButton.addEventListener("click", (e) => {
        // 모든 버튼에서 on 클래스 제거
        selectDueButtons.forEach((btn) => {
            btn.classList.remove("on");
        });
        // 클릭한 버튼에 on 클래스 추가
        selectDueButton.classList.add("on");
    });
});

// 4. 진행여부/열람여부/지원상태 드롭다운

const dropDownButtons = document.querySelectorAll(".btnMtcLySel.mtcBtnB");

dropDownButtons.forEach((dropDownButton) => {
    // 버튼의 형제 요소(nextElementSibling)가 바로 해당 드롭다운 div
    const dropDownDiv = dropDownButton.nextElementSibling;
    const dropDownItems = dropDownDiv.querySelectorAll("li a");

    // 버튼 클릭 → 열기/닫기
    dropDownButton.addEventListener("click", (e) => {
        e.stopPropagation(); // document 클릭 이벤트 전파 방지

        // 다른 드롭다운 모두 닫기
        document.querySelectorAll(".lyItems").forEach((div) => {
            if (div !== dropDownDiv) {
                div.style.display = "none";
            }
        });

        // 현재 드롭다운 토글
        dropDownDiv.style.display =
            dropDownDiv.style.display === "block" ? "none" : "block";
    });

    // 항목 클릭 → 텍스트 적용 + 닫기
    dropDownItems.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.stopPropagation();
            dropDownButton.textContent = item.textContent;
            dropDownDiv.style.display = "none";
        });
    });
});

// 다른 곳 클릭 → 드롭다운 모두 닫기
document.addEventListener("click", (e) => {
    // 달력 클릭은 제외
    if (
        !e.target.closest(".devCalendarLayer") &&
        !e.target.closest(".btnCalc")
    ) {
        document.querySelectorAll(".lyItems").forEach((div) => {
            div.style.display = "none";
        });
    }
});

// 5. 달력 버튼 (시작일/마감일)

const dateButtons = document.querySelectorAll(".btn.btnCalc.mtuSpImgBefore");
const dateButtonAddDiv = document.getElementById("devPop");

dateButtons.forEach((dateButton) => {
    dateButton.addEventListener("click", (e) => {
        e.stopPropagation();

        // 기존 달력 제거 (토글 효과)
        const existingCalendar =
            dateButtonAddDiv.querySelector(".devCalendarLayer");
        if (existingCalendar) {
            existingCalendar.remove();
            return;
        }

        // 어떤 input에 적용할지 (data-id로 구분)
        const targetInputId = dateButton.dataset.id;
        const targetInput = document.getElementById(targetInputId);

        // 버튼 위치 계산
        const buttonRect = dateButton.getBoundingClientRect();
        const parentRect =
            dateButtonAddDiv.offsetParent.getBoundingClientRect();

        const calendar = document.createElement("div");
        calendar.classList.add(
            "yctrRgtPop",
            "yctrLyBx",
            "yctrRgtCal",
            "devCalendarLayer",
        );
        calendar.style.left = buttonRect.left - parentRect.left - 100 + "px";
        calendar.style.top = buttonRect.bottom - parentRect.top + 5 + "px";

        calendar.innerHTML = `
<h1 class="skip">접수기간 설정</h1>
<div class="date sDate">
    <h2></h2>
    <div class="bx devDateNav" data-today="2026-01-29">
        <div class="yearMonth">
            <p><strong id="devApplyStDt">2025.10</strong></p>
            <p><span class="yctrRgtBtn yctrRgtBtnPrev_1"><button type="button" class="devCalendarChange" data-new-date="2025-09-01"><span>이전 월</span></button></span></p>
            <p><span class="yctrRgtBtn yctrRgtBtnNext_1"><button type="button" class="devCalendarChange" data-new-date="2025-11-01"><span>다음 월</span></button></span></p>
        </div>
        <table>
            <caption><span class="skip">날짜 선택</span></caption>
            <thead>
                <tr>
                    <th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td><td></td><td></td>
                    <td><a href="#" class="devDateSelect" data-calendar-date="2025-10-01">1</a></td>
                    <td><a href="#" class="devDateSelect" data-calendar-date="2025-10-02">2</a></td>
                    <td><a href="#" class="devDateSelect" data-calendar-date="2025-10-03">3</a></td>
                    <td class="sat"><a href="#" class="devDateSelect" data-calendar-date="2025-10-04">4</a></td>
                </tr>
                <tr>
                    <td><a href="#" class="devDateSelect" data-calendar-date="2025-10-05">5</a></td>
                    <td><a href="#" class="devDateSelect" data-calendar-date="2025-10-06">6</a></td>
                    <td><a href="#" class="devDateSelect" data-calendar-date="2025-10-07">7</a></td>
                    <td><a href="#" class="devDateSelect" data-calendar-date="2025-10-08">8</a></td>
                    <td><a href="#" class="devDateSelect" data-calendar-date="2025-10-09">9</a></td>
                    <td><a href="#" class="devDateSelect" data-calendar-date="2025-10-10">10</a></td>
                    <td class="sat"><a href="#" class="devDateSelect" data-calendar-date="2025-10-11">11</a></td>
                </tr>
                <tr>
                    <td><a href="#" class="devDateSelect" data-calendar-date="2025-10-12">12</a></td>
                    <td><a href="#" class="devDateSelect" data-calendar-date="2025-10-13">13</a></td>
                    <td><a href="#" class="devDateSelect" data-calendar-date="2025-10-14">14</a></td>
                    <td><a href="#" class="devDateSelect" data-calendar-date="2025-10-15">15</a></td>
                    <td><a href="#" class="devDateSelect" data-calendar-date="2025-10-16">16</a></td>
                    <td><a href="#" class="devDateSelect" data-calendar-date="2025-10-17">17</a></td>
                    <td class="sat"><a href="#" class="devDateSelect" data-calendar-date="2025-10-18">18</a></td>
                </tr>
                <tr>
                    <td><a href="#" class="devDateSelect" data-calendar-date="2025-10-19">19</a></td>
                    <td><a href="#" class="devDateSelect" data-calendar-date="2025-10-20">20</a></td>
                    <td><a href="#" class="devDateSelect" data-calendar-date="2025-10-21">21</a></td>
                    <td><a href="#" class="devDateSelect" data-calendar-date="2025-10-22">22</a></td>
                    <td><a href="#" class="devDateSelect" data-calendar-date="2025-10-23">23</a></td>
                    <td><a href="#" class="devDateSelect" data-calendar-date="2025-10-24">24</a></td>
                    <td class="sat"><a href="#" class="devDateSelect" data-calendar-date="2025-10-25">25</a></td>
                </tr>
                <tr>
                    <td><a href="#" class="devDateSelect" data-calendar-date="2025-10-26">26</a></td>
                    <td><a href="#" class="devDateSelect" data-calendar-date="2025-10-27">27</a></td>
                    <td><a href="#" class="devDateSelect" data-calendar-date="2025-10-28">28</a></td>
                    <td><a href="#" class="devDateSelect" data-calendar-date="2025-10-29">29</a></td>
                    <td><a href="#" class="devDateSelect" data-calendar-date="2025-10-30">30</a></td>
                    <td class="sDate"><a href="#" class="devDateSelect" data-calendar-date="2025-10-31">31</a></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
<form action="" onsubmit="return false;">
    <input type="hidden" name="ApplyDt" value="2025-10-31">
    <fieldset class="apply">
        <legend class="skip">선택한 날짜 적용</legend>
        <p>
            <input type="text" name="ApplyDtStr" value="2025년 10월 31일 (금)" readonly>
            <span class="yctrRgtBtn yctrRgtBtnSubmit_1"><button type="button" class="devSubmitBtn"><span>적용</span></button></span>
        </p>
    </fieldset>
</form>
<p class="close"><span class="yctrRgtBtn yctrRgtBtnClose_2"><button type="button" class="devClose"><span>닫기</span></button></span></p>`;

        dateButtonAddDiv.appendChild(calendar);

        // 닫기 버튼 이벤트
        calendar.querySelector(".devClose").addEventListener("click", () => {
            calendar.remove();
        });

        // 적용 버튼 이벤트 - 선택된 날짜를 input에 적용
        calendar
            .querySelector(".devSubmitBtn")
            .addEventListener("click", () => {
                const selectedDate = calendar.querySelector(
                    "input[name='ApplyDt']",
                ).value;
                targetInput.value = selectedDate;
                calendar.remove();
            });

        // 날짜 클릭 이벤트
        calendar.querySelectorAll(".devDateSelect").forEach((dateLink) => {
            dateLink.addEventListener("click", (e) => {
                e.preventDefault();
                const date = dateLink.dataset.calendarDate;
                calendar.querySelector("input[name='ApplyDt']").value = date;

                // 날짜 표시 업데이트
                const dateObj = new Date(date);
                const days = ["일", "월", "화", "수", "목", "금", "토"];
                const formatted = `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일 (${days[dateObj.getDay()]})`;
                calendar.querySelector("input[name='ApplyDtStr']").value =
                    formatted;

                // 선택 표시 업데이트
                calendar
                    .querySelectorAll("td")
                    .forEach((td) => td.classList.remove("sDate"));
                dateLink.parentElement.classList.add("sDate");
            });
        });
    });
});

// 다른 곳 클릭 시 달력 닫기
document.addEventListener("click", (e) => {
    if (
        !e.target.closest(".devCalendarLayer") &&
        !e.target.closest(".btnCalc")
    ) {
        const calendar = document.querySelector(".devCalendarLayer");
        if (calendar) calendar.remove();
    }
});
