document.addEventListener("DOMContentLoaded", function () {
  const whitebox = document.querySelector(".whitebox");
  const menuItems = document.querySelectorAll(".menubox > li");
  const headerHeight = 56;
  const hiddenHeader = document.querySelector(".mainheader");
  const logo = document.querySelector(".logobox a > img");
  const menuSpans = document.querySelectorAll(".menubox > li > button > span");
  const utilIcons = document.querySelectorAll(".utilnav > li > a > img");
  const mainHeader = document.querySelector(".mainheader");
  const logobox = document.querySelector(".logobox");
  const utilbox = document.querySelector(".utilbox");
  const blurscreen = document.querySelector(".blurscreen");
  const openMenu = document.querySelector(".openmenu");
  const mobileMenu = document.querySelector(".mobilemenu");
  const body = document.querySelector("body");

  let lastScrollY = window.scrollY;
  let activeSubmenu = null;

  function setHeaderColors(color) {
    const filterValue = color === "black" ? "brightness(0) invert(0)" : "brightness(0) invert(1)";
    logo.style.filter = filterValue;
    menuSpans.forEach((span) => (span.style.color = color));
    utilIcons.forEach((icon) => (icon.style.filter = filterValue));
  }

  function closeWhitebox() {
    if (window.scrollY === 0) {
      whitebox.classList.remove("open");
      hiddenHeader.classList.remove("scrolled");
      setHeaderColors("white");
      whitebox.style.height = `${headerHeight}px`;
    } else {
      whitebox.style.height = `${headerHeight}px`;
      setHeaderColors("black");
      hiddenHeader.classList.add("scrolled");
    }

    if (activeSubmenu) {
      activeSubmenu.style.height = "0px";
      activeSubmenu.classList.remove("show");
      activeSubmenu = null;
      hideBlurScreen();
    }
  }

  function openWhitebox() {
    whitebox.classList.add("open");
    hiddenHeader.classList.add("scrolled");
    setHeaderColors("black");
  }

  function showBlurScreen() {
    if (window.innerWidth < 1200) return;
    blurscreen.style.display = "block";
  }

  function hideBlurScreen() {
    blurscreen.style.display = "none";
  }

  // 모바일 메뉴 열기 및 스크롤 비활성화
  openMenu.addEventListener("click", function () {
    if (mobileMenu.classList.contains("open")) {
      mobileMenu.classList.remove("open");
      body.style.overflow = ""; // 스크롤 활성화
      hideBlurScreen();
    } else {
      mobileMenu.classList.add("open");
      body.style.overflow = "hidden"; // 스크롤 비활성화
      showBlurScreen();
    }

    // 모바일 메뉴 닫기 및 스크롤 활성화
    const closeMenu = document.querySelector(".closemenu");
    closeMenu.addEventListener("click", function () {
      mobileMenu.classList.remove("open");
      body.style.overflow = ""; // 스크롤 활성화
    });
  });

  // 차량, 충전, 살펴보기 버튼 클릭 시 show 클래스 추가 및 mobilesubheader 생성

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
        backButton.innerHTML = `<img src="./img/mobile/뒤로가기버튼.svg" alt="" />뒤로가기버튼`;
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

  window.addEventListener("scroll", function () {
    const currentScrollY = window.scrollY;

    if (currentScrollY < lastScrollY && currentScrollY > 0) {
      openWhitebox();
      whitebox.style.height = `${headerHeight}px`;
      hiddenHeader.classList.remove("hidden");
      hiddenHeader.classList.add("show");
    } else if (currentScrollY > lastScrollY) {
      closeWhitebox();
      hiddenHeader.classList.remove("show");
      hiddenHeader.classList.add("hidden");
    }

    if (currentScrollY === 0) {
      closeWhitebox();
      hiddenHeader.classList.add("show");
      hiddenHeader.classList.remove("hidden");
    }

    lastScrollY = currentScrollY;
  });

  menuItems.forEach(function (item) {
    item.addEventListener("mouseenter", function () {
      openWhitebox();
      showBlurScreen();

      let whiteboxHeight;
      if (item.classList.contains("vehicles")) {
        whiteboxHeight = 552;
      } else if (item.classList.contains("charging") || item.classList.contains("discover")) {
        whiteboxHeight = 360;
      } else if (item.classList.contains("shop")) {
        whiteboxHeight = 336;
      }

      whitebox.style.height = `${whiteboxHeight}px`;

      if (activeSubmenu && activeSubmenu !== item.querySelector(".submenu")) {
        activeSubmenu.style.height = "0px";
        activeSubmenu.classList.remove("show");
      }

      const submenu = item.querySelector(".submenu");
      if (submenu) {
        submenu.style.height = `${whiteboxHeight - headerHeight}px`;
        submenu.classList.add("show");
        activeSubmenu = submenu;
      }
    });

    item.addEventListener("mouseleave", function (event) {
      const isInHeader = mainHeader.contains(event.relatedTarget);
      const isInLogobox = logobox.contains(event.relatedTarget);
      const isInUtilbox = utilbox.contains(event.relatedTarget);
      const isInAnotherMenu = Array.from(menuItems).some((li) => li.contains(event.relatedTarget));

      if (!isInAnotherMenu && !activeSubmenu) {
        hideBlurScreen();
      }

      if (isInLogobox || isInUtilbox) {
        if (window.scrollY === 0) {
          closeWhitebox();
        } else {
          if (activeSubmenu) {
            activeSubmenu.style.height = "0px";
            activeSubmenu.classList.remove("show");
            activeSubmenu = null;
          }
          whitebox.style.height = `${headerHeight}px`;
        }
      } else if (!isInHeader && !isInAnotherMenu) {
        closeWhitebox();
      }
    });
  });

  logobox.addEventListener("mouseenter", function () {
    hideBlurScreen();
    if (window.scrollY === 0) {
      closeWhitebox();
    } else {
      if (activeSubmenu) {
        activeSubmenu.style.height = "0px";
        activeSubmenu.classList.remove("show");
        activeSubmenu = null;
      }
      whitebox.style.height = `${headerHeight}px`;
    }
  });

  utilbox.addEventListener("mouseenter", function () {
    hideBlurScreen();
    if (window.scrollY === 0) {
      closeWhitebox();
    } else {
      if (activeSubmenu) {
        activeSubmenu.style.height = "0px";
        activeSubmenu.classList.remove("show");
        activeSubmenu = null;
      }
      whitebox.style.height = `${headerHeight}px`;
    }
  });

  mainHeader.addEventListener("mouseenter", function () {
    if (whitebox.classList.contains("open")) {
      whitebox.style.height = headerHeight + "px";
    }
  });

  mainHeader.addEventListener("mouseleave", function () {
    closeWhitebox();
  });
});
