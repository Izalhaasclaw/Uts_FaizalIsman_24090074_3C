// Data untuk aplikasi
const summary = {
    totalProducts: 120,
    totalSales: 85,
    totalRevenue: 12500000
};

const products = [
    { id: 1, name: "Kopi Robusta Gayo", price: 25000, stock: 50 },
    { id: 2, name: "Kopi Robusta Ijen", price: 18000, stock: 30 },
    { id: 3, name: "Kopi Robusta Toraja Sapan", price: 30000, stock: 20 }
];

// Fungsi untuk halaman login
document.addEventListener('DOMContentLoaded', function() {
    // Cek apakah kita berada di halaman login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim(); // Tambahkan .trim() untuk membersihkan spasi
            const password = document.getElementById('password').value.trim(); // Tambahkan .trim() untuk membersihkan spasi
            
            // Definisikan kredensial yang benar
            const CORRECT_EMAIL = 'isman.faizal2006@gmail.com';
            const CORRECT_PASSWORD = '24090074';
            
            // Validasi form (tidak boleh kosong)
            if (!email || !password) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Email dan password tidak boleh kosong!',
                    confirmButtonColor: '#96631cff'
                });
                return;
            }
                 
            if (email === CORRECT_EMAIL && password === CORRECT_PASSWORD) {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Berhasil!',
                    text: 'Anda akan diarahkan ke dashboard',
                    confirmButtonColor: '#96631cff',
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    window.location.href = "dashboard.html";
                });
            } else {
                // Login Gagal
                Swal.fire({
                    icon: 'error',
                    title: 'Login Gagal',
                    text: 'Email atau Password salah!',
                    confirmButtonColor: '#96631cff'
                });
            }
            
            // Catatan: Validasi format email yang lama dihilangkan 
            // karena Anda menetapkan nilai email yang spesifik ('email').
        });
        
        // Event untuk tombol login Google
        document.querySelector('.btn-google').addEventListener('click', function() {
            Swal.fire({
                title: 'Login dengan Google',
                text: 'Fitur ini akan diimplementasikan nanti',
                icon: 'info',
                confirmButtonColor: '#96631cff'
            });
        });
        
        // Event untuk tombol login Facebook
        document.querySelector('.btn-facebook').addEventListener('click', function() {
            Swal.fire({
                title: 'Login dengan Facebook',
                text: 'Fitur ini akan diimplementasikan nanti',
                icon: 'info',
                confirmButtonColor: '#96631cff'
            });
        });
    }
    
    // Cek apakah kita berada di halaman dashboard
    const totalProductsEl = document.getElementById('totalProducts');
    if (totalProductsEl) {
        // Update data summary di dashboard
        document.getElementById('totalProducts').textContent = summary.totalProducts;
        document.getElementById('totalSales').textContent = summary.totalSales;
        document.getElementById('totalRevenue').textContent = formatCurrency(summary.totalRevenue);
    }
    
    // Cek apakah kita berada di halaman products
    const productTableBody = document.getElementById('productTableBody');
    if (productTableBody) {
        renderProductTable();
    }
    
    // Event untuk logout
    const logoutLinks = document.querySelectorAll('#logoutLink');
    logoutLinks.forEach(link => {
        if (link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                Swal.fire({
                    title: 'Konfirmasi Logout',
                    text: 'Apakah Anda yakin ingin logout?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#96631cff',
                    cancelButtonColor: '#e74c3c',
                    confirmButtonText: 'Ya, Logout',
                    cancelButtonText: 'Batal'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Logout Berhasil',
                            text: 'Anda telah logout dari sistem',
                            confirmButtonColor: '#96631cff',
                            timer: 1500,
                            showConfirmButton: false
                        }).then(() => {
                            window.location.href = "index.html";
                        });
                    }
                });
            });
        }
    });
});

// Fungsi untuk merender tabel produk
function renderProductTable() {
    const productTableBody = document.getElementById('productTableBody');
    productTableBody.innerHTML = '';
    
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        
        // Tentukan ikon berdasarkan stok
        let stockIcon = '';
        let stockClass = '';
        if (product.stock >= 30) {
            stockIcon = '</i>';
            stockClass = 'text-green-500';
        } else {
            stockIcon = '</i>';
            stockClass = 'text-orange-500';
        }
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>${formatCurrency(product.price)}</td>
            <td class="${stockClass}">${product.stock} ${stockIcon}</td>
            <td>
                <button class="btn-edit" onclick="editProduct(${product.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-delete" onclick="deleteProduct(${product.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        `;
        
        productTableBody.appendChild(row);
    });
}

// Fungsi untuk mengedit produk
function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        Swal.fire({
            title: 'Edit Produk',
            html: `
                <input type="text" id="editName" class="swal2-input" placeholder="Nama Produk" value="${product.name}">
                <input type="number" id="editPrice" class="swal2-input" placeholder="Harga" value="${product.price}">
                <input type="number" id="editStock" class="swal2-input" placeholder="Stok" value="${product.stock}">
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Simpan',
            cancelButtonText: 'Batal',
            confirmButtonColor: '#96631cff',
            preConfirm: () => {
                const name = document.getElementById('editName').value;
                const price = document.getElementById('editPrice').value;
                const stock = document.getElementById('editStock').value;
                
                if (!name || !price || !stock) {
                    Swal.showValidationMessage('Semua field harus diisi');
                }
                
                return { name, price, stock };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Update produk
                product.name = result.value.name;
                product.price = parseInt(result.value.price);
                product.stock = parseInt(result.value.stock);
                
                // Render ulang tabel
                renderProductTable();
                
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Data produk berhasil diupdate',
                    confirmButtonColor: '#96631cff'
                });
            }
        });
    }
}

// Fungsi untuk menghapus produk
function deleteProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        Swal.fire({
            title: 'Konfirmasi Hapus',
            text: `Yakin hapus produk ${product.name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e74c3c',
            cancelButtonColor: '#96631cff',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                // Hapus produk dari array
                const productIndex = products.findIndex(p => p.id === productId);
                if (productIndex !== -1) {
                    products.splice(productIndex, 1);
                    // Render ulang tabel
                    renderProductTable();
                    
                    Swal.fire({
                        icon: 'success',
                        title: 'Terhapus!',
                        text: 'Produk berhasil dihapus',
                        confirmButtonColor: '#96631cff'
                    });
                }
            }
        });
    }
}

// Fungsi untuk memformat mata uang
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}