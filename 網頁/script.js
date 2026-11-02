const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');

if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? '開啟導覽選單' : '關閉導覽選單');
        primaryNav.classList.toggle('is-open', !isOpen);
    });

    primaryNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', '開啟導覽選單');
            primaryNav.classList.remove('is-open');
        });
    });
}

document.querySelectorAll('.work-carousel').forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const paginationButtons = Array.from(carousel.querySelectorAll('.carousel-pagination button'));
    const count = carousel.querySelector('.carousel-count');
    let activeIndex = 0;

    function showSlide(index) {
        activeIndex = (index + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === activeIndex;
            slide.hidden = !isActive;
            slide.classList.toggle('is-active', isActive);
        });
        paginationButtons.forEach((button, buttonIndex) => {
            const isActive = buttonIndex === activeIndex;
            button.classList.toggle('is-active', isActive);
            if (isActive) {
                button.setAttribute('aria-current', 'true');
            } else {
                button.removeAttribute('aria-current');
            }
        });
        count.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    }

    carousel.querySelector('.carousel-previous').addEventListener('click', () => showSlide(activeIndex - 1));
    carousel.querySelector('.carousel-next').addEventListener('click', () => showSlide(activeIndex + 1));
    paginationButtons.forEach((button, index) => {
        button.addEventListener('click', () => showSlide(index));
    });
});

const bookDialog = document.querySelector('#book-dialog');

if (bookDialog instanceof HTMLDialogElement) {
    const dialogTitle = bookDialog.querySelector('#book-dialog-title');
    const dialogCategory = bookDialog.querySelector('.book-dialog-category');
    const dialogSummary = bookDialog.querySelector('.book-dialog-summary');
    const dialogCover = bookDialog.querySelector('.book-dialog-cover');

    document.querySelectorAll('.book-open').forEach((button) => {
        button.addEventListener('click', () => {
            const cover = button.querySelector('.book-cover img');
            dialogTitle.textContent = button.dataset.bookTitle;
            dialogCategory.textContent = button.dataset.bookCategory;
            dialogSummary.textContent = button.dataset.bookSummary;
            dialogCover.src = cover.src;
            dialogCover.alt = cover.alt;
            bookDialog.showModal();
        });
    });

    bookDialog.querySelector('.book-dialog-close').addEventListener('click', () => bookDialog.close());
    bookDialog.addEventListener('click', (event) => {
        if (event.target === bookDialog) bookDialog.close();
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && bookDialog.open) bookDialog.close();
    });
}
