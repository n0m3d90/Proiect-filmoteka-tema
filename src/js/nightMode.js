export let nightMode = localStorage.getItem("nightMode");
const nightModeToggle = document.querySelector("#checkbox");

const enableNightMode = () => {
    document.body.classList.add('nightmode'); 
    localStorage.setItem("nightMode", "enabled");
};

const disableNightMode = () => {
    document.body.classList.remove('nightmode'); 
    localStorage.setItem("nightMode", "disabled");
};


if (nightMode === 'enabled'){
    nightModeToggle.checked = true;
    enableNightMode();
}

nightModeToggle.addEventListener("change", ()=>{
    nightMode = localStorage.getItem("nightMode");
    if (nightModeToggle.checked){
        enableNightMode();
    }else{
        disableNightMode();
    }
});