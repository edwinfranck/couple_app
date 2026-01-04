# Contribuer au projet Moments

Merci de l'intérêt que vous portez au projet **Moments** ! 🎉

Que vous soyez ici pour corriger un bug, améliorer la documentation ou proposer une nouvelle fonctionnalité géniale, votre aide est précieuse. Ce document explique comment contribuer au projet de manière efficace.

## 📋 Table des Matières

1.  [Code de Conduite](#code-de-conduite)
2.  [Signaler un Bug](#signaler-un-bug)
3.  [Suggérer une Fonctionnalité](#suggérer-une-fonctionnalité)
4.  [Processus de Développement](#processus-de-développement)
5.  [Standards de Code](#standards-de-code)

---

## Code de Conduite

Ce projet adhère à un code de conduite simple : soyez respectueux, bienveillant et constructif. Nous voulons créer un environnement accueillant pour tous les développeurs, quel que soit leur niveau d'expérience.

## Signaler un Bug

Si vous trouvez un bug, merci de créer une "Issue" sur GitHub en fournissant autant de détails que possible :

*   **Titre clair et descriptif**.
*   **Étapes pour reproduire** le problème.
*   **Comportement attendu** vs **Comportement actuel**.
*   **Captures d'écran** ou vidéos si pertinent.
*   Environnement (OS, version d'Expo, Simulateur ou Appareil physique).

## Suggérer une Fonctionnalité

Vous avez une idée pour rendre l'application encore meilleure ? Ouvrez une Issue avec le tag `enhancement` ou `feature request`.

*   Expliquez le **pourquoi** de la fonctionnalité (quel problème elle résout).
*   Décrivez le **comment** (comment vous l'imaginez dans l'interface).

## Processus de Développement

Voici comment proposer vos changements (Pull Request) :

1.  **Forkez** le projet.
2.  **Clonez** votre fork localement.
    ```bash
    git clone https://github.com/VOTRE-USERNAME/moments-app.git
    cd moments-app
    ```
3.  **Créez une branche** pour votre fonctionnalité ou correction.
    ```bash
    git checkout -b feature/ma-nouvelle-fonctionnalite
    # ou
    git checkout -b fix/correction-bug-affichage
    ```
4.  **Faites vos changements**.
5.  **Testez** vos modifications sur iOS et Android si possible.
6.  **Commitez** vos changements avec un message clair (voir convention ci-dessous).
    ```bash
    git commit -m "feat: ajout du support multilingue"
    ```
7.  **Poussez** vers votre fork.
    ```bash
    git push origin feature/ma-nouvelle-fonctionnalite
    ```
8.  **Ouvrez une Pull Request** (PR) sur le dépôt principal.
    *   Décrivez ce que fait votre PR.
    *   Liez l'Issue correspondante si elle existe.

## Standards de Code

Pour maintenir la qualité du projet, merci de suivre ces règles :

*   **TypeScript** : Utilisez le typage fort autant que possible. Évitez `any`.
*   **Style** : Le projet utilise la configuration ESLint d'Expo. Assurez-vous qu'il n'y a pas d'erreurs de linter avant de commiter.
*   **Structure** :
    *   Les composants réutilisables vont dans `components/common`.
    *   Les composants spécifiques à une fonctionnalité vont dans `components/[feature]`.
    *   Ne mettez pas de logique métier complexe directement dans les composants UI (utilisez les stores ou hooks).
*   **Design** :
    *   Utilisez toujours le hook `useTheme()` pour les couleurs et espacements.
    *   Ne hardcodez pas de couleurs hexadécimales (sauf cas exceptionnel), référez-vous à `colors.primary`, `colors.text`, etc.
    *   Respectez la police **Outfit** définie dans le thème.

## Convention de Commit

Nous encourageons l'utilisation de [Conventional Commits](https://www.conventionalcommits.org/) :

*   `feat: ...` pour une nouvelle fonctionnalité.
*   `fix: ...` pour une correction de bug.
*   `docs: ...` pour de la documentation uniquement.
*   `style: ...` pour du formatage, points-virgules manquants, etc. (pas de changement de code de production).
*   `refactor: ...` pour du refactoring de code.

Merci de contribuer à rendre **Moments** incroyable ! ❤️
