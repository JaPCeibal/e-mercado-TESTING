const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  let userLogged = localStorage.getItem('User-Logged');
  let userEmailButton = document.getElementById("userEmail");
  let signInDiv = document.getElementById("sign-in");

  if (userLogged && userEmailButton) {
    userLogged = JSON.parse(userLogged);
    userEmailButton.innerText = userLogged.user;
    userEmailButton.style = "display: inline-block";
    document.getElementById("close").addEventListener("click", function () {
      window.location = "login.html"
    });
  }else{
    let btnSignIn = document.createElement("button");
    btnSignIn.addEventListener("click", function () {
      window.location = "login.html";
    });
    btnSignIn.innerText = "Identificarse";
    btnSignIn.classList.add("btn", "btn-light");
    signInDiv.appendChild(btnSignIn);
  }
});