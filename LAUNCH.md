# Guardly beta launch

## 1. Увімкнути аналітику

1. Створити безкоштовний ресурс Google Analytics 4 для `https://yakostyan.github.io/guardly/`.
2. Скопіювати Measurement ID формату `G-XXXXXXXXXX`.
3. У GitHub відкрити `Settings → Secrets and variables → Actions → Variables`.
4. Створити variable `VITE_GA_MEASUREMENT_ID` зі значенням Measurement ID.
5. Перезапустити workflow `Deploy Guardly` або зробити новий push у `main`.

Аналітика завантажується лише після згоди відвідувача. Без ID сайт працює без зовнішнього трекінгу.

## 2. Події в GA4

- `page_view` — перегляд hash-маршруту.
- `cta_click` — натискання основного CTA.
- `mission_card_click` — запуск доступної місії з каталогу.
- `mission_start` — старт демо.
- `evidence_found` — знайдений доказ.
- `mission_mistake` — помилка або небезпечна дія.
- `domain_puzzle_complete` — завершення перевірки домену.
- `final_action_selected` — фінальний вибір.
- `mission_complete` — завершення місії з рангом і балом.
- `mission_retry` — повторне проходження.
- `result_share` — поширення результату.
- `demand_signal` — аудиторія, яка зацікавилася продуктом.
- `plan_interest` — інтерес до попереднього тарифу.

## 3. Посилання для запуску

- Telegram: `https://yakostyan.github.io/guardly/?utm_source=telegram&utm_medium=social&utm_campaign=beta_launch#/`
- TikTok: `https://yakostyan.github.io/guardly/?utm_source=tiktok&utm_medium=social&utm_campaign=beta_launch#/`
- Instagram: `https://yakostyan.github.io/guardly/?utm_source=instagram&utm_medium=social&utm_campaign=beta_launch#/`
- Партнери: `https://yakostyan.github.io/guardly/?utm_source=partner&utm_medium=referral&utm_campaign=beta_launch#/`

## 4. Що дивитися після запуску

1. Скільки людей відкрили сайт.
2. Яка частка натиснула CTA і почала місію.
3. Яка частка завершила місію.
4. Скільки людей поділилися результатом або пройшли ще раз.
5. Хто дає більше `demand_signal`: родини, школи чи просто зацікавлені.
6. Який план отримує `plan_interest`.

Перші рішення варто приймати за поведінкою у воронці, а не лише за загальною кількістю переглядів.
