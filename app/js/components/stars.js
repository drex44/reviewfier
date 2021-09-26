function starHTML(filled, editable = false) {
  let classname = filled ? "checked" : "";
  classname += editable ? "editable" : "";
  return `
    <span class="icon star ${classname}">
      <i class="fas fa-star"></i>
    </span>
  `;
}

export function starIcons(stars, text="") {
  return `
    <span class="icon-text rating-star">
      <span>${text}</span>
      ${new Array(5).fill(0).map((_, i)=>starHTML(i < stars)).join("")}
    </span>
  `;
}