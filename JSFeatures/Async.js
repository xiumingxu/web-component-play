function loadImage(src){
    let promise = new Promise((resolve, reject)=>{
         img = document.createElement("img");

         img.onload = function(){
             resolve(img);
         }
         img.onerror = function(){
             reject("图片加载失败");
         }
         img.src = src;
    })

    return promise;

}
// let result1 = loadImage("")
let load = async function(){
    result1  = await loadImage("https://www.eitdigital.eu/fileadmin/files/2019/news/academy/img-msl-2newprogrammes.jpg");
    console.log(result1);
    result2 = await loadImage("https://www.eitdigital.eu/fileadmin/files/2019/news/academy/img-msl-2newprogrammes.jpg");
    console.log(result2);
}
load();
