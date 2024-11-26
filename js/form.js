var productNameInput = document.getElementById("ProductName");
var ProductPriceInput = document.getElementById("ProductPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");
var productFailInput = document.getElementById("productFail");
var searchInput = document.getElementById("searchInput")
var addButton = document.getElementById("addButton")
var updateButton = document.getElementById("updateButton")
var mainIndex = ""
var ProductList =[];
if(localStorage.getItem("productContainer") != null){
     ProductList= JSON.parse(( localStorage.getItem("productContainer"))) 
     displaySearchProduct()
}

function addProduct(){
if(validationNameInput(true) && validationPriceInput(true)&& validationCategoryInput(true)
     && validationDescInput(true)){
    var product = {
        name:productNameInput.value.trim(), 
        price:ProductPriceInput.value, 
        category:productCategoryInput.value.trim(),
        desc:productDescInput.value.trim(), 
        image:productFailInput.files[0]? `img/${productFailInput.files[0]?.name}` : "img/1.jpg"
    }
    ProductList.push(product);
    localStorage.setItem("productContainer" , JSON.stringify(ProductList))
    displaySearchProduct()
    clearForm()
}
}

function clearForm(){
    productNameInput.value = null
    ProductPriceInput.value = null
    productCategoryInput.value = null
    productDescInput.value = null
    productFailInput.value = null

    productNameInput.classList.remove("is-valid")
    ProductPriceInput.classList.remove("is-valid")
    productCategoryInput.classList.remove("is-valid")
    productDescInput.classList.remove("is-valid")
    productFailInput.classList.remove("is-valid")

}

function displaySearchProduct(){
    var searchInputData = searchInput.value
    var regex = new RegExp (searchInputData , "gi")
    var result = ""
    for( var i = 0 ; i < ProductList.length ; i++){
        if(ProductList[i].name.toLowerCase().includes(searchInputData.toLowerCase())){
            result +=`
        <div class="col-md-3 text-center m-auto pb-3" style="width:350px">
                <div class="card h-100">
                         <img src="${ProductList[i].image}" class="card-img-top" alt="...">
                        <div class="card-body">
                             <button type="button" class="btn btn-info btn-sm mt-2">index ${i+1}</button>
                             <h4 class="card-title mt-3">${ProductList[i].name.replace( regex , (match)=>`<span class="bg-info">${match}</span>`)}</h4>
                             <h6>${ProductList[i].price}</h6>
                             <h6>${ProductList[i].category}</h6>
                             <h6>${ProductList[i].desc}</h6>
                             <button type="button" class="btn btn-outline-secondary mt-3" onclick = "setFormUpdate(${i})">Update</button>
                             <button type="button" class="btn btn-outline-danger mt-3" onclick="deleteProduct(${i})">Delete</button>
                        </div>
                </div>
        </div>
        }
        
        `
    document.getElementById("rowdata").innerHTML = result
    
    }
}
}

function deleteProduct(index){
ProductList.splice(index , 1)
localStorage.setItem("productContainer" , JSON.stringify(ProductList))
displaySearchProduct()
}

function setFormUpdate(indexUpdate){
    mainIndex = indexUpdate
productNameInput.value = ProductList[indexUpdate].name
 ProductPriceInput.value =ProductList[indexUpdate].price
 productCategoryInput.value = ProductList[indexUpdate].category
 productDescInput.value =ProductList[indexUpdate].desc
addButton.classList.add("d-none")
updateButton.classList.remove("d-none")
    
}

function updateProduct(){
    if(validationNameInput(true) && validationPriceInput(true)&& validationCategoryInput(true)
        && validationDescInput(true)){
    
    
            var product = {
                name:productNameInput.value, 
                price:ProductPriceInput.value, 
                category:productCategoryInput.value,
                desc:productDescInput.value, 
            }
            ProductList.splice(mainIndex , 1 , product)
            localStorage.setItem("productContainer" , JSON.stringify(ProductList))
            displaySearchProduct()
            clearForm()
            addButton.classList.remove("d-none")
            updateButton.classList.add("d-none")
    
        }


}

function validationNameInput(){
var regex = /^[A-Za-z0-9\s\-]{3,50}$/
var textName = productNameInput.value
var ErrorMessageName = document.getElementById("ErrorMessageName")
if(regex.test(textName)){
productNameInput.classList.add("is-valid")
productNameInput.classList.remove("is-invalid")
ErrorMessageName.classList.add("d-none")
return true
}
else{
    productNameInput.classList.add("is-invalid")
    productNameInput.classList.remove("is-valid")
    ErrorMessageName.classList.remove("d-none")
}
}

function validationPriceInput(){
    var regex = /^\d+(\.\d{1,2})?$/
    var textPrice = ProductPriceInput.value
    var ErrorMessagePrice = document.getElementById("ErrorMessagePrice")
    if(regex.test(textPrice)){
    ProductPriceInput.classList.add("is-valid")
    ProductPriceInput.classList.remove("is-invalid")
    ErrorMessagePrice.classList.add("d-none")
    return true
    }
    else{
        ProductPriceInput.classList.add("is-invalid")
        ProductPriceInput.classList.remove("is-valid")
        ErrorMessagePrice.classList.remove("d-none")
    }
}

function validationCategoryInput(){
    var regex = /^[A-Za-z\s\-]{3,30}$/
    var textCategory = productCategoryInput.value
    var ErrorMessageCategory = document.getElementById("ErrorMessageCategory")
    if(regex.test(textCategory)){
    productCategoryInput.classList.add("is-valid")
    productCategoryInput.classList.remove("is-invalid")
    ErrorMessageCategory.classList.add("d-none")
    return true
    }
    else{
        productCategoryInput.classList.add("is-invalid")
        productCategoryInput.classList.remove("is-valid")
        ErrorMessageCategory.classList.remove("d-none")
    }
}

function validationDescInput(){
    var regex = /^[\w\s\-\.,]{10,500}$/
    var textDesc = productDescInput.value
    var ErrorMessageDesc = document.getElementById("ErrorMessageDesc")
    if(regex.test(textDesc)){
    productDescInput.classList.add("is-valid")
    productDescInput.classList.remove("is-invalid")
    ErrorMessageDesc.classList.add("d-none")
    return true
    }
    else{
        productDescInput.classList.add("is-invalid")
        productDescInput.classList.remove("is-valid")
        ErrorMessageDesc.classList.remove("d-none")
    }
}

// function validationImageInput(){
//     var regex = /\.(jpg|jpeg|png|gif|webp)$/
//     var textImage = productFailInput.value
//     var ErrorMessageImage = document.getElementById("ErrorMessageImage")
//     if(regex.test(textImage)){
//     productFailInput.classList.add("is-valid")
//     productFailInput.classList.remove("is-invalid")
//     ErrorMessageImage.classList.add("d-none")
//     return true
//     }
//     else{
//         productFailInput.classList.add("is-invalid")
//         productFailInput.classList.remove("is-valid")
//         ErrorMessageImage.classList.remove("d-none")
//     }
// }