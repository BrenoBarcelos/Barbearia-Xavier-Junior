const modal = document.getElementById("bookingModal");
const openBtns = document.querySelectorAll(".open-modal");
const closeBtn = document.querySelector(".close-modal");
const bookingForm = document.getElementById("bookingForm");

// Abrir e Fechar Modal
openBtns.forEach((btn) => {
  btn.onclick = (e) => {
    e.preventDefault();
    modal.style.display = "flex";
  };
});

closeBtn.onclick = () => (modal.style.display = "none");

window.onclick = (event) => {
  if (event.target == modal) modal.style.display = "none";
};

// Lógica do Agendamento via WhatsApp
bookingForm.onsubmit = (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const servico = document.getElementById("servico").value;
  const data = document.getElementById("data").value;
  const horario = document.getElementById("horario").value;

  // Formatar data para PT-BR (DD/MM/AAAA)
  const dataFormatada = data.split("-").reverse().join("/");

  const telefone = "558581573745";
  const mensagem = `Olá, sou ${nome}, gostaria de marcar um ${servico}, em ${dataFormatada} - ${horario}`;

  // Criar URL codificada
  const whatsappUrl = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

  // Redirecionar
  window.open(whatsappUrl, "_blank");
  modal.style.display = "none";
  bookingForm.reset();
};

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
