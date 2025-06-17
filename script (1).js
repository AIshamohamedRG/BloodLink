document.addEventListener('DOMContentLoaded', function() {
    // Modal elements
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const heroSignupBtn = document.getElementById('heroSignupBtn');
    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');
    const closeButtons = document.querySelectorAll('.close');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const closeConfirmation = document.getElementById('closeConfirmation');

    // Form elements
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const requestForm = document.getElementById('requestForm');
    const requestsContainer = document.getElementById('requestsContainer');

    // Sample data for recent requests
    const sampleRequests = [
        {
            name: "Ahmed Mohamed",
            bloodType: "B+",
            hospital: "Cairo University Hospital",
            details: "Urgent need for B+ blood for surgery patient.",
            date: "2 hours ago"
        },
        {
            name: "Mona Ali",
            bloodType: "O-",
            hospital: "Ain Shams University Hospital",
            details: "Child with thalassemia needs regular transfusion.",
            date: "5 hours ago"
        },
        {
            name: "Youssef Hassan",
            bloodType: "AB+",
            hospital: "Alexandria Main University Hospital",
            details: "Emergency case after accident, need 3 units.",
            date: "1 day ago"
        }
    ];

    // Display sample requests
    function displayRequests() {
        requestsContainer.innerHTML = '';
        sampleRequests.forEach(request => {
            const requestCard = document.createElement('div');
            requestCard.className = 'request-card';
            requestCard.innerHTML = `
                <span class="blood-type">${request.bloodType}</span>
                <h3>${request.name}</h3>
                <p><strong>Hospital:</strong> ${request.hospital}</p>
                <p>${request.details}</p>
                <p class="date">${request.date}</p>
            `;
            requestsContainer.appendChild(requestCard);
        });
    }

    // Modal functions
    function openModal(modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Event listeners for modals
    loginBtn.addEventListener('click', () => openModal(loginModal));
    signupBtn.addEventListener('click', () => openModal(signupModal));
    heroSignupBtn.addEventListener('click', () => openModal(signupModal));
    showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(loginModal);
        openModal(signupModal);
    });
    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(signupModal);
        openModal(loginModal);
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === loginModal) closeModal(loginModal);
        if (e.target === signupModal) closeModal(signupModal);
    });

    // Form validation and submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const nationalId = document.getElementById('nationalId').value;
        const password = document.getElementById('password').value;
        
        // Basic validation
        if (!nationalId || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // Here you would typically send data to server
        console.log('Login attempt with:', { nationalId, password });
        closeModal(loginModal);
    });

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const nationalId = document.getElementById('signupNationalId').value;
        const fullName = document.getElementById('fullName').value;
        const bloodType = document.getElementById('bloodType').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validation
        if (!nationalId || !fullName || !bloodType || !email || !password || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        if (password.length < 8) {
            alert('Password must be at least 8 characters');
            return;
        }
        
        if (!email.includes('@')) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Here you would typically send data to server
        console.log('Registration data:', { nationalId, fullName, bloodType, email, password });
        
        closeModal(signupModal);
        confirmationMessage.style.display = 'block';
    });

    requestForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const bloodType = document.getElementById('requestBloodType').value;
        const hospital = document.getElementById('hospital').value;
        const details = document.getElementById('requestDetails').value;
        
        if (!bloodType || !hospital) {
            alert('Please select blood type and hospital');
            return;
        }
        
        // Here you would typically send data to server
        console.log('Blood request:', { bloodType, hospital, details });
        
        // Add to recent requests (in a real app, this would come from server)
        const newRequest = {
            name: "You",
            bloodType: bloodType,
            hospital: hospital,
            details: details || "No additional details provided.",
            date: "Just now"
        };
        
        sampleRequests.unshift(newRequest);
        displayRequests();
        requestForm.reset();
    });

    // Close confirmation message
    closeConfirmation.addEventListener('click', function() {
        confirmationMessage.style.display = 'none';
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Initialize the page
    displayRequests();
});
// في جزء event listeners
const findHospitalBtn = document.getElementById('findHospitalBtn');
const donationModal = document.getElementById('donationModal');
const donationForm = document.getElementById('donationForm');

findHospitalBtn.addEventListener('click', () => {
    openModal(donationModal);
});

donationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nationalId = document.getElementById('donorNationalId').value;
    const hospital = document.getElementById('donationHospital').value;
    const date = document.getElementById('donationDate').value;
    const time = document.getElementById('donationTime').value;
    
    if (!nationalId || !hospital || !date || !time) {
        alert('Please fill in all fields');
        return;
    }
    
    console.log('Donation scheduled:', { nationalId, hospital, date, time });
    alert('Thank you! Your donation appointment has been scheduled.');
    closeModal(donationModal);
});
document.getElementById('donateLink').addEventListener('click', () => {
    openModal(donationModal);
});