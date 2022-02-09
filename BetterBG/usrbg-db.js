const usrbg_db_url = "https://raw.githubusercontent.com/Flashc0rd/BetterBG/main/bg/backgrounds.json";

const getDb = async () => await (await fetch(usrbg_db_url)).json();

const toMap = (rawDb) => {
    let map = new Map();
    for (const entry of rawDb) {
        map.set(entry.uid, entry);
    }
    return map;
};

export default async () => toMap(await getDb());
