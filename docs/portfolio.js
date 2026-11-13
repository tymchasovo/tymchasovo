(() => {
  const root=document.getElementById('ira-combined-draft');
  const entries={
    api:{label:'API & ИНТЕГРАЦИИ',icon:'workflow',title:'Проверяю связи между сервисами',text:'Тестирую внешние интеграции, локализую дефекты и проверяю согласованность данных и бизнес-логики.',tools:['Postman','Swagger','REST','WebSocket','Kafka']},
    data:{label:'ДАННЫЕ & ДИАГНОСТИКА',icon:'database',title:'Разбираюсь, что происходит внутри',text:'Проверяю данные, исследую поведение системы и локализую дефекты с помощью инструментов диагностики.',tools:['SQL','PostgreSQL','DBeaver','Grafana','DevTools','Charles Proxy']},
    mobile:{label:'MOBILE',icon:'smartphone',title:'Проверяю мобильные продукты',text:'Тестирую B2B-приложения на Android и iOS. Работаю с тестовыми сборками и инструментами диагностики.',tools:['Android','iOS','TestFlight','Xcode','BrowserStack','Charles Proxy']},
    web:{label:'WEB & UX',icon:'app-window',title:'Соединяю логику и удобство',text:'Тестирую веб-продукты, анализирую требования и макеты. Предлагаю улучшения интерфейсов и пользовательского опыта.',tools:['DevTools','BrowserStack','Charles Proxy']},
    ai:{label:'ИИ В QA',icon:'sparkles',title:'Использую ИИ в работе QA',text:'В моём рабочем наборе — инструменты ИИ. Отдельный интерес — скиллы для повседневных QA-задач.',tools:['ChatGPT','DeepSeek','Codex','Claude']}
  };
  let focus='api';
  function showFocus(key) {
    const item=entries[key];
    if(!item)return;
    focus=key;
    root.querySelector('.ip-focus-caption').textContent=item.label;
    root.querySelector('#ip-focus-title').textContent=item.title;
    root.querySelector('#ip-focus-text').textContent=item.text;
    root.querySelector('#ip-focus-tools').replaceChildren(...item.tools.map(name=>{const tag=document.createElement('span');tag.textContent=name;return tag;}));
    const icon=document.createElement('i');icon.setAttribute('data-lucide',item.icon);icon.setAttribute('aria-hidden','true');
    root.querySelector('.ip-focus-icon').replaceChildren(icon);
    if(globalThis.lucide)lucide.createIcons({attrs:{width:24,height:24}});
    root.querySelectorAll('[data-focus]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.focus===key)));
  }

  const storageKey='tymchasovo-portfolio-state-v1';
  function remember() {
    try { localStorage.setItem(storageKey,JSON.stringify({focus,expandedJobs:[...root.querySelectorAll('details[open]')].map(el=>el.dataset.job)})); } catch {}
  }
  let saved={};
  try { saved=JSON.parse(localStorage.getItem(storageKey)||'{}')||{}; } catch {}
  showFocus(entries[saved.focus]?saved.focus:'api');
  if(Array.isArray(saved.expandedJobs))root.querySelectorAll('[data-job]').forEach(el=>el.open=saved.expandedJobs.includes(el.dataset.job));
  root.querySelectorAll('[data-focus]').forEach(button=>button.addEventListener('click',()=>{showFocus(button.dataset.focus);remember();}));
  root.querySelectorAll('[data-job]').forEach(el=>el.addEventListener('toggle',remember));
})();
