const API_BASE =
  location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "http://localhost:4000/api"
    : "https://the-alpha-network-production.up.railway.app/api";

// -------------------------------
// TAB SWITCHING (works for 3+ tabs)
// -------------------------------
document.querySelectorAll(".tab").forEach((t) =>
  t.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((x) => x.classList.remove("active"));
    t.classList.add("active");

    // hide all panels whose id starts with "panel-"
    document.querySelectorAll('[id^="panel-"]').forEach((p) => (p.style.display = "none"));

    const name = t.getAttribute("data-tab");
    const panelId = `panel-${name}`;
    const panel = document.getElementById(panelId);
    if (panel) panel.style.display = "block";
  })
);

// -------------------------------
// CAPTCHA
// -------------------------------
let currentCaptcha = { id: null };

async function loadCaptcha() {
  try {
    const r = await fetch(API_BASE + "/captcha");
    const j = await r.json();
    currentCaptcha.id = j.id;
    const svgEl = document.getElementById("svgCaptcha");
    if (svgEl) svgEl.innerHTML = `<img src="${j.svgData}" alt="captcha"/>`;
    const ansEl = document.getElementById("captchaAnswer");
    if (ansEl) ansEl.value = "";
  } catch (err) {
    const svgEl = document.getElementById("svgCaptcha");
    if (svgEl) svgEl.textContent = "ERR";
  }
}

const refreshBtn = document.getElementById("refreshCaptcha");
if (refreshBtn) refreshBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loadCaptcha();
});
loadCaptcha();

// -------------------------------
// MESSAGE HELPER
// -------------------------------
function showMessage(id, msg, type = "success") {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = `<div class="message ${type === "success" ? "success" : "error"}">${msg}</div>`;
}

// -------------------------------
// LOGIN SUBMIT
// -------------------------------
const loginBtn = document.getElementById("loginSubmit");
if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const name = document.getElementById("login-name").value.trim();
    const countryCode = document.getElementById("login-country").value;
    const mobile = document.getElementById("login-mobile").value.trim();
    const email = document.getElementById("login-email").value.trim();
    const city = document.getElementById("login-city") ? document.getElementById("login-city").value.trim() : "";
    const alphaCode = document.getElementById("login-code").value.trim();
    const captchaAnswer = document.getElementById("captchaAnswer").value.trim();

    if (!name || !countryCode || !mobile || !email || !city || !alphaCode || !captchaAnswer) {
      showMessage("loginMessage", "Please fill all fields", "error");
      return;
    }

    try {
      const res = await fetch(API_BASE + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          countryCode,
          mobile,
          email,
          city,
          alphaCode,
          captchaId: currentCaptcha.id,
          captchaAnswer,
        }),
      });

      const j = await res.json();

      if (res.ok) {
        if (j.alphaAccepted) {
          showMessage("loginMessage", "Alpha code accepted — access granted", "success");

          // redirect after login (adjust path to your protected page)
          setTimeout(() => {
            window.location.href = "/the-alpha-network/public/index.html";
          }, 700);
        } else {
          showMessage("loginMessage", "Saved. Alpha code invalid or pending", "error");
        }
      } else {
        showMessage("loginMessage", j.error || "Failed", "error");
      }
    } catch (err) {
      showMessage("loginMessage", "Server error", "error");
      console.error(err);
    }

    loadCaptcha();
  });
}

// -------------------------------
// REQUEST ACCESS PASS
// -------------------------------
const reqBtn = document.getElementById("reqSubmit");
if (reqBtn) {
  reqBtn.addEventListener("click", async () => {
    const name = document.getElementById("req-name").value.trim();
    const countryCode = document.getElementById("req-country").value;
    const mobile = document.getElementById("req-mobile").value.trim();
    const email = document.getElementById("req-email").value.trim();

    const city = document.getElementById("req-city") ? document.getElementById("req-city").value.trim() : "";
    const dob = document.getElementById("req-dob") ? document.getElementById("req-dob").value : "";
    const gender = document.getElementById("req-gender") ? document.getElementById("req-gender").value : "";
    const qualification = document.getElementById("req-qual") ? document.getElementById("req-qual").value : "";
    const semester = document.getElementById("semester") ? document.getElementById("semester").value : "";
    const specialization = document.getElementById("specialization") ? document.getElementById("specialization").value.trim() : "";

    // collect competition questions (q1..q10) — if present
    const questions = {};
    for (let i = 1; i <= 10; i++) {
      const ans = document.querySelector(`input[name="q${i}"]:checked`);
      if (!ans) {
        showMessage("reqMessage", `Please answer question ${i}`, "error");
        return;
      }
      questions[`q${i}`] = ans.value;
    }

    if (
      !name ||
      !mobile ||
      !email ||
      !city ||
      !dob ||
      !gender ||
      !qualification ||
      !semester ||
      !specialization
    ) {
      showMessage("reqMessage", "Please fill all the fields", "error");
      return;
    }

    try {
      const res = await fetch(API_BASE + "/request-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          countryCode,
          mobile,
          email,
          city,
          dob,
          gender,
          qualification,
          semester,
          specialization,
          questions,
        }),
      });

      const j = await res.json();

      if (res.ok) {
        showMessage("reqMessage", "Request received successfully!", "success");
      } else {
        showMessage("reqMessage", j.error || "Failed", "error");
      }
    } catch (err) {
      showMessage("reqMessage", "Server error", "error");
      console.error(err);
    }
  });
}

// -------------------------------
// BOOKING (new) - submit to POST /api/booking
// -------------------------------
const bookingBtn = document.getElementById("bookingSubmit");
if (bookingBtn) {
  bookingBtn.addEventListener("click", async () => {
    const name = document.getElementById("booking-name").value.trim();
    const countryCode = document.getElementById("booking-country").value;
    const mobile = document.getElementById("booking-mobile").value.trim();
    const email = document.getElementById("booking-email").value.trim();
    const bookingCode = document.getElementById("booking-code") ? document.getElementById("booking-code").value.trim() : "";
    const bookingDate = document.getElementById("booking-date") ? document.getElementById("booking-date").value : "";
    const bookingTime = document.getElementById("booking-time") ? document.getElementById("booking-time").value : "";

    if (!name || !countryCode || !mobile || !email || !bookingDate || !bookingTime) {
      showMessage("bookingMessage", "Please fill all fields", "error");
      return;
    }

    try {
      const res = await fetch(API_BASE + "/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          countryCode,
          mobile,
          email,
          bookingCode,
          bookingDate,
          bookingTime,
        }),
      });

      const j = await res.json();
      if (res.ok) {
        showMessage("bookingMessage", "Booking received! We'll email you confirmation.", "success");
        // clear form
        document.getElementById("booking-name").value = "";
        document.getElementById("booking-mobile").value = "";
        document.getElementById("booking-email").value = "";
        if (document.getElementById("booking-code")) document.getElementById("booking-code").value = "";
        if (document.getElementById("booking-date")) document.getElementById("booking-date").value = "";
        if (document.getElementById("booking-time")) document.getElementById("booking-time").value = "";
      } else {
        showMessage("bookingMessage", j.error || "Booking failed", "error");
      }
    } catch (err) {
      console.error(err);
      showMessage("bookingMessage", "Server error", "error");
    }
  });
}

// -------------------------------
// COUNTRY CODES
// -------------------------------
const countryCodes = [
  "+1", "+7", "+20", "+27", "+30", "+31", "+32", "+33", "+34", "+36",
  "+39", "+40", "+41", "+43", "+44", "+45", "+46", "+47", "+48", "+49",
  "+51", "+52", "+53", "+54", "+55", "+56", "+57", "+58",
  "+60", "+61", "+62", "+63", "+64", "+65", "+66",
  "+81", "+82", "+84", "+86", "+90", "+91", "+92", "+93", "+94", "+95", "+98",
  "+211", "+212", "+213", "+216", "+218",
  "+220", "+221", "+222", "+223", "+224", "+225", "+226", "+227", "+228", "+229",
  "+230", "+231", "+232", "+233", "+234", "+235", "+236", "+237", "+238", "+239",
  "+240", "+241", "+242", "+243", "+244", "+245", "+246", "+248", "+249",
  "+250", "+251", "+252", "+253", "+254", "+255", "+256", "+257", "+258", "+260",
  "+261", "+262", "+263", "+264", "+265", "+266", "+267", "+268", "+269",
  "+290", "+291", "+297", "+298", "+299",
  "+350", "+351", "+352", "+353", "+354", "+355", "+356", "+357", "+358", "+359",
  "+370", "+371", "+372", "+373", "+374", "+375", "+376", "+377", "+378", "+380",
  "+381", "+382", "+385", "+386", "+387", "+389",
  "+420", "+421", "+423",
  "+500", "+501", "+502", "+503", "+504", "+505", "+506", "+507", "+508", "+509",
  "+590", "+591", "+592", "+593", "+594", "+595", "+596", "+597", "+598", "+599",
  "+670", "+672", "+673", "+674", "+675", "+676", "+677", "+678", "+679",
  "+680", "+681", "+682", "+683", "+685", "+686", "+687", "+688", "+689",
  "+690", "+691", "+692",
  "+850", "+852", "+853", "+855", "+856", "+880",
  "+960", "+961", "+962", "+963", "+964", "+965", "+966", "+967", "+968", "+970",
  "+971", "+972", "+973", "+974", "+975", "+976", "+977",
  "+992", "+993", "+994", "+995", "+996", "+998"
];

function loadCountryCodes() {
  const loginSelect = document.getElementById("login-country");
  const reqSelect = document.getElementById("req-country");
  const bookingSelect = document.getElementById("booking-country");

  [loginSelect, reqSelect, bookingSelect].forEach((sel) => {
    if (!sel) return;
    // clear existing options (avoid duplicates)
    sel.innerHTML = "";
    countryCodes.forEach((code) => {
      const opt = document.createElement("option");
      opt.value = code;
      opt.textContent = code;
      sel.appendChild(opt);
    });
    // default to India if present
    if (Array.from(sel.options).some(o => o.value === "+91")) sel.value = "+91";
  });
}

window.onload = loadCountryCodes;
