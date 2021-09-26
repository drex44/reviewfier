export function showPage(pageId) {
  const currentPageId = $(`.main-content .page .visible`);
  if (currentPageId == pageId) {
    return;
  }
  // Hide whatever page is currently shown.
  $(".main-content .page").removeClass("visible");

  const page = $(`#${pageId}`);
  page.addClass("visible");
}
