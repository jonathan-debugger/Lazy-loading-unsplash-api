import { registerImage,report } from "./utils/lazy.js";

/*Variables*/
const urlRandomAPI = `https://pruebaaplicacionesdev.000webhostapp.com/api_unsplash_lazyload.php?tipo=random`;
//Arrow function recibe el valor de la consulta y retorna la url completa
const urlShearchApi = query => `https://pruebaaplicacionesdev.000webhostapp.com/api_unsplash_lazyload.php?tipo=search&query=${query}`;


/* EvenListeners*/
const btnAdd = document.getElementById('agregar');
      btnAdd.addEventListener('click',addImage);

const btnSearch = document.getElementById('btn_search');
      btnSearch.addEventListener('click', searchImages);

const btnClean = document.getElementById('limpiar');
      btnClean.addEventListener('click', clean);


/* Funciones*/

//Obtenemos los datos de la api
async function fetchData (urlAPI){
    try {
        const request =  fetch(urlAPI);
        const data = (await request).json();
        return data;   
    } catch (error) {
        console.log(error);
    }
    
}

async function createImageNode(dataSearch='',randomNum=0){
    const data =  (dataSearch=='')? (await fetchData(urlRandomAPI)) : (await dataSearch) ;
    const imgUrl = (dataSearch=='')? data[randomNum].urls.small 
                                : data.results[randomNum].urls.small;

    const container = document.createElement('div');
          container.style = 'height:250; width:200px;';
          container.classList.add('mb-2', 'w-32', 'h-64', 'bg-gray-400');
    const image = document.createElement('img');    
          image.classList.add('mb-2', 'w-full', 'h-full', 'hidden'); 
          image.dataset.src = imgUrl;

    container.appendChild(image);

    return container;      

}

//Insertamos la imagen al dom 
async function addImage(){
    const newImage =  await createImageNode();
    const mountNode = document.getElementById('imagenes');
          mountNode.appendChild(newImage);

    registerImage(newImage);
    report();
    // console.log(navigator.connection);
} 

//Buscar fotos
async function searchImages(e) {
    //Tomamos el valor de el input quitandole los espacios en blanco de ambos extremos
    const query = document.querySelector('input#search').value.trim();
    const url = urlShearchApi(query);
    const data = await fetchData(url);
    let randomNum = Math.floor((Math.random() * (data.results.length-1 - 0 + 1)) + 0); // numero aleatorio para seleccionar cualquier imagen de la lista

    if (e.target.id == 'btn_search' && query !== '') {

        const newImage = await createImageNode(data,randomNum);
        const mountNode = document.getElementById('imagenes');
              mountNode.appendChild(newImage);
        registerImage(newImage)
        report();
    } else if (e.target.id == 'btn_search' && data.total == 0) {

        message('¡No se han encontrado resultados!');

    }


}
//Limpiamos el contenedor de las imagenes
function clean() {
    document.getElementById('imagenes').innerHTML = '';
    const search = document.getElementById('search');
        if (search.value!=='') {
            search.value='';
        }
}

const message = (msg) => {

    const container = document.getElementById('container_search');
    if (!container.querySelector('p')) {
        const p = document.createElement('p');
        p.innerText = msg;
        p.classList.add('text-red-700');
        setTimeout(() => {
            container.appendChild(p);
            setTimeout(() => {
                container.removeChild(p);
            }, 5000);
        }, 10);
    }
}

