var $ = document.getElementById.bind(document)
var resCount = 0;
var pagination = 9;
var results = []
var cp = 0;
var tp=0;
var idx = lunr(function () {
    this.ref('url')
    this.field('content')

    documents.forEach(function (doc) {
        this.add(doc)
    }, this)
})
document.addEventListener("DOMContentLoaded", (_event) => {
    searchNow();
    $('first-page').addEventListener("click",(_event)=>{
        showPage(1)
    })
    $('prev-page').addEventListener("click",(_event)=>{showPrev()});
    $('next-page').addEventListener("click",(_event)=>{showNext()});
    $('last-page').addEventListener("click",(_event)=>{showPage(tp)})
})
function searchNow() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    const searchString = url.searchParams.get("keys");
    console.log(searchString)
    $('s-k').textContent = searchString;
    $('search-input').value = searchString;
    results = idx.search(searchString)
    // method (return element > 0). 
    $('s-n').textContent = results.length
    if (results.length === 1) {
        $('pl').textContent = ""
    }
    else if (results.length === 0) {
        $('s-n').textContent = No
        $('pl').textContent = "s"
        $('result-pages').style.display = "none"
    }
    else{
        $('pl').textContent = "s"
    }
    tp = results.length % pagination > 0? Math.floor(results.length/pagination)+1:(results.length/pagination);
    showPage(1)

}

function generateResultElement(ref, titleText, imgRef, content) {
    var card = document.createElement("li");
    var img = document.createElement("div");
    var title = document.createElement("div");

    var body = document.createElement("p");
    var link = document.createElement("a");

    link.style.textDecoration = "none"
    link.href = ref;
    img.style.backgroundImage = "url("+imgRef+")";
    img.className = "grid-post-image"
    title.textContent = titleText;
    title.title = titleText;
    title.className = "grid-post-head"

    body.textContent = content;

    link.appendChild(img);
    link.appendChild(title);
    link.appendChild(body);
    card.appendChild(link)
    $('search-results').appendChild(card)
}
function readJson() {
    // http://localhost:8080
    fetch('/Reading/api/file')
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(json => {
            var indexes = json;
            console.log(indexes)
        })
        .catch(function () {
            this.dataError = true;
        })
}

function showPage(page){
    $('curr-page').textContent = page;
   
    if(page===1)
    {
        $('first-page').style.opacity = "0"
        $('prev-page').style.opacity = "0"
    }
    else{
        $('first-page').style.opacity = "1"
        $('prev-page').style.opacity = "1"
        $('prev-page').textContent = page-1;
    }

    if(page === tp)
    {
        $('last-page').style.opacity = "0"  
        $('next-page').style.opacity = "0"
    }
    else{
        $('last-page').style.opacity = "1"
        $('next-page').style.opacity = "1"
        $('next-page').textContent = page+1;
    }
    if(tp <=2)
    {
        $('last-page').style.opacity = "0"  
        $('first-page').style.opacity = "0"
    }
    else{
        $('last-page').style.opacity = "1"  
        $('first-page').style.opacity = "1"
    }

    if(tp === 1)
    {
        $('result-pages').style.opacity = "0"
    }
    else{
        $('result-pages').style.opacity = "1"
    }
    cp = page;
    const lastIndex = (page*pagination) > results.length? results.length : (page*pagination);
    const firstIndex = (page*pagination)-pagination;
   console.log(lastIndex , firstIndex)
    $('search-results').textContent = ""
    for (i = firstIndex; i < lastIndex; i++) {
        var found = documents.find(function (element) {
            return element.url === results[i].ref;
        });
        generateResultElement(found.url, found.title, found.image, found.excerpt)
    }
}

function showNext()
{
   
    console.log(tp)
    
    if(tp >= cp+1)
    {
        console.log(cp+1)
    showPage(cp+1);
    }
}

function showPrev()
{
    if(cp > 0)
    {
        console.log(cp-1)
    showPage(cp-1);
    }
}