export const inputArrayTag = (string) => {
  let arrTags = string.split('#')
  arrTags.shift()
  arrTags = arrTags.map(substr => {
    return substr.split(' ')[0n]
  })
  return arrTags
}

export const inputChangeTag = (string) => {
  let arrTags = string.split('#')
  const firstStr = arrTags.shift()
  arrTags = arrTags.map(substr => {
    const arrSubStr = substr.split(' ')
    let tag = arrSubStr.shift()
    const newtag = `<b>#${tag}</b>`
    const str = substr.slice(tag.length )
    if (substr === tag) {
      return `${newtag}`
    }
    return `${newtag}${str}`
  })
  return firstStr + arrTags.join('')
}



export const getCaretPosition = (elem) => {
  var sel = window.getSelection();
  var cum_length = [0, 0];
  if(sel.anchorNode == elem)
    cum_length = [sel.anchorOffset, sel.extentOffset];
  else {
    const nodes_to_find = [sel.anchorNode, sel.extentNode];
    if(!elem.contains(sel.anchorNode) || !elem.contains(sel.extentNode))
      return undefined;
    else {
      const found = [0,0];
      let i;
      node_walk(elem, function(node) {
        for(i = 0; i < 2; i++) {
          if(node == nodes_to_find[i]) {
            found[i] = true;
            if(found[i == 0 ? 1 : 0])
              return false; // all done
          }
        }

        if(node.textContent && !node.firstChild) {
          for(i = 0; i < 2; i++) {
            if(!found[i])
              cum_length[i] += node.textContent.length;
          }
        }
      });
      cum_length[0] += sel.anchorOffset;
      cum_length[1] += sel.extentOffset;
    }
  }
  if(cum_length[0] <= cum_length[1])
    return cum_length;
  return [cum_length[1], cum_length[0]];
}
function node_walk(node, func) {
  let result = func(node);
  for(node = node.firstChild; result !== false && node; node = node.nextSibling)
    result = node_walk(node, func);
  return result;
}

