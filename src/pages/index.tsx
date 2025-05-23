import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import path from 'path';
import fs from 'fs';
import { Recipe } from '../types/recipe';
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import '../styles/globals.css';

interface HomeProps {
  recipes: Recipe[];
}

export default function Home({ recipes }: HomeProps) {
  return (
    <div className="px-4 py-12 bg-gray-200 min-h-screen">
      {/* 👇 Show this when user is NOT signed in */}
      <SignedOut>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome!</h1>
          <p className="mb-6 text-gray-600">Please sign in or sign up to view the recipes.</p>
          <div className="flex justify-center gap-4">
            <SignInButton mode="modal">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Sign Up</button>
            </SignUpButton>
          </div>
        </div>
      </SignedOut>

      {/* 👇 Show this when user IS signed in */}
      <SignedIn>
        <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800 tracking-tight">
          Delicious Recipes
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {recipes.map((recipe) => (
            <Link key={recipe.id} href={`/recipes/${recipe.slug}`} passHref>
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
