if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
        .then(() => console.log("Service Worker Registered"))
        .catch((err) => console.error("Service Worker Registration Failed", err));
}

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    document.getElementById("install-btn").style.display = "block";
});

document.getElementById("install-btn").addEventListener("click", async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(outcome === "accepted" ? "PWA Installed" : "PWA Installation Declined");
        deferredPrompt = null;
    }
});

window.addEventListener("appinstalled", () => {
    console.log("PWA Installed");
    document.getElementById("install-btn").style.display = "none";
});
