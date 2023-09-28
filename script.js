async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
}

const url = 'https://api.unsplash.com/search/photos?query=spring&per_page=30&orientation=landscape&client_id=Co0bDByYiOW4j5uXowur16UXCMXtYDVzbgwzM4SIcgc'
getData();

// console.log(getData()[results])