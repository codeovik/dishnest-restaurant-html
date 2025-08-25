// image magnet in stats
document.querySelectorAll("#stats article").forEach(box => {
  const img = box.querySelector("img");
  box.addEventListener("mouseenter", () => {
    gsap.to(img, {
      opacity: 0.6,
      duration: 0.3,
      ease: "power3.out",
    });
  });
  box.addEventListener("mousemove", e => {
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left - img.offsetWidth / 2;
    const y = e.clientY - rect.top - img.offsetHeight / 2;
    gsap.to(img, {
      x: x,
      y: y,
      duration: 3,
      ease: "power3.out"
    });
  });
  box.addEventListener("mouseleave", () => {
    gsap.to(img, {
      opacity: 0,
      duration: 0.3,
      ease: "power3.inOut"
    });
  });
});

// odometer animation
document.querySelectorAll('[data-target-number]').forEach(function (el) {
  var targetStr = (el.getAttribute('data-target-number') || '').trim();
  if (!targetStr) return;
  var numOnly = targetStr.replace(/[^0-9.\-]/g, '');
  var targetVal = parseFloat(numOnly || '0');
  var prefixMatch = targetStr.match(/^[^\d\-\.]+/);
  var prefix = prefixMatch ? prefixMatch[0] : '';
  var suffix = targetStr.replace(/^[^\d\-\.]*/, '').replace(/-?\d[\d,]*(?:\.\d+)?/, '');
  var startNum = (el.textContent || '').trim().replace(/[^0-9.\-]/g, '');
  if (startNum === '') startNum = '0';
  el.textContent = '';
  if (prefix) {
    var pre = document.createElement('span');
    pre.className = 'odo-prefix';
    pre.textContent = prefix;
    el.appendChild(pre);
  }
  var numSpan = document.createElement('span');
  numSpan.className = 'odometer';
  numSpan.textContent = startNum;
  el.appendChild(numSpan);
  if (suffix) {
    var suf = document.createElement('span');
    suf.className = 'odo-suffix';
    suf.textContent = suffix;
    el.appendChild(suf);
  }
  var odo = new Odometer({
    el: numSpan,
    value: parseFloat(startNum),
    duration: +el.getAttribute('data-duration') || 2000,
    format: el.getAttribute('data-format') || '(,ddd).dd'
  });
  ScrollTrigger.create({
      trigger: el,
      toggleActions: "play none reset none",
      onEnter: function () {
        odo.update(targetVal);
      },
      onLeaveBack: function () {
        odo.update(startNum);
      }
    });
});