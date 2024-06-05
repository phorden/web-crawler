import { JSDOM } from "jsdom";

function normalizeURL(url) {
    let normalizedURL = new URL(url.toString().startsWith("http") ? url : `https://${url}`);
    const pathNameTrimmed = normalizedURL.pathname.replace(/\/+$/, '');
    return normalizedURL.hostname + pathNameTrimmed;
}

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody, {url: baseURL});
    const linkList = [];
    dom.window.document.querySelectorAll('a').forEach((element) => {
        const urlNormalized = normalizeURL(element);
        return linkList.push(urlNormalized);
    });
    return linkList;
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
    try {
        const baseURLHost = new URL(baseURL.toString().startsWith("http") ? baseURL : `https://${baseURL}`);
        const currentURLHost = new URL(currentURL.toString().startsWith("http") ? currentURL : `https://${currentURL}`);

        if (currentURLHost.hostname !== baseURLHost.hostname) {
            return pages;
        }

        const normalizedCurrentURL = normalizeURL(currentURL);

        if (normalizedCurrentURL in pages) {
            pages[`${normalizedCurrentURL}`] += 1;
            return pages;
        } else {
            pages[`${normalizedCurrentURL}`] = 1;
        }

        const res = await fetch(currentURLHost);

        if (res.status === 400) {
            throw Error(res.statusText);
        }

        if (!res.headers.get('Content-Type').startsWith("text/html")) {
            throw Error(res.statusText);
        }

        const htmlContent = await res.text();

        const links = getURLsFromHTML(htmlContent, currentURLHost);

        links.forEach(link => {
            crawlPage(baseURL, link, pages);
        });

        // return pages;

    } catch(err) {
        console.error(err);
    }

    return pages;
}

export { normalizeURL, getURLsFromHTML, crawlPage };