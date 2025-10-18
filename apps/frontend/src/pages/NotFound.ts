export default function NotFound(): HTMLElement {
  const div = document.createElement('div');
  div.innerHTML = `<h1>404 Not Found</h1><p>The page you are looking for does not exist.</p>`;
  return div;
}
