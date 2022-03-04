
// Storing pair of each component in object
const eye = {
    left: document.getElementById('eye-l-ball'),
    right: document.getElementById('eye-r-ball')
}

const eyeball = {
    left: document.getElementById('eye-l-pupil'),
    right: document.getElementById('eye-r-pupil')
}

const brow = {
    left: document.getElementById('eye-l-brow'),
    right: document.getElementById('eye-r-brow')
}


// a utility function i created to facilitate the creation of animation
// this is based on @animate svg tag, mainly used for moving and Moving and sizing animations

function animate(target, options1, options2, reverse=true) {
    // creating animate tag in the given namespace
    const animate_forward = document.createElementNS('http://www.w3.org/2000/svg','animate');
    animate_forward.setAttribute("id","one");
    animate_forward.setAttribute("attributeType","XML");
    animate_forward.setAttribute("begin","0s;two.end");

    // creating animate tag in the given namespace
    const animate_backward = document.createElementNS('http://www.w3.org/2000/svg','animate');
    animate_backward.setAttribute("id","two");
    animate_backward.setAttribute("attributeType","XML");
    animate_backward.setAttribute("begin","one.end");

    // setting the properties passed via parameter option1
    for (const key in options1) {
        animate_forward.setAttribute(key,options1[key]);
    }

    // setting the properties passed via parameter option2 is reverse is true
    if (reverse) {
        for (const key in options2) {
            animate_backward.setAttribute(key,options2[key]);
        }
    }

    target.appendChild(animate_forward);
    if (reverse) target.appendChild(animate_backward);
}

// another utility function i created to facilitate the creation of animations
// this is based on @animateTransform svg tag, mainly used for rotating and scaling animations
function animateTransform(target, options1, options2, reverse=true) {
    // creating animateTransform tag in the given namespace
    const animate_forward = document.createElementNS('http://www.w3.org/2000/svg','animateTransform');
    animate_forward.setAttribute("id","one");
    animate_forward.setAttribute("attributeType","XML");
    animate_forward.setAttribute("attributeName","transform");
    animate_forward.setAttribute("type","rotate");
    animate_forward.setAttribute("begin","0s;two.end");
    
    // creating animateTransform tag in the given namespace
    const animate_backward = document.createElementNS('http://www.w3.org/2000/svg','animateTransform');
    animate_backward.setAttribute("id","two");
    animate_backward.setAttribute("attributeType","XML");
    animate_backward.setAttribute("attributeName","transform");
    animate_backward.setAttribute("type","rotate");
    animate_backward.setAttribute("begin","one.end");

    // setting the properties passed via parameter option1
    for (const key in options1) {
        animate_forward.setAttribute(key,options1[key]);
    }

    // setting the properties passed via parameter option2 if reverse is true
    if (reverse) {
        for (const key in options2) {
            animate_backward.setAttribute(key,options2[key]);
        }
    }

    target.appendChild(animate_forward);
    if (reverse) target.appendChild(animate_backward);
}




//-------------------------    ANIMATIONS ----------------------------------

// SVG Objects
const svg = document.getElementById('supersvg')

// the animation i want to happend next is store in this variable
var effect = function() {}



// UpDown Animation
function UpDown() {
    effect = function() {
        animate(eye.left, {
            attributeName: "cy",
            from: "40",
            to: "60",
            dur: "2s"
        }, 
        {
            attributeName: "cy",
            from: "60",
            to: "40",
            dur: "2s"
        })
        animate(eye.right, {
            attributeName: "cy",
            from: "40",
            to: "60",
            dur: "2s"
        }, 
        {
            attributeName: "cy",
            from: "60",
            to: "40",
            dur: "2s"
        })
        animate(eyeball.left, {
            attributeName: "cy",
            from: "44",
            to: "64",
            dur: "2s"
        }, 
        {
            attributeName: "cy",
            from: "64",
            to: "44",
            dur: "2s"
        })
        animate(eyeball.right, {
            attributeName: "cy",
            from: "44",
            to: "64",
            dur: "2s"
        }, 
        {
            attributeName: "cy",
            from: "64",
            to: "44",
            dur: "2s"
        })
        animate(brow.left, {
            attributeName: "y",
            from: "30",
            to: "50",
            dur: "2s"
        }, 
        {
            attributeName: "y",
            from: "50",
            to: "30",
            dur: "2s"
        })
        animate(brow.right, {
            attributeName: "y",
            from: "30",
            to: "50",
            dur: "2s"
        }, 
        {
            attributeName: "y",
            from: "50",
            to: "30",
            dur: "2s"
        })
    }
}


// Rotate Animation
function Rotate() {
    animateTransform(eye.left, {
        from: "0 45 40",
        to: "360 45 40",
        dur: "2s"
    },
    {
        from: "360 45 40",
        to: "0 45 40",
        dur: "2s"
    })
    animateTransform(eye.right, {
        from: "0 55 40",
        to: "360 55 40",
        dur: "2s"
    },
    {
        from: "360 55 40",
        to: "0 55 40",
        dur: "2s"
    })
    animateTransform(eyeball.left, {
        from: "0 45 44",
        to: "360 45 44",
        dur: "2s"
    },
    {
        from: "360 45 44",
        to: "0 45 44",
        dur: "2s"
    })
    animateTransform(eyeball.right, {
        from: "0 55 44",
        to: "360 55 44",
        dur: "2s"
    },
    {
        from: "360 55 44",
        to: "0 55 44",
        dur: "2s"
    })
    animateTransform(brow.left, {
        from: "0 45 31",
        to: "360 45 31",
        dur: "2s"
    },
    {
        from: "360 45 31",
        to: "0 45 31",
        dur: "2s"
    })
    animateTransform(brow.right, {
        from: "0 55 31",
        to: "360 55 31",
        dur: "2s"
    },
    {
        from: "360 55 31",
        to: "0 55 31",
        dur: "2s"
    })
}


// Size Animation
function Size() {
    effect = function() {
        animate(eye.left, {
            attributeName: "rx",
            from: "5",
            to: "1",
            dur: "1s"
        },
        {
            attributeName: "rx",
            from: "1",
            to: "5",
            dur: "1s"
        })
        animate(eye.right, {
            attributeName: "rx",
            from: "5",
            to: "1",
            dur: "1s"
        },
        {
            attributeName: "rx",
            from: "1",
            to: "5",
            dur: "1s"
        })
        animate(eyeball.left, {
            attributeName: "ry",
            from: "2",
            to: "3",
            dur: "1s"
        },
        {
            attributeName: "ry",
            from: "2",
            to: "3",
            dur: "1s"
        })
        animate(eyeball.right, {
            attributeName: "ry",
            from: "2",
            to: "3",
            dur: "1s"
        },
        {
            attributeName: "ry",
            from: "2",
            to: "3",
            dur: "1s"
        })
        animate(brow.left, {
            attributeName: "height",
            from: "1",
            to: "4",
            dur: "1s"
        },
        {
            attributeName: "height",
            from: "4",
            to: "1",
            dur: "1s"
        })
        animate(brow.right, {
            attributeName: "height",
            from: "1",
            to: "4",
            dur: "1s"
        },
        {
            attributeName: "height",
            from: "4",
            to: "1",
            dur: "1s"
        })
    }
}



// Color Animation
function Color() {
    effect = function() {
        animate(eye.left, {
            attributeName: "fill",
            values : "red; orange; yellow; green; blue; indigo; violet; red",
            repeatCount: "indefinite",
            dur: "5s"   
        })
        animate(eye.right, {
            attributeName: "fill",
            values : "red; orange; yellow; green; blue; indigo; violet; red",
            repeatCount: "indefinite",
            dur: "5s"   
        })
        animate(eyeball.left, {
            attributeName: "fill",
            values : "red; orange; yellow; green; blue; indigo; violet; red",
            repeatCount: "indefinite",
            dur: "5s"   
        })
        animate(eyeball.right, {
            attributeName: "fill",
            values : "red; orange; yellow; green; blue; indigo; violet; red",
            repeatCount: "indefinite",
            dur: "5s"   
        })
        animate(brow.left, {
            attributeName: "fill",
            values : "red; orange; yellow; green; blue; indigo; violet; red",
            repeatCount: "indefinite",
            dur: "5s"   
        })
        animate(brow.right, {
            attributeName: "fill",
            values : "red; orange; yellow; green; blue; indigo; violet; red",
            repeatCount: "indefinite",
            dur: "5s"   
        })
    }
}



// Border Animation
function Border() {
    effect = function() {
        animate(eye.left, {
            attributeName: "stroke-width",
            from: "1",
            to: "4",
            dur: "5s",
            repeatCount: "indefinite",
        })
        animate(eye.right, {
            attributeName: "stroke-width",
            from: "1",
            to: "4",
            dur: "5s",
            repeatCount: "indefinite",  
        })
        animate(eyeball.left, {
            attributeName: "stroke-width",
            from: "0.25",
            to: "2",
            dur: "5s",
            repeatCount: "indefinite",  
        })
        animate(eyeball.right, {
            attributeName: "stroke-width",
            from: "0.25",
            to: "2",
            dur: "5s",
            repeatCount: "indefinite",   
        })
        animate(brow.left, {
            attributeName: "stroke-width",
            from: "0.25",
            to: "2",
            dur: "5s",
            repeatCount: "indefinite",
        })
        animate(brow.right, {
            attributeName: "stroke-width",
            from: "0.25",
            to: "2",
            dur: "5s",
            repeatCount: "indefinite",  
        })
    }
}

// Scale Animation
function Scale() {
    effect = function() {
        animateTransform(document.getElementById("ghost"), {
            attributeName: "transform",
            additive: "sum",
            type: "scale",
            from: "1",
            to: "0",
            dur: "4s",
        }, 
        {
            attributeName: "transform",
            additive: "sum",
            type: "scale",
            from: "0",
            to: "1",
            dur: "4s",
        })
    }
    console.log(effect)
}


// this function is called when the animate button is pressed
function Animate() { window.effect() }

// this function produce the svg code 
function XML() {
    var displayBox = document.getElementById('editor');
    displayBox.textContent = document.getElementById("svg-wrapper").innerHTML;
}
// downloads the code
function Download(svgEl, name) {
    saveSvg(svg, "mysvgfile.svg")
}

// got it off this link to download svg image
// https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-creating-an-svg-with-d3-js-ie-safari-an
function saveSvg(svgEl, name) {
    svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var svgData = svgEl.outerHTML;
    var preface = '<?xml version="1.0" standalone="no"?>\r\n';
    var svgBlob = new Blob([preface, svgData], {type:"image/svg+xml;charset=utf-8"});
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

