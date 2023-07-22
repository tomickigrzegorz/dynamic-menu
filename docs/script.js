const subMenuContent = document.querySelector(".sub-menu-container");
const subMenu = document.querySelector(".sub-menu");
const root = document.documentElement;

function showHideLi(e) {
  const { width: widthMenu, height: heightMenu } = document
    .querySelector(".menu")
    .getBoundingClientRect();

  root.style.setProperty("--submenu-top", `${heightMenu}px`);

  // hide/show menu when resize
  subMenuContent.classList.add("hidden");

  let sumOfAllWidths = 0;
  const liElements = document.querySelectorAll(".menu > li:not(.sub-menu)");
  let widthAllLi = 0;

  let liArray = [];

  liElements.forEach((li, index) => {
    li.dataset.width = li.getBoundingClientRect().width.toFixed(2);
    li.dataset.index = index;
    sumOfAllWidths = sumOfAllWidths + Number(li.dataset.width);
    widthAllLi += li.getBoundingClientRect().width.toFixed(0) * 1;

    // 40 this is button width show submenu
    if (widthMenu - 40 < widthAllLi) {
      if (li.classList.contains("sub-menu")) return;
      liArray.push(li);
      li.remove();
    } else {
      subMenu.classList.remove("show-submenu");
    }
  });

  copyLiELementToSubMenu(liArray, e.type);

  // add class when widtmMenu - 40(button size) < width all li in ul
  subMenu.classList.add("show-submenu", widthMenu - 40 < widthAllLi);

  const firstElementFromSubMenu = subMenuContent.firstChild;
  const firstELementSubMenu = +firstElementFromSubMenu?.dataset.width;

  if (firstElementFromSubMenu) {
    if (firstELementSubMenu + sumOfAllWidths <= widthMenu) {
      subMenu.insertAdjacentElement("beforebegin", firstElementFromSubMenu);
    }
  } else {
    subMenu.classList.remove("show-submenu");
  }
}

document.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("sub-menu")) {
    subMenuContent.classList.toggle("hidden");
  } else {
    subMenuContent.classList.add("hidden");
  }
  return;
});

// copy li element to submenu
function copyLiELementToSubMenu(arrayLi, type) {
  const sortLiByIndex = arrayLi.sort(
    (a, b) => Number(a.dataset.index) - Number(b.dataset.index)
  );

  const typeLoad = type == "load" ? "beforeend" : "afterbegin";
  sortLiByIndex.forEach((li) => {
    subMenuContent.insertAdjacentElement(typeLoad, li);
  });
}

window.addEventListener("resize", showHideLi);
window.addEventListener("load", showHideLi);
