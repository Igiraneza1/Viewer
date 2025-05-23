import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import path from 'path';
import fs from 'fs';
import { Recipe } from '../types/recipe';
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
// import '../styles/globals.css';

interface HomeProps {
  recipes: Recipe[];
}

export default function Home({ recipes }: HomeProps) {
  return (
    <div className="welcome px-4 py-12 bg-gray-200 min-h-screen">
      <SignedOut>
        <div
          className="text-center min-h-screen flex flex-col justify-center items-center bg-cover bg-center"
          style={{ backgroundImage: "url('/images/background.jpg')", 
            backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <h1 className="text-4xl font-bold mb-6 text-white p-4 rounded">
            Welcome to Recipe Viewer!
          </h1>
          <p className="text-lg text-gray-600 mb-8 bg-gray-300 p-4 rounded max-w-md mx-auto">
            Please{' '}
            <SignUpButton mode="modal">
              <button className="bg-orange-600 text-white px-4 rounded hover:bg-orange-700">
                Sign Up
              </button>
            </SignUpButton>{' '}
            or{' '}
            <SignInButton mode="modal">
              <button className="bg-blue-500 text-white px-4 rounded hover:bg-blue-700">
                Sign In
              </button>
            </SignInButton>{' '}
            to explore our delicious recipes.
          </p>
        </div>
      </SignedOut>

      <SignedIn>
        <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800 tracking-tight">
          Delicious Recipes
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {recipes.map((recipe) => (
            <Link key={recipe.id} href={`/recipes/${recipe.slug}`}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer">
                <div className="relative w-full h-48">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    width={400}
                    height={192}
                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                    {recipe.title}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </SignedIn>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'data', 'recipes.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const recipes = JSON.parse(jsonData);

  return {
    props: {
      recipes,
    },
  };
};
