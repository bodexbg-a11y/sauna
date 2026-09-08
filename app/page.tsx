'use client';

import { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Flame, Leaf, Menu, Ruler, ShieldCheck, Sparkles, X } from 'lucide-react';

const models = [
  { name: 'Карпати 12', area: '12 м²', people: 'до 4 осіб', price: 'від 790 000 ₴', image: '/images/sauna-exterior.jpg', tag: 'Бестселер' },
  { name: 'Полісся 18', area: '18 м²', people: 'до 6 осіб', price: 'від 1 090 000 ₴', image: '/images/sauna-panoramic.jpg', tag: 'Панорамна' },
  { name: 'Терра 24', area: '24 м²', people: 'до 8 осіб', price: 'від 1 390 000 ₴', image: '/images/sauna-dark.jpg', tag: 'З терасою' },
];

const steps = [
  ['01', 'Знайомимося', 'Дізнаємося про вашу ділянку, сценарії відпочинку та побажання до архітектури.'],
  ['02', 'Проєктуємо', 'Адаптуємо планування, матеріали й комплектацію. Фіксуємо фінальну вартість.'],
  ['03', 'Виготовляємо', 'Збираємо модуль у теплому цеху та перевіряємо якість на кожному етапі.'],
  ['04', 'Доставляємо', 'Встановлюємо, підключаємо комунікації та проводимо перший запуск.'],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [selected, setSelected] = useState('Карпати 12');

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main>
      <section className="hero" id="top">
        <div className="hero-image" aria-hidden="true" /><div className="hero-shade" aria-hidden="true" />
        <header className="site-header shell">
          <a className="brand" href="#top" aria-label="Тепло — на головну"><span className="brand-mark">Т</span><span>ТЕПЛО</span></a>
          <nav className="desktop-nav" aria-label="Основна навігація"><a href="#models">Моделі</a><a href="#process">Як ми працюємо</a><a href="#about">Про виробництво</a></nav>
          <a className="header-cta" href="#contact">Обговорити проєкт <ArrowUpRight size={16} /></a>
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Відкрити меню" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
        </header>
        {menuOpen && <nav className="mobile-menu"><a onClick={() => setMenuOpen(false)} href="#models">Моделі</a><a onClick={() => setMenuOpen(false)} href="#process">Як ми працюємо</a><a onClick={() => setMenuOpen(false)} href="#contact">Отримати розрахунок</a></nav>}
        <div className="hero-content shell">
          <div className="hero-kicker"><span /> Виготовлення та доставка по Україні</div>
          <h1>Тиша,<br />створена<br />з дерева.</h1>
          <div className="hero-bottom"><div><p>Архітектурні модульні сауни під ключ — готові до першого пару вже за 30 днів.</p><div className="hero-proof"><Check size={15} /> Вартість фіксуємо в договорі</div></div><a className="primary-btn" href="#contact">Отримати прорахунок <ArrowUpRight size={18} /></a></div>
        </div>
        <a className="scroll-cue" href="#models" aria-label="Перейти до моделей"><ArrowDown size={18} /></a><div className="hero-index">01 <span>/</span> 04</div>
      </section>

      <section className="intro shell" id="about">
        <p className="eyebrow">Продумано до деталей</p><h2>Не просто сауна.<br /><em>Ваше місце сили.</em></h2>
        <div className="intro-grid"><p>Поєднуємо північну традицію, сучасну архітектуру й точне виробництво. Сауна приїжджає на ділянку готовою — вам залишається лише сповільнитися.</p><div className="stat"><strong>30</strong><span>днів<br />до монтажу</span></div><div className="stat"><strong>5</strong><span>років<br />гарантії</span></div></div>
      </section>

      <section className="models-section" id="models">
        <div className="shell section-head"><div><p className="eyebrow">Колекція</p><h2>Оберіть свій<br /><em>ритм тепла</em></h2></div><p>Три продумані формати. Кожен адаптуємо під вашу ділянку, краєвид і звички — без переплати за зайве.</p></div>
        <div className="models-grid shell">
          {models.map((model, i) => <article className="model-card" key={model.name}>
            <div className="model-photo"><img src={model.image} alt={`Модульна сауна ${model.name}`} /><span>{model.tag}</span><div className="model-number">0{i + 1}</div></div>
            <div className="model-info"><div><h3>{model.name}</h3><p>{model.area} · {model.people}</p></div><div><strong>{model.price}</strong><button onClick={() => { setSelected(model.name); document.querySelector('#contact')?.scrollIntoView(); }} aria-label={`Розрахувати ${model.name}`}><ArrowUpRight /></button></div></div>
          </article>)}
        </div>
      </section>

      <section className="craft shell">
        <div className="craft-image"><img src="/images/sauna-interior.jpg" alt="Інтер’єр сауни з панорамним вікном" /><span>Натуральна термоосика</span></div>
        <div className="craft-copy"><p className="eyebrow">Чесні матеріали</p><h2>Тепло, яке<br /><em>відчувається</em></h2><p>Усередині — добірна деревина, безпечні просочення та інженерія, розрахована на українські зими. Жодної імітації — лише матеріали, що служать роками.</p>
          <ul><li><Leaf /><span><b>Деревина класу A</b>Без сучків, смоли й хімічного запаху</span></li><li><Flame /><span><b>Піч Harvia або HUUM</b>М’яка пара й точне керування</span></li><li><ShieldCheck /><span><b>Всесезонне утеплення</b>Комфорт від −30°C до +40°C</span></li></ul>
        </div>
      </section>

      <section className="process" id="process"><div className="shell"><div className="section-head light"><div><p className="eyebrow">Від ідеї до першої пари</p><h2>Беремо все<br /><em>на себе</em></h2></div><p>Один договір, прозорий кошторис і персональний менеджер на всьому шляху.</p></div><div className="steps">{steps.map(([n,title,text]) => <div className="step" key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>

      <section className="panorama"><img src="/images/sauna-dark.jpg" alt="Сучасний інтер’єр сауни в темному дереві" /><div className="panorama-copy"><Sparkles /><p>Панорамне скління<br />стирає межу між<br />сауною та природою.</p></div></section>

      <section className="contact shell" id="contact">
        <div className="contact-copy"><p className="eyebrow">Ваш проєкт починається тут</p><h2>Отримайте ціну<br /><em>для вашої ділянки</em></h2><p>Залиште контакти — архітектор зателефонує, відповість на запитання та підготує персональний розрахунок протягом робочого дня.</p><div className="contact-note"><Ruler /><span>Безкоштовно підготуємо схему розміщення на ділянці</span></div></div>
        <div className="form-card">
          {sent ? <div className="success"><span><Check /></span><h3>Заявка вже у нас</h3><p>Дякуємо! Зв’яжемося з вами в робочий час і спокійно все обговоримо.</p><button onClick={() => setSent(false)}>Надіслати ще одну</button></div> : <form onSubmit={submitForm}>
            <div className="form-top"><span>Коротка форма</span><span>≈ 1 хвилина</span></div>
            <label>Як до вас звертатися?<input name="name" placeholder="Ваше ім’я" required /></label>
            <label>Телефон<input name="phone" type="tel" placeholder="+380 (__) ___-__-__" required /></label>
            <fieldset><legend>Модель, яка вас цікавить</legend><div className="model-options">{models.map(m => <button type="button" className={selected === m.name ? 'active' : ''} onClick={() => setSelected(m.name)} key={m.name}>{m.name}</button>)}</div></fieldset>
            <button className="submit-btn" type="submit">Отримати прорахунок <ArrowRight /></button><small>Натискаючи кнопку, ви погоджуєтеся з політикою конфіденційності</small>
          </form>}
        </div>
      </section>

      <footer><div className="shell footer-top"><div className="brand"><span className="brand-mark">Т</span><span>ТЕПЛО</span></div><p>Модульні сауни,<br />в яких хочеться залишитися.</p><a href="#top">Нагору <ArrowUpRight /></a></div><div className="shell footer-bottom"><span>© 2026 ТЕПЛО</span><span>Київ · Львів · доставка по Україні</span><span>+380 800 555 24 24</span></div></footer>
    </main>
  );
}
