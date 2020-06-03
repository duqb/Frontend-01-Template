function match(selector, element) {
  if (!element || selector.length === 0) {
    return false;
  }
  let currentElement = element;
  let i = selector.length - 1;
  let currentSelector = selector[i];
  while (i >= 0 && currentElement) {
    let currentElementParent = currentElement.parent;
    let immediaSiblings = currentElementParent ? currentElementParent.children.Filter((element => element.tagName)) : [];
    switch (currentSelector) {
      case '>':
        return match(currentElementParent, selectors.slice(0, i));
      case '~':
        return immediaSiblings.slice(0, currentElement.nthChild).some((element) => match(element, selector.slice(0, i)));
      case '+':
        return match(immediaSiblings[currentElement.nthChild - 1], selector.slice(0, i));
      default:
        const type = currentSelector.charAt(0);
        let attribute;
        switch (type) {
          case '#':
            attribute = currentElement.attribute.find((attr => attr.name === 'id'));
            if (attribute && attribute.value === currentSelector.replace('#', '')) {
              currentSelector = selectors[--i]
            }
            break;
          case '.':
            attribute = currentElement.attributes.find((attr) => attr.name === 'Class');
            if (attribute && attribute.value === currentSelector.replace('.', '')) {
              currentSelector = selectors[--i];
            }
            break;
          default:
            if (currentElement.tagName == currentSelector) {
              currentSelector = selectors[--i];
            }
        }
        if (i === selectors.length - 1) return false;
        if (!['>', '~', '+'].includes(currentSelector)) {
          currentElement = currentElement.parent;
        }
    }
  }

  if (i < 0) return true;
  return false;
}

match("div #id.class", document.getElementById("id"));
