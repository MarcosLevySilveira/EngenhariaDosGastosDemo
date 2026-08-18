// ios-warning.js
// Mostra um aviso pra quem está no iOS (iPhone/iPad), porque o WebKit do
// iOS (usado por TODOS os navegadores nesse sistema, não só o Safari) tem
// uma política de privacidade (ITP) que pode apagar automaticamente dados
// salvos em localStorage de sites que não são abertos há ~7 dias.
// Como este app guarda tudo localmente (sem servidor), isso é um risco
// real de perda de dados pra quem usa no iPhone/iPad.

(function () {
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (!isIOS) return;

    document.addEventListener("DOMContentLoaded", function () {
        var banner = document.createElement("div");
        banner.className = "ios-warning";
        banner.innerHTML =
            '<p>⚠️ <strong>iPhone/iPad detectado:</strong> se você ficar mais de ~7 dias sem abrir este app, ' +
            'o sistema pode apagar os dados salvos automaticamente — é uma política de privacidade do próprio iOS, ' +
            'não um bug do app. Abra com frequência, ou prefira testar num Android/computador se possível.</p>' +
            '<button type="button" aria-label="Fechar aviso">✕</button>';

        banner.querySelector("button").addEventListener("click", function () {
            banner.remove();
        });

        var topbar = document.querySelector(".topbar");
        if (topbar) {
            topbar.insertAdjacentElement("afterend", banner);
        } else {
            document.body.insertBefore(banner, document.body.firstChild);
        }
    });
})();
