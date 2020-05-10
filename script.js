
api_key="db2bcb5b85a1ff8f63787d7ca8512930"
var elem = document.getElementById('input');



var url;
function trending(){
    window.removeEventListener('hashchange', hashHandler, false);
    url=`https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}`
    document.getElementById('name').innerText=`Trending`
    console.log("Trending");
    elem.innerHTML=""
    axios.get(url)
    .then(function(response){
        console.log(response);
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
             var id=response.data.results[i].id;
             var type= response.data.results[i].media_type;
             d.innerHTML=`<div class="card" onmouseover="display(${id})" onmouseout="displayhide(${response.data.results[i].id})">
             <img class="card-img-top" src="https://image.tmdb.org/t/p/w780/${response.data.results[i].poster_path}" alt="Card image cap">
             <div class="card-body">
               <h5 class="card-title">${title}</h5>
               <p class="card-text">${response.data.results[i].overview.substring(0, 100)}...</p>
               <div class="fixed-bottom"><a href="#"  id="read${id}"class="btn read btn-primary " onclick="details('${id}','${type}')">Read More</a></div></div>`
             elem.appendChild(d);
        }
    })
}

function display(id){
    document.getElementById(`read${id}`).style.visibility="visible";
}
function displayhide(id){
    document.getElementById(`read${id}`).style.visibility="hidden";
}


url1=`https://api.themoviedb.org/3/search/multi`
var string=""

async function search(){
    elem.innerHTML=""
    string = document.getElementById('search').value;
    //console.log("Searching");
    document.getElementById('name').innerText=`Search result: "${string}"`
    await axios.get(url1,{
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
    window.addEventListener('hashchange', hashHandler, true);
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
        console.log(response);
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
             var id=response.data.results[i].id;
             var type= response.data.results[i].media_type;
            d.innerHTML=`<div class="card" onmouseover="display(${id})" onmouseout="displayhide(${response.data.results[i].id})">
            <img class="card-img-top" src="https://image.tmdb.org/t/p/w780/${response.data.results[i].poster_path}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${response.data.results[i].overview.substring(0, 100)}...</p>
              <div class="fixed-bottom"><a href="#"  id="read${id}"class="btn read btn-primary " onclick="details('${id}','${type}')">Read More</a></div></div>`
            
            elem.appendChild(d);

            }
        }
    })
}


async function details(id,type){
    console.log(id);
    elem.innerHTML=""
    document.getElementById('name').innerText=""
    var data;
    url=`https://api.themoviedb.org/3/${type}/${id}/external_ids`
    
    await axios.get(url,{
        params:{
            api_key:api_key,
        }
    })
    .then(function(response){
        console.log(response);
        data=response;
        imdbid=response.data.imdb_id;
    })
    
    
    url=`https://www.omdbapi.com/`
    await axios.get(url,{
        params:{
            apikey:"530d83d3",
            i:imdbid
        }
    })
    .then(function(response){
        console.log(response);
        document.getElementById('name').innerText=`${response.data.Title}`
    })
    window.addEventListener('hashchange', hashHandler1, true);
}

function hashHandler() {
    trending();
    //console.log("Called1")
}
function hashHandler1() {
    //console.log("Called2")
    if(string !=="")
    search();
    else
    trending();
    
}