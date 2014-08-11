       
     var gallery;
     var ratio = '16:9';
     var currentVideo = 0;
     var currentAlbum = '2990191';
    
      function setCurrentAlbum(id) {
        currentAlbum = id;
        gallery.empty();
        getVideos();
     }

    $(document).ready(function(){
     gallery = document.getElementById('vimeoGallery');
    // gallery.innerHTML = '<div id="ss__wrapper"></div><div id="ss__controls"><div id="ss__prev"><div id="ss__prevChev"></div></div><div id="ss__next"><div id="ss__nextChev"></div></div><div id="ss__dots"></div></div></div>';

});
        var apiEndpoint = 'http://vimeo.com/api/v2/';
        var oEmbedEndpoint = 'http://vimeo.com/api/oembed.json'
        var oEmbedCallback = 'switchVideo';
        var videosCallback = 'setupGallery';
        var vimeoUsername = 'user7720451';  


function getVideos() {
 // Get the user's videos
 $(document).ready(function() {
    //$.getScript(apiEndpoint + vimeoUsername + '/videos.json?callback=' + videosCallback);
    $.getScript(apiEndpoint + "album/" + currentAlbum + '/videos.json?callback=' + videosCallback);
 });
}
getVideos();

   function getVideo(url) {
            $.getScript(oEmbedEndpoint + '?url=' + url + '&width=504&height=280&callback=' + oEmbedCallback);
        }

        function setupGallery(videos) {

            // Set the user's thumbnail and the page title
           // $('#stats').prepend('<img id="portrait" src="' + videos[0].user_portrait_medium + '" />');
            //$('#stats h2').text(videos[0].user_name + "'s Videos");

            // Load the first video
            getVideo(videos[0].url);
            allVideos = videos;

             gridview(videos, "art");
            
           


            // Switch to the video when a thumbnail is clicked
            $('#thumbs a').click(function(event) {
                event.preventDefault();
                getVideo(this.href);

                return false;
            });

        }

        function switchVideo(video) {
            console.log("switch video to" + video.url);
            console.log("video html is"+video.html);
            $('#embed').html(decodeURI(video.html));
            var src = $('#embed iframe').attr("src");
            src = src.substring(2, src.length);
            src = "https://" + src;
            $('#embed iframe').attr("src", src);
            var description = document.createElement("div");
            description.innerHTML = video.description;
            $('#embed').append(description);
        }

    function gridview(imgs, tag) {
    var grid = document.createElement("ul");
    var gallery = document.getElementById("grid-div");
    gallery.appendChild(grid);

    grid.setAttribute("class", "grid cs-style-2");

    for(var i = 0; i < imgs.length; i++) {

        var li = document.createElement("li"),
            figure = document.createElement("figure"),
            img = document.createElement("img"),
            caption = document.createElement("figcaption"),
            title = document.createElement("h3"),
            description = document.createElement("span");
            link = document.createElement("button");
            link.setAttribute("value", i);
            title.setAttribute("class", "img-title");
        
        li.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(caption);
        caption.appendChild(title);
        caption.appendChild(description);
        caption.appendChild(link);
        img.setAttribute("src", imgs[i].thumbnail_large);
        title.innerHTML = imgs[i].title;
        description.innerHTML = imgs[i].description.substring(0, 20) + "...";
        link.innerHTML = "Take a Look";
        classie.add( link, 'md-trigger' );
        classie.add(link, "open-modal");
        link.setAttribute("href", imgs[i].url);
        link.setAttribute("data-modal", "modal-1");
        grid.appendChild(li);
    }

     init(imgs);
}

function init(videos) {

        
        var overlay = document.querySelector( '.md-overlay' );

        [].slice.call( document.querySelectorAll( '.md-trigger' ) ).forEach( function( el, i ) {

            var modal = document.querySelector( '#' + el.getAttribute( 'data-modal' ) ),
                close = modal.querySelector( '.md-close' );

            function removeModal( hasPerspective ) {
                classie.remove( modal, 'md-show' );

                if( hasPerspective ) {
                    classie.remove( document.documentElement, 'md-perspective' );
                }
            }

            function removeModalHandler() {
                removeModal( classie.has( el, 'md-setperspective' ) ); 
            }

            el.addEventListener( 'click', function( ev ) {
                classie.add( modal, 'md-show' );
                overlay.removeEventListener( 'click', removeModalHandler );
                overlay.addEventListener( 'click', removeModalHandler );

                var n = parseInt(el.getAttribute("value"));
                getVideo(videos[n].url);
                //switchVideo(videos[n]);

                //change modal title:
                var modalTitle = document.getElementById("modal-title");
                var frameTitle = document.getElementsByClassName("img-title")[n];
                modalTitle.innerHTML = frameTitle.innerHTML;

                if( classie.has( el, 'md-setperspective' ) ) {
                    setTimeout( function() {
                        classie.add( document.documentElement, 'md-perspective' );
                    }, 25 );
                }
            });

            close.addEventListener( 'click', function( ev ) {
                ev.stopPropagation();
                removeModalHandler();

            });

        } );

    }







         // Update current frame
   /* function goToFrame(n) {
        console.log("go to frame" + n);
        if(n >= ssFrames) {
            ssCurrentFrame = 0;
        } else if(n < 0) {
            ssCurrentFrame = ssFrames - 1;
        } else {
            ssCurrentFrame = n;
        }
    }*/
    // Add current class to first frame
 /*   function addCurrent(n) {
        ssImages[n].className += ' current';
        ssAllDots[n].className += ' current';
    }

    // Clear all current classes
    function clearCurrent() {
        for(var i = 0; i < ssFrames; i++) {
            ssImages[i].className = ssImages[i].className.replace(/ current/, '');
            ssAllDots[i].className = ssAllDots[i].className.replace(/ current/, '');
        }
    }*/

var ss, ssWrapper, ssControls, ssPrev, ssNext, ssDots, ssImages, ssFrames, ssRatio, ssDirectory, ssPrevix, ssCurrentFrame;
var ssDotsWidth, ssWidth, ssHeight;
function simpleslider(ssR, ssF, ssD, ssP) {
        ss              = document.getElementById('vimeoGallery');
        ssWrapper       = document.getElementById('ss__wrapper');
        ssControls      = document.getElementById('ss__controls');
        ssPrev          = document.getElementById('ss__prev');
        ssNext          = document.getElementById('ss__next');
        ssDots          = document.getElementById('ss__dots');
        ssImages        = ssWrapper.getElementsByTagName('img');
        ssFrames        = ssF || ssImages.length;
        ssRatio         = ssR;
        ssDirectory     = ssD;
        ssPrefix        = ssP;
        ssCurrentFrame  = 0;
        ssDotsWidth     = ssFrames * 20;
        ssWidth         = 0;
        ssHeight        = 0;
    
    // Calculate aspect ratio
    var ssRatioSplit      = ssRatio.split(':');
    var ssRatioPercentage = ssRatioSplit[1] / ssRatioSplit[0] * 100;


    // Set dimensions
    ss.style.paddingBottom = ssWrapper.style.paddingBottom = ssRatioPercentage + '%';
    ssDots.style.width     = ssDotsWidth + 'px';

    // Get pixel dimensions
    function getSSDimensions() {
        ssWidth  = ssWrapper.offsetWidth;
        ssHeight = ssWrapper.offsetHeight;
    }

    getSSDimensions();

    // Generate navigation dots
    for(var i = 0; i < ssFrames; i++) {
        var ssDot = document.createElement('div');
        ssDot.className = 'ss__dot' + ' ss__frame' + [i];
        ssDots.appendChild(ssDot);
    }

    ssAllDots = ssDots.getElementsByTagName('div');

    // Create img elements if they don't already exist on the DOM
    if(ssImages.length == 0) {
        for(var i = 1; i <= ssFrames; i++) {
            var ssImg = new Image();
            ssImg.src = ssD + '/' + ssP + i + '.jpg'; // 'img/directory/prefix1.jpg'
            ssWrapper.innerHTML += ssImg.outerHTML;
        }
        ssImages = ssWrapper.getElementsByTagName('img');
    }

    for(var i = 0, l = ssImages.length; i < l; i++) {
        coverImages(ssImages[i]);
    }

    // Ensure each image fills the wrapper leaving no whitespace (background-size:cover)
    function coverImages(imgElem) {

        var img = new Image();
        img.src = imgElem.src;

        var wait = setInterval(function() {
            if(img.width != 0 && img.height != 0) {
                clearInterval(wait);

                // Stretch to fit
                if((img.width / img.height) < (ssWidth / ssHeight)) {
                    imgElem.className += ' full-width';
                } else {
                    imgElem.className += ' full-height';
                }

                calculateCentre();
            }
        }, 0);
    }

    function calculateCentre() {
        for(var i = 0, l = ssImages.length; i < l; i++) {
            if(ssImages[i].width >= ssWidth) {
                ssImages[i].style.left = (ssWidth - ssImages[i].width) / 2 + 'px';
            }

            if(ssImages[i].height >= ssHeight) {
                ssImages[i].style.top = (ssHeight - ssImages[i].height) / 2 + 'px';
            }
        }
    }


    // Always initialise first image as .current
    addCurrent(0);

    // Next and Previous click handlers
    if(window.addEventListener) {
        ssPrev.addEventListener('click', clickPrev);
        ssNext.addEventListener('click', clickNext);
    } else if(window.attachEvent) {
        ssPrev.attachEvent('onclick', clickPrev);
        ssNext.attachEvent('onclick', clickNext);
    }

    function clickPrev() {
       // clearCurrent();
      //  goToFrame(ssCurrentFrame - 1);
       // addCurrent(ssCurrentFrame);
       currentVideos--;
       if(currentVideo == -1) {
        currentVideo = videos.length - 1;
       }
       switchVideo(allVideos[currentVideo]);
    }

    function clickNext() {
        //clearCurrent();
        currentVideos++;
       if(currentVideo == videos.length) {
        currentVideo = 0;
       }
       switchVideo(allVideos[currentVideo]);
    }

    // Navigation dots click handlers
    for(var i = 0; i < ssFrames; i++) {
        if(window.addEventListener) {
            ssAllDots[i].addEventListener('click', clickDots);
        } else if(window.attachEvent) {
            ssAllDots[i].attachEvent('onclick', clickDots);
        }
    }

   /* function clickDots(e) {
        if(e.target) {
            var dotClicked = e.target.className;
        } else if(e.srcElement) {
            var dotClicked = e.srcElement.className;
        }
        var n = dotClicked.match(/\d+/);
        clearCurrent();
        goToFrame(parseInt(n[0]));
        addCurrent(n[0]);
    }*/

    document.onkeydown = function(e) {
        evt = e || window.event;
        switch(evt.keyCode) {
            case 37:
                clickPrev();
                break;
            case 39:
                clickNext();
                break;
        }
    };

    // Recalculate image centres on window resize
    if(window.addEventListener) {
        window.addEventListener('resize', windowResize);
    } else if(window.attachEvent) {
        window.attachEvent('onresize', windowResize);
    }

    function windowResize() {
        getSSDimensions();
        calculateCentre();
    }
}


