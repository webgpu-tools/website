import { toString } from "@weborigami/async-tree";

/**
 * Adjust license links in the spec README for the site.
 *
 * The README links each license as `[LICENSE-MIT](LICENSE-MIT) or
 * [http://opensource.org/licenses/MIT](http://opensource.org/licenses/MIT)`,
 * which works on GitHub. On the site we serve the license texts as .txt files
 * (see site.ori), so link there and drop the redundant external mirror link.
 *
 * @param {import("@weborigami/async-tree").StringLike} input
 */
export default function licenseLinks(input) {
  const markdown = toString(input);
  return markdown.replace(
    /\[LICENSE-(?<name>MIT|APACHE)\]\(LICENSE-\k<name>\)\s+or\s+\[http[^\]]*\]\(http[^)]*\)/g,
    "[LICENSE-$<name>](LICENSE-$<name>.txt)"
  );
}
