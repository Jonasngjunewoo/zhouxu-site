create table departments (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  id text not null,
  name text not null,
  english text not null,
  mission text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, id)
);

create table daily_logs (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  id text not null,
  department_id text not null,
  content text not null,
  learned text not null default '',
  earned text not null default '',
  xp integer not null default 0 check (xp >= 0),
  gold numeric not null default 0 check (gold >= 0),
  use_for_video boolean not null default true,
  log_date date not null default current_date,
  created_at timestamptz not null default now(),
  primary key (user_id, id),
  foreign key (user_id, department_id) references departments(user_id, id) on delete cascade
);

create table weekly_reviews (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  id text not null,
  week_start date not null,
  moved_forward text not null,
  stuck_points text not null,
  department_attention text not null,
  lessons text not null,
  next_week_focus text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, id)
);

create table overlay_events (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  id text not null,
  department_id text,
  title text not null,
  mode text not null check (mode in ('xp', 'gold')),
  amount numeric not null default 0 check (amount >= 0),
  note text not null default '',
  created_at timestamptz not null default now(),
  primary key (user_id, id),
  foreign key (user_id, department_id) references departments(user_id, id) on delete set null (department_id)
);

create index departments_user_created_at_idx on departments (user_id, created_at);
create index daily_logs_user_created_at_idx on daily_logs (user_id, created_at desc);
create index weekly_reviews_user_created_at_idx on weekly_reviews (user_id, created_at desc);
create index overlay_events_user_created_at_idx on overlay_events (user_id, created_at desc);

alter table departments enable row level security;
alter table daily_logs enable row level security;
alter table weekly_reviews enable row level security;
alter table overlay_events enable row level security;

revoke all on departments, daily_logs, weekly_reviews, overlay_events from anon;
grant select, insert, update, delete on departments, daily_logs, weekly_reviews, overlay_events to authenticated;

create policy "Users read their own departments"
on departments for select to authenticated
using ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "Users insert their own departments"
on departments for insert to authenticated
with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "Users update their own departments"
on departments for update to authenticated
using ((select auth.uid()) is not null and (select auth.uid()) = user_id)
with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "Users delete their own departments"
on departments for delete to authenticated
using ((select auth.uid()) is not null and (select auth.uid()) = user_id);

create policy "Users read their own daily logs"
on daily_logs for select to authenticated
using ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "Users insert their own daily logs"
on daily_logs for insert to authenticated
with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "Users update their own daily logs"
on daily_logs for update to authenticated
using ((select auth.uid()) is not null and (select auth.uid()) = user_id)
with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "Users delete their own daily logs"
on daily_logs for delete to authenticated
using ((select auth.uid()) is not null and (select auth.uid()) = user_id);

create policy "Users read their own weekly reviews"
on weekly_reviews for select to authenticated
using ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "Users insert their own weekly reviews"
on weekly_reviews for insert to authenticated
with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "Users update their own weekly reviews"
on weekly_reviews for update to authenticated
using ((select auth.uid()) is not null and (select auth.uid()) = user_id)
with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "Users delete their own weekly reviews"
on weekly_reviews for delete to authenticated
using ((select auth.uid()) is not null and (select auth.uid()) = user_id);

create policy "Users read their own overlay events"
on overlay_events for select to authenticated
using ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "Users insert their own overlay events"
on overlay_events for insert to authenticated
with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "Users update their own overlay events"
on overlay_events for update to authenticated
using ((select auth.uid()) is not null and (select auth.uid()) = user_id)
with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "Users delete their own overlay events"
on overlay_events for delete to authenticated
using ((select auth.uid()) is not null and (select auth.uid()) = user_id);
