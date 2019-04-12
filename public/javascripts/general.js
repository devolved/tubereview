// general js



// pagination 

if(document.getElementById('paginated')){

    let sections = document.querySelectorAll('section');
    let pageHeight = 0;
    let sliding = false;
    let active = "0"
    //show 1st page
    sections[0].classList.add('active');

    // get height of tallest page
    sections.forEach(s => { if (s.offsetHeight > pageHeight) { pageHeight = s.offsetHeight; } });
    pageHeight = pageHeight + 40;
    // set universal height
    document.getElementById('paginated').style.height = pageHeight + 'px';
    sections.forEach(s => { s.style.height = pageHeight + 'px' });

    // get pagination clicked
    document.getElementById('pages').addEventListener('click', function(e){
        
        if (!sliding && e.srcElement.dataset.page !== active ) {
            sliding = true;
            document.getElementsByClassName('active')[0].classList.replace('active', 'away');

            active = e.srcElement.dataset.page;
            sections[e.srcElement.dataset.page].classList.add('active');

            setTimeout(function(){
                document.getElementsByClassName('away')[0].classList.remove('away');
                sliding = false;
            }, 750);
        }
        
    });

    

}


