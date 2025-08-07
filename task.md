# 🏢 Petits Bureaux – Tech Cadrage & Roadmap

## 📌 Objectif

Développer **Petits Bureaux**, une plateforme web qui référence des bureaux indépendants à Paris (inspirée de [Ubiq](https://www.ubiq.fr)), avec un **front B2C**, un **back-office interne**, et un **focus SEO fort**.

---

## 🔍 Comment lire ce repo

> Vous êtes dans Cursor ? Suivez ce guide dans l’ordre pour une bonne prise en main du projet :

1. 📐 Voir les maquettes dans la section **#1 Design Produit**
2. 🧩 Comprendre le périmètre fonctionnel → **#2 Modules**
3. 📋 Backlog de dev en 4 sprints → **#3 Backlog**
4. 🗄️ Architecture technique → **#4 DB & API**
5. 🔐 Sécurité et RGPD → **#5 Sécurité**
6. 📈 SEO et contenus dynamiques → **#6 SEO**

---

## 1️⃣ Product Design – Aperçu

- **Parcours principaux** :
  - Recherche avec carte (MapBox)
  - Fiche bureau
  - Formulaire "Planifier une visite"

- **Lien Demo** : https://www.ubiq.fr/

---

## 2️⃣ Modules Fonctionnels

| ID     | Module               | Description                         | Endpoints clés                    |
| ------ | -------------------- | ----------------------------------- | --------------------------------- |
| MOD‑01 | Front Web B2C        | Landing, carte, liste, fiche bureau | `/`, `/offices`, `/offices/:slug` |
| MOD‑02 | Moteur de recherche  | Filtres, MapBox                     | `/search`                         |
| MOD‑03 | CMS SEO Pages        | Pages statiques SSG                 | Build SSG (Next.js)               |
| MOD‑04 | Lead Capture         | Formulaire visite + envoi CRM       | `POST /leads`                     |
| MOD‑05 | Auth Back-Office     | Connexion staff + RBAC              | `/admin/login`                    |
| MOD‑06 | CRUD Offices (BO)    | Gestion bureaux (vrais/faux)        | `/admin/offices`                  |
| MOD‑07 | Suivi des Leads (BO) | Voir + changer statut               | `/admin/leads`                    |
| MOD‑08 | Stockage média       | Uploads vers S3, thumbnails         | `/upload`                         |
| MOD‑09 | Analytics + AB Test  | GA4, conversion, faux bureaux       | GA4, Metabase                     |

---

## 3️⃣ Backlog – 4 Sprints / 30 User Stories

👉 Focus MVP = après Sprint 4 + conversion leads ≥ 2%

📦 Sprint breakdown disponible dans [`/docs/backlog.md`](./docs/backlog.md) (à créer)

---

## 4️⃣ Architecture Technique

### 🛢️ Base de données PostgreSQL

| Table             | Rôle                   | Champs clés                                                                            |
| ----------------- | ---------------------- | -------------------------------------------------------------------------------------- |
| `users`           | Auth staff             | `email`, `password_hash`, `role (admin/editor)`                                        |
| `offices`         | Annonces bureaux       | `title`, `slug`, `price_cents`, `arr`, `posts`, `services JSONB`, `is_fake`, `lat/lng` |
| `photos`          | Images des bureaux     | `office_id`, `url`, `alt`                                                              |
| `leads`           | Demandes de visites    | `office_id`, `name`, `email`, `phone`, `utm_json`, `status`                            |
| `services`        | Catalogue des services | `name`, `icon`                                                                         |
| `office_services` | Relation n-n           | `office_id`, `service_id`                                                              |
| `audit_log`       | Journal actions admin  | `actor_id`, `action`, `target_table`, `target_id`, `meta`                              |

> ✅ Index GIN sur `offices.services` pour accélérer les filtres

---

## 5️⃣ Sécurité & RGPD

- 🔐 **Chiffrement** : HTTPS, AES‑256 at rest
- 🔒 **RLS** activée sur toutes les tables privées
- ⏳ **TTL leads** : suppression auto après 24 mois d’inactivité
- 💾 **Backups** : tous les 7 jours
- 🧑‍⚖️ **Base légale** :
  - Leads = contrat
  - Cookies/GA = consentement

---

## 6️⃣ SEO & Génération de contenu

- ⚡ Pages SSG/ISR : bureaux & pages arrondissement
- 📍 URLs propres : `/bureaux-paris-3`, `/office/:slug`
- 🧠 Schema.org : `Office`, `Place`
- 🔎 OG Tags : image dynamique via OG Image Service
- 🗺️ Sitemap mis à jour quotidiennement
- 🧪 Listings factices exclus du sitemap (noindex)

---

## 7️⃣ KPI & Monitoring

- 🎯 Objectif : MVP live après Sprint 4
- ✅ Conversion minimum attendue : ≥ 2% leads
- 📊 Suivis :
  - Sessions
  - CTR listing
  - Taux de transformation leads
  - Temps de réponse < 2h
- 🔔 Monitoring uptime + alertes Slack

---

## 📎 Annexes

- 🧪 AB test : flag `is_fake` à 20% des visiteurs
- ⚙️ Endpoint `POST /leads` doit logguer vers audit + envoyer via SES

---
