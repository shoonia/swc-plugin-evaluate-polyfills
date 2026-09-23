try {
    {
        var e = document.createElement("style");
        e.appendChild(document.createTextNode(' <CSS are going here> ')), document.head.appendChild(e);
    }
} catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
}
