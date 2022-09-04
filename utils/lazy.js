
//Retornamos el valor true o false si la entrada (elemento) es completamente visible
const isIntersecting = (entry)=>{
    return entry.isIntersecting; // Mostramos la imagen si la visivilidad del contenedor es mayor o igual al 70%
}
//Ejecutamos una acción para cada entrada
const loadImage =(entry)=>{
    const nodo = entry.target.firstChild;//Entrada o elemento el cual estamos observando
          nodo.classList.remove('hidden');
    const src = nodo.getAttribute('data-src');
          nodo.src = src;  
    //Des registramos  la imagen del observador para que no se siga ejecutando cada vez que la estemos visualizando
    observer.unobserve(nodo);
    report();
}

//Instaciamos el intersectionObserver el cual recibe un callback el
//cual nos permitira acceder a las entradas que se esten observando*/
const observer = new IntersectionObserver((entries)=>{
    entries
        .filter(isIntersecting) //Filtramos que la intercepcion del elemento sea verdadera 
        .forEach(loadImage); //Ejecutamos una acción para cada elemento
},{threshold: 0.70}); //Threshold Umbral porcentaje de visivilidad del elemento tareget

//Registramos cada imagen en el IntersectionObserver
const registerImage = (image)=>{
    //IntersectionObserver ->  observer(image)
        observer.observe(image);
        

}
const report = () =>{   
    const images = document.querySelectorAll('#imagenes >div img');
    const totalImg = images.length;  
    const totalImgLoaded = Array.from(images).filter((img)=> img.getAttribute('src')); 
    console.log(`💡 Total imágenes: ${totalImg}\n📌 Total imágenes cargadas ${totalImgLoaded.length}`);

}
export {registerImage, report};