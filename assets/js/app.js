const fileInput = document.querySelector('.file-input'),
filterOpions = document.querySelectorAll('.fillter button'),
rotateOptions = document.querySelectorAll('.rotate button'),
filterName = document.querySelector('.filter-info .name'),
filterValue = document.querySelector('.filter-info .value'),
filterSlider= document.querySelector('.slider input'),
resetFilterBtn= document.querySelector('.reset-filter'),
previewImg = document.querySelector('.preview-img img'),
chooseImage = document.querySelector('.choose-img'),
saveImageBtn = document.querySelector('.save-img');

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const applyfillter = () =>{
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
};

const loadimage = () =>{
    let file = fileInput.files[0];
    if (!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load",() =>{
        resetFilterBtn.click();
        document.querySelector(".container").classList.remove("disable");
    });
}

filterOpions.forEach(option =>{
    option.onclick = () =>{
        document.querySelector(".fillter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if (option.id === 'brightness') {
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerHTML = `${brightness}%`;
        } else if(option.id === 'saturation'){
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerHTML = `${saturation}%`;
        } else if(option.id === 'inversion'){
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerHTML = `${inversion}%`;
        } else if(option.id === 'grayscale'){
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerHTML = `${grayscale}%`;
        }
    }
});

const updateFilter = () =>{
    filterValue.innerHTML = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".fillter .active");

    if (selectedFilter.id === 'brightness') {
        brightness = filterSlider.value;
    } else if(selectedFilter.id === 'saturation') {
        saturation = filterSlider.value;
    } else if(selectedFilter.id === 'inversion') {
        inversion = filterSlider.value;
    } else if(selectedFilter.id === 'grayscale'){
        grayscale = filterSlider.value;
    };
    applyfillter();
}

rotateOptions.forEach(option => {
    option.addEventListener("click", () =>{ // Adding click event listener to all rotate/flip buttons...
        if (option.id === 'left') {
            rotate -= 90;
        }
        if (option.id === 'right') {
            rotate += 90;
        }
        if (option.id === 'vr') {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        }
        if (option.id === 'hr') {
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyfillter();
    });
});


const resetFilter = () =>{
    brightness = 100; saturation = 100; inversion = 0; rotate = 0; flipHorizontal = 1; flipVertical = 1;
    filterOpions[0].click();
    applyfillter();
}

const saveImage = () =>{
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if (rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180)
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    // document.body.appendChild(canvas);
    const link = document.createElement('a');
    link.download = 'image.jpg';
    link.href = canvas.toDataURL();
    link.click();
}

fileInput.addEventListener("change", loadimage );
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImageBtn.addEventListener("click", saveImage);
chooseImage.addEventListener("click", () => fileInput.click());