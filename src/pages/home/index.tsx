import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import path from 'path';
import fs from 'fs';
import { Recipe } from '../../types/recipe'

interface HomeProps {
  recipes: Recipe[];
}

export default function Home({ recipes }: HomeProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Delicious Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {recipes.map((recipe) => (
          <Link key={recipe.id} href={`/recipes/${recipe.slug}`} passHref>
            <div>
              <Image
                src={recipe.image}
                alt={recipe.title}
                width={400}
                height={192}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{recipe.title}</h2>
              </div>
            </div>
          </Link>
        ))}
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