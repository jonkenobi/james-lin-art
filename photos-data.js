/**
 * Album + photo data. Order = display order. `photos` order = grid/lightbox
 * order. `include:false` = hide album. `cover` = main-page pic.
 * `coverFocus` = part of the cover to keep when the screen crops it
 * (mobile only, <=760px): CSS object-position "x% y%", default "50% 50%".
 */

const R2_BASE = "https://pub-5a148723b7864053a58c9f6ade65f125.r2.dev";

function url(folder, file) {
  return `${R2_BASE}/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;
}

function photos(folder, files, alt) {
  return files.map(f => ({ src: url(folder, f), alt }));
}

const ALBUMS = [
  {
    id: "iceland",
    title: "Iceland",
    subtitle: "",
    priority: 1,
    include: true,
    cover: url("1 ICELAND PHOTOS", "DJI_20260518085832_0288_D.jpg"), 
    photos: photos("1 ICELAND PHOTOS", [
      "DJI_20260516033039_0036_D.jpg",
      "DSC09640.jpg",
      "DJI_20260516092054_0094_D.jpg",
      "DJI_20260518085615_0260_D.jpg",
      "DJI_20260518085626_0261_D.jpg",
      "DJI_20260518085832_0288_D.jpg",
      "DJI_20260518085909_0295_D.jpg",
      "DSC09417.jpg",
      "DSC09430.jpg",
      "DSC09466.jpg",
      "DSC09473.jpg",
      "DSC09511.jpg",
      "DSC09603.jpg",
      "DSC09608.jpg",
      "DSC09623.jpg",
      "DJI_20260516054204_0068_D.jpg",
      "DSC0965nobg9.jpg",
      "DSC09665.jpg",
      "DSC09705.jpg",
      "DSC09757.jpg",
      "DSC09890.jpg",
      "DSC09955.jpg",
      "DSC09989.jpg"
    ], "Iceland")
  },
  {
    id: "japan",
    title: "Japan",
    subtitle: "",
    priority: 2,
    include: true,
    cover: url("2 JAPAN PHOTOS", "MAIN PAGE.jpg"),
    coverFocus: "87.8% 50%", // Tokyo Tower
    photos: photos("2 JAPAN PHOTOS", [
      "DSC00695.jpg",
      "DSC02159.jpg",
      "DSC02228.jpg",
      "DSC02242.jpg",
      "DSC02326-3.jpg",
      "DSC07269.jpg",
      "DSC07357.jpg",
      "DSC07588.jpg",
      "DSC07593.jpg",
      "DSC07717.jpg",
      "DSC07865.jpg",
      "DSC07919.jpg",
      "DSC07990.jpg",
      "DSC08005.jpg",
      "DSC08056.jpg",
      "DSC08111.jpg",
      "DSC08226.jpg",
      "DSC08305.jpg",
      "DSC08309.jpg",
      "DSC08334.jpg"
    ], "Japan")
  },
  {
    id: "new-york",
    title: "New York",
    subtitle: "",
    priority: 3,
    include: true,
    cover: url("3 NEW YORK PHOTOS", "MAIN PAGE.jpg"),
    photos: photos("3 NEW YORK PHOTOS", [
      "DSC00229.jpg",
      "DSC00329.jpg",
      "DSC00401.jpg",
      "DSC00528.jpg",
      "DSC00692s.jpg",
      "DSC00709.jpg",
      "DSC00716.jpg",
      "DSC00790.jpg",
      "DSC00854.jpg",
      "DSC00883.jpg",
      "DSC00950.jpg",
      "anmorphic1.jpg",
      "anmorphic4.jpg"
    ], "New York")
  },
  {
    id: "chicago",
    title: "Chicago",
    subtitle: "",
    priority: 4,
    include: true,
    cover: url("4 CHICAGO PHOTOS", "MAIN PAGE.jpg"),
    photos: photos("4 CHICAGO PHOTOS", [
      "DSC01203.jpeg",
      "DSC01223-3.jpeg",
      "DSC01228.jpeg",
      "DSC01237.jpeg",
      "DSC05096-2.jpg",
      "DSC05211.jpg",
      "DSC05212.jpg",
      "DSC05333.jpg",
      "DSC05343.jpg",
      "DSC05355.jpg",
      "DSC05375.jpg",
      "DSC05401-2.jpg",
      "DSC05401-3.jpg",
      "DSC05401.jpg",
      "DSC05420-2.jpg",
      "DSC05420.jpg",
      "DSC05421-2.jpg",
      "DSC05421.jpg",
      "DSC05626.jpg",
      "DSC05827.jpg",
      "DSC05934-2.jpg",
      "DSC05934.jpg",
      "DSC06067.jpg",
      "DSC06190.jpg",
      "DSC06214-2.jpg",
      "DSC06227.jpg",
      "DSC06351.jpg",
      "DSC06394.jpg",
      "DSC06422.jpg",
      "DSC06423.jpg",
      "DSC06472.jpg",
      "DSC06561.jpg",
      "DSC06620.jpg",
      "DSC06635.jpg",
      "DSC06659.jpg",
      "DSC06662.jpg",
      "DSC06670.jpg",
      "DSC06680.jpg",
      "DSC06703.jpg",
      "DSC06729.jpg",
      "DSC06730.jpg",
      "DSC06735.jpg",
      "DSC06741.jpg",
      "DSC06779.jpg",
      "DSC06807.jpg",
      "DSC07022.jpg"
    ], "Chicago")
  },
  {
    id: "taiwan",
    title: "Taiwan",
    subtitle: "",
    priority: 5,
    include: true,
    cover: url("5 TAIWAN PHOTOS", "MAIN PAGE.jpg"),
    photos: photos("5 TAIWAN PHOTOS", [
      "DSC01187.jpg",
      "DSC01369.jpg",
      "DSC01447.jpg",
      "DSC01612.jpg",
      "DSC01864.jpg",
      "DSC08502.jpg",
      "DSC09032.jpeg",
      "DSC09075.jpg",
      "DSC09090.jpg",
      "DSC09119.jpg",
      "DSC09361.jpg",
      "DSC09374.jpg"
    ], "Taiwan")
  },
  {
    id: "hawaii",
    title: "Hawaii",
    subtitle: "",
    priority: 6,
    include: true,
    cover: url("6 HAWAII PHOTOS", "MAIN PAGE.jpg"),
    photos: photos("6 HAWAII PHOTOS", [
      "DSC03985.jpg",
      "DSC04010.jpg",
      "DSC04083.jpg",
      "DSC04179.jpg",
      "DSC04609.jpg",
      "DSC04623.jpg",
      "DSC04660.jpg",
      "DSC04699.jpg",
      "DSC04729.jpg"
    ], "Hawaii")
  },
  {
    id: "others",
    title: "Others",
    subtitle: "",
    priority: 9,
    include: true,
    cover: url("9 OTHERS", "MAINPAGE.jpg"),
    coverFocus: "38% 55%", // TWICE
    photos: photos("9 OTHERS", [
      "2.jpg",
      "DSC01751.jpg",
      "DSC01813.jpg",
      "DSC03289.jpg",
      "DSC03318.jpg",
      "DSC04972-2.jpg",
      "DSC04985.jpg",
      "DSC06609.jpg",
      "DSC06633.jpg",
      "DSC06639.jpg",
      "DSC07967.jpg",
      "DSC08294.jpg",
      "DSC08398.jpg",
      "DSC09910.jpg"
    ], "Others")
  }
];

function getAlbum(id) {
  return ALBUMS.find(a => a.id === id);
}

function getVisibleAlbums() {
  return ALBUMS.filter(a => a.include !== false);
}
