<p align="center">
  <img src="https://avatars.githubusercontent.com/u/169252285?s=400&u=5b08ea261b76961fa7dac0312b4ec4b26e425028&v=4" width="100" alt="project-logo"
  style="border-radius:50%">
</p>
<p align="center">
    <h1 align="center">charmer-ts/bot</h1>
</p>

<p align="center">
		<em>Developed with the software and tools below.</em>
</p>

<p align="center">
    <img src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white">
    <img src="https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"><br>
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white">
    <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white"><br>
    <img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E">
    <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white">
</p>

<hr>

## 🚀 Getting Started

***Requirements***

Ensure you have the following dependencies installed on your system:

* **Bun**: `latest`

> [!IMPORTANT]
>
> Bun is basically what i use, you can go for whatever you prefer although i recommend using bun because it's tested and works well with the project.

### ⚙️ Install

1. Clone the bot repository:

```sh
git clone https://github.com/charmer-ts/bot.git charmer-bot
```

2. Change to the project directory:

```sh
cd charmer-bot
```

3. Install the dependencies:

```sh
bun install
```

### ► Using `bot`

Fill in the .env file with the following information:

```sh
TOKEN=""
NODE_ENV="development" # or "production"
DATABASE_URL="postgresql://username:password@localhost:5437/db_name?schema=public"

# Used for pagination
EMOTE_PREVIOUS=""
EMOTE_CLOSE=""
EMOTE_NEXT=""
EMOTE_JUMP=""

# Info:
# All emotes must be actual discord emotes, not unicode characters.
```

Migrate database:

```sh
npx prisma migrate dev --name "Initial migration"
```

Use the following command to run bot:

```sh
# for production
bun run src/main.ts
# for development
bun run --watch src/main.ts
```

---

## 🤝 Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Report Issues](https://github.com/charmer-ts/bot/issues)**: Submit bugs found or log feature requests for the `charmer-ts/bot` project.
- **[Submit Pull Requests](https://github.com/charmer-ts/bot/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/charmer-ts/bot/discussions)**: Share your insights, provide feedback, or ask questions.


<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/charmer-ts/bot
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

---

## 📝 Contributors 

<br>
<p align="center">
   <a href="https://github.com{/charmer-ts/bot/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=charmer-ts/bot">
   </a>
</p>