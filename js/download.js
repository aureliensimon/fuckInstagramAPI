function changeImgSrcI () {
    document.getElementById('download-img').setAttribute('src', 'img/download-red.png');
}
function changeImgSrcO () {
    document.getElementById('download-img').setAttribute('src', 'img/download.png');
}

function getMeta () {
    const url = document.getElementById('url-input').value;
    document.getElementById('loading-text').style.display = 'block';
    fetch(url).
        then(r => r.text()).
        then(r => {
            document.getElementById('loading-text').style.display = 'none';
            document.getElementById('result-image').setAttribute("src", (r.match(/<meta property="og:image" content="\s*(\S+)/)[1]).slice(0, -1));
            console.log((r.match(/<meta property="og:image" content="\s*(\S+)/)[1]).slice(0, -1));
            document.getElementById('download-button').style.display = 'block';
        });
}

function downloadFile (src, redraw) {
    let c = document.createElement("canvas");
    ctx = c.getContext("2d");
    let img1 = new Image();
    img1.setAttribute('crossorigin', 'anonymous');
    img1.onload = function() {
        c.width = img1.width;
        c.height = img1.height;
        ctx.drawImage(img1, 0, 0);
        
        if (redraw) {
            let img2 = new Image();
            img2.src = c.toDataURL("image/jpeg");
            document.body.appendChild(img2);
        }
        
        //popup download dialog
        c.toBlob(function(blob) {
        saveAs(blob, "instadownloader.png");
        });
    };

    img1.src = src;
}