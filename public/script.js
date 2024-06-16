

function typeOut () {
    const titles = ["Software Developer.","Data-Analyst.", "Tutor."];
    const typeOut_element = document.querySelector(".type-out");
    const typingSpeed = 240; 
    const deletingSpeed = 200; 

    let currentTextIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText;

    function typer() {

        currentText = titles[currentTextIndex];

        if (isDeleting) {
            typeOut_element.textContent = currentText.substring(0, charIndex - 1);
            charIndex --;
            
            if (charIndex === 0) {
                isDeleting = false;
                currentTextIndex = ((currentTextIndex + 1) % titles.length);
                setTimeout(typer, 860);
                return
            }
        } else {
            typeOut_element.textContent = currentText.substring(0, charIndex + 1);
            charIndex ++;

            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(typer, 2000);
                return;
            }
        }

        setTimeout(typer, isDeleting ? deletingSpeed : typingSpeed);
    }
    typer();                
}
document.addEventListener("DOMContentLoaded", () => {typeOut()});
