const div=document.getElementById('food_list')
const single_div=document.getElementById('food_single')
let foods=[]
const allFood=()=>{
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res=>res.json())
    .then(data=>{
        console.log(data?.categories)
        foods=data?.categories
    
        if(foods?.length >0){
            displayFood(foods)
        }else{
            div.innerHTML=`<h2 class='no_data'>No Data Found</h2>`
        }
    })
    .catch(err=>{
        console.log(err)
    })
}

const displayFood=(foods)=>{
    div.innerHTML='';
    foods?.map(d=>{
        div.innerHTML+=`<div onclick="showDetails('${d?.idCategory || d?.idMeal}')">
            <img src="${d?.strCategoryThumb}" alt="">
            <h2>${d?.strCategory}</h2>
        </div>`
    })
}
const showDetails=(id)=>{
    console.log(id);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}/`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(data){
            single_div.innerHTML='';
            single_div.innerHTML=`<div>
                <img src="${data.strCategoryThumb}" alt="">
                <h2>${data.strCategory}</h2>
            </div>`
        }
    })
    .catch(err=>{
        console.log(err)
    })
}

const SearchFood=()=>{
    const searchValue=document.getElementById("search").value;
    console.log(searchValue);
    if(searchValue){
        const filteredFoods = foods.filter(food => food.strCategory.toLowerCase().includes(searchValue));

        if (filteredFoods.length > 0) {
            displayFood(filteredFoods);
        } else {
            div.innerHTML = `<h2 class='no_data'>No Data Found</h2>`;
        }
    }else{
        div.innerHTML = `<h2 class='no_data'>Please put your food name</h2>`;
    }
}

allFood()
