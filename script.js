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

  var ad     = document.getElementById("ad").value.trim();
  var eposta = document.getElementById("eposta").value.trim();
  var mesaj  = document.getElementById("mesaj").value.trim();

  var subject = encodeURIComponent("Çakmak Dünyası - " + ad + " kişisinden mesaj");
  var body    = encodeURIComponent(
    "Ad Soyad: " + ad + "\r\n" +
    "E-posta: "  + eposta + "\r\n\r\n" +
    "Mesaj:\r\n"  + mesaj
  );
  var mailtoLink = "mailto:gokdenizyeniocak33@gmail.com?subject=" + subject + "&body=" + body;

  window.location.href = mailtoLink;

  /* Başarı mesajını göster */
  var basariKutu = document.getElementById("form-basari");
  if(basariKutu){
    basariKutu.classList.remove("gizli");
    /* prefers-reduced-motion kontrolü — animasyon yoksa doğrudan görünür */
    if(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches){
      basariKutu.style.animation = "none";
    }
  }

  /* Formu sıfırla */
  var form = document.getElementById("iletisim-form");
  if(form) form.reset();
}

console.log("Fotoğraflı Çakmak Dünyası final projesi çalışıyor.");

/* ── AKTİF SAYFA NAVBAR VURGUSU ─────────────────────────────────── */
(function(){
  var links = document.querySelectorAll(".navbar a");
  var path = window.location.pathname.split("/").pop() || "index.html";
  links.forEach(function(a){
    var href = a.getAttribute("href");
    if(href === path){
      a.classList.add("active");
    }
  });
})();

/* ── SCROLL REVEAL (IntersectionObserver) ───────────────────────── */
(function(){
  /* prefers-reduced-motion kontrolü */
  var prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(prefersReduced) return; /* animasyon istemiyorsa hiçbir şey yapma — içerik zaten görünür */

  if(!("IntersectionObserver" in window)) return; /* eski tarayıcı fallback */

  var targets = document.querySelectorAll(
    ".card, .gallery-item, .tip, .timeline div, .section, .contact-box, .iletisim-kart, .sosyal-bolum"
  );

  /* Önce hidden class'ı ekle — JS desteklenince gizle */
  targets.forEach(function(el){
    el.classList.add("reveal","hidden");
  });

  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        /* kısa gecikme ile sıralı belirme */
        var delay = parseInt(entry.target.dataset.revealDelay) || 0;
        setTimeout(function(){
          entry.target.classList.remove("hidden");
          entry.target.classList.add("visible");
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0.08,rootMargin:"0px 0px -30px 0px"});

  /* Grid içindeki kartları sıralı gecikme ile işaretle */
  var gridParents = {};
  targets.forEach(function(el){
    var parent = el.parentElement;
    if(!parent) return;
    var pid = parent.className;
    if(!gridParents[pid]){ gridParents[pid] = 0; }
    el.dataset.revealDelay = gridParents[pid] * 80;
    gridParents[pid]++;
    observer.observe(el);
  });
})();

/* ── MODAL / LİGHTBOX ───────────────────────────────────────────── */

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

  modalOverlay.addEventListener("click", function(e) {
    if (e.target === modalOverlay) modalKapat();
  });
  modalKapatBtn.addEventListener("click", modalKapat);
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

function kartlariDinle() {
  var kartlar = document.querySelectorAll(".card, .gallery-item");
  kartlar.forEach(function(kart) {
    kart.style.cursor = "pointer";
    kart.addEventListener("click", function() {
      var img = kart.querySelector("img[src]");
      if (!img) return;
      var src = img.getAttribute("src");
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
