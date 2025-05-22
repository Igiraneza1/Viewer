import { GetStaticProps, GetStaticPaths } from 'next';
import path from 'path';
import fs from 'fs';
import { Recipe } from '../../types/recipe';
import Link from 'next/link';
import Image from 'next/image';

interface RecipeProps {
  recipe: Recipe;
}

export default function RecipeDetail({ recipe }: RecipeProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link
        href="/"
        className="text-blue-600 hover:text-blue-800 underline transition duration-200 font-medium mb-6 inline-block"
      >
        ← Back to recipes
      </Link>

      <Image
        src={recipe.image}
        alt={recipe.title}
        width={800}
        height={400}
        className="w-full max-h-[400px] object-cover rounded-lg shadow mb-8"
        priority
      />

      <div className="bg-white p-6 rounded-lg shadow-md space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{recipe.title}</h1>

        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">Ingredients</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            {recipe.ingredients.map((ingredient: string, index: number) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">Preparation Steps</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-600">
            {recipe.steps.map((step: string, index: number) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(process.cwd(), 'data', 'recipes.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const recipes: Recipe[] = JSON.parse(jsonData);

  const paths = recipes.map((recipe) => ({
    params: { slug: recipe.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const filePath = path.join(process.cwd(), 'data', 'recipes.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const recipes: Recipe[] = JSON.parse(jsonData);

  const recipe = recipes.find((r) => r.slug === params?.slug);

  if (!recipe) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      recipe,
    },
  };
};
