import { Outlet } from 'react-router-dom';
import PageButtons from '../PageButtons/PageButtons';

export default function Layout() {
  return (
    <div className="app-container">
      <header className="nav-container">
        <PageButtons />
      </header>
      <main className="content">
        <Outlet /> 
      </main>
    </div>
  );
}