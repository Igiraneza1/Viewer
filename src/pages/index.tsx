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
    <div className="welcome px-4 py-12 min-h-screen ">
      
      <SignedOut>
  <div className="text-center min-h-screen flex flex-col justify-center items-center bg-amber-600">
    <h1 className="text-4xl font-bold mb-6">Welcome to Recipe Viewer!</h1>
    <div className="flex gap-4">
      <SignInButton mode="modal">
        <button className="px-4 py-2 text-xl rounded hover:bg-gray-100 border border-gray-300">
          Sign in
        </button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button className="px-4 py-2 text-xl rounded bg-black text-white hover:bg-gray-800">
          Sign up
        </button>
      </SignUpButton>
    </div>
  </div>
</SignedOut>

     <div className='p-10 bg-gray-200'>
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
                <div className="m- text-center p-3 bg-orange-500">
                  <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                    {recipe.title}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </SignedIn>
    </div>
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
