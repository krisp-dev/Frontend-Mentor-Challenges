let faqButtons = document.getElementsByClassName('FAQ-item__button');

for (let i = 0; i < faqButtons.length; i++) {
    faqButtons[i].addEventListener('click', function() {
        this.classList.toggle('active');

        let faqContent = this.nextElementSibling;

        if (faqContent.style.maxHeight) {
            faqContent.style.maxHeight = null;
        }
        else {
            faqContent.style.maxHeight = faqContent.scrollHeight + "px";
        }
    });
}