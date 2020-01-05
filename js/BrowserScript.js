let s = [];
let photos = [];
let infiniteScroll;

function downloadFile (data, fileName, type="text/plain") {
    const a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);
  
    // Set the HREF to a Blob representation of the data to be downloaded
    a.href = window.URL.createObjectURL(
        new Blob([data], { type })
    );
    a.setAttribute("download", fileName);
    a.click();
    
    window.URL.revokeObjectURL(a.href);
    document.body.removeChild(a);
}

function getAllPhotos () {
    Array.from(document.getElementsByClassName('FFVAD')).forEach(
        function(element){
            // Check if img as been already add to the array
            if  (!photos.includes(element.src)) {
                photos.push(element.src);
            }
        }
    );
}

function scrollToBottom () {
    getAllPhotos();
    
    bottom = document.body.scrollHeight;
    current = window.innerHeight + document.body.scrollTop;

    console.log('Loading ... (' + parseInt((photos.length - 1) / nbPublication * 100) + ' %)');

    if((bottom - current) > 0){
        window.scrollTo(0, bottom);
        infiniteScroll = setTimeout ('scrollToBottom()', 400);
    }
    
    // Add current document's height
    s.push(bottom - current);
    
    // Check if document's height is stable == loading complete
    if (s.filter((v) => (v === (bottom - current))).length > 10) {
        clearTimeout(infiniteScroll);
        downloadFile(photos, 'URL list');
        return 'ok';
    }
}

let nbPublication = parseInt(document.getElementsByClassName('g47SY ')[0].firstChild.data);
scrollToBottom();