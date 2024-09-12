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
      if (!isInHeader) hideBlurScreen(); // 서브메뉴가 닫힐 때 blurscreen 숨김
    }
  }

  function openWhitebox() {
    whitebox.classList.add("open");
    hiddenHeader.classList.add("scrolled");
    setHeaderColors("black");
  }

  // blurscreen 관련 기능 추가
  function showBlurScreen() {
    blurscreen.style.display = "block";
  }

  function hideBlurScreen() {
    blurscreen.style.display = "none";
  }

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
      showBlurScreen(); // 메뉴에 마우스가 들어갈 때 blurScreen 보이기

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

      if (!isInAnotherMenu && activeSubmenu) {
        if (!isInHeader) hideBlurScreen(); // 서브메뉴가 닫힐 때만 blurScreen을 숨김
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
