document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.tab-btn');
    const cakeCards = document.querySelectorAll('.cake-card');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filterValue = button.getAttribute('data-filter');
            cakeCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95) translateY(10px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1) translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    const modal = document.getElementById('order-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const openModalBtns = document.querySelectorAll('.open-order-modal-btn, #order-btn');
    const selectCakeBtns = document.querySelectorAll('.btn-select-cake');
    const cakeTypeSelect = document.getElementById('order-cake-type');
    const openModal = () => {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    };
    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    };
    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            cakeTypeSelect.value = "";
            openModal();
        });
    });
    selectCakeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const cakeName = btn.getAttribute('data-cake');
            let matchFound = false;
            for (let i = 0; i < cakeTypeSelect.options.length; i++) {
                if (cakeTypeSelect.options[i].value === cakeName) {
                    cakeTypeSelect.selectedIndex = i;
                    matchFound = true;
                    break;
                }
            }
            if (!matchFound) {
                cakeTypeSelect.value = "Custom Design";
            }
            openModal();
        });
    });
    closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    const orderForm = document.getElementById('whatsapp-order-form');
    const PHONE_NUMBER = '917558114087';
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('order-name').value.trim();
        const cakeType = document.getElementById('order-cake-type').value;
        const flavor = document.getElementById('order-flavor').value.trim() || 'Not specified';
        const size = document.getElementById('order-size').value;
        const message = document.getElementById('order-message').value.trim() || 'None';
        const notes = document.getElementById('order-notes').value.trim() || 'None';
        const whatsappText =
            `🎂 *BHUVI HOME BAKERY - NEW CAKE INQUIRY* 🎂
Hello Rathidevi, I would like to place an order/inquiry for a custom cake!
*Order Details:*
👤 *Name:* ${name}
🍰 *Cake Style:* ${cakeType}
🍓 *Preferred Flavor:* ${flavor}
⚖️ *Size/Weight:* ${size}
✍️ *Writing on Cake:* "${message}"
✨ *Additional Requests & Notes:*
${notes}
Please let me know your availability and price estimate. Thank you!`;
        const encodedText = encodeURIComponent(whatsappText);
        const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodedText}`;
        window.open(whatsappUrl, '_blank');
        closeModal();
        orderForm.reset();
    });
    const viewMoreBtn = document.getElementById('view-more-btn');
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', () => {
            const timelineSection = document.getElementById('custom-order-section');
            if (timelineSection) {
                timelineSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});