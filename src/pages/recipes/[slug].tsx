// pages/recipes/[slug].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import { Recipe } from '../../types/recipe';
import recipes from '../../data/recipes.json';
import Image from 'next/image';
import Link from 'next/link';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = recipes.map((recipe) => ({
    params: { slug: recipe.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const recipe = recipes.find((r) => r.slug === params?.slug);
  return { props: { recipe } };
};

export default function RecipeDetail({ recipe }: { recipe: Recipe }) {
  return (
    <div>
      <h1>{recipe.title}</h1>
      <Image src={`/images/${recipe.image}`} alt={recipe.title} width={400} height={300} />
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h2>Preparation Steps</h2>
      <ol>
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <Link href='/'>Home</Link>
      
    </div>
  );
}
