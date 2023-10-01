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
    const postsEl = document.querySelector('.posts')
          start = rowPerPage * page;
          end = start + rowPerPage;
          paginatedData = arrData.slice(start, end);
    paginatedData.forEach(el => {
      const postEl = document.createElement('div')
      postEl.classList.add('post')
      postEl.innerText = `${el.title}`
      postsEl.appendChild(postEl)
    });
  }
  function displayPagi(){}
  function displayPagiBtn(){}

  displayList(postsData, rows, currentPage)

}

main()