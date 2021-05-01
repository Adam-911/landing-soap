    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelectorAll('.modal');
    let activeOverlay = undefined;

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        const el = document.getElementById(activeOverlay.id);
        el.classList.add('hide');
        el.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal(btn) {
        const id = Number(btn.target.id) + 100;
        activeOverlay = document.getElementById(id);
        activeOverlay.classList.add('show');
        activeOverlay.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }

    modal.forEach(mod => {
        mod.addEventListener('click', (e) => {
            console.log("el");
            console.log(e);
            if (e.target === modal || e.target.getAttribute('data-close') == "") {
                closeModal();
            }
        });
    });

    class Product {
        constructor(childId, img, subSrc, alt, title, descr, price, parentSelector, ...classes) {
            this.childId = childId;
            this.img = img;
            this.subSrc = subSrc;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.price = price
        }

        render() {
            const element = document.createElement('div');
            element.id = this.childId;

            if (this.classes.length === 0) {
                this.classes = "modal";
                element.classList.add(this.classes);
            }

            element.innerHTML = `
                <div class="modal__dialog">
                    <div class="modal__content">
                        <form action="#">
                            <div data-close class="modal__close" onClick="closeModal()">&times;</div>
                            <div class="modal__preview">
                                <img src=${this.img} alt="">
                                <div class="modal__preview_title">${this.title}</div>
                                <div class="modal__preview_descr">${this.descr}</div>
                                <div class="modal__preview_text">${this.price}</div>
                            </div>
                            <div class="modal__order">
                                <div class="modal__order_title">Заказать можно здесь:</div>
                                <a href="#">
                                    <img src="icons/inst_modal.svg" alt="" class="modal__order_img">
                                </a>
                                <div class="modal__order_subtitle">или
                                    оставить заявку:</div>
                                <input required placeholder="Ваше имя" name="name" type="text" class="modal__order_input">
                                <input required placeholder="Ваш номер телефона" name="phone" type="phone" class="modal__order_input">
                                <button class="modal__order_btn">Отправить</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
        return await res.json();
    };

    getResource('http://localhost/db.json')
        .then(data => {
            data = data.product
            data.forEach(({childId, img, subSrc, altimg, title, descr, price}) => {
                new Product(childId, img, subSrc, altimg, title, descr, price, '.catalog-modal').render();
            });
    });

/*     $('form').submit(function(e) {
        console.log("GOTOVO");
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            // $(this).find("input").val("");
            // $('#consultation, #order').fadeOut();
            // $('.overlay, #thanks').fadeIn('slow');
  
            $('form').trigger('reset');
        });
        return false;
    });
    const modalform = document.querySelectorAll('form');
    console.log(modalform); */

