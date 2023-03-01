import React from 'react';
import "./index.less";
import { jsx as _jsx } from "react/jsx-runtime";

var getHighlightHtml = function getHighlightHtml(keywords, text, highlightColor) {
  var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'text';
  var pattern = keywords.map(function (keyword) {
    return keyword.replace(/[.[*?+^$|()/]|\]|\\/g, '\\$&');
  }).join('|');
  var reg = new RegExp("(".concat(pattern, "){1}"), 'g');

  if (highlightColor) {
    return text.replace(reg, "<span style='color:".concat(highlightColor, "' class='high-light'>$&</span>"));
  } else {
    if (type === 'text') {
      return text.replace(reg, "<span class='high-light'>$&</span>");
    } else {
      return text.replace(reg, "<span class='high-light bg-light'>$&</span>");
    }
  }
};

var HighlightText = function HighlightText(props) {
  var keywords = props.keywords,
      text = props.text,
      className = props.className,
      style = props.style,
      highlightColor = props.highlightColor,
      _props$type = props.type,
      type = _props$type === void 0 ? 'text' : _props$type;
  return /*#__PURE__*/_jsx("span", {
    style: style,
    className: className,
    dangerouslySetInnerHTML: {
      __html: getHighlightHtml(keywords, text, highlightColor, type)
    }
  });
};

export default /*#__PURE__*/React.memo(HighlightText);