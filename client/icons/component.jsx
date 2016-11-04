import React, { PropTypes } from 'react';
import getIcons from './';
import includes from 'lodash/includes';

const { ICON_MAP, ICON_LIST, GLYPHS } = getIcons();

export default function Icon(props) {
  const { name, glyph, className, ...otherProps } = props;

  if (!glyph && !includes(ICON_LIST, name)) {
    return null;
  }

  const useGlyph = glyph || GLYPHS[name];

  return (
    <svg
      {...otherProps}
      className={`o-icon o-icon--svg ${className}`}
      dangerouslySetInnerHTML={{ __html: `<use xlink:href=${useGlyph}></use>` }}
    />
  );
}

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  glyph: PropTypes.any,
};

export const ICONS = Icon.ICONS = ICON_MAP;
