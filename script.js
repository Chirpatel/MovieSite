
api_key="db2bcb5b85a1ff8f63787d7ca8512930"
var elem = document.getElementById('input');



var url=`https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}`
function trending(){
    //console.log("Trending");
    axios.get(url)
    .then(function(response){
        //console.log(response);
        //console.log(response.data.results.length)
        for(let i=0;i<response.data.results.length;i++){
            var d  = document.createElement('div');
            d.classList.add("col-sm-6");
            d.classList.add("col-md-4");
            d.classList.add("col-lg-3");
            d.classList.add("custom");
            var title=response.data.results[i].title;
            //console.log(title)
            if(title==undefined)
             title =response.data.results[i].name;
            
            d.innerHTML=`<div class="card" >
            <img class="card-img-top" src="https://image.tmdb.org/t/p/w780/${response.data.results[i].poster_path}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${response.data.results[i].overview}</p>
              <!--<a href="#" class="btn btn-primary">Go somewhere</a>
            --></div>`

            elem.appendChild(d);
        }
    })
}


url1=`https://api.themoviedb.org/3/search/multi`


function search(){
    elem.innerHTML=""
    var string = document.getElementById('search').value;
    //console.log("Searching");
    document.getElementById('name').innerText=`Search result: "${string}"`
    axios.get(url1,{
        params:{
            api_key:api_key,
            language:"en-US",
            query: string,
            include_adult:false,
        }
    })
    .then(function(response){
        //console.log(response);
        let n=response.data.total_pages;
        for(let i = 1;i<=2;i++){
            searchpage(i,string);
        }
    })
}
function searchpage(page,string){
    var string = document.getElementById('search').value;
    //console.log("Searching");
    
    axios.get(url1,{
        params:{
            api_key:api_key,
            language:"en-US",
            query: string,
            include_adult:false,
            page:page
        }
    })
    .then(function(response){
        //console.log(response);
        //console.log(response.data.results.length)
        for(let i=0;i<response.data.results.length;i++){
            if(response.data.results[i].poster_path!=null){
            var d  = document.createElement('div');
            d.classList.add("col-sm-6");
            d.classList.add("col-md-4");
            d.classList.add("col-lg-3");
            d.classList.add("custom");
            var title=response.data.results[i].title;
            //console.log(title)
            if(title==undefined)
             title =response.data.results[i].name;
            d.innerHTML=`<div class="card" >
            <img class="card-img-top" src="https://image.tmdb.org/t/p/w780/${response.data.results[i].poster_path}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${response.data.results[i].overview}</p>
              <!--<a href="#" class="btn btn-primary">Go somewhere</a>
            --></div>`
            
            elem.appendChild(d);}
        }
    })
}