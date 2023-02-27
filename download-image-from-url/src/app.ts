async function toDataUrl(url: string): Promise<string> {
  const blob = await fetch(url).then((res) => res.blob());
  return URL.createObjectURL(blob);
}

export default async function download(title: string, url: string) {
  try {
    const a = document.createElement("a");
    const imageURl = await toDataUrl(url);
    a.href = imageURl;
    a.download = title;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (err) {
    console.log(err);
  }
}

// download(
//   "image.png",
//   "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"
// );
