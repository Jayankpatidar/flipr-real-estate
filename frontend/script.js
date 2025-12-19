const API = "http://localhost:5000/api"

// LOAD PROJECTS
fetch(`${API}/projects`)
  .then(res=>res.json())
  .then(data=>{
    const box = document.querySelector(".project-grid")
    if (data.length > 0) {
      box.innerHTML = data.map(p=>`
        <div class="project-card">
          <img src="${API.replace('/api', '')}${p.image}">
          <h4>${p.title}</h4>
          <button>Read More</button>
        </div>
      `).join("")
    }
  })
  .catch(err=>console.log("Error loading projects:", err))

// LOAD CLIENTS
fetch(`${API}/clients`)
  .then(res=>res.json())
  .then(data=>{
    const box = document.querySelector(".client-cards")
    box.innerHTML = data.map(c=>`
      <div class="client">
        <img src="${API.replace('/api', '')}${c.image}">
        <p>${c.review}</p>
        <h4>${c.name}</h4>
      </div>
    `).join("")
  })

// CONSULTATION FORM
function submitConsultation() {
  const fullName = document.getElementById("fullName").value
  const email = document.getElementById("email").value
  const mobile = document.getElementById("mobile").value
  const city = document.getElementById("city").value

  fetch(`${API}/contact`, {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({
      fullName,
      email,
      mobile,
      city
    })
  }).then(res=>res.json())
  .then(data=>{
    alert("Consultation request submitted successfully!")
    // Clear form
    document.getElementById("fullName").value = ""
    document.getElementById("email").value = ""
    document.getElementById("mobile").value = ""
    document.getElementById("city").value = ""
  })
  .catch(err=>alert("Error submitting form"))
}

// ADMIN LOGIN
function loginAdmin() {
  const email = document.getElementById("loginEmail").value
  const password = document.getElementById("loginPassword").value
  const message = document.getElementById("loginMessage")

  if (email === "admin@gmail.com" && password) {
    message.style.color = "green"
    message.textContent = "Login successful! Redirecting..."
    setTimeout(() => {
      window.location.href = "admin.html"
    }, 1000)
  } else {
    message.textContent = "Invalid credentials. Use admin@gmail.com"
  }
}

// SUBSCRIBE
document.querySelector(".newsletter button").onclick = () => {
  const email = document.querySelector(".newsletter input").value
  fetch(`${API}/subscribe`,{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({email})
  }).then(()=>alert("Subscribed"))
}
