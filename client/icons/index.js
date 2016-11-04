import mapKeys from 'lodash/mapKeys';

// adding new icons to the application is simple
// 1) add the svg to this folder (client/icons/)
// 2) add the filename to this list
// 3) ...? (there is no step 3)
// 4) profit (use the icon component 👍)
const ICON_LIST = [
  'confirm',
  'edit',
  'exit',
  'password',
  'security',
  'settings',
  'user',
  'view',
];

const GLYPHS = createGlyphMap(ICON_LIST);

const ICON_MAP = mapKeys(GLYPHS, (_, k) => {
  return k.replace('-', '_').toUpperCase();
});

function createGlyphMap(icons) {
  const glyphs = {};

  icons.forEach((icon) => {
    glyphs[icon] = require(`./${icon}.svg`);
  });

  return glyphs;
}

export default function getIcons() {
  return {
    ICON_LIST,
    ICON_MAP,
    GLYPHS,
  };
}
