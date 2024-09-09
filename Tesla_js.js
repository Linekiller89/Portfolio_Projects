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
    }
  }

  function openWhitebox() {
    whitebox.classList.add("open");
    hiddenHeader.classList.add("scrolled");
    setHeaderColors("black");
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

      let whiteboxHeight;
      if (item.classList.contains("vehicles")) {
        whiteboxHeight = 552;
      } else if (item.classList.contains("charging") || item.classList.contains("energy")) {
        whiteboxHeight = 360;
      } else if (item.classList.contains("discover")) {
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
      const isTop = window.scrollY === 0;

      if (isInLogobox || isInUtilbox) {
        if (isTop) {
          closeWhitebox();
        } else {
          if (activeSubmenu) {
            activeSubmenu.style.height = "0px";
            activeSubmenu.classList.remove("show");
            activeSubmenu = null;
          }
          whitebox.style.height = `${headerHeight}px`;
        }
      } else if (!isInHeader) {
        closeWhitebox();
      }
    });
  });

  logobox.addEventListener("mouseenter", function () {
    const isTop = window.scrollY === 0;
    if (isTop) {
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
    const isTop = window.scrollY === 0;
    if (isTop) {
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
      whitebox.style.height = "auto";
    }
  });

  mainHeader.addEventListener("mouseleave", function () {
    closeWhitebox();
  });
});
