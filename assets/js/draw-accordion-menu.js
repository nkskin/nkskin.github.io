(async function() {
  async function get_data() { return axios('./data.yaml').then(o=>jsyaml.load(o.data)); }
  const wrap = document.getElementById('accordion-menu'); if(!wrap) return;
  const data = await get_data(); if(!data) return;
  Handlebars.registerHelper("inc", function(value, options) {
    return parseInt(value) + 1;
  });
  Handlebars.registerHelper('cyrb53', function(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1>>>0);
  })
  const tmpl = Handlebars.compile(`
  <section id="faq" class="accordion accordion-flush">
    {{#each items}}
    <div class="accordion-item">
      <h2 class="accordion-header" id="h{{cyrb53 title}}">
        <button class="accordion-button accordion-button-icon fw-bold text-nkclinic-dark collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#b{{cyrb53 title}}" aria-expanded="false" aria-controls="h{{cyrb53 title}}">
          {{ title }}
        </button>
      </h2>
      <div id="b{{cyrb53 title}}" class="accordion-collapse collapse" aria-labelledby="h{{cyrb53 title}}" data-bs-parent="#faq">
        <div id="a{{cyrb53 title}}" class="accordion accordion-flush">
          {{#each items}}
          <div class="accordion-item">
            <h2 class="accordion-header" id="h{{cyrb53 ../title}}-{{cyrb53 title}}">
              <button class="accordion-button text-nkclinic-dark collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#b{{cyrb53 ../title}}-{{cyrb53 title}}" aria-expanded="false" aria-controls="h{{cyrb53 ../title}}-{{cyrb53 title}}">
                <span class="fa-stack text-nkclinic-dark">
                  <i class="far fa-circle fa-stack-1x"></i>
                  <span class="fa-stack-1x" style="font-size:0.7rem;">{{inc @index}}</span>
                </span>
                {{ title }}
              </button>
            </h2>
            <div id="b{{cyrb53 ../title}}-{{cyrb53 title}}" class="accordion-collapse collapse" aria-labelledby="h{{cyrb53 ../title}}-{{cyrb53 title}}" data-bs-parent="#a{{cyrb53 ../title}}">
              <div class="fs-6 accordion-body bg-nkclinic-content text-nkclinic-dark text-break lh-base white-space-pre-line">
                {{ text }}
              </div>
            </div>
          </div>
          {{/each}}
        </div>
      </div>
    </div>
    {{/each}}
  </section>
  `);
  wrap.innerHTML = tmpl(data);
})();