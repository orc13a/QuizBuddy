# QuizBuddy
DDU minieksamensprojekt

Celia, Gustav, Oliver C & Valdemar | 3.i HCØL

https://quiz-buddy.vercel.app/

Husk at se [Issues](https://github.com/orc13a/QuizBuddy/issues).
___

## Kommentarer
Der er ikke mange kommentarer og der er mange filer. Der er dog mange af filerne som er meget ens. Derfor har vi valgt nogen af filerne hvor vi beskrevet hvad der sker.

Husk at læse toppen af de nævnte filer.

De filer er:
- `client/src/components/public/Signup/Signup.js`<br />
  Denne fil beskriver om hvordan React components er bygget op, og sådan ser nærmest hver af vores components ud.
- `backend/routes/public.js`<br />
  Denne fil beskriver om hvordan vores endpoint overordnet virker og sådan er nærmet alle vores endpoints, bare med hver deres logic.
- `backend/models/assignment.model.js`<br />
  Denne fil beskriver hvordan et database schema er bygget op
- `backend/auth/tokens.js`<br />
  Denne fil beskriver hvordan appen tokens bliver genereret.
- `backend/auth/teacherRouteIsAuth.js`<br />
  Denne fil beskriver hvordan nogen endpoints er beskyttet den er er `studentRouteIsAuth.js`, og at man skal være logget ind for at kunne få adgang. På frontend er det filerne `client/src/routes/` `StudentRoute.js` og `TeacherRoute.js`.
- `backend/server.js`<br />
  Det er hovedfilen for serveren

## Læse om alle libraries der er brugt
Hvis du vil læse om et af de libraries vi har brugt, så skal du kigge i `package.json` filerne som er i `client` og `backend` mappene. Så under `dependencies` der er navet på pakkerne og så kan du tage det navn og søge efter det på https://www.npmjs.com.
