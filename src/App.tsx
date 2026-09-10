import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDown, ArrowRight, ArrowUpRight, Check, Flame, Gauge, Leaf,
  Menu, MoveRight, Ruler, ShieldCheck, Sparkles, Thermometer, X,
} from 'lucide-react';

const models = [
  { name: 'Карпати 12', area: '12 м²', people: 'до 4 осіб', price: 'від 219 000 ₴', image: '/images/sauna-exterior.jpg', tag: 'Бестселер', plan: 'Парна · душ · тамбур' },
  { name: 'Полісся 18', area: '18 м²', people: 'до 6 осіб', price: 'від 329 000 ₴', image: '/images/sauna-panoramic.jpg', tag: 'Панорамна', plan: 'Парна · душ · lounge' },
  { name: 'Терра 24', area: '24 м²', people: 'до 8 осіб', price: 'від 429 000 ₴', image: '/images/sauna-dark.jpg', tag: 'З терасою', plan: 'Парна · SPA · тераса' },
];

const sizes = [
  { label: '12 м²', model: 'Карпати 12', price: 219000, people: '2–4' },
  { label: '18 м²', model: 'Полісся 18', price: 329000, people: '4–6' },
  { label: '24 м²', model: 'Терра 24', price: 429000, people: '6–8' },
];
const finishes = [
  { label: 'Термоосика', price: 0 },
  { label: 'Канадський кедр', price: 24000 },
  { label: 'Темний абаш', price: 39000 },
];
const heaters = [
  { label: 'Harvia', price: 0 },
  { label: 'HUUM Drop', price: 22000 },
  { label: 'Дров’яна', price: 29000 },
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

function CountUp({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const duration = 1300;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(to * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [to]);

  return <strong>{prefix}{value}<small>{suffix}</small></strong>;
}

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [size, setSize] = useState(1);
  const [finish, setFinish] = useState(0);
  const [heater, setHeater] = useState(1);
  const selectedModel = sizes[size].model;
  const estimate = useMemo(() => sizes[size].price + finishes[finish].price + heaters[heater].price, [size, finish, heater]);

  useEffect(() => {
    const main = mainRef.current;
    const hero = heroRef.current;
    if (!main || !hero) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealItems = Array.from(main.querySelectorAll<HTMLElement>('[data-reveal]'));
    let observer: IntersectionObserver | undefined;

    if (reducedMotion) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
    } else {
      main.classList.add('motion-ready');
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      revealItems.forEach((item) => observer?.observe(item));
    }

    let frame = 0;
    const updateScrollMotion = () => {
      frame = 0;
      const scrollTop = window.scrollY;
      const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      main.style.setProperty('--scroll-progress', String(Math.min(scrollTop / scrollable, 1)));
      if (!reducedMotion && scrollTop < window.innerHeight * 1.25) {
        hero.style.setProperty('--hero-shift', `${Math.min(scrollTop * 0.16, 120)}px`);
        hero.style.setProperty('--hero-copy-shift', `${Math.min(scrollTop * 0.065, 48)}px`);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateScrollMotion);
    };

    updateScrollMotion();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  function trackHeroLight(e: React.PointerEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--spot-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    e.currentTarget.style.setProperty('--spot-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  }

  function toContact() {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main ref={mainRef}>
      <div className="scroll-progress" aria-hidden="true" />
      <section className="hero" id="top" ref={heroRef} onPointerMove={trackHeroLight}>
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-light" aria-hidden="true" />
        <header className="site-header shell">
          <a className="brand" href="#top" aria-label="Тепло — на головну"><span className="brand-mark">Т</span><span>ТЕПЛО</span></a>
          <nav className="desktop-nav" aria-label="Основна навігація"><a href="#models">Колекція</a><a href="#configurator">Конфігуратор</a><a href="#technology">Технологія</a><a href="#process">Процес</a></nav>
          <a className="header-cta" href="#contact">Обговорити проєкт <ArrowUpRight size={16} /></a>
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Відкрити меню" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
        </header>
        {menuOpen && <nav className="mobile-menu"><a onClick={() => setMenuOpen(false)} href="#models">Колекція</a><a onClick={() => setMenuOpen(false)} href="#configurator">Конфігуратор</a><a onClick={() => setMenuOpen(false)} href="#technology">Технологія</a><a onClick={() => setMenuOpen(false)} href="#contact">Отримати прорахунок</a></nav>}

        <div className="hero-content shell">
          <div className="hero-kicker"><span /> Авторські модульні сауни · Україна</div>
          <h1><span className="hero-title-line"><span>Архітектура</span></span><span className="hero-title-line second"><span><em>вашої тиші.</em></span></span></h1>
          <div className="hero-bottom">
            <div><p>Створюємо приватний SPA‑простір, який приїжджає на вашу ділянку готовим. Від ескізу до першої пари — від 30 днів.</p><div className="hero-proof"><Check size={15} /> Ціна зафіксована в договорі</div></div>
            <a className="primary-btn" href="#configurator">Створити свою сауну <ArrowUpRight size={18} /></a>
          </div>
        </div>

        <aside className="hero-dashboard" aria-label="Ключові показники">
          <div><span>готовність</span><CountUp to={90} suffix="%" /><p>до приїзду<br />на ділянку</p></div>
          <div><span>комфорт</span><CountUp to={30} prefix="−" suffix="°C" /><p>всесезонна<br />експлуатація</p></div>
        </aside>
        <a className="scroll-cue" href="#manifesto" aria-label="Дивитися далі"><ArrowDown size={18} /></a>
        <span className="hero-coordinate">50.4501° N / 30.5234° E</span>
      </section>

      <div className="trust-ticker" aria-label="Наші переваги"><div><span>30–45 днів виробництво</span><i>◆</i><span>5 років гарантії</span><i>◆</i><span>Монтаж за 1–2 дні</span><i>◆</i><span>Доставка по Україні</span><i>◆</i><span>Без прихованих платежів</span></div></div>

      <section className="manifesto shell" id="manifesto">
        <div className="manifesto-index" data-reveal>01 <span>Маніфест</span></div>
        <div data-reveal style={{ '--reveal-delay': '90ms' } as React.CSSProperties}><p className="eyebrow">Простір, що змінює стан</p><h2>Сауна не має виглядати<br />як господарська споруда.</h2><p className="manifesto-lead">Вона може бути найкрасивішим об’єктом на ділянці — точкою тяжіння, приватним ритуалом і архітектурою, яка з роками стає лише кращою.</p></div>
      </section>

      <section className="models-section" id="models">
        <div className="shell section-head" data-reveal><div><p className="eyebrow">Колекція / 03 моделі</p><h2>Три характери.<br /><em>Одна філософія.</em></h2></div><p>Ми вже вирішили найскладніше: пропорції, інженерію й ергономіку. Вам залишається обрати свій масштаб.</p></div>
        <div className="models-grid shell">
          {models.map((model, i) => <article className="model-card" key={model.name} data-reveal style={{ '--reveal-delay': `${i * 110}ms` } as React.CSSProperties}>
            <div className="model-photo"><img src={model.image} alt={`Модульна сауна ${model.name}`} /><span>{model.tag}</span><div className="model-number">0{i + 1}</div><button onClick={() => { setSize(i); document.querySelector('#configurator')?.scrollIntoView(); }} aria-label={`Налаштувати ${model.name}`}><ArrowUpRight /></button></div>
            <div className="model-info"><div><h3>{model.name}</h3><p>{model.area} · {model.people}</p></div><div><strong>{model.price}</strong><p>{model.plan}</p></div></div>
          </article>)}
        </div>
        <div className="signature-tier shell" data-reveal>
          <div><span>TEPLO / SIGNATURE</span><p>Індивідуальна архітектура</p></div>
          <strong>від 1 000 000 ₴</strong>
          <p>Унікальний проєкт без обмежень базової лінійки: персональна площа, фасад, SPA-сценарії та меблі на замовлення.</p>
          <a href="#contact">Обговорити Signature <ArrowUpRight size={18} /></a>
        </div>
      </section>

      <section className="configurator" id="configurator">
        <div className="shell configurator-grid">
          <div className="config-copy" data-reveal><p className="eyebrow">Конфігуратор</p><h2>Зберіть свою<br /><em>версію тепла</em></h2><p>Оберіть ключові параметри й одразу побачте орієнтовний бюджет. Точний кошторис підготуємо після короткої розмови.</p><div className="config-note"><Gauge /><span>Ціна оновлюється миттєво<br /><b>без реєстрації та дзвінків</b></span></div></div>
          <div className="config-panel" data-reveal style={{ '--reveal-delay': '120ms' } as React.CSSProperties}>
            <div className="config-progress"><span className="active">01</span><i /><span>02</span><i /><span>03</span></div>
            <fieldset><legend>Площа та місткість</legend><div className="option-grid three">{sizes.map((item, i) => <button key={item.label} type="button" onClick={() => setSize(i)} className={size === i ? 'active' : ''}><strong>{item.label}</strong><small>{item.people} осіб</small></button>)}</div></fieldset>
            <fieldset><legend>Оздоблення парної</legend><div className="option-grid">{finishes.map((item, i) => <button key={item.label} type="button" onClick={() => setFinish(i)} className={finish === i ? 'active' : ''}><span>{item.label}</span><small>{item.price ? `+ ${money.format(item.price)} ₴` : 'в базі'}</small></button>)}</div></fieldset>
            <fieldset><legend>Серце сауни</legend><div className="option-grid three">{heaters.map((item, i) => <button key={item.label} type="button" onClick={() => setHeater(i)} className={heater === i ? 'active' : ''}><Flame size={17} /><span>{item.label}</span></button>)}</div></fieldset>
            <div className="config-result"><div><span>Орієнтовна вартість</span><strong className="animated-price" key={estimate}>{money.format(estimate)} ₴</strong><small>модель {selectedModel} · готова до монтажу</small></div><div className="price-ring"><span>90%</span><small>готовності</small></div></div>
            <button className="config-cta" onClick={toContact}>Отримати точний кошторис <ArrowRight /></button>
          </div>
        </div>
      </section>

      <section className="technology" id="technology">
        <div className="shell section-head light" data-reveal><div><p className="eyebrow">Технологія TEPLO/CORE</p><h2>Тепло всередині.<br /><em>Тиша назовні.</em></h2></div><p>Власна система стіни з п’яти шарів тримає температуру, відводить вологу й захищає деревину десятиліттями.</p></div>
        <div className="shell wall-system">
          <div className="wall-visual" aria-label="П’ять шарів стіни сауни" data-reveal>
            <div className="wall-layer layer-1"><span>01</span></div><div className="wall-layer layer-2"><span>02</span></div><div className="wall-layer layer-3"><span>03</span></div><div className="wall-layer layer-4"><span>04</span></div><div className="wall-layer layer-5"><span>05</span></div>
            <div className="heat-line one" /><div className="heat-line two" /><div className="heat-line three" />
          </div>
          <ol className="wall-legend" data-reveal style={{ '--reveal-delay': '100ms' } as React.CSSProperties}><li><span>01</span><div><b>Термодерево</b><small>Фасад, стійкий до сонця й опадів</small></div></li><li><span>02</span><div><b>Вентильований контур</b><small>Природне відведення вологи</small></div></li><li><span>03</span><div><b>Кам’яна вата 150 мм</b><small>Стабільна температура без містків холоду</small></div></li><li><span>04</span><div><b>Фольгована пароізоляція</b><small>Відбиває тепло назад у парну</small></div></li><li><span>05</span><div><b>Термоосика класу A</b><small>Тактильна поверхня, що не перегрівається</small></div></li></ol>
        </div>
        <div className="shell tech-metrics" data-reveal><div><Thermometer /><strong>−30…+40°C</strong><span>робочий діапазон</span></div><div><Gauge /><strong>45 хв</strong><span>до робочої температури</span></div><div><ShieldCheck /><strong>5 років</strong><span>офіційної гарантії</span></div><div><Leaf /><strong>A+</strong><span>енергоефективність</span></div></div>
      </section>

      <section className="experience">
        <div className="experience-grid">
          <div className="experience-main" data-reveal><img src="/images/sauna-panoramic.jpg" alt="Панорамна парна з видом на природу" /><div className="image-caption">01 / Панорамна парна</div></div>
          <div className="experience-copy" data-reveal style={{ '--reveal-delay': '100ms' } as React.CSSProperties}><p className="eyebrow">Відчуття</p><blockquote>«Ми проєктуємо не квадратні метри. Ми проєктуємо момент, коли ви нарешті нікуди не поспішаєте».</blockquote><div className="signature">TEPLO / design unit</div></div>
          <div className="experience-small" data-reveal style={{ '--reveal-delay': '180ms' } as React.CSSProperties}><img src="/images/sauna-interior.jpg" alt="Деталі оздоблення модульної сауни" /><div className="image-caption">02 / Натуральні матеріали</div></div>
        </div>
      </section>

      <section className="included shell">
        <div className="section-head" data-reveal><div><p className="eyebrow">Уже в базовій комплектації</p><h2>Жодних<br /><em>«це рахується окремо».</em></h2></div><p>Показуємо чесну комплектацію ще до договору. Те, що потрібно для повноцінного запуску, вже всередині.</p></div>
        <div className="included-grid"><div><span>01</span><Flame /><h3>Піч і каміння</h3><p>Розраховані під об’єм парної, із захисним екраном.</p></div><div><span>02</span><Sparkles /><h3>Повне освітлення</h3><p>М’які LED‑сценарії в парній, душі та lounge‑зоні.</p></div><div><span>03</span><Ruler /><h3>Інженерія</h3><p>Електрика, водопровід, каналізація та вентиляція.</p></div><div><span>04</span><ShieldCheck /><h3>Монтаж</h3><p>Встановлення модуля й підключення на вашій ділянці.</p></div></div>
      </section>

      <section className="process" id="process"><div className="shell"><div className="section-head light" data-reveal><div><p className="eyebrow">Шлях до першої пари</p><h2>Складне — нам.<br /><em>Задоволення — вам.</em></h2></div><p>Від першого повідомлення до запуску у вас є одна контактна особа й прозорий план.</p></div><div className="steps">{steps.map(([n,title,text], i) => <div className="step" key={n} data-reveal style={{ '--reveal-delay': `${i * 90}ms` } as React.CSSProperties}><span>{n}</span><h3>{title}</h3><p>{text}</p><MoveRight /></div>)}</div></div></section>

      <section className="faq shell" id="faq"><div className="faq-title" data-reveal><p className="eyebrow">Без дрібного шрифту</p><h2>Відповідаємо<br /><em>чесно.</em></h2><p>Залишилися питання? Напишіть нам — архітектор відповість особисто.</p><a href="#contact">Поставити своє питання <ArrowUpRight /></a></div><div className="faq-list" data-reveal style={{ '--reveal-delay': '100ms' } as React.CSSProperties}>{faqs.map(([q,a], i) => <details key={q}><summary><span className="faq-num">0{i + 1}</span><b>{q}</b><span className="faq-toggle">+</span></summary><div className="faq-answer"><p>{a}</p></div></details>)}</div></section>

      <section className="contact" id="contact">
        <div className="contact-backdrop" />
        <div className="shell contact-grid"><div className="contact-copy" data-reveal><p className="eyebrow">Почнімо з вашої ділянки</p><h2>Ваш простір.<br /><em>Ваш ритуал.</em></h2><p>Розкажіть, де стоятиме сауна. Ми запропонуємо оптимальну модель, покажемо планування та надішлемо персональний кошторис.</p><div className="contact-note"><Ruler /><span>Схема розміщення на ділянці — у подарунок</span></div></div>
          <div className="form-card" data-reveal style={{ '--reveal-delay': '110ms' } as React.CSSProperties}>{sent ? <div className="success"><span><Check /></span><p className="eyebrow">Готово</p><h3>Починаємо ваш проєкт</h3><p>Дякуємо! Архітектор зв’яжеться з вами в робочий час і все спокійно пояснить.</p><button onClick={() => setSent(false)}>Надіслати ще одну заявку</button></div> : <form onSubmit={submitForm}>
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
