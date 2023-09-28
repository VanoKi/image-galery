const url = 'https://api.thecatapi.com/v1/images/search?size=full',
      btn = document.querySelector('.btn'),
      img = document.querySelector('.img')


async function getData() {
  const response = await fetch(url);
  // console.log(response)
  const data = await response.json();
  // const data = response.url
  // console.log(data[0].url);
  return data[0].url
}

btn.addEventListener('click', async () => {
  const imgUrl = await getData();
  img.src = imgUrl
})

img.addEventListener('click', async () => {
  const imgUrl = await getData();
  img.src = imgUrl
})
