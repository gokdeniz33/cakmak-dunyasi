window.addEventListener("load", function(){
  setTimeout(function(){
    document.getElementById("loader").classList.add("hide");
  }, 600);
});

function temaDegistir(){
  document.body.classList.toggle("light");
  localStorage.setItem("tema", document.body.classList.contains("light") ? "light" : "dark");
}

if(localStorage.getItem("tema") === "light"){
  document.body.classList.add("light");
}

function formGonder(event){
  event.preventDefault();
  alert("Mesajınız başarıyla gönderildi. Teşekkür ederiz!");
}

console.log("Gelişmiş Çakmak Dünyası final projesi çalışıyor.");
