const textbox = document.getElementById('tbox');

let insetValue = 100;
function progressiveUncrop() {
    if (insetValue > 0) {
        insetValue -= 5;

        image.style.clipPath = `inset(0% ${insetValue}% 0% 0%)`;

        setTimeout(progressiveUncrop, 50);
    }
}

let i = 0;
let text = "IN 2019 ======== LOST ACCESS TO ALL THEIR DATA AND A TEAM OF HACKERS SENT THEM A RANSOM"
let cursor = true;
function typeWrite() {
    if (i < text.length) {
        if (text.charAt(i) == "=") {
            const span = document.createElement('span');
            span.textContent = text.charAt(i);
            span.id = 'hide';
            textbox.appendChild(span);  

        }   else if (cursor) {
            console.log("1");
            textbox.innerHTML += "▮";
            cursor = false;
            setTimeout(typeWrite, 10);
            return;

        } else {
            console.log("0");

            textbox.innerHTML = textbox.innerHTML.slice(0, -1);
            textbox.innerHTML += text.charAt(i);
            cursor = true;

        }
        if (i == 7) {
            const image = document.createElement('img');
            image.id = 'image';
            image.src = "./brush.png";
            image.alt = "Image";
            textbox.appendChild(image);
            progressiveUncrop();
        }
        i++;    
        setTimeout(typeWrite, 100);
    }
}

function animate() {
    textbox.innerHTML = ""
    i = 0;
    insetValue = 100;


    typeWrite();
    

    setTimeout(function() {
        // Schedule the next frame after the delay
        requestAnimationFrame(animate);
        console.log("time");
    }, 50000);
}


window.onload = animate;  