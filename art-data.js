/**
 * Art page data — manual row/column layout (not auto-masonry) to match
 * WEBSITEARTPAGELAYOUT.png.
 *
 * ART_ROWS is an array of rows. Each row is an array of columns. Each
 * column is an array of filenames, stacked top-to-bottom within that
 * column. Columns in a row sit side by side and share the row's width
 * equally.
 *
 *   [ ["a.jpg"] ]                      -> one row, one full-width image
 *   [ ["a.jpg"], ["b.jpg"] ]           -> one row, two images side by side
 *   [ ["a.jpg","b.jpg"], ["c.jpg"] ]   -> one row, left column stacks
 *                                          a+b, right column is c
 *
 * Every image keeps its natural aspect ratio — no cropping — so rows
 * with mismatched column heights are expected and fine.
 *
 * Reorder by editing ART_ROWS directly.
 */

const ART_R2_BASE = "https://pub-ef7ebd14b56d4175889bbc88a95dcb1e.r2.dev";

function artUrl(file) {
  return `${ART_R2_BASE}/${encodeURIComponent(file)}`;
}

const ART_ROWS = [
  [["1.jpg"]],
  [["ld3.jpg"]],
  [["skufa2dsadsa.jpg"]],
  [
    ["17817762_1703946693231132_914342608254271488_n.jpg", "24175166_194373321139503_2081338553186385920_n.jpg"],
    ["mla layoutlayers.jpg"]
  ],
  [["jlaw.jpg"], ["mg.jpg"]],
  [["baby.jpg"]],
  [["20688538_1432339583523738_3806626078470963200_n.jpg"], ["ivy2.jpg"]],
  [["cat-Recovered.jpg"]],
  [["347419841_204131269102121_7747555355621459064_n.jpg"], ["11.jpg"]],
  [["3.jpg"]],
  [["2.jpg"]],
  [["JamesLin_kpopmerchdesign.png"]],
  [["popo.jpg"]],
  [["funs2.jpg"]]
];

const ART_PIECES = ART_ROWS
  .flat()
  .flat()
  .map(f => ({ src: artUrl(f), alt: "James Lin — Art" }));
