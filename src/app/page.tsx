import Header from './components/Header';
import Profile from './components/Profile';
import Showcase from './components/Showcase';
import Blog from './components/Blog';
import Footer from './components/Footer';


export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <Profile />
        <Showcase />
        <Blog />

      </main>
      <Footer />
    </div>
  );
}