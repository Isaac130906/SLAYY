const shopDomain = 'slayy-azsnh9c8.myshopify.com';
const storefrontAccessToken = '8fd660969b93213b75fceef287276ee4'; 
const apiUrl = `https://${shopDomain}/api/2024-01/graphql.json`;



const queryProduits = `
{
  products(first: 5) {
    edges {
      node {
        id
        title
        description
        variants(first: 1) {
          edges {
            node {
              price {
                amount
              }
            }
          }
        }
      }
    }
  }
}
`;


// Fonction pour récupérer les produits
function chargerProduitsShopify() {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': storefrontAccessToken
        },
        body: JSON.stringify({ query: queryProduits })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Magie ! Voici les données renvoyées par Shopify :", data);
        // C'est ici que l'on codera l'affichage dynamique plus tard
    })
    .catch(error => {
        console.error("Erreur de connexion à Shopify :", error);
    });
}

// On lance la fonction au chargement de la page
chargerProduitsShopify();

const header = document.querySelector('.header');

if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.height = '70px';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.height = '100px';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        }
    });
}

// ===== GESTION DU PANIER (AVEC MÉMOIRE) =====
let panierCount = localStorage.getItem('panierCount') ? parseInt(localStorage.getItem('panierCount')) : 0;
const compteurPanier = document.getElementById('compteur-panier');

if(compteurPanier) {
    compteurPanier.innerText = panierCount;
}

const btnAjouter = document.getElementById('btn-ajouter-panier');
if (btnAjouter) {
    const texteOriginal = btnAjouter.innerText; 
    
    btnAjouter.addEventListener('click', () => {
        panierCount++;
        localStorage.setItem('panierCount', panierCount);
        compteurPanier.innerText = panierCount;
        
        btnAjouter.innerText = "✓ AJOUTÉ AU PANIER";
        btnAjouter.style.backgroundColor = "#c9a7a0";
        btnAjouter.style.color = "#fff";
        
        setTimeout(() => {
            btnAjouter.innerText = texteOriginal;
            btnAjouter.style.backgroundColor = "";
        }, 2000);
    });
}

// ===== FILTRES DE LA BOUTIQUE =====
const categoryBtns = document.querySelectorAll('.category-btn');
const cartesShop = document.querySelectorAll('.shop-section .carte');

if (categoryBtns.length > 0 && cartesShop.length > 0) {
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filtre = btn.innerText.toLowerCase();

            cartesShop.forEach(carte => {
                const categorieCarte = carte.getAttribute('data-category');
                
                if (filtre === 'tous les articles' || categorieCarte === filtre) {
                    carte.style.display = 'block';
                } else {
                    carte.style.display = 'none';
                }
            });
        });
    });
}

// ===== BASE DE DONNÉES DES PRODUITS =====
const catalogueProduits = {
    "top-red": { nom: "Top \"HUNT\" RED", prix: "44,00€", image: "image/85-IMG_3562.jpg", desc: "Affirme ton style avec le Top HUNT Red. Fabriqué avec des matériaux premium pour épouser parfaitement tes formes." },
    "pant-red": { nom: "Pant \"HUNT\" RED", prix: "44,00€", image: "image/ChatGPT Image 30 juin 2026, 15_38_22.png", desc: "Complète ton ensemble avec le Pant HUNT Red. Confortable et ultra stylé, idéal de jour comme de nuit." },
    "top-olive": { nom: "Top \"HUNT\" OLIVE", prix: "44,00€", image: "image/chatgpt-30-06-1159.png", desc: "Le Top HUNT Olive, la touche streetwear chic. Sa couleur unique s'accorde avec tout pour un look sans effort." },
    "pant-olive": { nom: "Pant \"HUNT\" OLIVE", prix: "44,00€", image: "image/ChatGPT Image 30 juin 2026, 15_52_56.png", desc: "Le pantalon cargo revisité. Coupe parfaite et détails soignés pour la version Olive." },
    "top-purple": { nom: "Top \"HUNT\" PURPLE", prix: "44,00€", image: "image/chatgpt-30-06-1160.png", desc: "Ne passe pas inaperçue avec ce Violet profond. Le Top HUNT Purple apporte la touche de couleur parfaite." },
    "pant-purple": { nom: "Pant \"HUNT\" PURPLE", prix: "44,00€", image: "image/ChatGPT Image 30 juin 2026, 15_44_29.png", desc: "Ose le total look avec le Pant HUNT Purple. Une pièce forte pour les baddies audacieuses." },
    "top-grey": { nom: "Top \"TOYA\" GREY", prix: "44,00€", image: "image/chatgpt-30-06-1161.png", desc: "Le basique indispensable. Le Top TOYA Grey s'intègre facilement dans n'importe quelle rotation streetwear." },
    "pant-grey": { nom: "Pant \"TOYA\" GREY", prix: "44,00€", image: "image/ChatGPT Image 30 juin 2026, 16_02_04.png", desc: "Confort absolu et ligne épurée. Le Pant TOYA Grey est ton nouvel allié du quotidien." },
    "top-navy": { nom: "Top \"NAVY\" BLACK", prix: "44,00€", image: "image/21-IMG_2915.jpg", desc: "Élégance sombre. Un top structuré qui met en valeur la silhouette." },
    "pant-navy": { nom: "Pant \"NAVY\" BLACK", prix: "44,00€", image: "image/ChatGPT Image 30 juin 2026, 15_48_31.png", desc: "Le pantalon sombre ultime pour finaliser ton ensemble avec attitude." },
    "top-black": { nom: "Top \"TOYA\" BLACK", prix: "44,00€", image: "image/chatgpt-30-06-1158.png", desc: "Le noir classique, revisité coupe TOYA. Un must-have absolu dans toute garde-robe." },
    "pant-black": { nom: "Pant \"TOYA\" BLACK", prix: "44,00€", image: "image/ChatGPT Image 30 juin 2026, 16_31_23.png", desc: "Match parfait avec le Top TOYA Black. Matière premium pour une tenue impeccable." },
    "top-pink": { nom: "Top \"TOYA\" PINK", prix: "44,00€", image: "image/34-IMG_2956.jpg", desc: "Vibe Y2K assurée. Le Top TOYA Pink apporte une touche douce et percutante à la fois." },
    "pant-pink": { nom: "Pant \"TOYA\" PINK", prix: "44,00€", image: "image/ChatGPT Image 30 juin 2026, 16_39_41.png", desc: "L'ensemble Pink complet. Coupe flatteuse et confort garanti." },
    "duo": { nom: "SLAYY DUO", prix: "126,00€", image: "image/SlayyDuo.png", desc: "L'essentiel Baddie. Choisis ton combo parfait avec ce pack Duo incluant un haut et un bas de la collection SLAYY." },
    "trio": { nom: "SLAYY TRIO", prix: "165,00€", image: "image/SlayyTrio.png", desc: "La panoplie complète. 3 pièces incontournables pour un look baddie absolu." }
};

// ===== LOGIQUE DE LA PAGE PRODUIT DYNAMIQUE =====
const pageProduit = document.querySelector('.product-section');

if (pageProduit) {
    const parametresUrl = new URLSearchParams(window.location.search);
    const idDuProduit = parametresUrl.get('id');

    if (idDuProduit && catalogueProduits[idDuProduit]) {
        const produitAAfficher = catalogueProduits[idDuProduit];

        // 1. Mise à jour du Titre et de la Description
        const titleEl = document.querySelector('.product-title');
        if(titleEl) titleEl.innerText = produitAAfficher.nom;

        const descEl = document.querySelector('.product-desc');
        if(descEl) descEl.innerText = produitAAfficher.desc;
        
        // 2. Mise à jour de l'image
        const imageElement = document.querySelector('.product-image-wrapper img');
        if(imageElement) {
            imageElement.src = produitAAfficher.image;
            imageElement.alt = produitAAfficher.nom;
        }
        
        // 3. Mise à jour du Prix (Différent selon Produit classique ou Pack, sans fausse promo)
        const priceEl = document.querySelector('.product-price');
        const packPriceDisplay = document.querySelector('.pack-price-display'); 

        if (priceEl) {
            priceEl.innerText = produitAAfficher.prix;
        } else if (packPriceDisplay) {
            packPriceDisplay.innerText = produitAAfficher.prix;
        }

        // 4. LOGIQUE SPÉCIFIQUE : Ajouter une 3ème option pour le TRIO
        if (idDuProduit === 'trio') {
            const productInfo = document.querySelector('.product-info');
            const btnAjouter = document.getElementById('btn-ajouter-panier');
            
            if (productInfo && btnAjouter) {
                const boxTrio = document.createElement('div');
                boxTrio.className = 'pack-selection';
                boxTrio.innerHTML = `
                    <h4 class="pack-item-title">3. Choisis ton 3ème article</h4>
                    <div class="pack-color-selector">
                        <select>
                            <option value="">-- Article Supplémentaire --</option>
                            <option value="red">Top HUNT - RED</option>
                            <option value="olive">Pant HUNT - OLIVE</option>
                            <option value="black">Top TOYA - BLACK</option>
                            <option value="pink">Pant TOYA - PINK</option>
                        </select>
                    </div>
                    <div class="size-selector">
                        <div class="sizes">
                            <button class="size-btn">XS</button>
                            <button class="size-btn">S</button>
                            <button class="size-btn">M</button>
                            <button class="size-btn">L</button>
                        </div>
                    </div>
                `;
                productInfo.insertBefore(boxTrio, btnAjouter);
            }
        }
        
    } else {
        const titleEl = document.querySelector('.product-title');
        if(titleEl) titleEl.innerText = "PRODUIT INTROUVABLE";
        
        const priceEl = document.querySelector('.product-price');
        if(priceEl) priceEl.innerText = "";
        
        const packPriceEl = document.querySelector('.pack-price-display');
        if(packPriceEl) packPriceEl.innerText = "";
        
        const descEl = document.querySelector('.product-desc');
        if(descEl) descEl.innerText = "Désolé, ce vêtement ou ce pack n'existe pas ou n'est plus disponible.";
        
        const imageElement = document.querySelector('.product-image-wrapper img');
        if(imageElement) imageElement.style.display = "none";
        
        const addBtn = document.querySelector('.add-cart-btn');
        if(addBtn) addBtn.style.display = "none";
        
        const packSelections = document.querySelectorAll('.pack-selection');
        packSelections.forEach(box => box.style.display = "none");
        
        const sizeSelector = document.querySelector('.size-selector');
        if(sizeSelector) sizeSelector.style.display = "none";
    }
}
// ===== LIEN INSTAGRAM GLOBAL =====
const instagramLink = document.getElementById('instagram');
if (instagramLink) {
    instagramLink.href = "https://www.instagram.com/slayy.brand?stkn=OTlobzZ6Y2t0Z3d0";
    instagramLink.target = "_blank"; // Ouvre le lien dans un nouvel onglet pour ne pas quitter la boutique
}
// ===== GESTION DES FORMULAIRES DE COMPTE =====
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Bloque l'erreur 404
        alert("Connexion interceptée ! Le profil sera vérifié via Shopify.");
    });
}

if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Bloque l'erreur 404
        alert("Création de compte interceptée ! Le profil sera créé dans Shopify.");
    });
}