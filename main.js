
// TARGETS
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


// SVG Objects
const svg = document.getElementById('supersvg')


function moveAnimation(target, options1, options2, reverse=true) {
    const animate_forward = document.createElementNS('http://www.w3.org/2000/svg','animate');
    animate_forward.setAttribute("id","one");
    animate_forward.setAttribute("attributeType","XML");
    animate_forward.setAttribute("begin","0s;two.end");

    const animate_backward = document.createElementNS('http://www.w3.org/2000/svg','animate');
    animate_backward.setAttribute("id","two");
    animate_backward.setAttribute("attributeType","XML");
    animate_backward.setAttribute("begin","one.end");

    for (const key in options1) {
        animate_forward.setAttribute(key,options1[key]);
    }

    if (reverse) {
        for (const key in options2) {
            animate_backward.setAttribute(key,options2[key]);
        }
    }

    target.appendChild(animate_forward);
    if (reverse) target.appendChild(animate_backward);
}

function rotateAnimation(target, options1, options2, reverse=true) {

    const animate_forward = document.createElementNS('http://www.w3.org/2000/svg','animateTransform');
    animate_forward.setAttribute("id","one");
    animate_forward.setAttribute("attributeType","XML");
    animate_forward.setAttribute("attributeName","transform");
    animate_forward.setAttribute("type","rotate");
    animate_forward.setAttribute("begin","0s;two.end");

    const animate_backward = document.createElementNS('http://www.w3.org/2000/svg','animateTransform');
    animate_backward.setAttribute("id","two");
    animate_backward.setAttribute("attributeType","XML");
    animate_backward.setAttribute("attributeName","transform");
    animate_backward.setAttribute("type","rotate");
    animate_backward.setAttribute("begin","one.end");

    for (const key in options1) {
        // console.log(key, options1[key])
        animate_forward.setAttribute(key,options1[key]);
    }

    if (reverse) {
        for (const key in options2) {
            // console.log(key, options2[key])
            animate_backward.setAttribute(key,options2[key]);
        }
    }

    target.appendChild(animate_forward);
    if (reverse) target.appendChild(animate_backward);
}

function sizeAnimation(target, options1, options2, reverse=true) {
    const animate_forward = document.createElementNS('http://www.w3.org/2000/svg','animate');
    animate_forward.setAttribute("id","one");
    // animate_forward.setAttribute("attributeName","width");
    animate_forward.setAttribute("attributeType","XML");
    animate_forward.setAttribute("begin","0s;two.end");

    const animate_backward = document.createElementNS('http://www.w3.org/2000/svg','animate');
    animate_backward.setAttribute("id","two");
    // animate_backward.setAttribute("attributeName","width");
    animate_backward.setAttribute("attributeType","XML");
    animate_backward.setAttribute("begin","one.end");

    for (const key in options1) {
        animate_forward.setAttribute(key,options1[key]);
    }

    if (reverse) {
        for (const key in options2) {
            animate_backward.setAttribute(key,options2[key]);
        }
    }

    target.appendChild(animate_forward);
    if (reverse) target.appendChild(animate_backward);
}


var effect = function() {}

// // UpDown
// function UpDownEyes() {
//     effect = function() {
//         moveAnimation(eye.left, {
//             attributeName: "cy",
//             from: "40",
//             to: "60",
//             dur: "2s"
//         }, 
//         {
//             attributeName: "cy",
//             from: "60",
//             to: "40",
//             dur: "2s"
//         })
//         moveAnimation(eye.right, {
//             attributeName: "cy",
//             from: "40",
//             to: "60",
//             dur: "2s"
//         }, 
//         {
//             attributeName: "cy",
//             from: "60",
//             to: "40",
//             dur: "2s"
//         })
//     }
//     console.log(effect)
// }

// function UpDownEyeBalls() {
//     effect = function() {
//         moveAnimation(eyeball.left, {
//             attributeName: "cy",
//             from: "44",
//             to: "60",
//             dur: "2s"
//         }, 
//         {
//             attributeName: "cy",
//             from: "60",
//             to: "44",
//             dur: "2s"
//         })
//         moveAnimation(eyeball.right, {
//             attributeName: "cy",
//             from: "44",
//             to: "60",
//             dur: "2s"
//         }, 
//         {
//             attributeName: "cy",
//             from: "60",
//             to: "44",
//             dur: "2s"
//         })
//     }
//     console.log(effect)
// }

// function UpDownBrows() {
//     effect = function() {
//         moveAnimation(brow.left, {
//             attributeName: "y",
//             from: "30",
//             to: "60",
//             dur: "2s"
//         }, 
//         {
//             attributeName: "y",
//             from: "60",
//             to: "30",
//             dur: "2s"
//         })
//         moveAnimation(brow.right, {
//             attributeName: "y",
//             from: "30",
//             to: "60",
//             dur: "2s"
//         }, 
//         {
//             attributeName: "y",
//             from: "60",
//             to: "30",
//             dur: "2s"
//         })
//     }
//     console.log(effect)
// }


// // Rotate
// function RotateEye() {
//     effect = function() {
//         rotateAnimation(eye.left, {
//             from: "0 45 40",
//             to: "360 45 40",
//             dur: "2s"
//         },
//         {
//             from: "360 45 40",
//             to: "0 45 40",
//             dur: "2s"
//         })
//         rotateAnimation(eye.right, {
//             from: "0 55 40",
//             to: "360 55 40",
//             dur: "2s"
//         },
//         {
//             from: "360 55 40",
//             to: "0 55 40",
//             dur: "2s"
//         })
//     }
//     console.log(effect)
// }

// function RotateEyeBalls() {
//     effect = function() {
//         rotateAnimation(eyeball.left, {
//             from: "0 45 44",
//             to: "360 45 44",
//             dur: "2s"
//         },
//         {
//             from: "360 45 44",
//             to: "0 45 44",
//             dur: "2s"
//         })
//         rotateAnimation(eyeball.right, {
//             from: "0 55 44",
//             to: "360 55 44",
//             dur: "2s"
//         },
//         {
//             from: "360 55 44",
//             to: "0 55 44",
//             dur: "2s"
//         })
//     }
//     console.log(effect)
// }


// function RotateBrows() {
//     effect = function() {
//         rotateAnimation(brow.left, {
//             from: "0 45 31",
//             to: "360 45 31",
//             dur: "2s"
//         },
//         {
//             from: "360 45 31",
//             to: "0 45 31",
//             dur: "2s"
//         })
//         rotateAnimation(brow.right, {
//             from: "0 55 31",
//             to: "360 55 31",
//             dur: "2s"
//         },
//         {
//             from: "360 55 31",
//             to: "0 55 31",
//             dur: "2s"
//         })
//     }
//     console.log(effect)
// }

// // Size
// function SizeEyes() {
//     effect = function() {
//         sizeAnimation(eye.left, {
//             attributeName: "rx",
//             from: "6",
//             to: "1",
//             dur: "1s"
//         },
//         {
//             attributeName: "rx",
//             from: "1",
//             to: "6",
//             dur: "1s"
//         })
//         sizeAnimation(eye.right, {
//             attributeName: "rx",
//             from: "6",
//             to: "1",
//             dur: "1s"
//         },
//         {
//             attributeName: "rx",
//             from: "1",
//             to: "6",
//             dur: "1s"
//         })
//     }
//     console.log(effect)
// }

// function SizeEyeBalls() {
//     effect = function() {
//         sizeAnimation(eyeball.left, {
//             attributeName: "rx",
//             from: "1",
//             to: "3",
//             dur: "1s"
//         },
//         {
//             attributeName: "rx",
//             from: "1",
//             to: "3",
//             dur: "1s"
//         })
//         sizeAnimation(eyeball.right, {
//             attributeName: "rx",
//             from: "1",
//             to: "3",
//             dur: "1s"
//         },
//         {
//             attributeName: "rx",
//             from: "1",
//             to: "3",
//             dur: "1s"
//         })
//     }
//     console.log(effect)
// }

// function SizeBrows() {
//     effect = function() {
//         sizeAnimation(brow.left, {
//             attributeName: "width",
//             from: "6",
//             to: "1",
//             dur: "1s"
//         },
//         {
//             attributeName: "width",
//             from: "1",
//             to: "6",
//             dur: "1s"
//         })
//         sizeAnimation(brow.right, {
//             attributeName: "width",
//             from: "6",
//             to: "1",
//             dur: "1s"
//         },
//         {
//             attributeName: "width",
//             from: "1",
//             to: "6",
//             dur: "1s"
//         })
//     }
//     console.log(effect)
// }




// // Color 
// function ColorEyes() {
//     effect = function() {
//         moveAnimation(eye.left, {
//             attributeName: "fill",
//             values : "red; orange; yellow; green; blue; indigo; violet; red",
//             repeatCount: "indefinite",
//             dur: "5s"   
//         })
//         moveAnimation(eye.right, {
//             attributeName: "fill",
//             values : "red; orange; yellow; green; blue; indigo; violet; red",
//             repeatCount: "indefinite",
//             dur: "5s"   
//         })
//     }
//     console.log(effect)
// }

// function ColorEyeBalls() {
//     effect = function() {
//         moveAnimation(eyeball.left, {
//             attributeName: "fill",
//             values : "red; orange; yellow; green; blue; indigo; violet; red",
//             repeatCount: "indefinite",
//             dur: "5s"   
//         })
//         moveAnimation(eyeball.right, {
//             attributeName: "fill",
//             values : "red; orange; yellow; green; blue; indigo; violet; red",
//             repeatCount: "indefinite",
//             dur: "5s"   
//         })
//     }
//     console.log(effect)
// }

// function ColorEyeBrows() {
//     effect = function() {
//         moveAnimation(brow.left, {
//             attributeName: "fill",
//             values : "red; orange; yellow; green; blue; indigo; violet; red",
//             repeatCount: "indefinite",
//             dur: "5s"   
//         })
//         moveAnimation(brow.right, {
//             attributeName: "fill",
//             values : "red; orange; yellow; green; blue; indigo; violet; red",
//             repeatCount: "indefinite",
//             dur: "5s"   
//         })
//     }
//     console.log(effect)
// }



// // Border 
// function BorderEyes() {
//     effect = function() {
//         moveAnimation(eye.left, {
//             attributeName: "stroke-width",
//             from: "1",
//             to: "4",
//             dur: "5s",
//             repeatCount: "indefinite",
//         })
//         moveAnimation(eye.right, {
//             attributeName: "stroke-width",
//             from: "1",
//             to: "4",
//             dur: "5s",
//             repeatCount: "indefinite",  
//         })
//     }
//     console.log(effect)
// }

// function BorderEyeBalls() {
//     effect = function() {
//         moveAnimation(eyeball.left, {
//             attributeName: "stroke-width",
//             from: "0.25",
//             to: "2",
//             dur: "5s",
//             repeatCount: "indefinite",  
//         })
//         moveAnimation(eyeball.right, {
//             attributeName: "stroke-width",
//             from: "0.25",
//             to: "2",
//             dur: "5s",
//             repeatCount: "indefinite",   
//         })
//     }
//     console.log(effect)
// }

// function BorderEyeBrows() {
//     effect = function() {
//         moveAnimation(brow.left, {
//             attributeName: "stroke-width",
//             from: "0.25",
//             to: "2",
//             dur: "5s",
//             repeatCount: "indefinite",
//         })
//         moveAnimation(brow.right, {
//             attributeName: "stroke-width",
//             from: "0.25",
//             to: "2",
//             dur: "5s",
//             repeatCount: "indefinite",  
//         })
//     }
//     console.log(effect)
// }


// // Scale
// function ScaleGhost() {
//     effect = function() {
//         rotateAnimation(document.getElementById("ghost"), {
//             attributeName: "transform",
//             additive: "sum",
//             type: "scale",
//             from: "1",
//             to: "0",
//             dur: "4s",
//         }, 
//         {
//             attributeName: "transform",
//             additive: "sum",
//             type: "scale",
//             from: "0",
//             to: "1",
//             dur: "4s",
//         })
//     }
//     console.log(effect)
// }



///////////////////////////////////////////////////////////////

// UpDown
function UpDown() {
    effect = function() {
        moveAnimation(eye.left, {
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
        moveAnimation(eye.right, {
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
        moveAnimation(eyeball.left, {
            attributeName: "cy",
            from: "44",
            to: "60",
            dur: "2s"
        }, 
        {
            attributeName: "cy",
            from: "60",
            to: "44",
            dur: "2s"
        })
        moveAnimation(eyeball.right, {
            attributeName: "cy",
            from: "44",
            to: "60",
            dur: "2s"
        }, 
        {
            attributeName: "cy",
            from: "60",
            to: "44",
            dur: "2s"
        })
        moveAnimation(brow.left, {
            attributeName: "y",
            from: "30",
            to: "60",
            dur: "2s"
        }, 
        {
            attributeName: "y",
            from: "60",
            to: "30",
            dur: "2s"
        })
        moveAnimation(brow.right, {
            attributeName: "y",
            from: "30",
            to: "60",
            dur: "2s"
        }, 
        {
            attributeName: "y",
            from: "60",
            to: "30",
            dur: "2s"
        })
    }
}

function Rotate() {
    rotateAnimation(eye.left, {
        from: "0 45 40",
        to: "360 45 40",
        dur: "2s"
    },
    {
        from: "360 45 40",
        to: "0 45 40",
        dur: "2s"
    })
    rotateAnimation(eye.right, {
        from: "0 55 40",
        to: "360 55 40",
        dur: "2s"
    },
    {
        from: "360 55 40",
        to: "0 55 40",
        dur: "2s"
    })
    rotateAnimation(eyeball.left, {
        from: "0 45 44",
        to: "360 45 44",
        dur: "2s"
    },
    {
        from: "360 45 44",
        to: "0 45 44",
        dur: "2s"
    })
    rotateAnimation(eyeball.right, {
        from: "0 55 44",
        to: "360 55 44",
        dur: "2s"
    },
    {
        from: "360 55 44",
        to: "0 55 44",
        dur: "2s"
    })
    rotateAnimation(brow.left, {
        from: "0 45 31",
        to: "360 45 31",
        dur: "2s"
    },
    {
        from: "360 45 31",
        to: "0 45 31",
        dur: "2s"
    })
    rotateAnimation(brow.right, {
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


// Size
function Size() {
    effect = function() {
        sizeAnimation(eye.left, {
            attributeName: "rx",
            from: "6",
            to: "1",
            dur: "1s"
        },
        {
            attributeName: "rx",
            from: "1",
            to: "6",
            dur: "1s"
        })
        sizeAnimation(eye.right, {
            attributeName: "rx",
            from: "6",
            to: "1",
            dur: "1s"
        },
        {
            attributeName: "rx",
            from: "1",
            to: "6",
            dur: "1s"
        })
        sizeAnimation(eyeball.left, {
            attributeName: "rx",
            from: "1",
            to: "3",
            dur: "1s"
        },
        {
            attributeName: "rx",
            from: "1",
            to: "3",
            dur: "1s"
        })
        sizeAnimation(eyeball.right, {
            attributeName: "rx",
            from: "1",
            to: "3",
            dur: "1s"
        },
        {
            attributeName: "rx",
            from: "1",
            to: "3",
            dur: "1s"
        })
        sizeAnimation(brow.left, {
            attributeName: "width",
            from: "6",
            to: "1",
            dur: "1s"
        },
        {
            attributeName: "width",
            from: "1",
            to: "6",
            dur: "1s"
        })
        sizeAnimation(brow.right, {
            attributeName: "width",
            from: "6",
            to: "1",
            dur: "1s"
        },
        {
            attributeName: "width",
            from: "1",
            to: "6",
            dur: "1s"
        })
    }
}



// Color 
function Color() {
    effect = function() {
        moveAnimation(eye.left, {
            attributeName: "fill",
            values : "red; orange; yellow; green; blue; indigo; violet; red",
            repeatCount: "indefinite",
            dur: "5s"   
        })
        moveAnimation(eye.right, {
            attributeName: "fill",
            values : "red; orange; yellow; green; blue; indigo; violet; red",
            repeatCount: "indefinite",
            dur: "5s"   
        })
        moveAnimation(eyeball.left, {
            attributeName: "fill",
            values : "red; orange; yellow; green; blue; indigo; violet; red",
            repeatCount: "indefinite",
            dur: "5s"   
        })
        moveAnimation(eyeball.right, {
            attributeName: "fill",
            values : "red; orange; yellow; green; blue; indigo; violet; red",
            repeatCount: "indefinite",
            dur: "5s"   
        })
        moveAnimation(brow.left, {
            attributeName: "fill",
            values : "red; orange; yellow; green; blue; indigo; violet; red",
            repeatCount: "indefinite",
            dur: "5s"   
        })
        moveAnimation(brow.right, {
            attributeName: "fill",
            values : "red; orange; yellow; green; blue; indigo; violet; red",
            repeatCount: "indefinite",
            dur: "5s"   
        })
    }
}



// Border 
function Border() {
    effect = function() {
        moveAnimation(eye.left, {
            attributeName: "stroke-width",
            from: "1",
            to: "4",
            dur: "5s",
            repeatCount: "indefinite",
        })
        moveAnimation(eye.right, {
            attributeName: "stroke-width",
            from: "1",
            to: "4",
            dur: "5s",
            repeatCount: "indefinite",  
        })
        moveAnimation(eyeball.left, {
            attributeName: "stroke-width",
            from: "0.25",
            to: "2",
            dur: "5s",
            repeatCount: "indefinite",  
        })
        moveAnimation(eyeball.right, {
            attributeName: "stroke-width",
            from: "0.25",
            to: "2",
            dur: "5s",
            repeatCount: "indefinite",   
        })
        moveAnimation(brow.left, {
            attributeName: "stroke-width",
            from: "0.25",
            to: "2",
            dur: "5s",
            repeatCount: "indefinite",
        })
        moveAnimation(brow.right, {
            attributeName: "stroke-width",
            from: "0.25",
            to: "2",
            dur: "5s",
            repeatCount: "indefinite",  
        })
    }
}

// Scale
function Scale() {
    effect = function() {
        rotateAnimation(document.getElementById("ghost"), {
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

function Animate() { window.effect() }

function XML() {
    var displayBox = document.getElementById('editor');
    displayBox.textContent = document.getElementById("svg-wrapper").innerHTML;
}

function Download(svgEl, name) {
    saveSvg(svg, "mysvgfile.svg")
}

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

window.addEventListener("load", function () { })