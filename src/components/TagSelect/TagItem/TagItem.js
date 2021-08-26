import React from 'react';
import classNames from "classnames";

const TagItem = ({tag, classnames, fn}) => {


  return (
    <div onClick={fn ?() => fn(tag, classnames) : undefined} className={classNames('tag__item', {
      'tag__item--selected': classnames === 'selected'
    } )}>{`#${tag}`}</div>
  );
};

export default TagItem;