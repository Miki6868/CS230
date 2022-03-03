
// SLIDERS
const slider = {
    up_down: document.getElementById("updown"),
    left_right: document.getElementById("leftright"),
    size: document.getElementById("size")
}

// RADIOS
const radio = {
    eye: document.getElementById("eyeradio"),
    eyeball: document.getElementById("eyeballradio"),
    brow: document.getElementById("browradio")
}

// BUTTONS
const button = {
    animate: document.getElementById("animate-btn"),
    xml: document.getElementById("xml-btn"),
    download: document.getElementById("download-btn")
}

// SVG Objects
const svg = document.getElementById('fuckingsvg')

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




// ANIMATIONS
function UpDownAnimation(targets, value) {

}

function LeftRightAnimation(targets, value) {

} 

function Rotate(targets, value) {

}

function ZoomAnimation(targets, value) {

}

function DiagonalAnimation(targets, value) {

}

function ColorAnimation(targets, value) {
    
}

// border radius
// border style dashed solid







window.addEventListener("load", function () {
    const eyel = svg.getElementById("eye-l-ball")
    // moveAnimation(eyel, {
    //     from: "40",
    //     to: "90",
    //     dur: "2s"
    // },
    // {
    //     from: "90",
    //     to: "40",
    //     dur: "2s"
    // })
    sizeAnimation(eyel, {
        attributeName: "rx",
        from: "6",
        to: "2",
        dur: "1s"
    },
    {
        attributeName: "rx",
        from: "2",
        to: "6",
        dur: "1s"
    })

    const eyer = svg.getElementById("eye-r-ball")
    // moveAnimation(eyer, {
    //     attributeName: "cx",
    //     from: "45",
    //     to: "60",
    //     dur: "2s"
    // },
    // {
    //     attributeName: "cx",
    //     from: "60",
    //     to: "45",
    //     dur: "2s"
    // })
    // rotateAnimation(eyel, {
    //     from: "0 45 40",
    //     to: "360 45 40",
    //     dur: "2s"
    // },
    // {
    //     from: "360 45 40",
    //     to: "0 45 40",
    //     dur: "2s"
    // })
})
