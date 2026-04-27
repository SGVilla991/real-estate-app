-- Run this in your Supabase project → SQL Editor

-- Properties table
create table if not exists public.properties (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references auth.users(id) on delete cascade not null,
  title       text not null,
  description text,
  price       numeric not null,
  type        text check (type in ('sale', 'rent')) not null,
  beds        integer not null,
  baths       integer not null,
  sqft        integer not null,
  address     text not null,
  city        text not null,
  image_url   text,
  tag         text,
  created_at  timestamptz default now()
);

-- Row-Level Security
alter table public.properties enable row level security;

create policy "Anyone can view properties"
  on public.properties for select
  using (true);

create policy "Authenticated users can insert their own properties"
  on public.properties for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own properties"
  on public.properties for update
  using (auth.uid() = user_id);

create policy "Users can delete their own properties"
  on public.properties for delete
  using (auth.uid() = user_id);

-- Storage bucket for property images
-- Go to Storage → New Bucket → name: "property-images" → Public: ON
-- Then add this policy to the bucket:

-- insert policy (authenticated users only)
-- create policy "Authenticated users can upload images"
--   on storage.objects for insert
--   with check (bucket_id = 'property-images' and auth.role() = 'authenticated');

-- public read
-- create policy "Public can view property images"
--   on storage.objects for select
--   using (bucket_id = 'property-images');
