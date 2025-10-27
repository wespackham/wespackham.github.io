// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {

    // Get form element
    const formElement = document.querySelector('form');

    // Prevent default form submission
    formElement.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate required fields
        if (!validateForm()) {
            alert('Please fill out all required fields.');
            return;
        }

        // Generate and display the introduction page
        displayIntroduction();
    });

    // Clear button functionality
    const clearButton = document.getElementById('clear');
    clearButton.addEventListener('click', function() {
        const inputs = document.querySelectorAll('form input');
        inputs.forEach(input => {
            input.value = '';
        });

        // Clear the image
        const imageDiv = document.getElementById('loadImage');
        imageDiv.innerHTML = '<img src="" alt="No image loaded" style="max-width: 300px; margin-top: 10px;">';

        // Clear course list
        const courseList = document.getElementById('courseList');
        courseList.innerHTML = '';
    });

    // Initialize with default courses if needed
    initializeCourses();
});

// Function to validate form
function validateForm() {
    const requiredFields = [
        'firstName',
        'lastName',
        'acknowledgementStatement',
        'acknowledgementDate',
        'mascotAdjective',
        'mascotAnimal',
        'introImage',
        'imageCaption',
        'personalStatement',
        'personalBackground',
        'professionalBackground',
        'academicBackground',
        'primaryComputer',
        'quote',
        'quoteAuthor',
        'cltWeb',
        'github',
        'githubIo',
        'freeCodeCamp',
        'codecademy',
        'linkedIn'
    ];

    for (let fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (field && field.value.trim() === '') {
            return false;
        }
    }

    // Check if at least one course exists
    const courses = document.querySelectorAll('#courseList li');
    if (courses.length === 0) {
        alert('Please add at least one course.');
        return false;
    }

    return true;
}

// Function to load image
function loadImage() {
    const fileInput = document.getElementById('introImage');
    const imageDiv = document.getElementById('loadImage');

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            imageDiv.innerHTML = `<img src="${e.target.result}" alt="Uploaded profile" style="max-width: 300px; margin-top: 10px;">`;
        };

        reader.readAsDataURL(fileInput.files[0]);
    } else {
        alert('Please select an image file first.');
    }
}

// Function to add course
function addCourse() {
    const courseList = document.getElementById('courseList');
    const courseItem = document.createElement('li');
    courseItem.style.marginBottom = '15px';

    const courseId = 'course_' + Date.now();

    courseItem.innerHTML = `
        <div style="border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
            <label>Department: </label>
            <input type="text" class="courseDept" placeholder="e.g., ITIS" style="margin-right: 10px;">
            <label>Number: </label>
            <input type="text" class="courseNum" placeholder="e.g., 3135" style="margin-right: 10px;">
            <br><br>
            <label>Name: </label>
            <input type="text" class="courseName" placeholder="e.g., Web App Design" style="width: 300px; margin-right: 10px;">
            <br><br>
            <label>Reason: </label>
            <input type="text" class="courseReason" placeholder="Why are you taking this course?" style="width: 300px; margin-right: 10px;">
            <br><br>
            <button type="button" class="deleteCourse" style="background-color: #d9534f; color: white; padding: 5px 10px; border: none; border-radius: 3px; cursor: pointer;">Delete Course</button>
        </div>
    `;

    courseList.appendChild(courseItem);

    // Add delete functionality
    const deleteBtn = courseItem.querySelector('.deleteCourse');
    deleteBtn.addEventListener('click', function() {
        courseList.removeChild(courseItem);
    });
}

// Function to initialize courses from existing values
function initializeCourses() {
    // You can pre-populate with your courses here if needed
    // For now, it starts empty and user can add courses
}

// Function to display the introduction
function displayIntroduction() {
    const main = document.querySelector('main');

    // Gather all form data
    const firstName = document.getElementById('firstName').value;
    const middleName = document.getElementById('middleName').value;
    const lastName = document.getElementById('lastName').value;
    const preferredName = document.getElementById('preferredName').value;
    const acknowledgement = document.getElementById('acknowledgementStatement').value;
    const acknowledgementDate = document.getElementById('acknowledgementDate').value;
    const mascotAdj = document.getElementById('mascotAdjective').value;
    const mascotAnimal = document.getElementById('mascotAnimal').value;
    const divider = document.getElementById('divider').value;
    const imageCaption = document.getElementById('imageCaption').value;
    const personalStatement = document.getElementById('personalStatement').value;
    const personalBackground = document.getElementById('personalBackground').value;
    const professionalBackground = document.getElementById('professionalBackground').value;
    const academicBackground = document.getElementById('academicBackground').value;
    const primaryComputer = document.getElementById('primaryComputer').value;
    const quote = document.getElementById('quote').value;
    const quoteAuthor = document.getElementById('quoteAuthor').value;
    const funnyThing = document.getElementById('funnyThing').value;
    const shareThing = document.getElementById('shareThing').value;

    // Get links
    const cltWeb = document.getElementById('cltWeb').value;
    const github = document.getElementById('github').value;
    const githubIo = document.getElementById('githubIo').value;
    const freeCodeCamp = document.getElementById('freeCodeCamp').value;
    const codecademy = document.getElementById('codecademy').value;
    const linkedIn = document.getElementById('linkedIn').value;

    // Get image
    const imageSrc = document.querySelector('#loadImage img').src;

    // Get courses
    const courseItems = document.querySelectorAll('#courseList li');
    let coursesHTML = '';
    courseItems.forEach(item => {
        const dept = item.querySelector('.courseDept').value;
        const num = item.querySelector('.courseNum').value;
        const name = item.querySelector('.courseName').value;
        const reason = item.querySelector('.courseReason').value;

        if (dept && num && name) {
            coursesHTML += `   * <strong>${dept}-${num}</strong> - ${name} - ${reason}<br>`;
        }
    });

    // Build the introduction page following the exact format
    const middleInitial = middleName ? `${middleName.charAt(0)}.` : '';
    const fullName = middleInitial ? `${firstName} ${middleInitial} ${lastName}` : `${firstName} ${lastName}`;

    let introHTML = `
        <p style="text-align: center; font-style: italic;">${acknowledgement} ${acknowledgementDate}</p>
        
        <h2 style="text-align: center;"><strong>${fullName} ${divider} ${mascotAdj} ${mascotAnimal}</strong></h2>
        
        <figure style="text-align: center;">
            <img src="${imageSrc}" alt="Profile picture" style="max-width: 400px;">
            <figcaption><em>${imageCaption}</em></figcaption>
        </figure>
        
        <p>${personalStatement}</p>
        
        <ul style="list-style-type: disc;">
            <li><strong>Personal Background</strong> - ${personalBackground}</li>
            <li><strong>Professional Background</strong> - ${professionalBackground}</li>
            <li><strong>Academic Background</strong> - ${academicBackground}</li>
            <li><strong>Programming/ Software Background</strong> - ${primaryComputer}</li>
        </ul>
        
        <ul style="list-style-type: disc;">
            <li><strong>Courses I'm Taking, & Why:</strong><br>
            ${coursesHTML}
            </li>
        </ul>
    `;

    // Add optional fields if they exist
    if (funnyThing) {
        introHTML += `<ul style="list-style-type: disc;"><li><strong>Funny/Interesting Thing to Remember Me by</strong> - ${funnyThing}</li></ul>`;
    }

    if (shareThing) {
        introHTML += `<ul style="list-style-type: disc;"><li><strong>I'd also like to share</strong> - ${shareThing}</li></ul>`;
    }

    // Add quote
    introHTML += `
        <p style="text-align: center">"${quote}"<br>
        - <em>${quoteAuthor}</em></p>
    `;

    // Add links in horizontal format
    introHTML += `
        <p style="text-align: center;">
            <a href="${github}">GitHub</a> || 
            <a href="${githubIo}">GitHub.io</a> || 
            <a href="${cltWeb}">CLT Web</a> || 
            <a href="${freeCodeCamp}">freeCodeCamp</a> || 
            <a href="${codecademy}">Codecademy</a> || 
            <a href="${linkedIn}">LinkedIn</a>
        </p>
        
        <br>
        <p style="text-align: center;">
            <button type="button" id="resetIntro" style="padding: 10px 20px; background-color: #5cb85c; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">Reset Form</button>
        </p>
    `;

    // Replace form with introduction
    main.innerHTML = introHTML;

    // Add reset functionality
    document.getElementById('resetIntro').addEventListener('click', function() {
        location.reload();
    });
}