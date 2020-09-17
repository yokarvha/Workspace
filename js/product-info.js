var product = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.images.length; i++){
        let imageSrc = array.images[i];

        if(i==0){
            htmlContentToAppend += `
            <div class="carousel-item active">
                        <img class="d-block w-100" src="` + imageSrc + `" alt="">
            </div>
            `
        }else{
            htmlContentToAppend += `
            <div class="carousel-item">
                    <img class="d-block w-100" src="` + imageSrc + `" alt="">
            </div>
            `
        }
    }

    let htmlContentToAppendCarrousel = "";

    htmlContentToAppendCarrousel += `
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>

            </ol>
            <div class="carousel-inner">
                ` + htmlContentToAppend + `
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>   
            </a>
            </div>
    `

        document.getElementById("productosImagesGallery").innerHTML = htmlContentToAppendCarrousel;
    
}

var comment = {};

function showComments(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let comment = array[i];

        htmlContentToAppend += `
        <hr>
        <div class="row">
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1">`+ comment.user +`</h4>
                <small class="text-muted">`+ comment.dateTime +`</small>
            </div>
            <div class="d-flex w-100 justify-content-end">
            <span class="fa fa-star checked text muted">`+ ' ' + comment.score +`</span>
        </div>
            <p class="mb-1">`+ comment.description +`</p>
        </div>
    </div>
    <hr>
        `

        document.getElementById("commentScore").innerHTML = htmlContentToAppend;
    }
}

var related = {};

function showRelatedProducts(){
    
    let htmlContentToAppend = "";

    for(let i = 0; i < product.relatedProducts.length; i++){
        let relacionados = related[product.relatedProducts[i]];

        htmlContentToAppend += `
        <div class="col-md-4">
        <a href="product-info.html?productos=`+ relacionados.name +`" class="card mb-4 shadow-sm custom-card">
          <img class="bd-placeholder-img card-img-top" src="` + relacionados.imgSrc + `">
          <h3 class="m-3">`+ relacionados.name +`</h3>
          <div class="card-body">
            <p class="card-text">`+ relacionados.currency + ' ' + relacionados.cost +`</p>
          </div>
        </a>
    </div>
        `

        document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
    }
}

function agarrarComentario(event){
	event.preventDefault();
	let valoracion = document.getElementById("score").value;
	console.log(valoracion);
	let comentario = document.getElementById("textoComentario").value;
	console.log(comentario);
    let container = document.getElementById("nuevoComentario");
    let nombreUsuario = localStorage.getItem("usuario");
    let today = new Date();
    let mes = today.getMonth()+1;
    let fechaActual = today.getFullYear()+'-'+('0'+mes).slice(-2)+'-'+('0'+today.getDate()).slice(-2);
    let horaActual = today.getHours()+":"+('0'+today.getMinutes()).slice(-2)+':'+('0'+today.getSeconds()).slice(-2);

    htmlContentToAppend = `
    <hr>
    <div class="row">
    <div class="col">
        <div class="d-flex w-100 justify-content-between">
            <h4 class="mb-1">`+ nombreUsuario +`</h4>
            <small class="text-muted">`+ fechaActual + ' ' + horaActual +`</small>
        </div>
        <div class="d-flex w-100 justify-content-end">
        <span class="fa fa-star checked text muted">`+ ' ' + valoracion +`</span>
    </div>
        <p class="mb-1">`+ comentario +`</p>
    </div>
    </div>
    <hr>
    `
    container.innerHTML += htmlContentToAppend
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("productSoldCount");
            let productCurrencyHTML = document.getElementById("productCurrency");
            let productCostHTML = document.getElementById("productCost");
            let productoCriteriaHTML = document.getElementById("productCategory");

            let params = new URLSearchParams(location.search);
            let nameProd = params.get('productos')
        
            productNameHTML.innerHTML = nameProd;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.soldCount;
            productCurrencyHTML.innerHTML = product.currency;
            productCostHTML.innerHTML = product.cost;
            productoCriteriaHTML.innerHTML = product.category;

            showImagesGallery(product);
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            comment = resultObj.data;

            showComments(comment)
        }

        getJSONData(PRODUCTS_URL).then(function(resultObj){
            if (resultObj.status === "ok")
            {
                related = resultObj.data;
    
                showRelatedProducts(related)
            }
        });

    });

});