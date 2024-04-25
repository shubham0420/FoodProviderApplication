// sticky nav
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 0) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

const menu = document.querySelector('.menu')
    const menuList = document.querySelector('nav ul')
    menu.addEventListener('click',()=>{
        menuList.classList.toggle('showmenu')
    })

// form submission

function submitForm() {
    // Retrieve input field values
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var mobile = document.getElementById("mobile").value.trim();
    var message = document.getElementById("message").value.trim();
    
    // Check if any field is empty
    if (name === "" || email === "" || mobile === "" || message === "") {
      alert("Please fill in all fields.");
      return;
    }
    
    // Validate email format
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    
    // Validate mobile number format
    var mobileRegex = /^\d{10}$/; // Assuming 10-digit mobile number
    if (!mobileRegex.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    
    // If all validations pass, display success message
    alert("Form submitted successfully!");
    clearFields();
  }

  function clearFields() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("message").value = "";
  }

 


// order checking whether login or not

// Retrieve the session state from the data attribute
var buyButtons = document.querySelectorAll(".buy");
  var loggedIn = document.getElementById("session-data").getAttribute("data-loggedin");

console.log(loggedIn)
  function orderNow() {
    if (loggedIn === "True") {
      alert("Order placed successfully!");
    } else {
      alert("You need to log in to place an order.");
      window.location.href = "/";
    }
  }

  buyButtons.forEach(function(button) {
    button.addEventListener("click", orderNow);
  });

  // testimonials
  var galleryTop = new Swiper('.js-testimonials-slider', {
    speed: 400,
    spaceBetween: 50,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    direction: 'horizontal',
    pagination: {
      clickable: true,
      el: '.swiper-pagination',
      type: 'bullets',
    },
      breakpoints: {
        1500:{
          spaceBetween: 150,
          slidesPerView: 2
          },
          767:{
          slidesPerView: 2
          }
          }
  
    });

    // image gallery

    var fullImgBox = document.getElementById("fullImgBox");
var fullImg = document.getElementById("fullImg");

function openFullImg(pic){
    fullImgBox.style.display = "flex";
    fullImg.src = pic;
}

function closeFullImg(){
    fullImgBox.style.display = "none";
}