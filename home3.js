if (localStorage.getItem("favList") == null) {
    localStorage.setItem("favList", JSON.stringify([]));
}
// const redirect = document.getElementById('home-btn');
// redirect.addEventListener('click', fntp);
// function fntp(){
//     window.location.href = 'index.html';
// }
async function fetchmealfromapi(url, val){
    const resp = await fetch(`${url+val}`);
    const meals = resp.json();
    return meals;
}
async function nooffav(){
    let arr = await JSON.parse(localStorage.getItem("favList"));
    let sz = document.querySelector('#fav-no');
    sz.innerHTML = arr.length;

}
var val1 = 0;


function searchmeal(){
    document.getElementById('srrs').innerHTML = "your search result";
    let val = document.getElementById("add-task").value;
    let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    let arr = JSON.parse(localStorage.getItem("favList"));
    let meals = fetchmealfromapi(url, val);
    val1 = 12;
    nooffav();
    let html = "";
    meals.then(data =>{
        if (data.meals) {
            data.meals.forEach((element) => {
                let yourfav = false
                for(let i=0;i<arr.length;i++){
                    if(element.idMeal==arr[i]){
                        yourfav = true;
                    }    
                }
                // console.log(yourfav);
                if(yourfav){
                    html += `
                <div id="card" class="card mb-3" style="width: 20rem;">
                    <img src="${element.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${element.strMeal}</h5>
                        <div class="d-flex justify-content-between mt-5">
                            <button type="button" class="btn btn-outline-light" onclick="showMealDetails(${element.idMeal})">More Details</button>
                            <button id="main${element.idMeal}" style = "background-color: rgb(190, 110, 110);" class="btn btn-outline-light active" onclick="arFavList(${element.idMeal})" style="border-radius:20%"><i class="fa-solid fa-star" ></i></button>
                        </div>
                    </div>
                </div>
                `;
                }else{
                    html += `
                <div id="card" class="card mb-3" style="width: 20rem;">
                    <img src="${element.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${element.strMeal}</h5>
                        <div class="d-flex justify-content-between mt-5">
                            <button type="button" class="btn btn-outline-light" onclick="showMealDetails(${element.idMeal})">More Details</button>
                            <button id="main${element.idMeal}" style = "background-color: rgb(190, 110, 110);" class="btn btn-outline-light " onclick="arFavList(${element.idMeal})" style="border-radius:20%"><i class="fa-solid fa-star" ></i></button>
                        </div>
                    </div>
                </div>
                `;
                }               
            });
        } else {
            html += `
            <div class="page-wrap d-flex flex-row align-items-center">
                <div class="container" style ="background-color:darkred; border-radius:20px;">
                    <div class="row justify-content-center">
                        <div class="col-md-12 text-center">
                            <span class="display-1 d-block">404</span>
                            <div class="mb-4 lead">
                            there is no such type of meal you are searching for...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        
        }
        document.getElementById("main").innerHTML = html;
    });

}

async function favmeallist(){ 
    document.getElementById('srrs').innerHTML = "list of your favorite meals";
    let arr = JSON.parse(localStorage.getItem("favList"));
    let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
    let html = "";
    val1 = 17;
    if(arr.length==0){
        html+=`
        <div> 
            <h3 style="background-color:darkred; height:40px; width:350px; text-align:center;">fav-meal list is empty</h3>
            <a href="https://ibb.co/3kgZ52v"><img src="https://i.ibb.co/3kgZ52v/empty.png" alt="empty" border="0" style = "height:200px; width:350px;"></a>
            
        </div>
        `;
    }else{
        for(let i=0;i<arr.length;i++){
            await fetchmealfromapi(url, arr[i]).then(element =>{
                html+= `
                <div id="card" class="card mb-3" style="width: 20rem;">
                    <img src="${element.meals[0].strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${element.meals[0].strMeal}</h5>
                        <div class="d-flex justify-content-between mt-5">
                            <button type="button" class="btn btn-outline-light" onclick="showMealDetails(${element.meals[0].idMeal})">More Details</button>
                            <button id="main${element.meals[0].idMeal}" style = "background-color: rgb(190, 110, 110);" class="btn btn-outline-light active" onclick="arFavList(${element.meals[0].idMeal})" style="border-radius:20%"><i class="fa-solid fa-star" ></i></button>
                        </div>
                    </div>
                </div>

                `;
            })
        }
    }
    nooffav();
    document.getElementById("main").innerHTML = html;

}
async function arFavList(id){
    let arr = JSON.parse(localStorage.getItem("favList"));
    let hav = false;
    let idx = -1;
    for(let i=0;i<arr.length;i++){
        if(id==arr[i]){
            hav = true;
            idx = i;
        }    
    }
    if(hav){
        arr.splice(idx, 1);
        nooffav();
        alert("meal removed from favlist");        
    }else{
        arr.push(id);
        nooffav();
        alert("meal added to your fav list");
    }
    await nooffav();
    localStorage.setItem("favList", JSON.stringify(arr));
    if(val1==12)searchmeal();
    else favmeallist();
}
async function showMealDetails(id){
    document.getElementById('srrs').innerHTML = "your meal details";
    let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
    let html = "";
    await fetchmealfromapi(url, id)
    .then(element =>{
        var value11 =  `${element.meals[0].strYoutube}`;
        var value22 = value11.substring(32)
        var url12 = "https://www.youtube.com/embed/"
        var url1 = url12+value22;
        console.log(url1)
        html+=`
        <div id = "innerbox1">
            <div id = "innerheader">${element.meals[0].strMeal}</div>
            <div id = "media">
                <img src="${element.meals[0].strMealThumb}">
                <iframe width="560" height="315" src="${url1}" frameborder="0" allowfullscreen></iframe>
            </div>
            <div id= "ingred">
                <h6>Category : ${element.meals[0].strCategory}</h6>
                <h6>Area : ${element.meals[0].strArea}</h6>
            </div>
            <div id = "details">
                <h2>Instruction</h2>
                <p>${element.meals[0].strInstructions}</p>

            </div>
            <div id = "ingno">
                <h3>five main ingredient</h3>
                <div style = "display: flex">
                    <h6>1->${element.meals[0].strIngredient1}, 2-></h6>
                    <h6>${element.meals[0].strIngredient2}, 3-></h6>
                    <h6>${element.meals[0].strIngredient3}, 4-></h6>
                    <h6>${element.meals[0].strIngredient4}, 5-></h6>
                    <h6>${element.meals[0].strIngredient5}</h6>
                </div>
            </div> 
            <div id="roote"></div>   


        </div
        `;
    });
    document.getElementById("main").innerHTML = html;

}

nooffav();


