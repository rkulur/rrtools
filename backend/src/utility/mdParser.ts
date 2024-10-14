import beautify from "js-beautify";

const parseHeading = (mdStr: string) => {
  const headingRegex = [
    /^#{6}\s?([^\n]+)/,
    /^#{5}\s?([^\n]+)/,
    /^#{4}\s?([^\n]+)/,
    /^#{3}\s?([^\n]+)/,
    /^#{2}\s?([^\n]+)/,
    /^#{1}\s?([^\n]+)/,
  ];

  for (let i = 0; i < headingRegex.length; i++) {
    if (mdStr.match(headingRegex[i])) {
      const headingNo = headingRegex.length - i;
      mdStr = mdStr.replace(
        headingRegex[i],
        `<h${headingNo}>$1</h${headingNo}>\n`,
      );
    }
  }
  return mdStr;
};

const parseUnorderedList = (strArr: string[]) => {
  console.log(strArr);
  let resStr = "<ul>\n";
  const ulRegex = /^\t?[+-]\s?([^\n]+)/;

  strArr.forEach((str) => {
    resStr += str.replace(ulRegex, `<li>$1</li>\n`);
  });
  resStr += "</ul>\n";
  return resStr;
};

const parseOrderedList = (strArr: string[]) => {
  let resStr = "<ol>\n";
  const olRegex = /^\t?\d+\.\d?\s?([^\n]+)/;

  strArr.forEach((str) => {
    resStr += str.replace(olRegex, `<li>$1</li>\n`);
  });
  resStr += "</ol>\n";
  return resStr;
};

const parseStyles = (mdStr: string) => {
  if (mdStr === "") {
    return mdStr;
  }
  let resStr = `<p>${mdStr}</p>`;

  const boldWithItalicRegex = /[*_]{3}([^*^_]+)[*_]{3}/;
  const boldRegex = /[*_]{2}([^*^_]+)[*_]{2}/;
  const italicsRegex = /[*_]([^*^_]+)[*_]/;
  const linkRegex = /\[([^\]]+)\]\(([^\)]+)\)/;
  const imgRegex = /!\[([^\]]+)\]\(([^\)]+)\)/;

  resStr = resStr.replace(boldWithItalicRegex, `<strong><em>$1</em></strong>`);
  resStr = resStr.replace(boldRegex, `<strong>$1</strong>`);
  resStr = resStr.replace(italicsRegex, `<em>$1</em>`);
  resStr = resStr.replace(imgRegex, `<img src=$2 alt=$1/>`);
  resStr = resStr.replace(linkRegex, `<a href=$2>$1</a>`);

  return resStr;
};

const mdParser = (md: string) => {
  const mdArr = md.split("\n");
  const mdArrLen = mdArr.length;
  let htmlStr = "";

  const headingMatcher = /^#/;
  const ulMatcher = /^[+-]/;
  const nestedUlMatcher = /^\t[+-]/;
  const olMatcher = /^\d+\./;
  const nestedOlMatcher = /^\t\d+\.\d?\s?/;

  for (let i = 0; i < mdArrLen; i++) {
    const currMdLine = mdArr[i];

    if (currMdLine.match(headingMatcher)) {
      htmlStr += parseHeading(currMdLine);
      continue;
    }

    if (currMdLine.match(ulMatcher)) {
      let tempUlMdStr = "";
      for (let j = i; j < mdArrLen; j++) {
        tempUlMdStr += `${mdArr[j]}\n`;

        if (mdArr[j + 1].match(nestedUlMatcher)) {
          let tempNestedUlMdStr = "";
          for (let k = j + 1; k < mdArrLen; k++) {
            tempNestedUlMdStr += `${mdArr[k]}\n`;
            if (!mdArr[k + 1].match(nestedUlMatcher)) {
              j = k;
              break;
            }
          }
          tempUlMdStr += parseUnorderedList(tempNestedUlMdStr.split("\n"));
        }

        if (mdArr[j + 1].match(nestedOlMatcher)) {
          let tempNestedOlMdStr = "";
          for (let k = j + 1; k < mdArrLen; k++) {
            tempNestedOlMdStr += `${mdArr[k]}\n`;
            if (!mdArr[k + 1].match(nestedOlMatcher)) {
              j = k;
              break;
            }
          }
          tempUlMdStr += parseOrderedList(tempNestedOlMdStr.split("\n"));
        }
        if (!mdArr[j + 1].match(ulMatcher)) {
          i = j;
          break;
        }
      }
      htmlStr += parseUnorderedList(tempUlMdStr.split("\n"));
      continue;
    }

    if (currMdLine.match(olMatcher)) {
      let tempOlMdStr = "";
      for (let j = i; j < mdArrLen; j++) {
        tempOlMdStr += `${mdArr[j]}\n`;

        if (mdArr[j + 1].match(nestedOlMatcher)) {
          let tempNestedOlMdStr = "";
          for (let k = j + 1; k < mdArrLen; k++) {
            tempNestedOlMdStr += `${mdArr[k]}\n`;
            if (!mdArr[k + 1].match(nestedOlMatcher)) {
              j = k;
              break;
            }
          }
          tempOlMdStr += parseOrderedList(tempNestedOlMdStr.split("\n"));
        }
        if (mdArr[j + 1].match(nestedUlMatcher)) {
          let tempNestedUlMdStr = "";
          for (let k = j + 1; k < mdArrLen; k++) {
            tempNestedUlMdStr += `${mdArr[k]}\n`;
            if (!mdArr[k + 1].match(nestedUlMatcher)) {
              j = k;
              break;
            }
          }
          tempOlMdStr += parseUnorderedList(tempNestedUlMdStr.split("\n"));
        }
        if (!mdArr[j + 1].match(olMatcher)) {
          i = j;
          break;
        }
      }
      htmlStr += parseOrderedList(tempOlMdStr.split("\n"));
      continue;
    }

    htmlStr += parseStyles(currMdLine);
  }
  htmlStr = beautify.html(htmlStr);
  return htmlStr;
};

export default mdParser;
