function clipboard () {
    let cp = document.getElementById('script');
    cp.select();
    document.execCommand("copy");
    alert();
}

function alert () {
    let elem = document.createElement("div");
    elem.setAttribute("style","position:absolute;top:7%;left:37.5%;background-color:#4CAF50;color:white;border-radius: 10px 10px 10px 10px;width: 25%;height: 50px;text-align:center;line-height:50px;");
    elem.innerHTML = 'Copied !';
    setTimeout(function () {
      elem.parentNode.removeChild(elem);
    }, 1500);
    document.body.appendChild(elem);
}

function getProfile () {
    let urls = parseUrls(document.getElementById('txt-urls').value);
    clearDiv();
    createSection();
    addColumnSelector();
    loadImgs(urls);
}

function parseUrls (txt) {
    let arr = txt.split(',');
    return arr;
}

function createSection () {
    let div = document.createElement('div');
    div.id = 'photos';
    document.getElementById('main-content').appendChild(div);
}

function clearDiv () {
    document.getElementById('steps').remove();
}

function addColumnSelector () {
    let div = document.getElementById('content-title');
    let select = document.createElement('input');
    select.type = 'number';
    select.value = 3;
    select.id = 'column-selector';
    select.setAttribute('onchange', 'changeColumnCount()');
    select.title = 'Change Column Count';
    div.appendChild(select);
}

function loadImgs (urls) {
    let div = document.getElementById('photos');

    urls.forEach(url => {
        if (url) {
            const img = document.createElement('img');
            img.className = 'profile-img';
            img.src = url;
            img.setAttribute('onclick', 'modalImage(this)');
    
            div.appendChild(img);
        }
    });
}

function changeColumnCount () {
    document.getElementById('photos').style.columnCount = document.getElementById('column-selector').value;
}

function modalImage (img) {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("img01");
   
    modal.style.display = "block";
    modalImg.src = img.src;

    var span = document.getElementsByClassName("close")[0];

    span.onclick = function() { 
        modal.style.display = "none";
    }
}