document.addEventListener("DOMContentLoaded", function () {
  // DOM 요소가 완전히 로드된 이후, 이벤트 발생
  const hiddenHeader = document.querySelector(".headerhiddenmain");
  const menuItems = document.querySelectorAll(".menu > li");
  const submenus = document.querySelectorAll(".submenu");

  let lastScrollY = window.scrollY;

  // 스크롤 이벤트를 통해 헤더 표시/숨기기 제어
  window.addEventListener("scroll", function () {
    const currentScrollY = window.scrollY;

    if (currentScrollY < lastScrollY && currentScrollY > 0) {
      // 스크롤이 위로 올라가고 화면이 최상단이 아닐 때
      hiddenHeader.classList.add("show");
    } else if (currentScrollY === 0 || currentScrollY > lastScrollY) {
      // 화면이 최상단일 때 or 스크롤 올렸다가 다시 내릴때 헤더 숨기기
      hiddenHeader.classList.remove("show");
    }

    lastScrollY = currentScrollY;
  });

  // 메인 헤더 메뉴에 마우스 호버 시 숨겨진 헤더와 서브메뉴 표시
  menuItems.forEach(function (item) {
    item.addEventListener("mouseenter", function () {
      hiddenHeader.classList.add("show");
      const submenu = item.querySelector(".submenu");
      if (submenu) {
        submenu.style.visibility = "visible";
        submenu.style.opacity = "1";
      }
    });

    item.addEventListener("mouseleave", function () {
      const currentScrollY = window.scrollY;
      const submenu = item.querySelector(".submenu");
      if (currentScrollY === 0) {
        // 화면이 최상단일 때만 헤더 숨기기
        if (submenu) {
          hiddenHeader.classList.remove("show");
          submenu.style.visibility = "hidden";
          submenu.style.opacity = "0";
        }
      } else {
        // 서브메뉴만 숨기기
        if (submenu) {
          submenu.style.visibility = "hidden";
          submenu.style.opacity = "0";
        }
      }
    });
  });
});
