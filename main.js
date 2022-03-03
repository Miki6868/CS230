
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

function moveAnimation() {

}

function rotateAnimation(target, options1, options2, reverse=true) {

    const animate_forward = document.createElementNS('http://www.w3.org/2000/svg','animateTransform');
    animate_forward.setAttribute("id","one");
    animate_forward.setAttribute("attributeName","transform");
    animate_forward.setAttribute("attributeType","XML");
    animate_forward.setAttribute("type","rotate");
    animate_forward.setAttribute("begin","0s;two.end");

    const animate_backward = document.createElementNS('http://www.w3.org/2000/svg','animateTransform');
    animate_backward.setAttribute("id","two");
    animate_backward.setAttribute("attributeName","transform");
    animate_backward.setAttribute("attributeType","XML");
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

function sizeAnimation() {

}

window.addEventListener("load", function () {
    const left_eye = svg.getElementById("eyes")
    rotateAnimation(left_eye, {
        from: "0 45 40",
        to: "360 45 40",
        dur: "2s"
    },
    {
        from: "360 45 40",
        to: "0 45 40",
        dur: "2s"
    })
})
