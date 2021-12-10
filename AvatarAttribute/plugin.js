const addAttrToEl = (el) => {
  const userId = el.getElementsByTagName('img')[0].src.split('/')[4];
  el.setAttribute('data-user-id', userId);
};

const handler = async () => {
  const els = document.getElementsByClassName('wrapper-3t9DeA');

  for (let el of els) {
    if (el.getAttribute('data-user-id')) continue;

    addAttrToEl(el);
  }
};
}
};
