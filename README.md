# 🌱 AgroSkillTracker

**AgroSkillTracker** is an AgTech platform for agricultural field monitoring, satellite data analysis, AI-powered insights, yield prediction, and digital farm management.

The project combines modern web technologies, satellite monitoring, NDVI analysis, and artificial intelligence to help farmers and agricultural specialists make data-driven decisions.

---

## 🇬🇧 English

### 📌 About the Project

Modern farms generate large amounts of information, but monitoring large agricultural areas manually can be difficult, expensive, and time-consuming.

**AgroSkillTracker** is designed to simplify this process by combining satellite imagery, vegetation indices, artificial intelligence, and farm management tools in one platform.

The system allows users to monitor agricultural fields, analyze vegetation conditions, identify potentially problematic areas, track agricultural operations, and work with analytical information through a web interface.

The long-term goal of AgroSkillTracker is to make precision agriculture technologies more accessible for farms in Kazakhstan and other agricultural regions.

---

## 🚜 Main Features

### 🛰️ Satellite Field Monitoring

Users can work with agricultural fields on an interactive map and analyze satellite-based information.

The platform is being developed to support data from satellite systems such as **Sentinel-2**.

---

### 🌿 NDVI Analysis

AgroSkillTracker uses vegetation indices such as **NDVI (Normalized Difference Vegetation Index)** to estimate vegetation conditions.

NDVI analysis can help identify:

- healthy vegetation;
- areas with lower vegetation activity;
- possible crop stress;
- spatial differences inside a field;
- areas that may require additional inspection.

---

### 🤖 AI Analysis

The platform includes AI-oriented modules designed to process agricultural data and generate useful insights.

Current and experimental modules include:

- anomaly detection;
- field condition analysis;
- agricultural recommendations;
- drought-related analysis;
- yield prediction.

---

### 📈 Yield Prediction

AgroSkillTracker includes experimental tools for estimating agricultural productivity and yield.

The project also explores integration with agricultural crop models such as **AquaCrop**.

---

### ⚠️ Anomaly Detection

The system can analyze field data and highlight unusual conditions or potentially problematic areas.

This functionality is intended to help users focus their attention on areas that may require additional inspection.

---

### 🔗 Supply Chain Tracking

The project contains tools for tracking agricultural processes and supply-chain information.

The platform architecture allows further development of:

- batch tracking;
- QR-based identification;
- agricultural operation history;
- alerts;
- reports;
- subsidy monitoring and verification.

---

### 🗺️ Interactive Maps

The web application contains interactive geographic functionality for displaying agricultural fields and related information.

Field information can include:

- geographic boundaries;
- agricultural data;
- vegetation information;
- monitoring results;
- analytical indicators.

---

## 🏗️ Project Architecture

AgroSkillTracker is organized as a **Turborepo monorepo**.

```text
my-turborepo/
│
├── apps/
│   │
│   ├── web/
│   │   ├── public/
│   │   │   ├── data/
│   │   │   └── ...
│   │   │
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── api/
│   │   │   │   │   ├── anomaly-detection/
│   │   │   │   │   ├── supply-chain/
│   │   │   │   │   └── yield-prediction/
│   │   │   │   │
│   │   │   │   ├── supply-chain/
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── components/
│   │   │   │   ├── AnomalyDetection.tsx
│   │   │   │   ├── LivestockMonitor.tsx
│   │   │   │   ├── NDVIMap.tsx
│   │   │   │   ├── SupplyChainTracker.tsx
│   │   │   │   ├── YieldPrediction.tsx
│   │   │   │   └── header.tsx
│   │   │   │
│   │   │   └── lib/
│   │   │       └── firebase.ts
│   │   │
│   │   └── package.json
│   │
│   └── api/
│       ├── src/
│       │   ├── common/
│       │   ├── models/
│       │   │   ├── anomaly.ts
│       │   │   └── aquacrop.py
│       │   ├── app.module.ts
│       │   └── main.ts
│       │
│       └── package.json
│
├── packages/
│
├── package.json
├── package-lock.json
├── turbo.json
└── README.md
```

---

## 🛠️ Technology Stack

### Frontend

- **Next.js**
- **React**
- **TypeScript**
- **CSS**
- Interactive map technologies
- GeoJSON

### Backend

- **NestJS**
- **Node.js**
- **TypeScript**
- REST API

### Data & Analysis

- Python
- NDVI analysis
- Satellite data
- GeoJSON
- Agricultural analytics
- Experimental AquaCrop integration

### Infrastructure

- Turborepo
- npm
- Git
- GitHub

---

# 🚀 Installation and Running

## 1. Requirements

Before running the project, install:

- **Node.js**
- **npm**
- **Git**

Recommended:

```bash
node --version
npm --version
git --version
```

If these commands return version numbers, the required tools are installed.

---

## 2. Clone the Repository

```bash
git clone https://github.com/nariman1721/AgroSkillTracker.git
```

Enter the project directory:

```bash
cd AgroSkillTracker
```

---

## 3. Install Dependencies

From the root directory:

```bash
npm install
```

If necessary, dependencies can also be installed inside individual applications.

For the web application:

```bash
cd apps/web
npm install
```

For the API:

```bash
cd ../api
npm install
```

Then return to the project root:

```bash
cd ../..
```

---

## 4. Environment Variables

Some functionality may require environment variables.

Create a local `.env` file if required by your configuration.

Example:

```env
EOS_API_KEY=your_api_key_here
```

> ⚠️ Never commit real API keys, tokens, passwords, or other secrets to GitHub.

Environment files such as `.env` should remain in `.gitignore`.

For secret credentials, prefer server-side environment variables and backend/API routes rather than exposing credentials in browser code.

---

## 5. Run the Web Application

From the project root, you can run the Turborepo development environment:

```bash
npm run dev
```

Alternatively, run only the web application:

```bash
cd apps/web
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

## 6. Run the Backend API

Open another terminal:

```bash
cd apps/api
npm install
npm run start:dev
```

The NestJS API will normally start on a local development port configured by the application.

Check the terminal output for the exact address.

---

## 7. Production Build

To build the monorepo:

```bash
npm run build
```

or:

```bash
npx turbo build
```

To build only the web application:

```bash
npx turbo build --filter=web
```

---

## 🔐 Security

Do not store API keys directly inside source files.

❌ Bad:

```ts
const API_KEY = "real-secret-key";
```

✅ Better:

```ts
const API_KEY = process.env.API_KEY;
```

Secret environment variables should be accessed only from server-side code when confidentiality is required.

Files containing secrets must not be committed to Git.

Examples:

```text
.env
.env.local
.env.development
.env.production
```

---

## 🧭 Development Roadmap

Planned development directions include:

- real Sentinel-2 satellite data integration;
- improved NDVI processing;
- agricultural anomaly detection;
- AI-generated recommendations;
- yield prediction;
- drought monitoring;
- field history;
- agricultural reporting;
- supply-chain tracking;
- QR-based batch tracking;
- subsidy verification;
- mobile and web synchronization;
- pilot testing with agricultural fields.

---

## 🎯 Project Goal

The goal of **AgroSkillTracker** is to transform satellite and agricultural data into practical information that farmers and agricultural specialists can use for decision-making.

> **AgroSkillTracker — turning satellite data into decisions for the field.**

---

# 🇷🇺 Русский

## 📌 О проекте

Современное сельское хозяйство генерирует большое количество данных, однако ручной мониторинг крупных сельскохозяйственных территорий требует значительных ресурсов и времени.

**AgroSkillTracker** — это цифровая AgTech-платформа для мониторинга сельскохозяйственных полей, анализа спутниковых данных и применения искусственного интеллекта.

Платформа разрабатывается для того, чтобы помочь фермерам и специалистам сельского хозяйства быстрее оценивать состояние полей, обнаруживать потенциально проблемные участки и принимать решения на основе данных.

Долгосрочная цель проекта — сделать технологии точного земледелия более доступными для хозяйств Казахстана и других сельскохозяйственных регионов.

---

## 🚜 Основные возможности

### 🛰️ Спутниковый мониторинг

Пользователь может работать с сельскохозяйственными полями на интерактивной карте и анализировать информацию, полученную на основе спутниковых данных.

Проект развивается с возможностью использования данных спутниковых систем, включая **Sentinel-2**.

---

### 🌿 NDVI-анализ

Одним из основных инструментов AgroSkillTracker является анализ **NDVI (Normalized Difference Vegetation Index)**.

NDVI позволяет анализировать состояние растительности и может помочь определить:

- участки со здоровой растительностью;
- зоны с более низкой активностью растительности;
- возможный стресс растений;
- неоднородность состояния поля;
- участки, требующие дополнительной проверки.

---

### 🤖 Искусственный интеллект

AgroSkillTracker содержит модули, предназначенные для интеллектуального анализа сельскохозяйственных данных.

Разрабатываемые и экспериментальные функции включают:

- обнаружение аномалий;
- анализ состояния полей;
- формирование рекомендаций;
- анализ рисков засухи;
- прогнозирование урожайности.

---

### 📈 Прогнозирование урожайности

Платформа содержит экспериментальные инструменты для анализа и прогнозирования сельскохозяйственной продуктивности.

Также исследуется возможность использования моделей сельскохозяйственных культур, включая **AquaCrop**.

---

### ⚠️ Обнаружение аномалий

Система может анализировать данные поля и выделять необычные или потенциально проблемные зоны.

Это позволяет пользователю быстрее определить участки, которым может потребоваться дополнительная проверка.

---

### 🔗 Контроль цепочки поставок

Архитектура AgroSkillTracker предусматривает развитие инструментов для контроля сельскохозяйственных процессов и цепочки поставок.

В дальнейшем система может включать:

- отслеживание партий;
- QR-идентификацию;
- историю операций;
- уведомления;
- отчётность;
- мониторинг и проверку использования субсидий.

---

### 🗺️ Интерактивная карта

Веб-приложение предоставляет географический интерфейс для работы с сельскохозяйственными территориями.

На карте могут отображаться:

- границы полей;
- информация о сельскохозяйственных объектах;
- состояние растительности;
- результаты мониторинга;
- аналитические показатели.

---

## 🏗️ Архитектура проекта

Проект построен как **Turborepo monorepo**.

Основные приложения:

```text
apps/
├── web/    # Next.js веб-приложение
└── api/    # NestJS backend
```

Веб-приложение содержит интерфейс пользователя, карты, NDVI-мониторинг, аналитику и другие модули.

Backend предназначен для API, обработки данных и серверной бизнес-логики.

---

## 🛠️ Используемые технологии

### Frontend

- Next.js
- React
- TypeScript
- CSS
- GeoJSON
- интерактивные карты

### Backend

- NestJS
- Node.js
- TypeScript
- REST API

### Аналитика

- Python
- NDVI
- спутниковые данные
- GeoJSON
- сельскохозяйственная аналитика
- экспериментальная интеграция AquaCrop

### Инструменты разработки

- Turborepo
- npm
- Git
- GitHub

---

# 🚀 Как запустить AgroSkillTracker

## Шаг 1. Установить необходимые инструменты

Для запуска проекта необходимы:

- Node.js
- npm
- Git

Проверить установку можно командами:

```bash
node --version
npm --version
git --version
```

---

## Шаг 2. Скачать проект

```bash
git clone https://github.com/nariman1721/AgroSkillTracker.git
```

Перейти в папку проекта:

```bash
cd AgroSkillTracker
```

---

## Шаг 3. Установить зависимости

В корневой директории:

```bash
npm install
```

При необходимости зависимости веб-приложения можно установить отдельно:

```bash
cd apps/web
npm install
```

Backend:

```bash
cd ../api
npm install
```

Вернуться в корень:

```bash
cd ../..
```

---

## Шаг 4. Настроить переменные окружения

Некоторые функции проекта могут требовать API-ключи.

Для локальной разработки создайте `.env` и добавьте необходимые переменные.

Например:

```env
EOS_API_KEY=your_api_key_here
```

> ⚠️ Никогда не загружайте настоящие API-ключи, пароли или токены в GitHub.

Файлы `.env` должны находиться в `.gitignore`.

Если API-ключ должен оставаться секретным, обращение к нему должно выполняться на серверной стороне, а не непосредственно из браузера.

---

## Шаг 5. Запустить веб-приложение

Из корневой директории:

```bash
npm run dev
```

Либо только веб-приложение:

```bash
cd apps/web
npm run dev
```

После запуска откройте в браузере:

```text
http://localhost:3000
```

---

## Шаг 6. Запустить Backend

Откройте второй терминал:

```bash
cd apps/api
npm install
npm run start:dev
```

Точный адрес API будет отображён в терминале после запуска NestJS.

---

## Шаг 7. Production Build

Для сборки всего проекта:

```bash
npm run build
```

или:

```bash
npx turbo build
```

Для сборки только веб-приложения:

```bash
npx turbo build --filter=web
```

---

## 🔐 Безопасность

Никогда не храните настоящий API-ключ непосредственно в исходном коде.

❌ Неправильно:

```ts
const API_KEY = "real-secret-key";
```

✅ Для серверного кода:

```ts
const API_KEY = process.env.API_KEY;
```

Файлы с секретными данными не должны попадать в Git:

```text
.env
.env.local
.env.development
.env.production
```

---

## 🗺️ Roadmap

Следующие этапы развития AgroSkillTracker:

- интеграция реальных спутниковых данных Sentinel-2;
- развитие NDVI-анализа;
- обнаружение аномалий на полях;
- AI-рекомендации;
- прогнозирование урожайности;
- анализ риска засухи;
- история состояния полей;
- цифровая отчётность;
- контроль цепочки поставок;
- QR-отслеживание;
- инструменты проверки субсидий;
- синхронизация мобильной и веб-версии;
- пилотное тестирование.

---

## 👥 Команда

**Nariman Suleimenov**  
Software Development / Information Systems  
Разработка архитектуры, веб- и мобильного приложения, интеграция цифровых и AI-инструментов.

**Aruzhan Tolebay**  
Biotechnology / Research  
Исследование биологических и сельскохозяйственных аспектов проекта, интерпретация показателей состояния растений и поддержка исследовательской части.

---

## 🌍 Vision

AgroSkillTracker стремится объединить:

**Satellite Data + Agriculture + Artificial Intelligence + Digital Monitoring**

в единой платформе для современного сельского хозяйства.

Наша задача — не просто показать данные со спутника, а помочь превратить их в понятную информацию для принятия решений.

---

## 📄 License

The project is currently under active development.

All rights reserved unless otherwise specified.

---

## 🌱 AgroSkillTracker


**From satellite data to field decisions.**

**От спутниковых данных — к решениям для поля.**
