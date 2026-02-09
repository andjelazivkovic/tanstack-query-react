# Tutorijal: Upravljanje asinhronim stanjem u React aplikacijama pomoću TanStack Query

## Uvod

Moderne React aplikacije gotovo uvek rade sa asinhronim podacima – dohvat sa REST API-ja, keširanje, sinhronizacija stanja, paginacija, refetching i obrada grešaka.  
Klasičan pristup zasnovan na `useEffect` i `useState` često dovodi do kompleksnog, teško održivog koda i ponavljanja iste logike kroz više komponenti.

**TanStack Query** (ranije React Query) predstavlja biblioteku koja apstrahuje ove probleme i nudi robustan, skalabilan i deklarativan način upravljanja asinhronim stanjem u React aplikacijama.

Ovaj projekat predstavlja praktičan tutorijal koji demonstrira:
- probleme klasičnog pristupa,
- način na koji TanStack Query rešava te probleme,
- poređenje dva rešenja kroz realan primer.

---

## Tema

**Upravljanje asinhronim stanjem i keširanjem podataka u React aplikacijama korišćenjem TanStack Query biblioteke**

---

## Tehnologije

- **React.js**
- **TypeScript**
- **TanStack Query**
- **React Router**
- **REST API (DummyJSON)**

---

## Opis projekta

Cilj ovog tutorijala je:
- prikaz problema upravljanja asinhronim stanjem u React aplikacijama,
- demonstracija keširanja i sinhronizacije podataka,
- poređenje klasičnog pristupa (`useEffect` + `useState`) sa TanStack Query rešenjem.

Kroz jednostavnu aplikaciju za prikaz liste postova implementirani su:
- paginacija,
- dodavanje novog posta,
- upravljanje loading i error stanjima,
- sinhronizacija URL parametara sa stanjem aplikacije.

Poseban akcenat stavljen je na prednosti TanStack Query-ja:
- automatsko keširanje,
- invalidaciju keša,
- refetching,
- optimističke izmene,
- poboljšane performanse i čitljivost koda.

---

## Struktura aplikacije

Aplikacija sadrži dve implementacije iste funkcionalnosti:

### 1. Klasičan pristup (useEffect + useState)
Komponenta: `PostsUseEffect`

Karakteristike:
- ručno upravljanje loading i error stanjima,
- eksplicitni `useEffect` hook za svaki async poziv,
- manuelno ažuriranje stanja nakon mutacija,
- veća količina boilerplate koda.

### 2. TanStack Query pristup
Komponenta: `PostsTanstack`

Karakteristike:
- deklarativan dohvat podataka (`useQuery`),
- automatsko keširanje i refetching,
- optimistički update keša,
- centralizovano upravljanje greškama i loading stanjima,
- jednostavniji i čitljiviji kod.

---

## Pokretanje aplikacije

### 1. Instalacija zavisnosti

```bash
npm install
