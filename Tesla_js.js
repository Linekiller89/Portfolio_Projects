document.addEventListener("DOMContentLoaded", function () {
  const whitebox = document.querySelector(".whitebox");
  const menuItems = document.querySelectorAll(".menubox > li");
  const headerHeight = 56;
  const mainHeader = document.querySelector(".mainheader");
  const logo = document.querySelector(".logobox a > img");
  const menuSpans = document.querySelectorAll(".menubox > li > button > span");
  const utilIcons = document.querySelectorAll(".utilnav > li > a > img");
  const blurscreen = document.querySelector(".blurscreen");
  const openmenu = document.querySelector(".openmenu");
  const mobilemenu = document.querySelector(".mobilemenu");
  const closemenu = document.querySelector(".closemenu");
  let lastScrollY = window.scrollY;
  let activeSubmenu = null;
  let hasAnimated = false;

  // 서브메뉴 항목 애니메이션 추가 함수
  function addAnimationToSubmenuItems(submenu) {
    const submenuItems = submenu.querySelectorAll("li");
    submenuItems.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.1}s`; // 각 li 항목에 시간차 추가
      item.classList.add("fade-in");
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
      whitebox.style.opacity = 1;

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

        if (activeSubmenu && activeSubmenu !== submenu) {
          activeSubmenu.classList.remove("show");
          activeSubmenu.style.height = "0px";
        }

        openWhitebox(whiteboxHeight);

        if (activeSubmenu !== submenu || !hasAnimated) {
          addAnimationToSubmenuItems(submenu);
          hasAnimated = true;
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
          hasAnimated = false;
        }
        if (window.scrollY === 0) {
          closeWhitebox();
        } else {
          whitebox.style.height = `${headerHeight}px`;
          whitebox.style.opacity = 0.8;
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
        removeAnimationFromSubmenuItems(submenu);
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
      mainHeader.classList.add("hidden");
      whitebox.style.opacity = 0.8;
      if (activeSubmenu) {
        activeSubmenu.classList.remove("show");
        removeAnimationFromSubmenuItems(activeSubmenu);
        activeSubmenu = null;
      }
      closeWhitebox();
      hideBlurScreen();
    } else {
      whitebox.style.opacity = 0.8;
      mainHeader.classList.remove("hidden");
      mainHeader.classList.add("scrolled");
      setHeaderColors("black");
      whitebox.classList.add("open");
      whitebox.style.height = `${headerHeight}px`;
    }

    if (currentScrollY === 0) {
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

  // 메뉴 닫기 버튼 클릭 시
  closemenu.addEventListener("click", function () {
    const openMobileSubmenu = document.querySelector(".mobile.show");

    mobilemenu.classList.remove("open");
    if (openMobileSubmenu) {
      openMobileSubmenu.classList.remove("show");
      openMobileSubmenu.removeChild(openMobileSubmenu.firstChild);
    }
    document.querySelector(".menubox").classList.toggle("active");
  });
});
