const subMenuContent = document.querySelector(".sub-menu-container");
const subMenu = document.querySelector(".sub-menu");

function showHideLi(e) {
  const menuUl = document.querySelector(".menu");
  const subMenuWidth = subMenu.getBoundingClientRect().width;
  const { width: widthMenu, height: heightMenu } =
    menuUl.getBoundingClientRect();

  document.documentElement.style.setProperty(
    "--submenu-top",
    `${heightMenu}px`
  );

  // hide/show menu when resize
  subMenuContent.classList.add("hidden");

  let sumOfAllWidths = 0;
  const liElements = document.querySelectorAll(".menu > li:not(.sub-menu)");
  let lengthLi = liElements.length;
  let widthAllLi = 0;

  let arrayLi = [];

  liElements.forEach((li, index) => {
    li.dataset.width = li.getBoundingClientRect().width.toFixed(2);
    li.dataset.index = index;
    sumOfAllWidths = sumOfAllWidths + Number(li.dataset.width);
    widthAllLi += li.getBoundingClientRect().width.toFixed(0) * 1;

    // 40 this is button width show submenu
    if (widthMenu - 40 < widthAllLi) {
      if (li.classList.contains("sub-menu")) return;
      arrayLi.push(li);
      li.remove();
    } else {
      subMenu.classList.remove("show-submenu");
    }
  });

  copyLiELementToSubMenu(arrayLi, e.type);

  subMenu.classList.add("show-submenu", lengthLi < 8);

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
    (a, b) => Number(b.dataset.index) - Number(a.dataset.index)
  );

  const typeLoad = type == "load" ? "beforeend" : "afterbegin";
  sortLiByIndex.forEach((li) => {
    subMenuContent.insertAdjacentElement(typeLoad, li);
  });
}

window.addEventListener("resize", showHideLi);
document.addEventListener("change", () => {
  alert("ok");
});
window.addEventListener("DOMContentLoaded", showHideLi);
