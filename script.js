const url = 'https://api.thecatapi.com/v1/images/search?size=full',
      btn = document.querySelector('.btn'),
      img = document.querySelector('.img')


async function getData() {
  const response = await fetch(url);
  const data = await response.json();
  return data[0].url
}

async function updateImage(){
  let isLoaded = img.complete;
  if (isLoaded) {
    img.src = await getData()
  }
}

// btn.addEventListener('click', async () => {
//   const imgUrl = await getData();
//   img.src = imgUrl
// })

// img.addEventListener('click', async () => {
//   const imgUrl = await getData();
//   img.src = imgUrl
// })

btn.addEventListener('click', updateImage);
img.addEventListener('click', updateImage)
