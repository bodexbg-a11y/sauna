'use client';

import { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Flame, Leaf, Menu, Ruler, ShieldCheck, Sparkles, X } from 'lucide-react';

const models = [
  { name: 'Тайга 12', area: '12 м²', people: 'до 4 человек', price: 'от 1 890 000 ₽', image: '/images/sauna-exterior.jpg', tag: 'Бестселлер' },
  { name: 'Север 18', area: '18 м²', people: 'до 6 человек', price: 'от 2 490 000 ₽', image: '/images/sauna-panoramic.jpg', tag: 'Панорамная' },
  { name: 'Терра 24', area: '24 м²', people: 'до 8 человек', price: 'от 3 290 000 ₽', image: '/images/sauna-dark.jpg', tag: 'С террасой' },
];

const steps = [
  ['01', 'Знакомимся', 'Узнаём о вашем участке, сценариях отдыха и пожеланиях к архитектуре.'],
  ['02', 'Проектируем', 'Адаптируем планировку, материалы и комплектацию. Фиксируем смету.'],
  ['03', 'Производим', 'Собираем модуль в тёплом цеху с контролем качества на каждом этапе.'],
  ['04', 'Доставляем', 'Устанавливаем, подключаем коммуникации и проводим первый запуск.'],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [selected, setSelected] = useState('Тайга 12');

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main>
      <section className="hero" id="top">
        <div className="hero-image" aria-hidden="true" /><div className="hero-shade" aria-hidden="true" />
        <header className="site-header shell">
          <a className="brand" href="#top" aria-label="Тепло — на главную"><span className="brand-mark">Т</span><span>ТЕПЛО</span></a>
          <nav className="desktop-nav" aria-label="Основная навигация"><a href="#models">Модели</a><a href="#process">Как мы работаем</a><a href="#about">О производстве</a></nav>
          <a className="header-cta" href="#contact">Обсудить проект <ArrowUpRight size={16} /></a>
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Открыть меню" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
        </header>
        {menuOpen && <nav className="mobile-menu"><a onClick={() => setMenuOpen(false)} href="#models">Модели</a><a onClick={() => setMenuOpen(false)} href="#process">Процесс</a><a onClick={() => setMenuOpen(false)} href="#contact">Получить расчёт</a></nav>}
        <div className="hero-content shell">
          <div className="hero-kicker"><span /> Модульные сауны с доставкой</div>
          <h1>Тишина,<br />собранная<br />из дерева.</h1>
          <div className="hero-bottom"><p>Создаём архитектурные сауны под ключ — от первого эскиза до первого пара на вашем участке.</p><a className="primary-btn" href="#contact">Получить расчёт <ArrowUpRight size={18} /></a></div>
        </div>
        <a className="scroll-cue" href="#models" aria-label="Прокрутить к моделям"><ArrowDown size={18} /></a><div className="hero-index">01 <span>/</span> 04</div>
      </section>

      <section className="intro shell" id="about">
        <p className="eyebrow">Продумано до мелочей</p><h2>Не просто сауна.<br /><em>Ваше место силы.</em></h2>
        <div className="intro-grid"><p>Мы соединяем северную традицию, современную архитектуру и точное производство. Сауна приезжает на участок готовой — вам остаётся только замедлиться.</p><div className="stat"><strong>30</strong><span>дней<br />до установки</span></div><div className="stat"><strong>5</strong><span>лет<br />гарантии</span></div></div>
      </section>

      <section className="models-section" id="models">
        <div className="shell section-head"><div><p className="eyebrow">Коллекция</p><h2>Выберите свой<br /><em>ритм тепла</em></h2></div><p>Три выверенных формата. Каждый можно адаптировать под участок, вид из окна и ваши привычки.</p></div>
        <div className="models-grid shell">
          {models.map((model, i) => <article className="model-card" key={model.name}>
            <div className="model-photo"><img src={model.image} alt={`Модульная сауна ${model.name}`} /><span>{model.tag}</span><div className="model-number">0{i + 1}</div></div>
            <div className="model-info"><div><h3>{model.name}</h3><p>{model.area} · {model.people}</p></div><div><strong>{model.price}</strong><button onClick={() => { setSelected(model.name); document.querySelector('#contact')?.scrollIntoView(); }} aria-label={`Рассчитать ${model.name}`}><ArrowUpRight /></button></div></div>
          </article>)}
        </div>
      </section>

      <section className="craft shell">
        <div className="craft-image"><img src="/images/sauna-interior.jpg" alt="Интерьер сауны с панорамным окном" /><span>Натуральная термоосина</span></div>
        <div className="craft-copy"><p className="eyebrow">Честные материалы</p><h2>Тепло, которое<br /><em>чувствуется</em></h2><p>Внутри — только отборное дерево, безопасные пропитки и инженерия, рассчитанная на русскую зиму. Никакой имитации: всё настоящее.</p>
          <ul><li><Leaf /><span><b>Дерево класса A</b>Без сучков, смолы и химического запаха</span></li><li><Flame /><span><b>Печь Harvia или HUUM</b>Мягкий пар и точное управление</span></li><li><ShieldCheck /><span><b>Всесезонное утепление</b>Комфорт от −35°C до +40°C</span></li></ul>
        </div>
      </section>

      <section className="process" id="process"><div className="shell"><div className="section-head light"><div><p className="eyebrow">От идеи до пара</p><h2>Берём всё<br /><em>на себя</em></h2></div><p>Один договор, прозрачная смета и персональный менеджер на всём пути.</p></div><div className="steps">{steps.map(([n,title,text]) => <div className="step" key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>

      <section className="panorama"><img src="/images/sauna-dark.jpg" alt="Современный интерьер сауны в тёмном дереве" /><div className="panorama-copy"><Sparkles /><p>Панорамное остекление<br />стирает границу между<br />сауной и природой.</p></div></section>

      <section className="contact shell" id="contact">
        <div className="contact-copy"><p className="eyebrow">Ваш проект начинается здесь</p><h2>Рассчитаем сауну<br /><em>для вашего участка</em></h2><p>Оставьте контакты — специалист позвонит, ответит на вопросы и подготовит предварительный расчёт в течение дня.</p><div className="contact-note"><Ruler /><span>Бесплатно подготовим схему размещения на участке</span></div></div>
        <div className="form-card">
          {sent ? <div className="success"><span><Check /></span><h3>Заявка уже у нас</h3><p>Спасибо! Свяжемся с вами в рабочее время и всё спокойно обсудим.</p><button onClick={() => setSent(false)}>Отправить ещё одну</button></div> : <form onSubmit={submitForm}>
            <div className="form-top"><span>Короткая форма</span><span>≈ 1 минута</span></div>
            <label>Как к вам обращаться?<input name="name" placeholder="Ваше имя" required /></label>
            <label>Телефон<input name="phone" type="tel" placeholder="+7 (___) ___-__-__" required /></label>
            <fieldset><legend>Интересующая модель</legend><div className="model-options">{models.map(m => <button type="button" className={selected === m.name ? 'active' : ''} onClick={() => setSelected(m.name)} key={m.name}>{m.name}</button>)}</div></fieldset>
            <button className="submit-btn" type="submit">Получить расчёт <ArrowRight /></button><small>Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</small>
          </form>}
        </div>
      </section>

      <footer><div className="shell footer-top"><div className="brand"><span className="brand-mark">Т</span><span>ТЕПЛО</span></div><p>Модульные сауны,<br />в которых хочется остаться.</p><a href="#top">Наверх <ArrowUpRight /></a></div><div className="shell footer-bottom"><span>© 2026 ТЕПЛО</span><span>Москва · Санкт-Петербург · доставка по России</span><span>+7 800 555-24-24</span></div></footer>
    </main>
  );
}
