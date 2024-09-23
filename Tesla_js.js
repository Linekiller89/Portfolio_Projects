document.addEventListener("DOMContentLoaded", function () {
  // 기존 코드들은 그대로 유지...

  const whitebox = document.querySelector(".whitebox");
  const menuItems = document.querySelectorAll(".menubox > li");
  const headerHeight = 56;
  const mainHeader = document.querySelector(".mainheader");
  const logo = document.querySelector(".logobox a > img");
  const menuSpans = document.querySelectorAll(".menubox > li > button > span");
  const utilIcons = document.querySelectorAll(".utilnav > li > a > img");
  const logobox = document.querySelector(".logobox");
  const utilbox = document.querySelector(".utilbox");
  const blurscreen = document.querySelector(".blurscreen");
  const openmenu = document.querySelector(".openmenu");
  const mobilemenu = document.querySelector(".mobilemenu");
  const closemenu = document.querySelector(".closemenu");
  let lastScrollY = window.scrollY;
  let activeSubmenu = null;
  let hasAnimated = false; // 애니메이션 동작 여부 확인 변수

  // 서브메뉴 항목 애니메이션 추가 함수
  function addAnimationToSubmenuItems(submenu) {
    const submenuItems = submenu.querySelectorAll("li");
    submenuItems.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.1}s`; // 각 li 항목에 시간차 추가
      item.classList.add("fade-in"); // 애니메이션 클래스 추가
    });
  }

  // 서브메뉴 항목 애니메이션 제거 함수
  function removeAnimationFromSubmenuItems(submenu) {
    const submenuItems = submenu.querySelectorAll("li");
    submenuItems.forEach((item) => {
      item.classList.remove("fade-in");
      item.style.transitionDelay = ""; // 시간차 초기화
    });
  }

  // 헤더 색상 설정 함수
  function setHeaderColors(color) {
    const filterValue =
      color === "black" ? "brightness(0) invert(0)" : "brightness(0) invert(1)";
    logo.style.filter = filterValue;
    menuSpans.forEach((span) => (span.style.color = color));
    utilIcons.forEach((icon) => (icon.style.filter = filterValue));
  }

  // 화이트박스 열기 함수
  function openWhitebox(height) {
    whitebox.classList.add("open");
    whitebox.style.height = `${height}px`;
    mainHeader.classList.add("scrolled");
    setHeaderColors("black");
  }

  // 화이트박스 닫기 함수
  function closeWhitebox() {
    whitebox.classList.remove("open");
    whitebox.style.height = `${headerHeight}px`;
    if (window.scrollY === 0) {
      mainHeader.classList.remove("scrolled");
      setHeaderColors("white");
    }
  }

  // 블러 스크린 표시 함수
  function showBlurScreen() {
    if (window.innerWidth < 1200) return;
    blurscreen.style.display = "block";
    blurscreen.classList.add("active");
  }

  // 블러 스크린 숨기기 함수
  function hideBlurScreen() {
    blurscreen.style.display = "none";
    blurscreen.classList.remove("active");
  }

  // 메뉴 아이템에 마우스 진입 시 이벤트 핸들러
  menuItems.forEach(function (item) {
    item.addEventListener("mouseenter", function () {
      let submenu = item.querySelector(".submenu");
      let whiteboxHeight = headerHeight;

      if (submenu) {
        if (item.classList.contains("vehicles")) {
          whiteboxHeight = 504;
        } else if (
          item.classList.contains("charging") ||
          item.classList.contains("discover")
        ) {
          whiteboxHeight = 314;
        } else if (item.classList.contains("shop")) {
          whiteboxHeight = 288;
        }

        // 기존에 열려있는 서브메뉴를 닫기
        if (activeSubmenu && activeSubmenu !== submenu) {
          activeSubmenu.classList.remove("show");
          activeSubmenu.style.height = "0px";
        }

        openWhitebox(whiteboxHeight);

        // 이전 서브메뉴와 다르거나 애니메이션이 아직 실행되지 않았을 경우
        if (activeSubmenu !== submenu || !hasAnimated) {
          addAnimationToSubmenuItems(submenu);
          hasAnimated = true; // 애니메이션이 실행된 상태로 변경
        }

        submenu.classList.add("show");
        submenu.style.height = `${whiteboxHeight - headerHeight}px`;
        activeSubmenu = submenu;
        showBlurScreen();
      }
    });

    item.addEventListener("mouseleave", function (event) {
      const relatedTarget = event.relatedTarget;
      if (
        !mainHeader.contains(relatedTarget) &&
        !whitebox.contains(relatedTarget) &&
        !Array.from(menuItems).some((li) => li.contains(relatedTarget))
      ) {
        if (activeSubmenu) {
          removeAnimationFromSubmenuItems(activeSubmenu);
          activeSubmenu.classList.remove("show");
          activeSubmenu.style.height = "0px";
          activeSubmenu = null;
          hasAnimated = false; // 서브메뉴가 닫히면 애니메이션 상태 초기화
        }
        if (window.scrollY === 0) {
          closeWhitebox();
        } else {
          whitebox.style.height = `${headerHeight}px`;
        }
        hideBlurScreen();
      }
    });
  });

  // 서브메뉴 영역에서 마우스 이탈 시 서브메뉴만 닫기
  document.querySelectorAll(".submenu").forEach((submenu) => {
    submenu.addEventListener("mouseleave", function (event) {
      const relatedTarget = event.relatedTarget;
      if (
        !mainHeader.contains(relatedTarget) &&
        !submenu.contains(relatedTarget) &&
        !Array.from(menuItems).some((li) => li.contains(relatedTarget))
      ) {
        submenu.classList.remove("show");
        submenu.style.height = "0px";
        activeSubmenu = null;
        removeAnimationFromSubmenuItems(submenu); // 애니메이션 상태 초기화
        if (window.scrollY === 0) {
          closeWhitebox();
        } else {
          whitebox.style.height = `${headerHeight}px`;
        }
        hideBlurScreen();
      }
    });
  });

  // 스크롤 이벤트 핸들러
  window.addEventListener("scroll", function () {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      // 스크롤 다운: 헤더 제거
      mainHeader.classList.add("hidden");
      if (activeSubmenu) {
        activeSubmenu.classList.remove("show");
        removeAnimationFromSubmenuItems(activeSubmenu);
        activeSubmenu = null;
      }
      closeWhitebox();
      hideBlurScreen();
    } else {
      // 스크롤 업: 헤더와 기본 화이트박스 유지
      mainHeader.classList.remove("hidden");
      mainHeader.classList.add("scrolled");
      setHeaderColors("black");
      whitebox.classList.add("open");
      whitebox.style.height = `${headerHeight}px`;
    }

    if (currentScrollY === 0) {
      // 최상단 도달: 화이트박스 제거
      if (!activeSubmenu) {
        closeWhitebox();
        mainHeader.classList.remove("scrolled");
        setHeaderColors("white");
      }
    }

    lastScrollY = currentScrollY;
  });

  // 모바일 메뉴 설정
  const mobileMenuButtons = document.querySelectorAll(
    ".mobilevehicles button, .mobilecharging button, .mobilediscover button"
  );

  mobileMenuButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const parentLi = button.closest("li");
      const submenu = parentLi.querySelector(".mobile");

      if (submenu && !submenu.classList.contains("show")) {
        submenu.classList.add("show");

        const mobilesubheader = document.createElement("div");
        mobilesubheader.classList.add("mobilesubheader");

        const backButton = document.createElement("button");
        backButton.innerHTML = `<img src="./img/mobile/뒤로가기버튼.svg" alt="뒤로가기" />`;
        backButton.classList.add("back-button");

        const title = document.createElement("h2");
        title.innerText = button.innerText;

        mobilesubheader.appendChild(backButton);
        mobilesubheader.appendChild(title);

        submenu.insertBefore(mobilesubheader, submenu.firstChild);

        // 뒤로가기 버튼 클릭 시 show 클래스 제거 및 뒤로가기 버튼 제거
        backButton.addEventListener("click", function () {
          submenu.classList.remove("show");
          submenu.removeChild(mobilesubheader);
        });
      }
    });
  });

  // 메뉴 아이콘 클릭 시 메뉴 오픈
  openmenu.addEventListener("click", function () {
    mobilemenu.classList.add("open");
    document.querySelector(".menubox").classList.toggle("active");
  });

  // 메뉴 닫기 버튼 클릭 시 메뉴 닫기
  closemenu.addEventListener("click", function () {
    const openMobileSubmenu = document.querySelector(".mobile.show");

    mobilemenu.classList.remove("open"); // 모바일 메뉴 닫기
    if (openMobileSubmenu) {
      openMobileSubmenu.classList.remove("show");
      openMobileSubmenu.removeChild(openMobileSubmenu.firstChild);
      whitebox.style.height = `${headerHeight}px`; // whitebox의 높이 조정
      document.querySelector(".menubox").classList.toggle("active"); // 메뉴박스의 활성화 상태 토글
    }
  });
});
