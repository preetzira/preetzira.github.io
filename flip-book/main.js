let currentPage = 1;
const nextButton = document.querySelector("button.next");
const prevButton = document.querySelector("button.prev");
const book = document.querySelector(".book");
const soundEffect = document.querySelector("audio");

const totalPages = prompt("How many pages", 10);
const maxPages = totalPages+1;

Array.from({length:+totalPages},(item,index)=>{

    book.innerHTML+= `<div class="paper">
        <div class="front">
            <div class="content">
                Front ${index+1}
            </div>
        </div>
        <div class="back">
            <div class="content">
                Back ${index+1}
            </div>
        </div>
    </div>`;
});
const allPapers = document.querySelectorAll('.paper');
const papers = {};
for (let index = totalPages - 1; index >= 0; index--) {
    const element = allPapers[index];
    papers[index+1] = element;
    if(index === 0) element.style.zIndex = totalPages;
    else element.style.zIndex = 0;
}

function openBook() {
    book.style.transform = "translateX(50%)";
    nextButton.style.transform = "translateX(125px)";
    prevButton.style.transform = "translateX(-125px)";
}
function closeBook(isFirstPage) {
    if (isFirstPage) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }
    nextButton.style.transform = "translateX(0px)";
    prevButton.style.transform = "translateX(0px)";

}
function nextPage() {
    if (currentPage < maxPages) {
        soundEffect.play();
        papers[currentPage].classList.add("flipped");
        papers[currentPage].style.zIndex = totalPages - currentPage;
        if(papers[currentPage+1]) papers[currentPage+1].style.zIndex = totalPages - currentPage - 1;
        if(papers[currentPage-1]) papers[currentPage-1].style.zIndex = 0;
        if(currentPage === 1){
            openBook();
        }
        if(currentPage === +totalPages){
            closeBook();
            nextButton.disabled = true;
        } else {
            if (currentPage >= 1 && Boolean(prevButton.disabled)) prevButton.disabled = false;
            currentPage++;
        }
    }
}
function prevPage() {
    soundEffect.play();
    papers[currentPage].classList.remove("flipped");
    papers[currentPage].style.zIndex = totalPages - currentPage;
    
    if(currentPage === +totalPages){
        openBook();
    }
    if(currentPage === 1){
        closeBook(true);
    }
    if (currentPage <= 1) prevButton.disabled = true;
    else currentPage--;
    if (currentPage < maxPages && Boolean(nextButton.disabled)) nextButton.disabled = false;
}

nextButton.addEventListener('click',nextPage);
prevButton.addEventListener('click',prevPage);