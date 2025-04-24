document.addEventListener("DOMContentLoaded", function () {
    // Logic for Filter Button 
    let filterBtnContainer=document.querySelector("#fillters");
    let leftFilterBtn=document.querySelector(".non-gst-filterLeftBtn");
    let rightFilterBtn=document.querySelector(".non-gst-filterrighttBtn");  
    function scrollLeft(){
        filterBtnContainer.scrollLeft -= 100;
    }
    function scrollRight(){
        filterBtnContainer.scrollLeft += 100;
    }
    if(leftFilterBtn && rightFilterBtn){
        leftFilterBtn.addEventListener("click",scrollLeft);
        rightFilterBtn.addEventListener("click",scrollRight);
    }else{
        console.log("Left and Right Buttons are Null : ");
    }
    // Here is Taxes Selection Logic Start
    let taxSwitchBtn = document.getElementById("flexSwitchCheckDefault");
    taxSwitchBtn.addEventListener("click", () => {
        let taxText = document.querySelectorAll(".tax-text");
        taxText.forEach((text)=>{
            if(text.style.display !="inline"){
                text.style.display="inline";
            }else{
                text.style.display="none";
            }
        })
    }) 
    // Here is Taxes Selection Logic End
})