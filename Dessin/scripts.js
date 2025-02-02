
window.addEventListener('DOMContentLoaded', () => { 
    const canvas = new Dessin("feuille");

    document.querySelectorAll("#palette div").forEach(element => {
        const color = element.dataset.color;
        element.style.backgroundColor = color; 
        element.style.border = "1px solid black"; 

        element.addEventListener("click", () => canvas.setColor(color));
    });

    document.getElementById("plus").addEventListener("click", () => canvas.biggerStroke());
    document.getElementById("moins").addEventListener("click", () => canvas.smallerStroke());
    document.getElementById("gomme").addEventListener("click", () => canvas.setColor("white"));
    document.getElementById("effacer").addEventListener("click", () => canvas.erase());
});