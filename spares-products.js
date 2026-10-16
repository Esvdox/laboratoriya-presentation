(() => {
 const grid=document.querySelector('#productCards'),modal=document.querySelector('#detail');if(!grid||!modal)return;
 const formats=[
  {
    "name": "Совместимый ЗИП",
    "title": "Расходники и ЗИП для аттракционов других производителей",
    "text": "Производим и продаём совместимые расходные детали и комплекты запасных частей, инструментов и принадлежностей (ЗИП) для аттракционов других производителей.",
    "kit": [
      "Производство совместимых расходных деталей",
      "Комплекты ЗИП для оборудования других производителей",
      "Подбор по модели, серийному номеру и документации",
      "Подтверждение совместимости и состава поставки"
    ],
    "result": "Производство и повторные продажи расходников и совместимого ЗИП для установленной базы аттракционов других производителей."
  },
  {
    "name": "Расходные детали и ЗИП",
    "title": "Расходные детали и ЗИП для аттракционов ГоркиLand",
    "text": "Производим и продаём расходные детали и комплекты ЗИП для собственных аттракционов ГоркиLand. Подбираем состав поставки по модели, серийному номеру и документации аттракциона.",
    "kit": [
      "Расходные детали для аттракционов ГоркиLand",
      "Комплекты ЗИП для собственных моделей",
      "Подбор по серийному номеру и документации ГоркиLand",
      "Состав поставки в спецификации"
    ],
    "result": "Повторные продажи расходных деталей и ЗИП владельцам аттракционов ГоркиLand."
  },
  {
    "name": "Комплекты ТО",
    "title": "Всё необходимое к очередному обслуживанию",
    "text": "Комплектуем детали и материалы к сезону или регламентному обслуживанию с учётом наработки, состояния и документации конкретного аттракциона.",
    "kit": [
      "Комплект к согласованному виду ТО",
      "Перечень заменяемых элементов",
      "Материалы и инструкция по применению",
      "Поставка для собственной службы заказчика или нашей бригады"
    ],
    "result": "Плановые повторные поставки комплектов обслуживания."
  }
];
 const wrapper=document.createElement('div');wrapper.className='market-catalog-item';
 wrapper.innerHTML='<button class="catalog-card" type="button" data-spares-family aria-haspopup="dialog"><img src="assets/catalog-spares.webp" alt="Запчасти и сервисные комплекты для аттракционов" loading="lazy"><span class="catalog-card-body"><span class="code">С08 / 3 ФОРМАТА ПОСТАВКИ</span><strong>Запчасти и сервисные комплекты</strong><span>Расходные детали и ЗИП для аттракционов ГоркиLand, совместимый ЗИП для других производителей и комплекты ТО.</span></span></button>';
 grid.append(wrapper);
 let trigger=null;
 function open(index=0){
  const d=formats[index];modal.classList.add('catalog-dialog');document.querySelector('#dialogType').textContent='КАТАЛОГ / С08';
  document.querySelector('#dialogBody').innerHTML=`<div class="catalog-modal-head"><span class="badge">Предлагаемое направление повторных продаж</span><h2>Запчасти и сервисные комплекты</h2><p>Детали и ЗИП для аттракционов ГоркиLand, совместимые расходники для стороннего оборудования и комплекты ТО.</p></div><div class="catalog-tabs" role="group" aria-label="Форматы поставки">${formats.map((x,i)=>`<button data-spares-variant="${i}" aria-pressed="${i===index}">${x.name}</button>`).join('')}</div><div class="catalog-render"><img src="assets/catalog-spares.webp" alt="Запасные части и комплект обслуживания аттракционов" width="1536" height="1024"></div><div class="catalog-spec"><h3>${d.title}</h3><p>${d.text}</p><h3>Что получает заказчик</h3><ul>${d.kit.map(x=>`<li>${x}</li>`).join('')}</ul><div class="catalog-boundary"><h3>На чём зарабатывает завод</h3><p>${d.result}</p><p>Два канала: поставки для самостоятельного ТО заказчика и материалы с работами по сервисному договору. Один и тот же комплект учитывается в выручке один раз.</p></div><h3>Принцип разработки</h3><p>Унификация, ремонтопригодность, каталог по серийному номеру и доступность деталей. Сроки замены определяются документацией, наработкой и состоянием; искусственное сокращение ресурса не является частью модели.</p><p class="catalog-note">Это предлагаемая продуктовая модель. Состав, совместимость, цены и сроки подтверждаются для конкретной серии и заказа.</p></div>`;
  if(!modal.open)modal.showModal();modal.scrollTop=0;
 }
 document.addEventListener('click',e=>{const card=e.target.closest('[data-spares-family]');if(card){trigger=card;open();return;}const b=e.target.closest('[data-spares-variant]');if(b)open(Number(b.dataset.sparesVariant));});
 modal.addEventListener('close',()=>{if(trigger?.isConnected)trigger.focus({preventScroll:true});trigger=null;});
})();
