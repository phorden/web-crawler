import { test, expect} from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

const testHTML = '<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a><a href="https://blog.boot.dev/article1"><span>Article 1</span></a></body></html>';

test('https with trailing slash', () => {
    expect(normalizeURL("https://blog.boot.dev/path/")).toEqual("blog.boot.dev/path");
});

test('https without trailing slash', () => {
    expect(normalizeURL("https://blog.boot.dev/path")).toEqual("blog.boot.dev/path");
})

test('http with trailing slash', () => {
    expect(normalizeURL("http://blog.boot.dev/path/")).toEqual("blog.boot.dev/path");
})

test('http without trailing slash', () => {
    expect(normalizeURL("http://blog.boot.dev/path")).toEqual("blog.boot.dev/path");
});

test('url with query string', () => {
    expect(normalizeURL("https://blog.boot.dev/path?function=test")).toEqual("blog.boot.dev/path");
})

test('url with hash', () => {
    expect(normalizeURL("https://blog.boot.dev/path#teklwrjwelkrj")).toEqual("blog.boot.dev/path");
})

test('get URLs from an html page', () => {
    expect(getURLsFromHTML(testHTML, 'https://blog.boot.dev')).toEqual(['blog.boot.dev', 'blog.boot.dev/article1']);
})