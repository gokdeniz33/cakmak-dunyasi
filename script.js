window.addEventListener("load", function(){
  setTimeout(function(){
    document.getElementById("loader").classList.add("hide");
  }, 500);
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

console.log("Fotoğraflı Çakmak Dünyası final projesi çalışıyor.");

/* ── MODAL / LİGHTBOX ─────────────────────────────────────────── */

var CAKMAK_DATA = {
  gazli: {
    baslik: "Gazlı Çakmak",
    yakit: "Bütan gazı (doldurulabilir)",
    aciklama: "Bütan gazıyla çalışan, günlük kullanımda en yaygın çakmak türüdür. Gazı bittiğinde tekrar doldurulabilir ve alev yüksekliği ayarlanabilir. Ekonomik ve pratik yapısıyla öne çıkar.",
    ozellikler: ["Doldurulabilir gaz haznesi", "Ayarlanabilir alev", "Ekonomik ve yaygın", "Taş veya piezo ateşleme"]
  },
  elektrikli: {
    baslik: "Elektrikli Çakmak",
    yakit: "Elektrik (USB ile şarj edilebilir)",
    aciklama: "Şarj edilebilir bataryasıyla çalışan modern bir çakmaktır. Gaz veya taş gerektirmez; elektrik arkı (plazma) ile ateşleme yapar. Rüzgâra dayanıklıdır ve çevre dostudur.",
    ozellikler: ["USB ile şarj", "Alevsiz plazma/ark ateşleme", "Rüzgâra dayanıklı", "Gaz ve taş gerektirmez"]
  },
  metal: {
    baslik: "Metal Çakmak",
    yakit: "Çakmak benzini (sıvı yakıt)",
    aciklama: "Zippo tarzı metal gövdeli, sıvı yakıtla çalışan dayanıklı bir çakmaktır. Baca tasarımı sayesinde rüzgâra dayanıklı alev üretir, ikonik kapak sesi ve sağlam çelik gövdesiyle koleksiyon değeri taşır.",
    ozellikler: ["Sağlam metal/çelik gövde", "Rüzgâra dayanıklı baca", "Kişiselleştirilebilir", "Koleksiyonluk değer"]
  },
  torch: {
    baslik: "Torch Çakmak",
    yakit: "Basınçlı bütan gazı",
    aciklama: "Yüksek sıcaklıkta mavi jet alev üreten güçlü bir çakmaktır. Rüzgâra dayanıklı yapısıyla dış mekân, kamp ve puro kullanımında tercih edilir.",
    ozellikler: ["Yüksek sıcaklıklı jet alev", "Rüzgâra dayanıklı", "Dış mekân ve kamp için ideal", "Güçlü ateşleme"]
  },
  koleksiyon: {
    baslik: "Koleksiyonluk",
    yakit: "Modeline göre değişir",
    aciklama: "Özel tasarımı ve dikkat çekici görünümüyle koleksiyon değeri taşıyan çakmaklardır. Genellikle sınırlı üretilir; estetik ve dekoratif değeri ön plandadır.",
    ozellikler: ["Özel/sınırlı tasarım", "Dekoratif görünüm", "Yüksek koleksiyon değeri", "Hediyelik"]
  },
  klasik: {
    baslik: "Klasik Model",
    yakit: "Bütan gazı (taş ateşlemeli)",
    aciklama: "Clipper tarzı, pratik ve ergonomik bir çakmaktır. Çıkarılabilir taş mekanizmasıyla bilinir; günlük kullanımda ekonomik ve dayanıklıdır.",
    ozellikler: ["Çıkarılabilir taş mekanizması", "Ergonomik tasarım", "Ekonomik", "Günlük kullanıma uygun"]
  }
};

var KEYS = ["gazli", "elektrikli", "metal", "torch", "koleksiyon", "klasik"];

/* Modal DOM elemanlarını oluştur */
var modalOverlay, modalPanel, modalImg, modalBaslik, modalYakit,
    modalAciklama, modalOzellikler, modalThumbsContainer, modalKapatBtn;

function buildModal() {
  modalOverlay = document.createElement("div");
  modalOverlay.id = "ck-modal-overlay";
  modalOverlay.setAttribute("role", "dialog");
  modalOverlay.setAttribute("aria-modal", "true");
  modalOverlay.setAttribute("aria-label", "Çakmak detayları");

  modalPanel = document.createElement("div");
  modalPanel.id = "ck-modal-panel";

  modalKapatBtn = document.createElement("button");
  modalKapatBtn.id = "ck-modal-kapat";
  modalKapatBtn.setAttribute("aria-label", "Modalı kapat");
  modalKapatBtn.textContent = "×";

  var imgWrap = document.createElement("div");
  imgWrap.id = "ck-modal-img-wrap";

  modalImg = document.createElement("img");
  modalImg.id = "ck-modal-img";
  modalImg.alt = "";
  imgWrap.appendChild(modalImg);

  var info = document.createElement("div");
  info.id = "ck-modal-info";

  modalBaslik = document.createElement("h2");
  modalBaslik.id = "ck-modal-baslik";

  var yakitRow = document.createElement("p");
  yakitRow.id = "ck-modal-yakit-row";
  var yakitLabel = document.createElement("span");
  yakitLabel.className = "ck-label";
  yakitLabel.textContent = "Yakıt Türü: ";
  modalYakit = document.createElement("span");
  yakitRow.appendChild(yakitLabel);
  yakitRow.appendChild(modalYakit);

  modalAciklama = document.createElement("p");
  modalAciklama.id = "ck-modal-aciklama";

  modalOzellikler = document.createElement("ul");
  modalOzellikler.id = "ck-modal-ozellikler";

  var thumbsSection = document.createElement("div");
  thumbsSection.id = "ck-modal-thumbs-section";
  var thumbsTitle = document.createElement("p");
  thumbsTitle.id = "ck-modal-thumbs-title";
  thumbsTitle.textContent = "Diğer Modeller";
  modalThumbsContainer = document.createElement("div");
  modalThumbsContainer.id = "ck-modal-thumbs";
  thumbsSection.appendChild(thumbsTitle);
  thumbsSection.appendChild(modalThumbsContainer);

  /* Thumbnailleri oluştur */
  KEYS.forEach(function(key) {
    var btn = document.createElement("button");
    btn.className = "ck-thumb-btn";
    btn.dataset.key = key;
    btn.setAttribute("aria-label", CAKMAK_DATA[key].baslik);
    var img = document.createElement("img");
    img.src = "images/" + key + ".jpg";
    img.alt = CAKMAK_DATA[key].baslik;
    btn.appendChild(img);
    btn.addEventListener("click", function() {
      modalAc(key);
    });
    modalThumbsContainer.appendChild(btn);
  });

  info.appendChild(modalBaslik);
  info.appendChild(yakitRow);
  info.appendChild(modalAciklama);
  info.appendChild(modalOzellikler);
  info.appendChild(thumbsSection);

  modalPanel.appendChild(modalKapatBtn);
  modalPanel.appendChild(imgWrap);
  modalPanel.appendChild(info);
  modalOverlay.appendChild(modalPanel);
  document.body.appendChild(modalOverlay);

  /* Kapatma: overlay'e tıklama */
  modalOverlay.addEventListener("click", function(e) {
    if (e.target === modalOverlay) modalKapat();
  });

  /* Kapatma: × butonu */
  modalKapatBtn.addEventListener("click", modalKapat);

  /* Kapatma: Esc */
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && modalOverlay.classList.contains("ck-modal-open")) {
      modalKapat();
    }
  });
}

function modalIcerikGuncelle(key) {
  var data = CAKMAK_DATA[key];
  if (!data) return;

  modalImg.src = "images/" + key + ".jpg";
  modalImg.alt = data.baslik;
  modalBaslik.textContent = data.baslik;
  modalYakit.textContent = data.yakit;
  modalAciklama.textContent = data.aciklama;

  modalOzellikler.innerHTML = "";
  data.ozellikler.forEach(function(oz) {
    var li = document.createElement("li");
    li.textContent = oz;
    modalOzellikler.appendChild(li);
  });

  /* Aktif thumbnail vurgula */
  var thumbBtns = modalThumbsContainer.querySelectorAll(".ck-thumb-btn");
  thumbBtns.forEach(function(btn) {
    btn.classList.toggle("ck-thumb-active", btn.dataset.key === key);
  });
}

function modalAc(key) {
  modalIcerikGuncelle(key);
  modalOverlay.classList.add("ck-modal-open");
  document.body.classList.add("ck-modal-body-lock");
}

function modalKapat() {
  modalOverlay.classList.remove("ck-modal-open");
  document.body.classList.remove("ck-modal-body-lock");
}

/* Kartlara tıklama dinleyicisi ekle */
function kartlariDinle() {
  var kartlar = document.querySelectorAll(".card, .gallery-item");
  kartlar.forEach(function(kart) {
    kart.style.cursor = "pointer";
    kart.addEventListener("click", function() {
      var img = kart.querySelector("img[src]");
      if (!img) return;
      var src = img.getAttribute("src");
      /* "images/metal.jpg" → "metal" */
      var match = src.match(/images\/([^/.]+)\./);
      if (!match) return;
      var key = match[1];
      if (CAKMAK_DATA[key]) {
        modalAc(key);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", function() {
  buildModal();
  kartlariDinle();
});
