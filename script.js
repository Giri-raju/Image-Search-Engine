
const accessKey = "tdKvePiaZCNdEKC6JIDQ5w7T6LUA2z-B6rmnEbHNnLE";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");


let keyword = "";
let page = 1;

async function searchImages(){
    keyword = searchBox.value;
    if (keyword === "") {
        searchResult.innerHTML = "";
        showMoreBtn.style.display = "none";
        return;
    }
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if(page === 1){
        searchResult.innerHTML = "";
    }

    const results = data.results;

    results.forEach((result) =>{
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");
    
        const image = document.createElement("img");
        image.src = result.urls.small;
    
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
    
        const downloadBtn = document.createElement("a");
        downloadBtn.href = result.urls.full; // Full-resolution image URL
        downloadBtn.target = "_blank"; // Opens in a new tab
        downloadBtn.innerText = "Download";
        downloadBtn.classList.add("download-btn");
    
        imageLink.appendChild(image);
        imageContainer.appendChild(imageLink);
        imageContainer.appendChild(downloadBtn);
        searchResult.appendChild(imageContainer);
    });
    
    if(results.length > 0){
        showMoreBtn.style.display = "block";
    }
}

searchForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", ()=>{
    page++;
    searchImages();
})