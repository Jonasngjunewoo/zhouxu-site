const departments = [
  ["学业部", "Academic", "阅读、作业、考试与长期学习节奏"],
  ["健康部", "Health", "睡眠、运动、饮食与情绪状态"],
  ["创业部", "Venture", "项目推进、合作沟通与商业验证"],
  ["投资部", "Investment", "交易纪律、复盘和风险提醒"],
  ["现金流部", "Cash Flow", "工作收入、支出和稳定现金流"],
  ["媒体部", "Media", "选题、发布、数据与个人 IP"],
];

const audiences = [
  "留学生：同时面对学业、兼职、签证、生活和未来规划。",
  "年轻创业者：项目很多，但需要一个低压力的推进系统。",
  "内容创作者：管理选题、发布、反馈和长期成长。",
  "高度内耗的人：先把混乱拆成可以被照看的几个部门。",
];

const features = [
  ["Today", "每天只看今天最重要的推进，不把人生变成任务海。"],
  ["XP / Gold", "一件事不是学到，就是赚到。失败也会留下经验。"],
  ["Daily Log", "用很轻的方式记录今天做了什么、学到什么、赚到什么。"],
  ["Weekly Review", "每周重新看见自己：哪里前进了，哪里卡住了。"],
];

const waitlistUrl = "https://tally.so/r/WOj0ZR";

export default function Home() {
  return (
    <main className="page-shell">
      <header className="container flex items-center justify-between py-6">
        <a className="focus-ring rounded text-[18px] font-semibold tracking-normal" href="#">
          宙序 ORIX
        </a>
        <nav className="hidden items-center gap-8 text-sm text-[var(--muted)] md:flex">
          <a className="focus-ring rounded" href="#idea">
            理念
          </a>
          <a className="focus-ring rounded" href="#features">
            功能
          </a>
          <a className="focus-ring rounded" href={waitlistUrl} rel="noreferrer" target="_blank">
            预约
          </a>
        </nav>
        <a
          className="focus-ring rounded-full border border-[var(--line)] bg-[var(--paper)] px-4 py-2 text-sm font-medium shadow-sm transition hover:border-[var(--sage)]"
          href={waitlistUrl}
          rel="noreferrer"
          target="_blank"
        >
          预约体验
        </a>
      </header>

      <section className="container grid items-center gap-12 pb-16 pt-14 lg:grid-cols-[1fr_0.92fr] lg:pb-20 lg:pt-20">
        <div className="max-w-3xl">
          <p className="eyebrow mb-5">Life is under construction</p>
          <h1 className="text-[clamp(44px,8vw,92px)] font-semibold leading-[0.98] tracking-normal text-[var(--ink)]">
            宙序
            <span className="mt-3 block text-[clamp(32px,5vw,58px)] text-[var(--sage)]">
              让人生重新有序。
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-[20px] leading-8 text-[var(--muted)] md:text-[22px]">
            一个极简人生推进系统。把学业、工作、创业、健康、投资和内容拆成不同部门，
            每天只记录一件事：今天是学到了，还是赚到了。
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="focus-ring rounded-full bg-[var(--ink)] px-6 py-3 text-center text-sm font-semibold text-white shadow-[0_14px_40px_rgba(31,35,32,0.18)] transition hover:bg-[#111411]"
              href={waitlistUrl}
              rel="noreferrer"
              target="_blank"
            >
              加入第一批预约
            </a>
            <a
              className="focus-ring rounded-full border border-[var(--line)] bg-[rgba(255,253,247,0.72)] px-6 py-3 text-center text-sm font-semibold transition hover:border-[var(--sage)]"
              href="#features"
            >
              看看它怎么工作
            </a>
          </div>
          <p className="mt-5 text-sm text-[var(--muted)]">
            不是 Todo App，也不是效率焦虑。它更像一个安静的人生控制台。
          </p>
        </div>

        <ProductPreview />
      </section>

      <section id="idea" className="section border-y border-[var(--line)] bg-[rgba(255,255,255,0.62)]">
        <div className="container grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Core idea</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-normal md:text-5xl">人生不是管理，是经营。</h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-[var(--muted)]">
            <p>
              宙序采用 Department-Based Life System，把一个人的生活看作一家正在建设中的公司。
              每个部门都不需要完美，只需要持续被看见、被推进、被复盘。
            </p>
            <p>
              第一版只验证一个问题：用户是否愿意每天打开系统，轻轻记录自己的人生推进。
              所以它必须极简、安静、低压力，并且有长期陪伴感。
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="max-w-2xl">
            <p className="eyebrow">For whom</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-normal md:text-5xl">适合正在把人生重新整理起来的人。</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {audiences.map((item) => (
              <div className="quiet-card p-6 text-[17px] leading-7 text-[var(--muted)]" key={item}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="section bg-[#eff1ea]">
        <div className="container">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow">MVP preview</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-normal md:text-5xl">第一版只保留最重要的东西。</h2>
            </div>
            <p className="max-w-sm text-base leading-7 text-[var(--muted)]">
              不做复杂图表，不做社交系统，不做金币商城。先让每天的推进变得可见。
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {features.map(([title, text]) => (
              <article className="quiet-card min-h-[188px] p-6" key={title}>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Default departments</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-normal md:text-5xl">把混乱拆成六个可以照看的部门。</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {departments.map(([name, english, mission]) => (
              <div className="border-b border-[var(--line)] py-5" key={name}>
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-semibold">{name}</h3>
                  <span className="text-sm text-[var(--sage)]">{english}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{mission}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-y border-[var(--line)] bg-[rgba(255,255,255,0.62)]">
        <div className="container grid gap-10 md:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="eyebrow">Built in real life</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-normal md:text-5xl">先从 Jonas 的真实生活里长出来。</h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-[var(--muted)]">
            <p>
              宙序最初不是冷冰冰的软件，而是用来管理真实人生的系统：UQ LLM 学业、工作现金流、
              知宙公司构想、无唯茶事海外测试、投资复盘、个人 IP 内容，以及健康和情绪。
            </p>
            <p>
              它的第一批内容不是成功学，而是施工日志：一个年轻创始人如何在混乱里继续往前。
            </p>
          </div>
        </div>
      </section>

      <section id="waitlist" className="section">
        <div className="container">
          <div className="quiet-card grid overflow-hidden lg:grid-cols-[0.95fr_1.05fr]">
            <div className="bg-[var(--ink)] p-8 text-white md:p-12">
              <p className="text-sm font-semibold text-[#cbd6c5]">Early access</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-normal md:text-5xl">加入宙序第一批预约。</h2>
              <p className="mt-6 text-lg leading-8 text-[#e5e4dc]">
                第一版会邀请少量真实用户试用。你可以告诉我们你现在最想整理的人生部门，
                我们会优先邀请最匹配的用户。
              </p>
            </div>
            <div className="p-8 md:p-12">
              <div className="flex h-full flex-col justify-center">
                <p className="text-sm font-semibold text-[var(--sage)]">Tally Waitlist</p>
                <h3 className="mt-4 text-3xl font-semibold tracking-normal text-[var(--ink)]">
                  用 1 分钟留下你的预约信息。
                </h3>
                <p className="mt-5 text-base leading-7 text-[var(--muted)]">
                  表单会收集姓名、邮箱、身份和你最想整理的人生部门。第一批测试邀请会优先从这里发出。
                </p>
                <a
                  className="focus-ring mt-8 inline-flex w-fit rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#111411]"
                  href={waitlistUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  打开预约表单
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="container flex flex-col justify-between gap-3 border-t border-[var(--line)] py-8 text-sm text-[var(--muted)] md:flex-row">
        <p>© 2026 宙序 ORIX. Life is under construction.</p>
        <p>知宙旗下数字系统 · CosmoSense Brand Management</p>
      </footer>
    </main>
  );
}

function ProductPreview() {
  return (
    <div className="quiet-card relative overflow-hidden p-4 md:p-5">
      <div className="rounded border border-[var(--line)] bg-[var(--paper)] p-5 shadow-inner">
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
          <div>
            <p className="text-sm text-[var(--muted)]">Today</p>
            <h2 className="mt-1 text-2xl font-semibold">人生总控台</h2>
          </div>
          <div className="rounded-full bg-[#e4eadf] px-3 py-1 text-sm font-semibold text-[var(--sage)]">
            +24 XP
          </div>
        </div>
        <div className="grid gap-4 py-5 sm:grid-cols-2">
          <div className="rounded border border-[var(--line)] bg-white p-4">
            <p className="text-sm text-[var(--muted)]">今日重点</p>
            <p className="mt-3 text-lg font-semibold leading-6">完成论文阅读，推进无唯茶事海外页。</p>
          </div>
          <div className="rounded border border-[var(--line)] bg-white p-4">
            <p className="text-sm text-[var(--muted)]">Gold</p>
            <p className="mt-3 text-lg font-semibold">A$ 128</p>
            <p className="mt-2 text-sm text-[var(--muted)]">稳定现金流部</p>
          </div>
        </div>
        <div className="space-y-3">
          {[
            ["Academic", "读完 Evidence reading note", "XP"],
            ["Venture", "确认官网第一版结构", "XP"],
            ["Health", "睡眠 7h，晚间散步", "XP"],
          ].map(([dept, text, score]) => (
            <div className="flex items-center justify-between gap-4 rounded border border-[var(--line)] bg-white px-4 py-3" key={text}>
              <div>
                <p className="text-xs font-semibold text-[var(--sage)]">{dept}</p>
                <p className="mt-1 text-sm text-[var(--ink)]">{text}</p>
              </div>
              <span className="rounded-full bg-[#f0eee6] px-3 py-1 text-xs font-semibold text-[var(--clay)]">
                {score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
