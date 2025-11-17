const API_BASE =
  location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "http://localhost:4000/api"
    : "https://the-alpha-network-backend.onrender.com/api";


// -------------------------------
// TAB SWITCHING
// -------------------------------
document.querySelectorAll(".tab").forEach((t) =>
  t.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((x) => x.classList.remove("active"));
    t.classList.add("active");

    const name = t.getAttribute("data-tab");
    document.getElementById("panel-login").style.display =
      name === "login" ? "block" : "none";
    document.getElementById("panel-request").style.display =
      name === "request" ? "block" : "none";
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
    document.getElementById("svgCaptcha").innerHTML = `<img src="${j.svgData}" alt="captcha"/>`;
    document.getElementById("captchaAnswer").value = "";
  } catch (err) {
    document.getElementById("svgCaptcha").textContent = "ERR";
  }
}

document.getElementById("refreshCaptcha").addEventListener("click", (e) => {
  e.preventDefault();
  loadCaptcha();
});
loadCaptcha();

// -------------------------------
// MESSAGE HELPER
// -------------------------------
function showMessage(id, msg, type = "success") {
  document.getElementById(id).innerHTML =
    `<div class="message ${type === "success" ? "success" : "error"}">${msg}</div>`;
}

// -------------------------------
// LOGIN SUBMIT
// -------------------------------
document.getElementById("loginSubmit").addEventListener("click", async () => {
  const name = document.getElementById("login-name").value.trim();
  const countryCode = document.getElementById("login-country").value;
  const mobile = document.getElementById("login-mobile").value.trim();
  const email = document.getElementById("login-email").value.trim();
  const alphaCode = document.getElementById("login-code").value.trim();
  const captchaAnswer = document.getElementById("captchaAnswer").value.trim();

  if (!name || !countryCode || !mobile || !email || !alphaCode || !captchaAnswer) {
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
        alphaCode,
        captchaId: currentCaptcha.id,
        captchaAnswer,
      }),
    });

    const j = await res.json();

    if (res.ok) {
      if (j.alphaAccepted) {
        showMessage("loginMessage", "Alpha code accepted — access granted", "success");

        // redirect after login
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
  }

  loadCaptcha();
});

// -------------------------------
// REQUEST ACCESS PASS
// -------------------------------
document.getElementById("reqSubmit").addEventListener("click", async () => {
  const name = document.getElementById("req-name").value.trim();
  const countryCode = document.getElementById("req-country").value;
  const mobile = document.getElementById("req-mobile").value.trim();
  const email = document.getElementById("req-email").value.trim();

  if (!name || !countryCode || !mobile || !email) {
    showMessage("reqMessage", "Please fill all fields", "error");
    return;
  }

  try {
    const res = await fetch(API_BASE + "/request-pass", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, countryCode, mobile, email }),
    });

    const j = await res.json();

    if (res.ok) {
      showMessage("reqMessage", "Request received. Check email if configured", "success");
      document.getElementById("req-name").value = "";
      document.getElementById("req-mobile").value = "";
      document.getElementById("req-email").value = "";
    } else {
      showMessage("reqMessage", j.error || "Failed", "error");
    }
  } catch (err) {
    showMessage("reqMessage", "Server error", "error");
  }
});

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

  if (loginSelect) {
    countryCodes.forEach((code) => {
      const opt = document.createElement("option");
      opt.value = code;
      opt.textContent = code;
      loginSelect.appendChild(opt);
    });
    loginSelect.value = "+91";
  }

  if (reqSelect) {
    countryCodes.forEach((code) => {
      const opt = document.createElement("option");
      opt.value = code;
      opt.textContent = code;
      reqSelect.appendChild(opt);
    });
    reqSelect.value = "+91";
  }
}

window.onload = loadCountryCodes;
