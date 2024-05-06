export default function (markdown: string) {
  const regex = /\!\[(.*?)\]\((.*?)\)/g
  const result = markdown.matchAll(regex);
  // console.log(result.next().);

  // Parse image description and file name
  const data: {
    imageDescription: string;
    imagePath: string;
  }[] = [];

  let cur = result.next();
  while (!cur.done) {

    console.log(cur.value[0], cur.value[1], cur.value[2]);
    cur = result.next();
  }
  // TODO: return object data instead, keeping the names of images and stuff, for storage reasons

  return markdown.replace(regex, "");
  // return result;
}