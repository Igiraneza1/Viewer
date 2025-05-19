import { GetStaticProps, GetStaticPaths } from 'next';
import path from 'path';
import fs from 'fs';
import { Recipe } from '../../../types/recipe';
import Link from 'next/link';
import Image from 'next/image';

interface RecipeProps {
  recipe: Recipe;
}

export default function RecipeDetail({ recipe }: RecipeProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to recipes
      </Link>
      
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={800}
          height={400}
          className="w-full h-64 object-cover"
          priority
        />
        
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
            <ul className="list-disc pl-5">
              {recipe.ingredients.map((ingredient: string, index: number) => (
                <li key={index} className="mb-1">{ingredient}</li>
              ))}
            </ul>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Preparation Steps</h2>
            <ol className="list-decimal pl-5">
              {recipe.steps.map((step: string, index: number) => (
                <li key={index} className="mb-2">{step}</li>
              ))}
            </ol>
          </div>
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