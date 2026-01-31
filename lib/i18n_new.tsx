"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "ru"

interface TranslationDict {
    [key: string]: string | { [key: string]: any }
}

const translations: Record<Language, TranslationDict> = {
    en: {
        nav: {
            howItWorks: "How it works",
            features: "Features",
            apps: "Apps",
            reviews: "Reviews",
            openBot: "Open Telegram Bot",
        },
        hero: {
            badge: "Fast, stable VLESS VPN via Telegram",
            title1: "PROVPN — Fast & ",
            title2: "Stable VPN",
            ctaStart: "Open Telegram Bot",
            ctaView: "View Setup",
            trust: {
                keys: "5 keys per user",
                protocol: "VLESS / Reality",
                platforms: "iOS • Android • Windows",
                servers: "Auto-updated servers",
            },
        },
        howItWorks: {
            badge: "How it works",
            title1: "Connected in ",
            title2: "3 simple steps",
            subtitle: "No complicated setup. No technical knowledge required. Just follow these quick steps.",
            step1: {
                title: "Start in Telegram",
                description: "Open our Telegram bot and hit /start. No registration, no sign-ups — just tap and go.",
            },
            step2: {
                title: "Get your 5 keys",
                description: "Receive 5 fresh VLESS keys instantly. They're saved securely for your Telegram account.",
            },
            step3: {
                title: "Import & Connect",
                description: "Copy a key, paste it into your VPN app, and connect. You're online in seconds.",
            },
            proTip: "Pro tip",
            proTipDesc: "Keys auto-delete from chat for cleanliness — but don't worry, they're always saved in your account. Just use the /keys command to retrieve them anytime.",
        },
        features: {
            badge: "Features",
            title1: "Everything you need for ",
            title2: "secure browsing",
            subtitle: "Built for simplicity and performance. No bloat, no complexity — just fast, reliable VPN.",
            items: [
                {
                    title: "Fast & stable routes",
                    description: "Premium servers optimized for speed and reliability. No throttling, no random disconnects.",
                },
                {
                    title: "Fresh server list",
                    description: "Auto-updated servers ensure you always have working connections. No manual maintenance needed.",
                },
                {
                    title: "Easy import",
                    description: "Simple copy/paste workflow. Just tap the key, paste into your app, and you're connected.",
                },
                {
                    title: "Multi-platform support",
                    description: "Works seamlessly on iOS, Android, Windows, and macOS. One subscription, all devices.",
                },
                {
                    title: "Privacy-first",
                    description: "We don't collect unnecessary data. Your connection, your privacy. No logs, no tracking.",
                },
                {
                    title: "Clean chat experience",
                    description: "Auto-delete messages keep your Telegram tidy. Keys are stored securely in your account.",
                },
            ],
        },
        apps: {
            badge: "Supported Apps",
            title1: "Works on ",
            title2: "all your devices",
            subtitle: "Choose your platform and follow the simple setup guide.",
            recommended: "Recommended app:",
            howToImport: "How to import",
            needHelp: "Need help?",
            contactSupport: "Contact support",
            downloadApp: "Download App",
            platforms: {
                ios: {
                    name: "iOS / macOS",
                    appName: "HAPP",
                    appLink: "https://apps.apple.com/us/app/happ-proxy-utility/id6504287215",
                    videoPath: "/assets/ios.mp4",
                    steps: [
                        "Download HAPP from the App Store",
                        "Copy your VLESS key from Telegram bot",
                        "Open HAPP → tap '+' → 'Import from Clipboard'",
                        "Select the server and tap Connect",
                    ],
                },
                android: {
                    name: "Android",
                    appName: "HAPP",
                    appLink: "https://play.google.com/store/apps/details?id=com.happproxy",
                    videoPath: "/assets/android.mp4",
                    steps: [
                        "Download HAPP from Google Play",
                        "Copy your VLESS key from Telegram bot",
                        "Open HAPP → tap '+' → 'Import from Clipboard'",
                        "Select the server and tap Connect",
                    ],
                },
                windows: {
                    name: "Windows",
                    appName: "Hiddify",
                    appLink: "https://github.com/hiddify/hiddify-next/releases",
                    videoPath: "/assets/windows.mp4",
                    steps: [
                        "Download Hiddify from GitHub or official site",
                        "Copy your VLESS key from Telegram bot",
                        "Open Hiddify → click '+' → 'Add from Clipboard'",
                        "Select the server and click Connect",
                    ],
                },
            },
        },
        technology: {
            badge: "Modern Technologies",
            title1: "Advanced ",
            title2: "Security & Performance",
            subtitle: "Enterprise-grade infrastructure built for speed, privacy, and reliability.",
            modernTech: {
                title: "Modern Technologies",
                items: [
                    {
                        title: "Strongest Encryption",
                        description: "AES-256 with perfect forward secrecy",
                    },
                    {
                        title: "Global Network",
                        description: "Servers in 16+ countries worldwide",
                    },
                    {
                        title: "NVMe Servers",
                        description: "High-performance hardware infrastructure",
                    },
                    {
                        title: "Multi-hop Tunnels",
                        description: "Double encryption for maximum security",
                    },
                ],
            },
            maxProtection: {
                title: "Maximum Data Protection",
                items: [
                    {
                        title: "Cryptographically Secure Encryption",
                        description: "AES-256-GCM encryption with perfect forward secrecy",
                    },
                    {
                        title: "Strict No-Logs Policy",
                        description: "We don't store logs of your activity",
                    },
                    {
                        title: "Leak Protection",
                        description: "Continuous work to prevent DNS and IP leaks",
                    },
                ],
            },
        },
        common: {
            backToTop: "Back to top",
        },
        reviews: {
            badge: "Reviews",
            title1: "Trusted by ",
            title2: "thousands",
            subtitle: "See what our users say about their experience with PROVPN.",
            items: [
                {
                    name: "Alex D.",
                    role: "Software Developer",
                    text: "Incredibly fast setup. I was connected in under 2 minutes. The Telegram bot makes everything so convenient — no apps to download, no accounts to create.",
                },
                {
                    name: "Maria K.",
                    role: "Digital Nomad",
                    text: "Been using PROVPN for 3 months now. The servers are super stable, and I love that I can just use /keys to get my configs anytime. Perfect for traveling.",
                },
                {
                    name: "James T.",
                    role: "Freelance Designer",
                    text: "Finally a VPN that just works. No complicated setup, no bloated apps. Copy, paste, connect. The VLESS protocol is noticeably faster than my old VPN.",
                },
                {
                    name: "Sarah L.",
                    role: "Student",
                    text: "The auto-delete feature is genius. My Telegram stays clean, but I can always get my keys back. Great for privacy-conscious users like me.",
                },
                {
                    name: "Michael B.",
                    role: "Remote Worker",
                    text: "Works flawlessly on all my devices. iOS, Android, and my Windows PC — same keys work everywhere. Support team is responsive too.",
                },
                {
                    name: "Emma W.",
                    role: "Content Creator",
                    text: "I was skeptical about a Telegram-based VPN, but this is actually brilliant. Simple, fast, and reliable. Exactly what I needed.",
                },
            ],
        },
        contact: {
            badge: "Support",
            title: "Need help?",
            subtitle: "Our support team is here to help. Reach out through Telegram for the fastest response.",
            telegram: "Telegram Support",
            email: "Email Us",
            ctaTitle: "Ready to get started?",
            ctaDesc: "Join thousands of users who trust PROVPN for their daily browsing. Start for free.",
            ctaButton: "Open Telegram Bot",
        },
        footer: {
            rights: "All rights reserved.",
            builtBy: "Built with care by",
        },
    },
    ru: {
        nav: {
            howItWorks: "Как это работает",
            features: "Преимущества",
            apps: "Приложения",
            reviews: "Отзывы",
            openBot: "Открыть бота",
        },
        hero: {
            badge: "Быстрый и стабильный VLESS VPN через Telegram",
            title1: "PROVPN — быстрый и ",
            title2: "стабильный VPN",
            ctaStart: "Открыть Telegram бота",
            ctaView: "Инструкция",
            trust: {
                keys: "5 ключей на пользователя",
                protocol: "VLESS / Reality",
                platforms: "iOS • Android • Windows",
                servers: "Авто-обновление серверов",
            },
        },
        howItWorks: {
            badge: "Как это работает",
            title1: "Подключение в ",
            title2: "3 простых шага",
            subtitle: "Никаких сложных настроек. Технические знания не требуются. Просто следуйте этим шагам.",
            step1: {
                title: "Запустите в Telegram",
                description: "Откройте нашего бота и нажмите /start. Без регистрации и анкет — просто нажми и лети.",
            },
            step2: {
                title: "Получите 5 ключей",
                description: "Мгновенно получите 5 свежих VLESS ключей. Они надежно привязаны к вашему Telegram аккаунту.",
            },
            step3: {
                title: "Импорт и подключение",
                description: "Скопируйте ключ, вставьте в VPN-приложение и подключайтесь. Вы в сети за секунды.",
            },
            proTip: "Совет",
            proTipDesc: "Ключи удаляются из чата для чистоты, но не волнуйтесь — они всегда сохранены. Используйте команду /keys, чтобы получить их в любой момент.",
        },
        features: {
            badge: "Преимущества",
            title1: "Все, что нужно для ",
            title2: "безопасного интернета",
            subtitle: "Создано для простоты и производительности. Ничего лишнего — только быстрый и надежный VPN.",
            items: [
                {
                    title: "Быстрые и стабильные маршруты",
                    description: "Премиальные серверы, оптимизированные для скорости. Без ограничений и внезапных обрывов.",
                },
                {
                    title: "Свежий список серверов",
                    description: "Автоматическое обновление гарантирует рабочее соединение. Настройка вручную не требуется.",
                },
                {
                    title: "Легкий импорт",
                    description: "Простой рабочий процесс: скопировал ключ, вставил в приложение и ты уже в сети.",
                },
                {
                    title: "Поддержка всех платформ",
                    description: "Работает на iOS, Android, Windows и macOS. Одна подписка для всех ваших устройств.",
                },
                {
                    title: "Приватность превыше всего",
                    description: "Мы не собираем лишние данные. Ваше соединение — ваша анонимность. Без логов и слежки.",
                },
                {
                    title: "Чистота в Telegram",
                    description: "Автоматическое удаление сообщений держит ваш чат в порядке. Ключи всегда доступны в базе.",
                },
            ],
        },
        apps: {
            badge: "Поддерживаемые приложения",
            title1: "Работает на ",
            title2: "всех ваших устройствах",
            subtitle: "Выберите свою платформу и следуйте простому руководству по настройке.",
            recommended: "Рекомендуемое приложение:",
            howToImport: "Как настроить",
            needHelp: "Нужна помощь?",
            contactSupport: "Поддержка",
            downloadApp: "Скачать приложение",
            platforms: {
                ios: {
                    name: "iOS / macOS",
                    appName: "HAPP",
                    appLink: "https://apps.apple.com/us/app/happ-proxy-utility/id6504287215",
                    videoPath: "/assets/ios.mp4",
                    steps: [
                        "Скачайте HAPP из App Store",
                        "Скопируйте ваш VLESS ключ в Telegram боте",
                        "Откройте HAPP → нажмите '+' → 'Import from Clipboard'",
                        "Выберите сервер и нажмите Connect",
                    ],
                },
                android: {
                    name: "Android",
                    appName: "HAPP",
                    appLink: "https://play.google.com/store/apps/details?id=com.happproxy",
                    videoPath: "/assets/android.mp4",
                    steps: [
                        "Скачайте HAPP из Google Play",
                        "Скопируйте ваш VLESS ключ в Telegram боте",
                        "Откройте HAPP → нажмите '+' → 'Import from Clipboard'",
                        "Выберите сервер и нажмите Connect",
                    ],
                },
                windows: {
                    name: "Windows",
                    appName: "Hiddify",
                    appLink: "https://github.com/hiddify/hiddify-next/releases",
                    videoPath: "/assets/windows.mp4",
                    steps: [
                        "Скачайте Hiddify с GitHub или оф. сайта",
                        "Скопируйте ваш VLESS ключ в Telegram боте",
                        "Откройте Hiddify → нажмите '+' → 'Add from Clipboard'",
                        "Выберите сервер и нажмите Connect",
                    ],
                },
            },
        },
        technology: {
            badge: "Современные технологии",
            title1: "Продвинутая ",
            title2: "безопасность и производительность",
            subtitle: "Инфраструктура корпоративного уровня для скорости, приватности и надежности.",
            modernTech: {
                title: "Современные технологии",
                items: [
                    {
                        title: "Сильнейшее шифрование",
                        description: "AES-256 с perfect forward secrecy",
                    },
                    {
                        title: "Глобальная сеть",
                        description: "Серверы в более чем 16 странах",
                    },
                    {
                        title: "NVMe сервера",
                        description: "Высокопроизводительное оборудование",
                    },
                    {
                        title: "Multi-hop туннели",
                        description: "Двойное шифрование трафика",
                    },
                ],
            },
            maxProtection: {
                title: "Максимальная защита ваших данных",
                items: [
                    {
                        title: "Криптографически устойчивое шифрование",
                        description: "AES-256-GCM шифрование с perfect forward secrecy",
                    },
                    {
                        title: "Строгая политика No-Logs",
                        description: "Мы не храним логи вашей активности",
                    },
                    {
                        title: "Защита от утечек",
                        description: "Мы постоянно работаем над предотвращением DNS и IP утечек",
                    },
                ],
            },
        },
        common: {
            backToTop: "Наверх",
        },
        reviews: {
            badge: "Отзывы",
            title1: "Нам доверяют ",
            title2: "тысячи",
            subtitle: "Посмотрите, что говорят наши пользователи об опыте работы с PROVPN.",
            items: [
                {
                    name: "Алексей Д.",
                    role: "Разработчик",
                    text: "Невероятно быстрая настройка. Подключился меньше чем за 2 минуты. Telegram бот — это очень удобно: не нужно ничего регистрировать.",
                },
                {
                    name: "Мария К.",
                    role: "Цифровой кочевник",
                    text: "Пользуюсь PROVPN уже 3 месяца. Серверы супер-стабильные. Здорово, что можно просто написать /keys в боте и получить настройки за секунду.",
                },
                {
                    name: "Ярослав Т.",
                    role: "Дизайнер-фрилансер",
                    text: "Наконец-то VPN, который просто работает. Без перегруженных приложений. Скопировал, вставил, подключился. VLESS заметно быстрее моего старого VPN.",
                },
                {
                    name: "Сара Л.",
                    role: "Студентка",
                    text: "Автоматическое удаление сообщений — это гениально. В телеграме порядок, но ключи всегда можно вернуть. Отлично для тех, кто ценит приватность.",
                },
                {
                    name: "Михаил Б.",
                    role: "Удаленный сотрудник",
                    text: "Безупречно работает на всех устройствах. iOS, Android и ПК — везде одни и те же ключи. Поддержка тоже отвечает быстро.",
                },
                {
                    name: "Эмма В.",
                    role: "Контент-мейкер",
                    text: "Сначала скептически относилась к VPN через Telegram, но это на самом деле блестяще. Просто, быстро и надежно. Именно то, что мне было нужно.",
                },
            ],
        },
        contact: {
            badge: "Поддержка",
            title: "Нужна помощь?",
            subtitle: "Наша команда поддержки готова помочь. Пишите в Telegram для максимально быстрого ответа.",
            telegram: "Поддержка в Telegram",
            email: "Напишите нам",
            ctaTitle: "Готовы начать?",
            ctaDesc: "Присоединяйтесь к тысячам пользователей, которые доверяют PROVPN каждый день. Начните бесплатно.",
            ctaButton: "Открыть Telegram бота",
        },
        footer: {
            rights: "Все права защищены.",
            builtBy: "Сделано с любовью в",
        },
    },
}

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => any
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("ru") // Default to RU as requested

    useEffect(() => {
        const saved = localStorage.getItem("language") as Language
        if (saved && (saved === "en" || saved === "ru")) {
            setLanguage(saved)
        }
    }, [])

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang)
        localStorage.setItem("language", lang)
    }

    const t = (path: string): any => {
        const keys = path.split(".")
        let result: any = translations[language]
        for (const key of keys) {
            if (result && typeof result === "object" && result[key] !== undefined) {
                result = result[key]
            } else {
                return path
            }
        }
        return result
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useTranslation() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error("useTranslation must be used within a LanguageProvider")
    }
    return context
}
