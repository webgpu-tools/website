import { toString, trailingSlash } from "@weborigami/async-tree";

const specHref = `https://github.com/webgpu-tools/wesl-spec/blob/main/`;
const wikiHref = `https://github.com/webgpu-tools/wesl-spec/wiki/`;

/**
 * Adjust links in markdown to meet our needs
 *
 * The site is built from markdown documents written for the spec and wiki.
 * Links in those documents are (and should continue to be) written as relative
 * links so the links will work in those locations on GitHub.
 *
 * When we build the site, however, we need to adjust those links so that they
 * point to locations inside the site.
 *
 * We also need to change internal links to `.md` files to `.html` files, and
 * add a `.html` extension to internal links that don't have an extension.
 *
 * Finally, we want to be able to move a page to a different point in the site
 * hierarchy and adjust the base path for its links accordingly. This is needed,
 * for example, when we move the wiki Home page content to become the index page
 * at the top level of the site.
 *
 * @param {import("@weborigami/async-tree").StringLike} input
 * @param {string} [basePath]
 */
export default function adjustMdLinks(input, basePath = "") {
  const markdown = toString(input);
  // Matches markdown links of the form `[link](href)`
  const inlineLinkRegex = /\[(?<text>[^\]]+)\]\((?<href>[^)]+)\)/g;
  // Matches reference-style link definitions of the form `[label]: href`,
  // excluding footnote definitions like `[^1]: ...`
  const refDefRegex = /^(?<prefix>\[(?!\^)[^\]]+\]:[ \t]*)(?<href>\S+)/gm;
  return markdown
    .replace(inlineLinkRegex, (match, text, href) => {
      const adjusted = adjustHref(href, basePath, match);
      return adjusted ? `[${text}](${adjusted})` : match;
    })
    .replace(refDefRegex, (match, prefix, href) => {
      const adjusted = adjustHref(href, basePath, match);
      return adjusted ? `${prefix}${adjusted}` : match;
    });
}

/**
 * Adjust a single link target, returning the new href, or null if the link
 * should be left unchanged.
 */
function adjustHref(href, basePath, link) {
  // Split off any `#anchor` fragment and adjust the path portion
  const hashIndex = href.indexOf("#");
  const anchor = hashIndex >= 0 ? href.slice(hashIndex) : "";
  const path = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  if (path === "") {
    // Same-page anchor link
    return null;
  }

  // Test to see if the link is internal or external
  const url = fakeUrl(path, link);
  const internal = url.protocol === "fake:";
  const adjustedPath = internal
    ? adjustInternalPath(path, basePath)
    : adjustExternalPath(path);
  return adjustedPath ? adjustedPath + anchor : null;
}

/** Create a url so we can test whether an href is relative or absolute */
function fakeUrl(href, link) {
  let url;
  try {
    url = new URL(href, "fake://");
  } catch (e) {
    throw new Error(`Invalid href: '${href}'  in link: '${link}'`);
  }
  return url;
}

function adjustExtension(href) {
  return href.replace(/\.md$/, ".html");
}

function adjustExternalPath(path) {
  if (path.startsWith(specHref)) {
    // External link to the spec; map to spec/ area
    return adjustExtension(path.replace(specHref, `/spec/`));
  } else if (path.startsWith(wikiHref)) {
    // External link to the wiki; map to docs/ area
    return adjustExtension(path.replace(wikiHref, `/docs/`));
  }
  return null;
}

function adjustInternalPath(path, basePath) {
  // Skip directory links
  if (path.endsWith("/")) {
    return null;
  }

  if (!path.match(/(\.[a-z]+)$/i)) {
    // No extension; append .html
    path += ".html";
  } else {
    path = adjustExtension(path);
  }

  if (basePath && !path.startsWith("/")) {
    path = trailingSlash.add(basePath) + path;
  }

  return path;
}
