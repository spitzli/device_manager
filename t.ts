const data = Deno.readFileSync("./import_map.json");
const decoder = new TextDecoder("utf-8");
const map = JSON.parse(decoder.decode(data)).imports;

const orderdMap = Object.keys(map)
  .sort()
  .reduce((obj: any, key: any) => {
    obj[key] = map[key];
    return obj;
  }, {});

const encoder = new TextEncoder();

Deno.writeFileSync("./import_map.json", encoder.encode(JSON.stringify({ imports: orderdMap })));
