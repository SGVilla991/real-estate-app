-- ============================================================
-- EstatePrime — Full Schema (run in Supabase SQL Editor)
-- ============================================================

-- 1. PROPERTIES TABLE
-- ============================================================
create table if not exists public.properties (
  id            uuid default gen_random_uuid() primary key,
  user_id       uuid references auth.users(id) on delete cascade not null,
  title         text not null,
  description   text,
  price         numeric not null,
  type          text check (type in ('sale', 'rent')) not null,
  property_type text check (property_type in ('house','apartment','office','commercial','land','penthouse')) default 'house',
  beds          integer not null default 0,
  baths         integer not null default 0,
  sqft          integer not null default 0,
  parking       integer default 0,
  year_built    integer,
  address       text not null,
  city          text not null,
  neighborhood  text,
  image_url     text,
  amenities     text[] default '{}',
  tag           text,
  views         integer default 0,
  created_at    timestamptz default now()
);

alter table public.properties enable row level security;

drop policy if exists "Anyone can view properties" on public.properties;
drop policy if exists "Authenticated users can insert their own properties" on public.properties;
drop policy if exists "Users can update their own properties" on public.properties;
drop policy if exists "Users can delete their own properties" on public.properties;

create policy "Anyone can view properties"
  on public.properties for select using (true);

create policy "Authenticated users can insert their own properties"
  on public.properties for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own properties"
  on public.properties for update
  using (auth.uid() = user_id);

create policy "Users can delete their own properties"
  on public.properties for delete
  using (auth.uid() = user_id);

-- 2. FAVORITES TABLE
-- ============================================================
create table if not exists public.favorites (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references auth.users(id) on delete cascade not null,
  property_id uuid references public.properties(id) on delete cascade not null,
  created_at  timestamptz default now(),
  unique (user_id, property_id)
);

alter table public.favorites enable row level security;

create policy "Users can view their own favorites"
  on public.favorites for select
  using (auth.uid() = user_id);

create policy "Users can add favorites"
  on public.favorites for insert
  with check (auth.uid() = user_id);

create policy "Users can remove their own favorites"
  on public.favorites for delete
  using (auth.uid() = user_id);

-- 3. PROFILES TABLE (extends auth.users)
-- ============================================================
create table if not exists public.profiles (
  id         uuid references auth.users(id) on delete cascade primary key,
  full_name  text,
  phone      text,
  avatar_url text,
  bio        text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- STORAGE
-- ============================================================
-- 1. Go to Storage → New Bucket → name: "property-images" → Public: ON
-- 2. Run these policies:

-- insert policy (authenticated users only)
-- create policy "Authenticated users can upload images"
--   on storage.objects for insert to authenticated
--   with check (bucket_id = 'property-images');

-- public read
-- create policy "Public can view property images"
--   on storage.objects for select
--   using (bucket_id = 'property-images');
