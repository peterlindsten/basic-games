import Two from "two.js";

const canvas = document.createElement("div");
document.body.insertAdjacentElement("beforeend", canvas);
const two = new Two({fullscreen: true, type: Two.Types.canvas});
two.appendTo(canvas);
const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
const radius = Math.min(w, h) * 0.1;
const circle = two.makeCircle(radius * 2, radius * 2, radius);
circle.fill = 'blue';
circle.noStroke();
two.update();

canvas.addEventListener("click", e => {
    const r = circle.getBoundingClientRect(true);
    if (e.offsetX > r.left && e.offsetX < r.right && e.offsetY > r.top && e.offsetY < r.bottom) {
        circle.translation.set(Math.random() * (two.width - r.width * 2) + r.width, (Math.random() * (two.height - r.height * 2)) + r.height);
        circle.fill = 'rgb(' + Math.random() * 180 + ',' + Math.random() * 180 + ', ' + Math.random() * 180 + ')';
        two.update();
    }
});

window.addEventListener("resize", e => {
    two.update();
});

// iOS 10 hack
document.addEventListener("touchmove", function (e) {
    e = e.originalEvent || e;
    if (e.scale !== 1) {
        e.preventDefault();
    }
}, false);
