// Firebase Config (මෙතනට ඔයාගේ code එක දාන්න)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// දත්ත ගෙන ඒම සහ පෙන්වීම
db.ref('products').on('value', (snapshot) => {
    const data = snapshot.val();
    const grid = document.getElementById('product-grid');
    const adminGrid = document.getElementById('admin-product-grid');
    
    if(grid) grid.innerHTML = "";
    if(adminGrid) adminGrid.innerHTML = "";

    for (let id in data) {
        let p = data[id];
        let cardHTML = `
            <div class="card">
                <img src="${p.image}" alt="Dress">
                <h3>${p.name}</h3>
                <p class="price">රු. ${p.price}.00</p>
                <a href="https://wa.me/94771777601?text=මම මේ ඇඳුමට කැමතියි: ${p.name}" target="_blank" class="wa-btn">WhatsApp හරහා ඇණවුම් කරන්න</a>
            </div>
        `;

        if(grid) grid.innerHTML += cardHTML;
        
        // Admin Page එකේදී Delete button එකත් එක්ක පෙන්වන්න
        if(adminGrid) {
            adminGrid.innerHTML += `
                <div class="card">
                    <img src="${p.image}">
                    <h3>${p.name}</h3>
                    <button onclick="removeItem('${id}')" style="background:red; color:white; border:none; padding:10px; width:100%; border-radius:5px; cursor:pointer;">ඉවත් කරන්න (Delete)</button>
                </div>
            `;
        }
    }
});

// Admin Page එකේදී දත්ත Upload කරන Function එක
function uploadToFirebase() {
    const name = document.getElementById('itemName').value;
    const price = document.getElementById('itemPrice').value;
    const image = document.getElementById('itemImage').value;

    if(name && price) {
        db.ref('products').push({
            name: name,
            price: price,
            image: image || "https://via.placeholder.com/250"
        });
        alert("සාර්ථකයි!");
    }
}

function removeItem(id) {
    if(confirm("මකන්නද?")) db.ref('products/' + id).remove();
}
