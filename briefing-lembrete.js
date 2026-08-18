// briefing-lembrete.js
// Mostra um aviso quando já se passou uma semana desde a última vez que o
// Briefing Semanal foi aberto. Igual ao ios-warning.js, mas com gatilho
// baseado em tempo em vez de plataforma.

(function () {
    function hojeISO() {
        const d = new Date();
        return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    }

    function diasEntre(a, b) {
        return Math.floor((new Date(b + "T00:00:00") - new Date(a + "T00:00:00")) / 86400000);
    }

    document.addEventListener("DOMContentLoaded", function () {
        if (window.location.pathname.endsWith("briefing-semanal.html")) return;

        const ultimo = localStorage.getItem("ultimoBriefingVisto_demo");
        const hoje = hojeISO();
        const passaram = ultimo ? diasEntre(ultimo, hoje) : 999;

        if (passaram < 7) return;

        const despesas = JSON.parse(localStorage.getItem("despesas_demo")) || [];
        if (despesas.length === 0) return; // nada pra mostrar ainda

        const banner = document.createElement("div");
        banner.className = "briefing-lembrete";
        banner.innerHTML =
            '<p>📋 <strong>Seu briefing semanal está pronto.</strong> Uma leitura rápida dos seus números da semana.</p>' +
            '<a href="briefing-semanal.html" class="briefing-lembrete-link">Ver briefing</a>' +
            '<button type="button" aria-label="Fechar aviso">✕</button>';

        banner.querySelector("button").addEventListener("click", function () {
            banner.remove();
        });

        const topbar = document.querySelector(".topbar");
        if (topbar) {
            topbar.insertAdjacentElement("afterend", banner);
        } else {
            document.body.insertBefore(banner, document.body.firstChild);
        }
    });
})();
