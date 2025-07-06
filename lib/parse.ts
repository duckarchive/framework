import unescape from "lodash/unescape.js";
import setWith from "lodash/setWith.js";
import get from "lodash/get.js";
import uniq from "lodash/uniq.js";

export const parseDBParams = (str: string | null): Record<string, string> => {
  const result: Record<string, string> = {};

  str?.split(",").map((param) => {
    const [_key, _value] = param.split(":");
    const key = decodeURIComponent(_key?.trim() || "");
    const value = decodeURIComponent(_value?.trim() || "");
    result[key] = value;
  });

  return result;
};

export const stringifyDBParams = (
  data: Record<string, string | number | boolean>
): string => {
  return Object.entries(data)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}:${encodeURIComponent(value)}`
    )
    .join(",");
};

const latin2cyrillic = (str: string): string => {
  const charMap: Record<string, string> = {
    a: "а",
    b: "б",
    c: "ц",
    d: "д",
    e: "е",
    f: "ф",
    g: "г",
    h: "х",
    i: "и",
    j: "й",
    k: "к",
    l: "л",
    m: "м",
    n: "н",
    o: "о",
    p: "п",
    q: "к",
    r: "р",
    s: "с",
    t: "т",
    u: "у",
    v: "в",
    w: "в",
    y: "и",
    z: "з",
  };

  return str
    .split("")
    .map((char) => (charMap[char.toLowerCase()] || char).toUpperCase())
    .join("");
};

const shortenSpecialTerms = (str: string): string => {
  return str
    .replace(/до(п|д)/i, "д")
    .replace(/том/i, "т")
    .replace(/част?и?н?а?/i, "ч");
};

export const parseCode = (str: string, ignoreError?: boolean): string => {
  let result = "";
  const pure = latin2cyrillic(
    unescape(str)
      .replace(/&nbsp;/g, " ")
      .replace(/\n/g, " ")
      .replace(/  /g, " ")
      .replace(/^0+/, "")
      .trim()
  );
  if (/\d+\.$/.test(pure)) {
    // temporary solution for "10." in https://e-resource.tsdavo.gov.ua/fonds/8/
    result = pure.replace(/\./, "н");
  } else if (pure.length > 12) {
    const [extracted] = pure.match(/([^А-ЯҐЄІЇ]{0,1}\d+)/gi) || [];
    result = extracted || pure.slice(0, 10);
  } else {
    result = pure.replace(/[^А-ЯҐЄІЇ0-9]/gi, "");
  }

  if (!result.length) {
    console.error("Empty code", str);
    if (!ignoreError) {
      throw new Error("Empty code");
    }
  }

  return shortenSpecialTerms(result).toUpperCase().trim();
};

export const parseTitle = (str?: string): string => {
  return unescape(str || "")
    .replace(/&nbsp;/g, " ")
    .replace(/\n/g, " ")
    .replace(/  /g, " ")
    .slice(0, 200)
    .trim();
};

interface MetaItem {
  raw: string;
  fund: string;
  description: string;
  casesRange: [string, string?];
}

const del = "[., ]+";
const sub = "[абвдоп. ]{0,5}";
const cyrillic = "[А-ЯҐЄІЇ]";
const latin = "[A-Z]";

const templates: {
  test: RegExp;
  match: RegExp;
  pre?: (str: string) => string;
  post?: (matchResult: string[] | null) => string[] | null;
}[] = [
  {
    test: new RegExp(`^ф${del}([рп]?-?\\d+${sub})-(\\d+${sub})`, "i"),
    pre: latin2cyrillic,
    match: new RegExp(
      `ф${del}([рп]?-?\\d+${sub})-(\\d+${sub})/(\\d+${sub})`,
      "i"
    ),
  },
  {
    test: new RegExp(`^ф${del}`, "i"),
    pre: latin2cyrillic,
    match: new RegExp(
      `ф${del}([рп]?-?\\d+${sub})${del}о${del}(\\d+${sub})${del}д${del}(\\d+${sub})(?:-\\d+${sub})?${del}`,
      "i"
    ),
  },
  {
    test: new RegExp(`^фонд${del}`, "i"),
    pre: latin2cyrillic,
    match: new RegExp(
      `фонд${del}([рп]?-?\\d+${sub})${del}опись?${del}(\\d+${sub})${del}дело${del}(\\d+${sub})(?:-\\d+${sub})?${del}`,
      "i"
    ),
  },
  {
    test: new RegExp(`^vol`, "i"),
    pre: latin2cyrillic,
    match: new RegExp(
      `вол${cyrillic}{0,4}${del}([рп]?-?\\d+${sub})-(\\d+${sub})/(\\d+${sub})[ \\(цонт\.\\)]{0,8}(-\\d+${sub})?`,
      "i"
    ),
  },
];

export const parseMeta = (str: string): MetaItem[] => {
  return str
    .split(" -- ")
    .map((itemStr) => {
      let m = null;
      for (const { test, match, pre, post } of templates) {
        if (test.test(itemStr)) {
          if (pre) {
            m = pre(itemStr).match(match);
          } else {
            m = itemStr.match(match);
          }
          if (post) {
            m = post(m);
          }
          break;
        }
      }

      if (!m) {
        console.error("Invalid meta", { text: itemStr });
        return null;
      }

      const [_, f, d, c, ce] = m;

      return {
        raw: itemStr,
        fund: f.trim(),
        description: d.trim(),
        casesRange: [c.trim(), ce?.slice(1).trim()],
      };
    })
    .filter(Boolean) as MetaItem[];
};

const archive2regex: Record<string, RegExp> = {
  "cc0af161-f1bd-42fa-bb80-9a2e60b9aab3": new RegExp(`крым|crimea`, "i"),
  "6c2e90f3-108f-4431-be0a-25bfef65773b": new RegExp(
    `волынс${cyrillic}{0,}|volyn${latin}{0,}`,
    "i"
  ),
  "7eea9057-108f-4049-8d48-fbe3ba13bd3c": new RegExp(
    `винниц${cyrillic}{0,}|v.nn.ts${latin}{0,}`,
    "i"
  ),
  "64ed2ee2-dd3d-46a8-a9e2-b26150470257": new RegExp(
    `днепропетров${cyrillic}{0,}|dnipropetr.v${latin}{0,}`,
    "i"
  ),
  "53d0319b-aba1-47bb-974c-1875a84a4a45": new RegExp(
    `донецк${cyrillic}{0,}|donetsk${latin}{0,}`,
    "i"
  ),
  "b96d7e3f-e8e4-46f2-9246-2a16a3d8272d": new RegExp(
    `житомир${cyrillic}{0,}|zh.tom.r${latin}{0,}`,
    "i"
  ),
  "fa21bf7f-ff07-4e3c-883e-f74555b52963": new RegExp(
    `закарпатс${cyrillic}{0,}|zakarpats${latin}{0,}`,
    "i"
  ),
  "d1008b04-7bc9-4c57-a82c-891fab1bee82": new RegExp(
    `запорож${cyrillic}{0,}|zapor(i|o)z${latin}{0,}`,
    "i"
  ),
  "2849379a-e817-48a1-a0c2-9af239d695e0": new RegExp(
    `киевс${cyrillic}{0,}|kyiv${latin}{0,}|kiev${latin}{0,}`,
    "i"
  ),
  "1ac97726-3669-43d9-8b35-dfcb225e67b4": new RegExp(
    `кировоград${cyrillic}{0,}|kirovo(g|h)rad${latin}{0,}`,
    "i"
  ),
  "24061680-9f95-4e70-94c1-b316e06b1043": new RegExp(
    `луганск${cyrillic}{0,}|lu(g|h)ans${latin}{0,}`,
    "i"
  ),
  "c630ae60-339a-4452-90f0-7ca2237599d1": new RegExp(
    `львов${cyrillic}{0,}|lv(i|o)v${latin}{0,}`,
    "i"
  ),
  "e8c12be9-e93b-48fa-9991-3ba3268a3307": new RegExp(
    `николаев${cyrillic}{0,}|(n|m)(i|y)kola${latin}{0,}`,
    "i"
  ),
  // "d17d3747-020a-4648-87e6-e6f2e5f069fd":	"Державний архів міста Києва",
  // "a23290d4-305c-4c33-a441-37d6b242f0b9":	"Державний архів міста Севастополя",
  "f9019ed5-b622-4ff3-b9cf-77482ec168ef": new RegExp(
    `одес${cyrillic}{0,}|odes${latin}{0,}`,
    "i"
  ),
  "7d314f31-c6b0-43e0-8328-e185dec74dd2": new RegExp(
    `полтав${cyrillic}{0,}|poltav${latin}{0,}`,
    "i"
  ),
  "a1f00cdd-9759-4356-9f25-95c06af135db": new RegExp(
    `р(о|і)ве?н${cyrillic}{0,}|r(i|o)vn${latin}{0,}`,
    "i"
  ),
  "9a950a06-391e-445f-9693-46f46a7e80cf": new RegExp(
    `сум${cyrillic}{0,}|sum${latin}{0,}`,
    "i"
  ),
  "0b207b89-d3e6-4cef-93d6-34f5125d2105": new RegExp(
    `тернопол${cyrillic}{0,}|ternop(i|o)l${latin}{0,}`,
    "i"
  ),
  "e5f15ff7-7a15-486a-b250-30a049f7137a": new RegExp(
    `харьков${cyrillic}{0,}|ark(i|o)v${latin}{0,}`,
    "i"
  ),
  "66bb460c-9ac7-499e-be80-e68d3d6fe62d": new RegExp(
    `херсон${cyrillic}{0,}|erson${latin}{0,}`,
    "i"
  ),
  "f05ae079-d158-49c2-aaa3-0186c603f0a2": new RegExp(
    `хмельниц${cyrillic}{0,}|meln.tsk${latin}{0,}`,
    "i"
  ),
  "ccb5d7d3-9a5d-4ed8-91f6-3cb92644ee93": new RegExp(
    `черкас${cyrillic}{0,}|cherkas${latin}{0,}`,
    "i"
  ),
  "4c2375fa-ff80-43c5-9b0f-b34067037f49": new RegExp(
    `чернов${cyrillic}{0,}|chern.v${latin}{0,}`,
    "i"
  ),
  "f5276d71-4e01-40dd-b05c-77595c0edd8f": new RegExp(
    `черн.г.в${cyrillic}{0,}|cherni..v${latin}{0,}`,
    "i"
  ),
  "7dd1faa7-a5b9-4a8e-8361-9a20a0e93655": new RegExp(
    `ивано${cyrillic}{0,}|ivano${latin}{0,}`,
    "i"
  ),
  "a2c6add8-0a57-4b1e-9442-fa816331e0dc": new RegExp(
    `центр${cyrillic}{0,}${del}гос${cyrillic}{0,}${del}.стор${cyrillic}{0,}${del}арх${cyrillic}{0,}.+?${del}льв.в|Central State Historical Archives of Ukraine in L.?viv`,
    "i"
  ),
  "89ef6011-a152-4296-a1e9-9bda6b0e49c5": new RegExp(
    `центр${cyrillic}{0,}${del}гос${cyrillic}{0,}${del}.стор${cyrillic}{0,}${del}арх${cyrillic}{0,}${del}в?${del}?ки.в|Central State Historical Archives of Ukraine in K..v`,
    "i"
  ),
};

export const parseArchive = (str: string): string => {
  const entries = Object.entries(archive2regex).filter(([_, regex]) =>
    regex.test(str)
  );
  if (entries.length !== 1) {
    console.error(`Can't parse archive: ${str}`);
    return "";
  }
  return entries[0][0];
};

export interface MetaTree {
  [archiveId: string]: {
    [fundCode: string]: {
      [descriptionCode: string]: {
        [caseCode: string]: string[];
      };
    };
  };
}

export const meta2tree = (
  raw: string,
  dgs: string,
  raw_archive: string
): MetaTree => {
  const tree: MetaTree = {};
  const meta = parseMeta(raw).flat();
  const archive_id = parseArchive(raw_archive);

  if (!archive_id) {
    console.error(`Skipping archive: ${raw_archive}`);
    return tree;
  }

  meta.forEach((item) => {
    const { fund, description, casesRange } = item;
    const [fromCase, toCase] = casesRange;
    const from = parseInt(fromCase) + 1;
    const to = (parseInt(toCase || "0") || from) - 1;

    setWith(tree, [archive_id, fund, description, fromCase], [dgs], Object);
    if (toCase) {
      setWith(tree, [archive_id, fund, description, toCase], [dgs], Object);
    }

    for (let i = from; i <= to; i++) {
      const parts = [archive_id, fund, description, i.toString()];
      const prev = get(tree, parts) || [];
      setWith(tree, parts, uniq([...prev, dgs]), Object);
    }
  });

  return tree;
};
