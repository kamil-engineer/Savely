export default function User(params: { id: string; query?: Record<string, string> }): HTMLElement {
  const div = document.createElement('div');
  const tab = params.query?.tab || 'overview';
  div.innerHTML = `
        <h1>User Page</h1>
        <p>User ID: ${params.id}</p>
        <p>Active Tab: ${tab}</p>
        <p>
            <a href="/user/${params.id}?tab=overview">Overview</a> |
            <a href="/user/${params.id}?tab=posts">Posts</a> |
            <a href="/user/${params.id}?tab=settings">Settings</a>
        </p>
    `;
  return div;
}
