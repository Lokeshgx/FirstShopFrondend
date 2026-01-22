document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('images');
    const imagePreview = document.querySelector('.image-preview');

    // Handle image preview
    let selectedFile = null;
    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0]; // Get only the first file
        
        // Clear preview
        imagePreview.innerHTML = '';
        
        if (file && file.type.startsWith('image/')) {
            selectedFile = file;
            const previewContainer = document.createElement('div');
            previewContainer.className = 'preview-item';
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = file.name;
                
                // Add remove button
                const removeBtn = document.createElement('button');
                removeBtn.innerHTML = '×';
                removeBtn.className = 'remove-image';
                removeBtn.onclick = function() {
                    selectedFile = null;
                    previewContainer.remove();
                    // Clear the file input
                    imageInput.value = '';
                };
                
                previewContainer.appendChild(img);
                previewContainer.appendChild(removeBtn);
                imagePreview.appendChild(previewContainer);
            }
            reader.readAsDataURL(file);
        }
    });
});


// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
        const input = this.previousElementSibling;
        const icon = this.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});

// Profile picture preview
const profileInput = document.getElementById('profilePicture');
const previewContainer = document.querySelector('.preview-container');
const imagePreview = document.getElementById('imagePreview');
const uploadPlaceholder = document.querySelector('.upload-placeholder');

profileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            previewContainer.style.display = 'block';
            uploadPlaceholder.style.display = 'none';
        }
        reader.readAsDataURL(file);
    }
});

document.querySelector('.remove-image').addEventListener('click', function() {
    profileInput.value = '';
    previewContainer.style.display = 'none';
    uploadPlaceholder.style.display = 'flex';
});

// Form validation
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Add your form submission logic here
    console.log('Form submitted successfully');
});