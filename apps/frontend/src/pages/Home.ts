export default function Home() {
  const div = document.createElement('div');
  div.innerHTML = `<h1>Home Page</h1><p>Welcome to the Home Page!</p><a href="/about">About Page!</a>`;
  return div;
}
