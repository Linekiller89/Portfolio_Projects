document.addEventListener("DOMContentLoaded", function () {
  const whitebox = document.querySelector(".whitebox");
  const menuItems = document.querySelectorAll(".menubox > li");
  const headerHeight = 56; // 헤더 높이
  const hiddenHeader = document.querySelector(".mainheader"); // 숨겨진 헤더 참조
  let lastScrollY = window.scrollY;

  // whitebox가 마우스 진입에 영향받지 않도록 설정
  whitebox.addEventListener("mouseenter", function () {
    whitebox.classList.add("open");
  });

  whitebox.addEventListener("mouseleave", function () {
    whitebox.classList.remove("open");
  });

  // 스크롤 이벤트로 헤더 표시/숨기기 (스크롤 업 시 whitebox 노출)
  window.addEventListener("scroll", function () {
    const currentScrollY = window.scrollY;
    console.log("현재 스크롤 : " + currentScrollY);
    console.log("나중 스크롤 : " + lastScrollY);

    // 화면이 최상단이 아니고 스크롤을 위로 올릴 때 whitebox를 노출
    if (currentScrollY < lastScrollY && currentScrollY > 0) {
      whitebox.classList.add("open");
      whitebox.style.height = "56px"; // 기본 높이로 설정
    }

    // 스크롤을 아래로 내릴 때 whitebox를 숨기기
    if (currentScrollY > lastScrollY) {
      whitebox.classList.remove("open");
    }

    lastScrollY = currentScrollY;
  });

  // 메뉴 항목 hover 관련 로직 (기존 코드 유지)
  menuItems.forEach(function (item) {
    // 마우스가 li 요소에 들어왔을 때
    item.addEventListener("mouseenter", function () {
      whitebox.classList.add("open");

      let whiteboxHeight;

      // 차량 메뉴에 진입 시 whitebox의 크기를 496px + 56px = 552px로 설정
      if (item.classList.contains("vehicles")) {
        whiteboxHeight = 552;
        whitebox.style.height = `${whiteboxHeight}px`;
      }
      // 충전 및 살펴보기 메뉴에 진입 시 whitebox의 크기를 304px + 56px = 360px로 설정
      else if (item.classList.contains("charging") || item.classList.contains("energy")) {
        whiteboxHeight = 360;
        whitebox.style.height = `${whiteboxHeight}px`;
      }
      // Shop 메뉴에 진입 시 whitebox의 크기를 280px + 56px = 336px로 설정
      else if (item.classList.contains("discover")) {
        whiteboxHeight = 336;
        whitebox.style.height = `${whiteboxHeight}px`;
      }

      // 서브메뉴 크기를 whitebox 높이에서 헤더 높이를 뺀 나머지로 설정
      const submenu = item.querySelector(".submenu");
      if (submenu) {
        submenu.style.height = `${whiteboxHeight - headerHeight}px`;
        submenu.classList.add("show");
      }
    });

    // 마우스가 li 요소에서 나갔을 때
    item.addEventListener("mouseleave", function () {
      whitebox.classList.remove("open");

      // whitebox 크기 원래대로 복원
      whitebox.style.height = "56px";

      // 서브메뉴 숨기기
      const submenu = item.querySelector(".submenu");
      if (submenu) {
        submenu.style.height = "0px"; // 서브메뉴 높이를 0으로 설정해 숨김
        submenu.classList.remove("show");
      }
    });
  });
});
