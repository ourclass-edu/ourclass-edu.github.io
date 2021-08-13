var $ = document.getElementById.bind(document)


function showNav() {
    $('side-nav').style.zIndex = "7"
    $('side-nav').style.opacity = "1"
    //$('side-nav').style.left = "0"
    $('dimmer').style.animationName = "showanim"
    $('side-nav').style.transform = "translate(0vw)"
    document.body.style.overflow = "hidden"
    document.body.height = "100%"
}
function hideNav() {

    // $('side-nav').style.left = "-70vw"
    $('side-nav').style.transition = "transform 0.5s ease-in-out"
    $('side-nav').style.transform = "translateX(-70vw)"

    $('dimmer').style.animationName = "hideanim"
    document.body.style.overflow = "scroll"
    document.body.height = ""

}
document.addEventListener('DOMContentLoaded', (_event) => {
    $('search-show').addEventListener("click", (_event) => {
        showSearch();
    })
    $('cancel-search').addEventListener("click", (_event) => {
       hideSearch();
    })
    $('search-button').addEventListener("click", (_event) => {
        search();
    })
    $('search-nav').addEventListener("focusout", (event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {

            hideSearch();

        }
    })
    $('search-input').addEventListener("keydown", (event) => {
        if (event.keyCode === 13) {
            search();
        }
        else if (event.keyCode === 27) {
          hideSearch();
        }
    })
})

function showSearch() {

    $('search-nav').className = 'search-nav'
    console.log( $('search-nav').className)
    $('search-nav').style.transform = "scale(1)"
    $('search-bar').style.animationName = "slide-in"
    $('search-input').focus()
}
function hideSearch() {
    $('search-bar').style.animationName = "slide-out"
    $('search-nav').className = $('search-nav').className + " hider"
    $('search-nav').style.transform = "scale(0)"
}

function search()
{
    const keywords = $('search-input').value;
    if(keywords && keywords.length >0)
    {
        $('search-input').value = ""
        window.location = "/search?keys=" + keywords
    }
}
