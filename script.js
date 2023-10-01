async function getData() {
  const resp = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await resp.json()
  return data
}

async function main(){
  const postsData = await getData();
  let currentPage = 1;
  let rows = 10
  function displayList(arrData, rowPerPage, page){
    const postsEl = document.querySelector('.posts');
    page --;
    postsEl.innerHTML = ''
    const start = rowPerPage * page;
          end = start + rowPerPage;
          paginatedData = arrData.slice(start, end);
    paginatedData.forEach(el => {
      const postEl = document.createElement('div');
      postEl.classList.add('post');
      postEl.innerText = `${el.title}`;
      postsEl.appendChild(postEl);
    });
  }
  function displayPagi(arrData, rowPerPage){
    const pagiEl = document.querySelector('.pagi');
          pagesCount = Math.ceil(arrData.length / rowPerPage);
          ulEl = document.createElement('ul');
          ulEl.classList.add('pagi__list');
    for (let index = 0; index < pagesCount; index++) {
      const liEL = displayPagiBtn(index + 1)
      ulEl.appendChild(liEL)
    }
    pagiEl.appendChild(ulEl)
  }
  function displayPagiBtn(page){
    const liEl = document.createElement('li')
    liEl.classList.add('pagi__item')
    liEl.innerText = page
    if (currentPage == page) {
      liEl.classList.add('pagi__item--active')
    }
    liEl.addEventListener('click', () => {
      currentPage = page;
      displayList(postsData, rows, currentPage)
      let currentItemLi = document.querySelector('li.pagi__item--active')
      currentItemLi.classList.remove('pagi__item--active');
      liEl.classList.add('pagi__item--active')
  })
    return liEl
  }

  displayList(postsData, rows, currentPage);
  displayPagi(postsData, rows)

}

main()