
class ADDCARD {
    constructor(content, basked) {
        this.content = content;
        this.basked = basked;

        this.stores();
        this.baskedFN();
    }

    gemerateId() {
        return Math.random().toString(16).substr(2, 9);
    }

    stores() {
        this.card = [
            {
                whatProduct: "desktop",
                title: "Apple Imac",
                id: this.gemerateId(),
                imagesSCR: "https://cdn.pixabay.com/photo/2017/07/11/11/54/imac-2493287_960_720.png",
                cost: 2299,
            },
            {
                whatProduct: "laptop",
                title: "MackBook",
                id: this.gemerateId(),
                imagesSCR: "https://cdn.pixabay.com/photo/2014/05/02/21/50/home-office-336378_960_720.jpg",
                cost: 1999,
            },
            {
                whatProduct: "ipad",
                title: "Ipad",
                id: this.gemerateId(),
                imagesSCR: "https://cdn.pixabay.com/photo/2015/01/15/18/17/ipad-600642_960_720.jpg",
                cost: 559,
            },
            {
                whatProduct: "iphone",
                title: "Iphone 6",
                id: this.gemerateId(),
                imagesSCR: "https://cdn.pixabay.com/photo/2014/09/23/21/23/iphone-6-458159_960_720.jpg",
                cost: 399,
            }
        ];
    }

    baskedFN() {
        this.basketStores = [];
    }

    baskedCardDeleted(id) {
        const cloneBasked = [...this.basketStores];
        this.basketStores = cloneBasked.filter(elem => elem.id != id);
        
    }

    appendDom() {
        this.content.innerHTML = ''
        this.card.forEach(elem => {
            const contentCard = document.createElement("div");
            contentCard.className = "card-item";
            contentCard.dataset.id = elem.id;

            const contentInside = `
            <div class="card-images">
                <img class="images-card"
                    src="${elem.imagesSCR}"
                        alt="">
            <div class="shop-icon">
                <span class="uk-icon uk-icon-image"
                    style="background-image: url('https://pngimg.com/uploads/shopping_cart/shopping_cart_PNG64.png');"></span>
            </div>
            </img>
            </div>
                <div class="card-text">
                    <span class="product-name">${elem.title}</span>
                    <span class="product-cost"><span>$</span>${elem.cost.toLocaleString("en")}</span>
            </div>
            `
            contentCard.innerHTML = contentInside;

            this.content.appendChild(contentCard);
        });
    }

    pushStores(id) {
        if (this.basketStores.length > 0) {
            for (let i = 0; i < this.basketStores.length; i++) {
                if (this.basketStores[i].id === id) return
            }
            this.card.filter(elem => {
                if (elem.id === id) {
                    elem.productLength = 1;
                    this.basketStores.push(elem);
                    this.totalCost();
                }
            });
        } else {
            this.card.filter(elem => {
                if (elem.id === id) {
                    elem.productLength = 1;
                    this.basketStores.push(elem);
                    this.totalCost();
                }
            });
        }
    }

    totalCost() {
        const costNumberBlock = document.querySelector(".total-number");
        let allTotal = 0;

        this.basketStores.forEach(elem => {
            allTotal = allTotal + (elem.productLength * elem.cost);
        });

        allTotal = `$${allTotal.toLocaleString("en")}`;

        document.querySelector(".item-light").innerText = this.basketStores.length;
        document.querySelector(".total-shop").innerText = allTotal;
        costNumberBlock.innerText = allTotal;
    }

    appendBasked() {
        if (this.basketStores.length < 0) return;
        this.basked.innerHTML = '';
        this.basketStores.forEach(elem => {

            const cardItemBasket = document.createElement("div");
            cardItemBasket.classList = "card-item_basket";
            cardItemBasket.dataset.basketId = elem.id;

            const basketCardItem = `
                <div class="product-images_basket">
                    <img class="images-basket_card" src="${elem.imagesSCR}" alt="" srcset="">
                </div>
                <div class="product-title_basket">
                    <span class="card-title_basket">${elem.title}</span>
                    <span class="card-cost_basket"><span>$</span>${elem.cost.toLocaleString("en")}</span>
                </div>
                <div class="input-block">
                    <input min="1" max="100" type="number" id="product-length" value="${elem.productLength}">
                </div>
                <div class="deleted-btn_basket">
                    <span uk-icon="icon: trash; ratio: 1.2"></span>
                </div>
                `
            cardItemBasket.innerHTML = basketCardItem;

            this.basked.appendChild(cardItemBasket);

            const DeletedBtn = document.querySelectorAll(".deleted-btn_basket");

            DeletedBtn.forEach(button => {
                button.addEventListener("click", e => {
                    e.preventDefault();
                    addcard.baskedCardDeleted(button.parentNode.getAttribute("data-basket-id"));
                    addcard.appendBasked();
                    addcard.totalCost();
                });
                const productLengthinpAll = document.querySelectorAll("#product-length");
                productLengthinpAll.forEach(inp => {
                    inp.addEventListener("change", e => {
                        e.preventDefault();
                        this.changeProductLength(inp.value,inp.parentNode.parentNode.getAttribute("data-basket-id"))
                    });
                });
            });

        });
    }


    filteretCard(str) {
        this.card.forEach(elem => {
            if (elem.whatProduct == str.toLowerCase()) {
                const contentCard = document.createElement("div");
                contentCard.className = "card-item";
                contentCard.dataset.id = elem.id;

                const contentInside = `
                <div class="card-images">
                    <img class="images-card"
                        src="${elem.imagesSCR}"
                            alt="">
                <div class="shop-icon">
                    <span class="uk-icon uk-icon-image"
                        style="background-image: url('https://pngimg.com/uploads/shopping_cart/shopping_cart_PNG64.png');"></span>
                </div>
                </img>
                </div>
                    <div class="card-text">
                        <span class="product-name">${elem.title}</span>
                        <span class="product-cost"><span>$</span>${elem.cost.toLocaleString("en")}</span>
                </div>
                `
                contentCard.innerHTML = contentInside;

                this.content.innerHTML = ''

                this.content.appendChild(contentCard);
            }
        });
    }


    addingBaskets() {
        const shopBtn = document.querySelectorAll(".shop-icon");

        shopBtn.forEach(button => {
            button.addEventListener("click", () => {
                this.pushStores(button.parentNode.parentNode.getAttribute("data-id"));
                this.appendBasked();

                const productLengthinpAll = document.querySelectorAll("#product-length");
                productLengthinpAll.forEach(inp => {
                    inp.addEventListener("change", e => {
                        e.preventDefault();
                        this.changeProductLength(inp.value,inp.parentNode.parentNode.getAttribute("data-basket-id"))
                    });
                });

                const DeletedBtn = document.querySelectorAll(".deleted-btn_basket");

                DeletedBtn.forEach(button => {
                    button.addEventListener("click", e => {
                        e.preventDefault();
                        this.baskedCardDeleted(button.parentNode.getAttribute("data-basket-id"));
                        this.appendBasked();
                        this.totalCost();
                    });
                });
            });
        });
    }

    changeProductLength(value, id) {
        this.basketStores.filter(elem => {
            if(elem.id === id){
                elem.productLength = parseFloat(value);
                this.totalCost();
            }
        });
    }
}





const addCardContent = document.querySelector("#content-product");
const baskeds = document.querySelector(".item-flex");
const clearBasket = document.querySelector(".basket-clear_btn");


const addcard = new ADDCARD(addCardContent, baskeds);

window.addEventListener("onload", addcard.appendDom(), addcard.addingBaskets());

clearBasket.addEventListener("click", () => {
    addcard.baskedFN();
    addcard.totalCost();
    addcard.appendBasked();
});


const allBtn = document.querySelectorAll(".card-menu_btn");

allBtn.forEach(button => {
    button.addEventListener("click", e => {
        e.preventDefault();
        if (button.innerText != "All") {
            document.querySelector(".activeMenuBtn").classList.remove("activeMenuBtn");
            button.classList.add("activeMenuBtn");
            addcard.filteretCard(button.innerText, button);
            addcard.addingBaskets();
        } else {
            document.querySelector(".activeMenuBtn").classList.remove("activeMenuBtn");
            button.classList.add("activeMenuBtn");
            addcard.appendDom();
            addcard.addingBaskets()
        }
    });
});


document.querySelector("#searchInp").oninput = function () {
    const inpval = this.value.trim().toLowerCase();
    const allProductName = document.querySelectorAll(".product-name");

    if (inpval != '') {
        allProductName.forEach(elem => {
            if (elem.innerText.toLowerCase().search(inpval) == -1) {
                elem.parentNode.parentNode.classList.add("hiddenCard");
            } else {
                elem.parentNode.parentNode.classList.remove("hiddenCard");
            }
        })
    } else {
        allProductName.forEach(elem => {
            elem.parentNode.parentNode.classList.remove("hiddenCard");
        })
    }
}