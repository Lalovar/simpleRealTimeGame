export default function loadResources (image)  {
        var oImg = document.createElement("img");
        oImg.setAttribute('src', image);
        return oImg;
    }