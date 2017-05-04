export Anchor from './Anchor';
export ContentSubTitle from './ContentSubTitle';
export ContentTitle from './ContentTitle';
export ContentTitleCaps from './ContentTitleCaps';
export MdIcon from './MdIcon';
export MdSwitch from './MdSwitch';
export Spinner from './Spinner';

// used for dangerouslySetInnerHtml
exports.createMarkup = function(markup) {
  return {
    __html: markup
  };
};
