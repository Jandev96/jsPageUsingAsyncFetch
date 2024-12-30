let carousel = document.querySelector('.carousel.slide');

if (carousel) {
  let carouselInner = document.createElement('div');
  carouselInner.className = 'carousel-inner';

  let imgArray = [
    { image: "https://img.freepik.com/free-vector/flat-horizontal-banner-template-black-friday-sale_23-2150852978.jpg?w=1380" },
    { image: "https://img.freepik.com/free-vector/horizontal-banner-template-black-friday-sales_23-2150867247.jpg?w=1380" },
    { image: "https://imgs.search.brave.com/feMvdXTiaiY8iVcOQv144_O2_N05TqjNv5H4wnvF-Nk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFFN0tv/N3ZlcG8vMS8wLzE2/MDB3L2NhbnZhLXNo/b3AtbmV3LXByb2R1/Y3RzLXdlYnNpdGUt/YmFubmVyLWJyb3du/LC13aGl0ZSwtdGFu/LUxrWnNOQ1czWDF3/LmpwZw" }
  ];

  imgArray.forEach((img, index) => {
    let carouselItem = document.createElement('div');
    carouselItem.className = 'carousel-item';

    if (index === 0) {
      carouselItem.classList.add('active');
    }

    let carouselImg = document.createElement('img');
    carouselImg.src = img.image;
    carouselImg.classList.add('d-block', 'w-100');
    carouselImg.style.height = '400px';

    carouselItem.appendChild(carouselImg);
    carouselInner.appendChild(carouselItem);
  });

  carousel.appendChild(carouselInner);

  let currentIndex = 0;

  function showNextSlide() {
    let items = carouselInner.querySelectorAll('.carousel-item');
    items[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % items.length;
    items[currentIndex].classList.add('active');
  }

  setInterval(showNextSlide, 3000);
}

async function setProducts() {
  let loader = document.querySelector('.loader');
  loader.style.display = 'block';
  
  try {
    let response = await fetch('https://fakestoreapi.com/products');
    let products = await response.json();
    loader.style.display = 'none';
    displayProducts(products);

    let searchInput = document.querySelector('.form-control');
    searchInput.addEventListener('input', () => {
      let formValue = searchInput.value.trim().toLowerCase();
      let searchFilteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(formValue)
      );
      displayProducts(searchFilteredProducts);
    });

  } catch (error) {
    loader.style.display = 'none';
    console.error('Error fetching products:', error);
  }
}


setProducts();

function displayProducts(products) {
  let row = document.querySelector('.row');
  row.innerHTML = ''; 

  products.forEach(product => {
    let col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3';

    let card = document.createElement('div');
    card.className = 'card m-2';
    
    let image = document.createElement('img');
    image.className = 'card-img-top';
    image.src = product.image;
    image.style.height = '300px';
    
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    
    let cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.innerHTML = product.title.substring(0, 50);

    let cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.innerHTML = product.description.substring(0, 100);

    let btn = document.createElement('div');
    btn.className = 'd-flex';

    let btnViewProducts = document.createElement('a');
    btnViewProducts.className = 'btn btn-warning ms-2';
    btnViewProducts.innerHTML = 'View Products';
    
    let addToCart = document.createElement('a');
    addToCart.className = 'btn btn-primary ms-2';
    addToCart.innerHTML = 'Add to cart';

    btn.appendChild(btnViewProducts);
    btn.appendChild(addToCart);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(btn);

    card.appendChild(image);
    card.appendChild(cardBody);

    col.appendChild(card);
    row.appendChild(col);
  });
}
