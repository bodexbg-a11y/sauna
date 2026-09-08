'use client';

import { useMemo, useState } from 'react';
import {
  ArrowDown, ArrowRight, ArrowUpRight, Check, Flame, Gauge, Leaf,
  Menu, MoveRight, Ruler, ShieldCheck, Sparkles, Thermometer, X,
} from 'lucide-react';

const models = [
  { name: 'Карпати 12', area: '12 м²', people: 'до 4 осіб', price: 'від 790 000 ₴', image: '/images/sauna-exterior.jpg', tag: 'Бестселер', plan: 'Парна · душ · тамбур' },
  { name: 'Полісся 18', area: '18 м²', people: 'до 6 осіб', price: 'від 1 090 000 ₴', image: '/images/sauna-panoramic.jpg', tag: 'Панорамна', plan: 'Парна · душ · lounge' },
  { name: 'Терра 24', area: '24 м²', people: 'до 8 осіб', price: 'від 1 390 000 ₴', image: '/images/sauna-dark.jpg', tag: 'З терасою', plan: 'Парна · SPA · тераса' },
];

const sizes = [
  { label: '12 м²', model: 'Карпати 12', price: 790000, people: '2–4' },
  { label: '18 м²', model: 'Полісся 18', price: 1090000, people: '4–6' },
  { label: '24 м²', model: 'Терра 24', price: 1390000, people: '6–8' },
];
const finishes = [
  { label: 'Термоосика', price: 0 },
  { label: 'Канадський кедр', price: 145000 },
  { label: 'Темний абаш', price: 210000 },
];
const heaters = [
  { label: 'Harvia', price: 0 },
  { label: 'HUUM Drop', price: 82000 },
  { label: 'Дров’яна', price: 110000 },
];

const steps = [
  ['01', 'Знайомимося', 'Вивчаємо ділянку, ваші звички та краєвид, заради якого варто зробити панорамне вікно.'],
  ['02', 'Проєктуємо', 'Показуємо планування й матеріали, узгоджуємо деталі та фіксуємо ціну в договорі.'],
  ['03', 'Створюємо', 'Збираємо модуль у теплому цеху. Ви отримуєте фото й відео з кожного етапу.'],
  ['04', 'Запускаємо', 'Доставляємо, монтуємо за 1–2 дні та передаємо готову до використання сауну.'],
];

const faqs = [
  ['Скільки часу займає весь процес?', 'Типову сауну виготовляємо за 30–45 днів. Монтаж на підготовленій ділянці займає 1–2 дні.'],
  ['Чи потрібен фундамент?', 'Зазвичай достатньо гвинтових паль або бетонних блоків. Після огляду ділянки ми підготуємо точну схему основи.'],
  ['Можна змінити планування та матеріали?', 'Так. Базові моделі — це перевірена відправна точка. Розміри, оздоблення, тип печі, скління й терасу адаптуємо під вас.'],
  ['Як сауна поводиться взимку?', 'Контур утеплення розрахований на експлуатацію до −30°C. Парна швидко виходить на режим і довго тримає температуру.'],
  ['Що входить у вартість?', 'Каркас, фасад, внутрішнє оздоблення, електрика, сантехніка, піч, освітлення й базовий монтаж. Доставку рахуємо окремо за відстанню.'],
];

const money = new Intl.NumberFormat('uk-UA');

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [size, setSize] = useState(1);
  const [finish, setFinish] = useState(0);
  const [heater, setHeater] = useState(1);
  const selectedModel = sizes[size].model;
  const estimate = useMemo(() => sizes[size].price + finishes[finish].price + heaters[heater].price, [size, finish, heater]);

  function toContact() {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main>
      <section className="hero" id="top">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-shade" aria-hidden="true" />
        <header className="site-header shell">
          <a className="brand" href="#top" aria-label="Тепло — на головну"><span className="brand-mark">Т</span><span>ТЕПЛО</span></a>
          <nav className="desktop-nav" aria-label="Основна навігація"><a href="#models">Колекція</a><a href="#configurator">Конфігуратор</a><a href="#technology">Технологія</a><a href="#process">Процес</a></nav>
          <a className="header-cta" href="#contact">Обговорити проєкт <ArrowUpRight size={16} /></a>
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Відкрити меню" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
        </header>
        {menuOpen && <nav className="mobile-menu"><a onClick={() => setMenuOpen(false)} href="#models">Колекція</a><a onClick={() => setMenuOpen(false)} href="#configurator">Конфігуратор</a><a onClick={() => setMenuOpen(false)} href="#technology">Технологія</a><a onClick={() => setMenuOpen(false)} href="#contact">Отримати прорахунок</a></nav>}

        <div className="hero-content shell">
          <div className="hero-kicker"><span /> Авторські модульні сауни · Україна</div>
          <h1>Архітектура<br /><em>вашої тиші.</em></h1>
          <div className="hero-bottom">
            <div><p>Створюємо приватний SPA‑простір, який приїжджає на вашу ділянку готовим. Від ескізу до першої пари — від 30 днів.</p><div className="hero-proof"><Check size={15} /> Ціна зафіксована в договорі</div></div>
            <a className="primary-btn" href="#configurator">Створити свою сауну <ArrowUpRight size={18} /></a>
          </div>
        </div>

        <aside className="hero-dashboard" aria-label="Ключові показники">
          <div><span>готовність</span><strong>90<small>%</small></strong><p>до приїзду<br />на ділянку</p></div>
          <div><span>комфорт</span><strong>−30<small>°C</small></strong><p>всесезонна<br />експлуатація</p></div>
        </aside>
        <a className="scroll-cue" href="#manifesto" aria-label="Дивитися далі"><ArrowDown size={18} /></a>
        <span className="hero-coordinate">50.4501° N / 30.5234° E</span>
      </section>

      <div className="trust-ticker" aria-label="Наші переваги"><div><span>30–45 днів виробництво</span><i>◆</i><span>5 років гарантії</span><i>◆</i><span>Монтаж за 1–2 дні</span><i>◆</i><span>Доставка по Україні</span><i>◆</i><span>Без прихованих платежів</span></div></div>

      <section className="manifesto shell" id="manifesto">
        <div className="manifesto-index">01 <span>Маніфест</span></div>
        <div><p className="eyebrow">Простір, що змінює стан</p><h2>Сауна не має виглядати<br />як господарська споруда.</h2><p className="manifesto-lead">Вона може бути найкрасивішим об’єктом на ділянці — точкою тяжіння, приватним ритуалом і архітектурою, яка з роками стає лише кращою.</p></div>
      </section>

      <section className="models-section" id="models">
        <div className="shell section-head"><div><p className="eyebrow">Колекція / 03 моделі</p><h2>Три характери.<br /><em>Одна філософія.</em></h2></div><p>Ми вже вирішили найскладніше: пропорції, інженерію й ергономіку. Вам залишається обрати свій масштаб.</p></div>
        <div className="models-grid shell">
          {models.map((model, i) => <article className="model-card" key={model.name}>
            <div className="model-photo"><img src={model.image} alt={`Модульна сауна ${model.name}`} /><span>{model.tag}</span><div className="model-number">0{i + 1}</div><button onClick={() => { setSize(i); document.querySelector('#configurator')?.scrollIntoView(); }} aria-label={`Налаштувати ${model.name}`}><ArrowUpRight /></button></div>
            <div className="model-info"><div><h3>{model.name}</h3><p>{model.area} · {model.people}</p></div><div><strong>{model.price}</strong><p>{model.plan}</p></div></div>
          </article>)}
        </div>
      </section>

      <section className="configurator" id="configurator">
        <div className="shell configurator-grid">
          <div className="config-copy"><p className="eyebrow">Конфігуратор</p><h2>Зберіть свою<br /><em>версію тепла</em></h2><p>Оберіть ключові параметри й одразу побачте орієнтовний бюджет. Точний кошторис підготуємо після короткої розмови.</p><div className="config-note"><Gauge /><span>Ціна оновлюється миттєво<br /><b>без реєстрації та дзвінків</b></span></div></div>
          <div className="config-panel">
            <div className="config-progress"><span className="active">01</span><i /><span>02</span><i /><span>03</span></div>
            <fieldset><legend>Площа та місткість</legend><div className="option-grid three">{sizes.map((item, i) => <button key={item.label} type="button" onClick={() => setSize(i)} className={size === i ? 'active' : ''}><strong>{item.label}</strong><small>{item.people} осіб</small></button>)}</div></fieldset>
            <fieldset><legend>Оздоблення парної</legend><div className="option-grid">{finishes.map((item, i) => <button key={item.label} type="button" onClick={() => setFinish(i)} className={finish === i ? 'active' : ''}><span>{item.label}</span><small>{item.price ? `+ ${money.format(item.price)} ₴` : 'в базі'}</small></button>)}</div></fieldset>
            <fieldset><legend>Серце сауни</legend><div className="option-grid three">{heaters.map((item, i) => <button key={item.label} type="button" onClick={() => setHeater(i)} className={heater === i ? 'active' : ''}><Flame size={17} /><span>{item.label}</span></button>)}</div></fieldset>
            <div className="config-result"><div><span>Орієнтовна вартість</span><strong>{money.format(estimate)} ₴</strong><small>модель {selectedModel} · готова до монтажу</small></div><div className="price-ring"><span>90%</span><small>готовності</small></div></div>
            <button className="config-cta" onClick={toContact}>Отримати точний кошторис <ArrowRight /></button>
          </div>
        </div>
      </section>

      <section className="technology" id="technology">
        <div className="shell section-head light"><div><p className="eyebrow">Технологія TEPLO/CORE</p><h2>Тепло всередині.<br /><em>Тиша назовні.</em></h2></div><p>Власна система стіни з п’яти шарів тримає температуру, відводить вологу й захищає деревину десятиліттями.</p></div>
        <div className="shell wall-system">
          <div className="wall-visual" aria-label="П’ять шарів стіни сауни">
            <div className="wall-layer layer-1"><span>01</span></div><div className="wall-layer layer-2"><span>02</span></div><div className="wall-layer layer-3"><span>03</span></div><div className="wall-layer layer-4"><span>04</span></div><div className="wall-layer layer-5"><span>05</span></div>
            <div className="heat-line one" /><div className="heat-line two" /><div className="heat-line three" />
          </div>
          <ol className="wall-legend"><li><span>01</span><div><b>Термодерево</b><small>Фасад, стійкий до сонця й опадів</small></div></li><li><span>02</span><div><b>Вентильований контур</b><small>Природне відведення вологи</small></div></li><li><span>03</span><div><b>Кам’яна вата 150 мм</b><small>Стабільна температура без містків холоду</small></div></li><li><span>04</span><div><b>Фольгована пароізоляція</b><small>Відбиває тепло назад у парну</small></div></li><li><span>05</span><div><b>Термоосика класу A</b><small>Тактильна поверхня, що не перегрівається</small></div></li></ol>
        </div>
        <div className="shell tech-metrics"><div><Thermometer /><strong>−30…+40°C</strong><span>робочий діапазон</span></div><div><Gauge /><strong>45 хв</strong><span>до робочої температури</span></div><div><ShieldCheck /><strong>5 років</strong><span>офіційної гарантії</span></div><div><Leaf /><strong>A+</strong><span>енергоефективність</span></div></div>
      </section>

      <section className="experience">
        <div className="experience-grid">
          <div className="experience-main"><img src="/images/sauna-panoramic.jpg" alt="Панорамна парна з видом на природу" /><div className="image-caption">01 / Панорамна парна</div></div>
          <div className="experience-copy"><p className="eyebrow">Відчуття</p><blockquote>«Ми проєктуємо не квадратні метри. Ми проєктуємо момент, коли ви нарешті нікуди не поспішаєте».</blockquote><div className="signature">TEPLO / design unit</div></div>
          <div className="experience-small"><img src="/images/sauna-interior.jpg" alt="Деталі оздоблення модульної сауни" /><div className="image-caption">02 / Натуральні матеріали</div></div>
        </div>
      </section>

      <section className="included shell">
        <div className="section-head"><div><p className="eyebrow">Уже в базовій комплектації</p><h2>Жодних<br /><em>«це рахується окремо».</em></h2></div><p>Показуємо чесну комплектацію ще до договору. Те, що потрібно для повноцінного запуску, вже всередині.</p></div>
        <div className="included-grid"><div><span>01</span><Flame /><h3>Піч і каміння</h3><p>Розраховані під об’єм парної, із захисним екраном.</p></div><div><span>02</span><Sparkles /><h3>Повне освітлення</h3><p>М’які LED‑сценарії в парній, душі та lounge‑зоні.</p></div><div><span>03</span><Ruler /><h3>Інженерія</h3><p>Електрика, водопровід, каналізація та вентиляція.</p></div><div><span>04</span><ShieldCheck /><h3>Монтаж</h3><p>Встановлення модуля й підключення на вашій ділянці.</p></div></div>
      </section>

      <section className="process" id="process"><div className="shell"><div className="section-head light"><div><p className="eyebrow">Шлях до першої пари</p><h2>Складне — нам.<br /><em>Задоволення — вам.</em></h2></div><p>Від першого повідомлення до запуску у вас є одна контактна особа й прозорий план.</p></div><div className="steps">{steps.map(([n,title,text]) => <div className="step" key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p><MoveRight /></div>)}</div></div></section>

      <section className="faq shell" id="faq"><div className="faq-title"><p className="eyebrow">Без дрібного шрифту</p><h2>Відповідаємо<br /><em>чесно.</em></h2><p>Залишилися питання? Напишіть нам — архітектор відповість особисто.</p><a href="#contact">Поставити своє питання <ArrowUpRight /></a></div><div className="faq-list">{faqs.map(([q,a], i) => <details key={q}><summary><span className="faq-num">0{i + 1}</span><b>{q}</b><span className="faq-toggle">+</span></summary><div className="faq-answer"><p>{a}</p></div></details>)}</div></section>

      <section className="contact" id="contact">
        <div className="contact-backdrop" />
        <div className="shell contact-grid"><div className="contact-copy"><p className="eyebrow">Почнімо з вашої ділянки</p><h2>Ваш простір.<br /><em>Ваш ритуал.</em></h2><p>Розкажіть, де стоятиме сауна. Ми запропонуємо оптимальну модель, покажемо планування та надішлемо персональний кошторис.</p><div className="contact-note"><Ruler /><span>Схема розміщення на ділянці — у подарунок</span></div></div>
          <div className="form-card">{sent ? <div className="success"><span><Check /></span><p className="eyebrow">Готово</p><h3>Починаємо ваш проєкт</h3><p>Дякуємо! Архітектор зв’яжеться з вами в робочий час і все спокійно пояснить.</p><button onClick={() => setSent(false)}>Надіслати ще одну заявку</button></div> : <form onSubmit={submitForm}>
            <div className="form-top"><span>Персональний прорахунок</span><span>≈ 1 хвилина</span></div>
            <label>Як до вас звертатися?<input name="name" placeholder="Ваше ім’я" required /></label>
            <label>Телефон<input name="phone" type="tel" placeholder="+380 (__) ___-__-__" required /></label>
            <div className="chosen-model"><span>Обрана конфігурація</span><strong>{selectedModel} · {money.format(estimate)} ₴</strong></div>
            <button className="submit-btn" type="submit">Отримати пропозицію <ArrowRight /></button><small>Натискаючи кнопку, ви погоджуєтеся з політикою конфіденційності</small>
          </form>}</div>
        </div>
      </section>

      <footer><div className="shell footer-top"><div className="brand"><span className="brand-mark">Т</span><span>ТЕПЛО</span></div><p>Приватна архітектура<br />для вашого ритуалу тепла.</p><a href="#top">Нагору <ArrowUpRight /></a></div><div className="shell footer-bottom"><span>© 2026 ТЕПЛО</span><span>Київ · Львів · доставка по Україні</span><a href="tel:+3808005552424">+380 800 555 24 24</a></div></footer>
      <a className="mobile-sticky-cta" href="#configurator">Розрахувати сауну <ArrowUpRight /></a>
    </main>
  );
}
