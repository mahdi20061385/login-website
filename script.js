// فایل script.js

// دریافت همه عناصر مورد نیاز از DOM
const playPauseBtn = document.getElementById("playPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const audio = document.getElementById("myAudio");
const icon = playPauseBtn.querySelector("i");

// عناصر جدید
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const totalDurationEl = document.getElementById("totalDuration");

// تابع کمکی برای فرمت کردن زمان (تبدیل ثانیه به دقیقه:ثانیه)
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// رویداد: وقتی متادیتا (اطلاعات) آهنگ بارگذاری شد
audio.addEventListener("loadedmetadata", () => {
  // مدت زمان کل آهنگ را نمایش بده
  totalDurationEl.textContent = formatTime(audio.duration);
  // مقدار ماکزیمم نوار پیشرفت را برابر با مدت زمان آهنگ قرار بده
  progressBar.max = audio.duration;
});

// رویداد: وقتی زمان پخش آهنگ تغییر می‌کند (هر چند میلی‌ثانیه یکبار)
audio.addEventListener("timeupdate", () => {
  // زمان فعلی را به‌روز کن
  currentTimeEl.textContent = formatTime(audio.currentTime);
  // مقدار نوار پیشرفت را به‌روز کن
  progressBar.value = audio.currentTime;
});

// رویداد کلیک برای دکمه پخش/تzوقف (بدون تغییر)
playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
  } else {
    audio.pause();
    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play");
  }
});

// رویداد کلیک برای دکمه "از اول" (بدون تغییر)
resetBtn.addEventListener("click", () => {
  audio.pause();
  audio.currentTime = 0;
  icon.classList.remove("fa-pause");
  icon.classList.add("fa-play");
});

// رویداد: به کاربر اجازه بده با کلیک روی نوار پیشرفت، زمان آهنگ را تغییر دهد
progressBar.addEventListener("click", (e) => {
  const rect = progressBar.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const width = rect.width;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
});
