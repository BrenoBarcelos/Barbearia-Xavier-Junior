const modal = document.getElementById("bookingModal");
const openBtns = document.querySelectorAll(".open-modal");
const closeBtn = document.querySelector(".close-modal");
const bookingForm = document.getElementById("bookingForm");
const dateInput = document.getElementById('data'); // Captura o input de data

if (bookingForm) {
  // 1. BLOQUEAR DATAS PASSADAS
  const dateInput = document.getElementById('data');
  const today = new Date().toISOString().split('T')[0];
  if(dateInput) {
    dateInput.setAttribute('min', today); 
  }

  // 2. LÓGICA DE ENVIO PARA O WHATSAPP
  bookingForm.onsubmit = (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const servico = document.getElementById("servico").value;
    const data = document.getElementById("data").value;
    const horario = document.getElementById("horario").value;

    // VALIDAR HORÁRIO DE FUNCIONAMENTO (09h às 19h)
    const [h, m] = horario.split(':').map(Number);
    if (h < 9 || h >= 19) {
      alert("Ops! Nosso horário de atendimento é das 09h às 19h. Por favor, escolha outro horário.");
      return; 
    }

    // Formatar data
    const dataFormatada = data.split("-").reverse().join("/");
    const telefone = "558581573745";
    const mensagem = `Olá, sou ${nome}, gostaria de marcar: ${servico}, em ${dataFormatada} às ${horario}h.`;

    // Redirecionar
    const whatsappUrl = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, "_blank");
    
    // Limpa o formulário e redireciona de volta para a home (opcional)
    bookingForm.reset();
    window.location.href = "index.html"; 
  };
}

// Scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.opacity = "1";
        e.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".service-card, .gallery-item").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer.observe(el);
});

// Service cards stagger
document.querySelectorAll(".service-card").forEach((card, i) => {
  card.style.transitionDelay = i * 0.08 + "s";
});