function printReport(pages) {
    console.log("-----------Report Starting-----------");
    console.log(sortPages(pages));
    console.log("-----------End Report-----------------")
}

function sortPages(pages) {
    const sortedPages = Object.entries(pages);

    sortedPages.sort((a, b) => a[1] - b[1]);

    return sortedPages;
}

export { printReport };