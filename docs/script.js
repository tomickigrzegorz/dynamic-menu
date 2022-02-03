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
  // subMenuContent.classList.add("hidden");

  let sumOfAllWidths = 0;
  const liElements = document.querySelectorAll(".menu > li:not(.sub-menu)");
  let lengthLi = liElements.length;
  let widthAllLi = 0;
  liElements.forEach((li) => {
    li.dataset.width = li.getBoundingClientRect().width;
    sumOfAllWidths = sumOfAllWidths + Number(li.dataset.width);
    widthAllLi += li.getBoundingClientRect().width;
    if (widthMenu - subMenuWidth - 15 < widthAllLi) {
      if (li.classList.contains("sub-menu")) return;
      copyToSubMenu(li, e.type);
      li.remove();
    } else {
      subMenu.classList.remove("show-submenu");
    }
  });

  subMenu.classList.add("show-submenu", lengthLi < 8);

  const firstElementFromSubMenu = subMenuContent.firstChild;
  const firstELementSubMenu = +firstElementFromSubMenu?.dataset.width;

  if (firstElementFromSubMenu) {
    if (firstELementSubMenu + sumOfAllWidths <= widthMenu - 50) {
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

function copyToSubMenu(li, type) {
  const liCopy = li.cloneNode(true);
  subMenuContent.insertAdjacentElement(
    type == "load" ? "beforeend" : "afterbegin",
    liCopy
  );
}

window.addEventListener("resize", showHideLi);
window.addEventListener("load", showHideLi);
