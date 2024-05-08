import { database } from '../core/client';

export async function fetchGuild(guildId: string) {
    try {
        const result = await database.guild.findUnique({
            where: {
                guildId,
            },
        });

        return result;
    } catch {
        return null;
    }
}

export async function createGuild(
    guildId: string,
    options: {
        name: string;
        owner: string;
        icon?: string;
        banner?: string;
    },
) {
    try {
        const icon = options?.icon
            ? {
                  icons: {
                      create: {
                          icon: options.icon,
                      },
                  },
              }
            : {};

        const banner = options?.banner
            ? {
                  banners: {
                      create: {
                          banner: options.banner,
                      },
                  },
              }
            : {};

        const photos = {
            ...icon,
            ...banner,
        };

        const result = await database.guild
            .create({
                data: {
                    guildId,
                    owners: {
                        create: {
                            ownerId: options.owner,
                        },
                    },
                    names: {
                        create: {
                            name: options.name,
                        },
                    },
                    ...photos,
                },
            })
            .catch(() => null);

        return result;
    } catch {
        return null;
    }
}
