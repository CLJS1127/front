// 광고 배너

// 체험공고 버튼
const secondBannerSections = document.querySelectorAll(".personal-tab-item a");
// 체험공고 배너
const secondBannerDiv = document.querySelectorAll(
    ".tab-cont.personal-contents-item",
);

secondBannerSections.forEach((secondBannerSection, i) => {
    const li = secondBannerSection.closest("li");

    secondBannerSection.addEventListener("click", (e) => {
        e.preventDefault();

        // 1. 모든 li에서 active 제거
        secondBannerSections.forEach((btn) => {
            btn.closest("li").classList.remove("active");
        });

        // 2. 모든 콘텐츠에서 active 제거
        secondBannerDiv.forEach((div) => {
            div.classList.remove("active");
        });

        // 3. 클릭한 li에 active 추가
        li.classList.add("active");

        // 4. 같은 인덱스의 콘텐츠에 active 추가
        secondBannerDiv[i].classList.add("active");

        setTimeout(() => {
            const activeSwiper =
                secondBannerDiv[i].querySelector(".swiper-container");
            if (activeSwiper && activeSwiper.swiper) {
                activeSwiper.swiper.update(); // 슬라이더 재계산
            }
        }, 100);
    });
});

// 체험공고 슬라이더 (instance-swipwe-6)
const smartfitSwiper = new Swiper(".instance-swipwe-6", {
    slidesPerView: 3,
    spaceBetween: 16,
    loop: true,
    autoplay: {
        delay: 3000, // 3초마다 자동 슬라이드
        disableOnInteraction: false, // 사용자 조작 후에도 자동재생 유지
    },
    navigation: {
        nextEl: ".instance-next6",
        prevEl: ".instance-prev6",
    },
});

// 기술블로그 슬라이더 (instance-swipwe-3)
const blogSwiper = new Swiper(".instance-swipwe-3", {
    slidesPerView: 3,
    spaceBetween: 16,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".instance-next3",
        prevEl: ".instance-prev3",
    },
});

// QnA 슬라이더 (instance-swipwe-5)
const qnaSwiper = new Swiper(".instance-swipwe-5", {
    slidesPerView: 3,
    spaceBetween: 16,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".instance-next5",
        prevEl: ".instance-prev5",
    },
});
