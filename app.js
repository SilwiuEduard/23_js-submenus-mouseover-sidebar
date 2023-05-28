import sublinks from "./data.js";

const toggleBtn = document.querySelector(".toggle-btn");
const closeBtn = document.querySelector(".close-btn");
const sidebarWrapper = document.querySelector(".sidebar-wrapper");
const sidebar = document.querySelector(".sidebar-links");
const linkBtns = [...document.querySelectorAll(".link-btn")];
const submenu = document.querySelector(".submenu");
const hero = document.querySelector(".hero");
const nav = document.querySelector(".nav");
// hide/show sideabar
toggleBtn.addEventListener("click", () => {
  sidebarWrapper.classList.add("show");
});
closeBtn.addEventListener("click", () => {
  sidebarWrapper.classList.remove("show");
});

// set sidebar
sidebar.innerHTML = sublinks
  .map((itemA) => {
    //console.log(itemA);
    const { links, page } = itemA;
    return `<article>
  <h4>${page}</h4>
  <div class="sidebar-sublinks">
    ${links
      .map((link) => {
        return `<a href="${link.url}">
        <i class="${link.icon}"></i>${link.label}</a>`;
      })
      .join("")}
  </div>
  <article>`;
  })
  .join("");

linkBtns.forEach((btn) => {
  // console.log(btn);
  btn.addEventListener("mouseover", function (e) {
    // console.log(e.currentTarget);
    const text = e.currentTarget.textContent;
    const tempBtn = e.currentTarget.getBoundingClientRect();
    const center = (tempBtn.left + tempBtn.right) / 2;
    // console.log(center);
    const bottom = tempBtn.bottom - 3;
    //console.log(bottom);
    console.log(tempBtn);

    const tempPage = sublinks.find(({ page }) => page === text);
    if (tempPage) {
      const { page, links } = tempPage;
      submenu.classList.add("show");
      submenu.style.left = `${center}px`;
      submenu.style.top = `${bottom}px`;

      // OPTIONAL - added different columns to the links submenu
      let columns = "col-2";
      if (links.length === 3) {
        columns = "col-3";
      }
      if (links.length > 3) {
        columns = "col-4";
      }

      submenu.innerHTML = `
      <section> 
      <h4>${page}</h4>
      <div class="submenu-center ${columns}">
${links
  .map((link) => {
    return `<a href="${link.url}">
    <i class="${link.icon}"></i> ${link.label}
    </a> `;
  })
  .join("")}
      </div>
      </section>

      `;
    }
  });
});

hero.addEventListener("mouseover", () => {
  submenu.classList.remove("show");
});

nav.addEventListener("mouseover", function (e) {
  if (!e.target.classList.contains("link-btn"))
    submenu.classList.remove("show");
});
