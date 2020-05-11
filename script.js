
api_key="db2bcb5b85a1ff8f63787d7ca8512930"
var elem = document.getElementById('input');
var desp = document.getElementById('description');


var flag=0

var url;

function empty(){
    elem.innerHTML="";
    desp.innerHTML="";
}

function trending(){
    empty();
    flag=0;
    window.removeEventListener('hashchange', hashHandler, false);
    url=`https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}`
    document.getElementById('name').innerText=`Trending`
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
             var id=response.data.results[i].id;
             var type= response.data.results[i].media_type;
             d.innerHTML=`<div class="card" onmouseover="display(${id})" onmouseout="displayhide(${response.data.results[i].id})">
             <img class="card-img-top" src="https://image.tmdb.org/t/p/w780/${response.data.results[i].poster_path}" alt="Card image cap">
             <div class="card-body">
               <h5 class="card-title">${title}</h5>
               <p class="card-text">${response.data.results[i].overview}</p>
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
    flag=1;
    empty();
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
    window.removeEventListener('hashchange', hashHandler, false);

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
             var id=response.data.results[i].id;
             var type= response.data.results[i].media_type;
            d.innerHTML=`<div class="card" onmouseover="display(${id})" onmouseout="displayhide(${response.data.results[i].id})">
            <img class="card-img-top" src="https://image.tmdb.org/t/p/w780/${response.data.results[i].poster_path}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${response.data.results[i].overview}</p>
              <div class="fixed-bottom"><a href="#"  id="read${id}"class="btn read btn-primary " onclick="details('${id}','${type}')">Read More</a></div></div>`
            
            elem.appendChild(d);

            }
        }
    })
}


async function details(id,type){
    //console.log(id);
    var desp = document.getElementById('description');
    var data;
    empty();
    document.getElementById('name').innerText=""
    var data;
    url=`https://api.themoviedb.org/3/${type}/${id}`
    await axios.get(url,{
        params:{
            api_key:api_key,
        }
    })
    .then(function(response){
        //console.log(response);
        data=response.data;
    })


    /*Background Poster */
    /* <div class="Wallpaper" style="background-image: linear-gradient(rgba(41, 128, 185, 0), rgb(0, 0, 0)), url(https://image.tmdb.org/t/p/w780//9sXHqZTet3Zg5tgcc0hCDo8Tn35.jpg);"></div> */
    var node=document.createElement('div');
    bposter="https://image.tmdb.org/t/p/w780/"+data.backdrop_path;
    node.classList.add('Wallpaper');
    node.style=`background-image: linear-gradient(rgba(41, 128, 185, 0), rgb(0, 0, 0)), url(${bposter});`
    desp.appendChild(node);

    /*Poster */
    /*<div class="SingleHead"><img src="https://image.tmdb.org/t/p/w780//33VdppGbeNxICrFUtW2WpGHvfYc.jpg" alt="The Call of the Wild" title="The Call of the Wild"></div>*/
    title=data.title;
    if(title==undefined)
        title =data.name;
    poster="https://image.tmdb.org/t/p/w780/"+data.poster_path;
    //console.log("Poster: ",poster);
    node= document.createElement('div');
    node.classList.add('SingleHead');
    node.innerHTML=`<img src="${poster}" alt="${title}" title="${title}"/>`
    desp.appendChild(node);

    /*<div class="SingleContent">
            <h1><font style="vertical-align: inherit;">The Call of the Wild</font></h1>
            <div class="Genres">
            <span>Action </span> 
            </div>
        </div> */
    /*Title & Genres */
    genres =data.genres;
    node = document.createElement('div');
    node.classList.add("SingleContent");
    node.innerHTML=`<h1><font style="vertical-align: inherit;">${title}</font></h1>`
    var node1=document.createElement('div');
    node1.classList.add('Genres');

    for(let i =0;i<genres.length;i++){
        var temp=document.createElement('span')
        temp.innerText=genres[i]['name']+" ";
        node1.appendChild(temp);
    }
    node.appendChild(node1);
    desp.appendChild(node);


    /*Overview */
    /*<div class="overview">
            <p></p>
        </div> */
    overview=data.overview;
    //console.log('Overview: ',overview);
    node = document.createElement('div');
    node.classList.add('overview');
    node.innerHTML=`<p>${overview}</p>`;
    desp.appendChild(node);


    var data1;
    var imdbid;
    await axios.get(url+'/external_ids',{
        params:{
            api_key:api_key,
        }
    })
    .then(function(response){
        //console.log(response);
        //data=response;
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
        //console.log(response);
        //document.getElementById('name').innerText=`${response.data.Title}`
        document.getElementById('name').innerText=``
        data1=response.data;


    })
    /*
    <div class="otherdetails">
        <span>Time: 100 mins</span>
        <span>Date: 4th Feb, 2020</span>
        <span>Status: Released</span>
        <span>Rated: PG</span>
        <span>Language: EN,RU</span>
        <span>Metascore: 47</span>
        <span>Type: TV</span>
    </div> */
    node1=document.createElement('div');
    node1.classList.add('otherdetails');
    node1.innerHTML="<H1>Details</H1>"

    /*Runtime */
    if(data.runtime){
    runtime=data.runtime;
    //console.log("Runtime: ",runtime);
    node=document.createElement('span');
    node.innerText="Time: "+runtime+" mins"
    node1.appendChild(node);
    }
    /*Date *//*Released Date */
    release = data1.Released;
    node=document.createElement('span');
    node.innerText="Date: "+release;
    node1.appendChild(node);
    
    /*Status */
    status= data.status;
    //console.log("Status: ",status);
    node=document.createElement('span');
    node.innerText="Status: "+status;
    node1.appendChild(node);

    /*Rated (A,PG,...)*/
    rated= data1.Rated;
    node=document.createElement('span');
    node.innerText="Rated: "+rated;
    node1.appendChild(node);

    /*Language List (,) */
    language= data1.Language;
    node=document.createElement('span');
    node.innerText="Language: "+language;
    node1.appendChild(node);
    
    /*Metascore *//*MetaScore */
    metascore=data1.Metascore;
    node=document.createElement('span');
    node.innerText="Metascore: "+metascore;
    node1.appendChild(node);

    /*Type *//*Type */
    type=data1.Type;
    type=type[0].toUpperCase()+type.substring(1);
    node=document.createElement('span');
    node.innerText="Type: " +type;
    node1.appendChild(node);

    desp.appendChild(node1);
    /*
    <div class="castdetails">
        <span>Director: qwertyu qwertyu</span>
        <span>Actors: asdfghj, asdfghjk, asdfghjk, asdfghjk</span>
    </div> 
    */
    node1=document.createElement('div');
    node1.classList.add('castdetails');
    node1.innerHTML="<H1>Cast:</H1>"

    /*Director */
    director=data1.Director;
    node=document.createElement('span');
    node.innerText="Director: "+director;
    node1.appendChild(node);

    /*Actor list (,)*/
    actors = data1.Actors;
    node=document.createElement('span');
    node.innerText="Actor: "+actors;
    node1.appendChild(node);

    desp.appendChild(node1);
    /*
    <div class="ratings">
        <span><a src="https://www.imdb.com/title/${id}/">Imdb:</a> 7.3 (934)</span>
        <span>Vote: 7.3 (934)</span>
        <span> SourceName: 10/10</span>
        <span> SourceName: 10/10</span>
    </div> 
    */
    node1=document.createElement('div');
    node1.classList.add('ratings');
    node1.innerHTML="<H1>Ratings</H1>"
    

    /*Imdb Rating */
    imdbrating=data1.imdbRating;
    imdbvotes=data1.imdbVotes;
    /*ImdbId to forward */
    imdbid=data1.imdbID;
    node=document.createElement('span');
    node.innerHTML=`<a href="https://www.imdb.com/title/${imdbid}/">Imdb Rating:</a> ${imdbrating}/10 (${imdbvotes})`;
    node1.appendChild(node);

    /*Vote */
    vote_average=data.vote_average;
    vote_count=data.vote_count;
    //console.log("Vote: ",vote_average,vote_count);
    node=document.createElement('span');
    node.innerText="Votes: "+vote_average+"/10 ("+vote_count+")";
    node1.appendChild(node);

    /*Ratings  Array (Source,Value)*/
    ratings=data1.Ratings;
    for(let i=0;i<ratings.length;i++){
        node=document.createElement('span');
        node.innerText=`${ratings[i]['Source']}: ${ratings[i]['Value']}`;
        node1.appendChild(node);
    }

    desp.appendChild(node1);



    
    
    
    
    
    
    
    





    window.addEventListener('hashchange', hashHandler, false);
}

function hashHandler() {
    if(flag==1)
    search();
    else
    trending();
}

/*
/*tmdbapi 
bposter=data.backdrop_path;
genres =data.genres;
homepage=data.homepage;
overview=data.overview;
poster=data.poster_path;
runtime=data.runtime;
status= data.status;
vote_average=data.vote_average;
vote_count=data.vote_count;




/*omdbapi 
title= data.Title;
year=data.Year;
rated= data.Rated;
released = data.released;

director=data.Director;
actors = data.Actors;

language= data.Language;
poster=data.Poster;
ratings=data.Ratings;
imdbrating=data.imdbRating;
imdbvotes=data.imdbVotes;
iimdbid=data.imdbID;
type=data.Type;
*/